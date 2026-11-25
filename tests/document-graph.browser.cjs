/* Run after ./build.sh build, with Playwright available to Node:
 * NODE_PATH=experiment/graph-browser/node_modules \
 * PLAYWRIGHT_BROWSERS_PATH=experiment/graph-browser/browsers \
 * experiment/graph-browser/node_modules/node/bin/node tests/document-graph.browser.cjs
 * Optional GRAPH_SCREENSHOTS=experiment/graph-browser saves preview images.
 */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
(async () => {
  const site = path.resolve('site');
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(site, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''));
      if (!file.startsWith(site + path.sep)) throw new Error('Invalid path');
      const types = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json'};
      res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      res.end(await fs.readFile(file));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({headless: true});
    const origin = `http://127.0.0.1:${server.address().port}`;
    const page = await browser.newPage({viewport: {width: 1440, height: 1100}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    await page.goto(origin);
    const graph = page.locator('.document-graph');
    await graph.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const zoomIn = graph.getByRole('button', {name: '그래프 확대', exact: true});
    const zoomOut = graph.getByRole('button', {name: '그래프 축소', exact: true});
    const reset = graph.getByRole('button', {name: '그래프 선택과 확대 초기화'});
    async function checkControls(root) {
      const toolbar = root.getByRole('group', {name: '그래프 보기 조절'});
      assert.equal(await toolbar.locator('input, label').count(), 0);
      const buttons = toolbar.getByRole('button');
      assert.equal(await buttons.count(), 3);
      for (const button of await buttons.all()) {
        assert.equal((await button.textContent()).trim(), '');
        const box = await button.boundingBox();
        assert.deepEqual([box.width, box.height], [28, 28]);
        const icon = await button.locator('svg').boundingBox();
        assert.deepEqual([icon.width, icon.height], [16, 16]);
      }
      const controls = await toolbar.boundingBox(), bounds = await root.boundingBox();
      const viewport = root.page().viewportSize();
      const expectedHeight = viewport.width > 600
        ? Math.max(420, Math.min(720, viewport.height * .72)) : Math.max(400, viewport.height * .66);
      assert(Math.abs(bounds.height - expectedHeight) < 2, 'the graph retains its responsive canvas height');
      const right = bounds.x + bounds.width - controls.x - controls.width;
      assert(right >= 0 && right < 16 && controls.y >= bounds.y && controls.y - bounds.y < 16,
        'icon controls are in the top right corner of the graph');
    }
    await checkControls(graph);
    const readScale = () => graph.locator('.document-graph__canvas').evaluate(svg => window.d3.zoomTransform(svg).k);
    async function checkZoomTransition(start, direction, root = graph) {
      const scales = await root.locator('.document-graph__canvas').evaluate(svg => new Promise(resolve => {
        const values = [], begin = performance.now();
        function sample() {
          values.push(svg.querySelector('g').getScreenCTM().a / svg.getScreenCTM().a);
          if (performance.now() - begin < 800) requestAnimationFrame(sample);
          else resolve(values);
        }
        sample();
      }));
      const end = scales.at(-1);
      const intermediate = scales.filter(k => (k - start) * direction > 1e-5 && (end - k) * direction > 1e-5);
      assert(new Set(intermediate).size >= 4, 'the rendered graph passes through several intermediate zoom frames');
      scales.forEach((k, i) => assert((k - (i ? scales[i - 1] : start)) * direction >= -1e-6,
        'zoom proceeds in the requested direction'));
      return end;
    }
    const colors = await graph.locator('.node').evaluateAll(nodes => {
      const branches = new Map();
      for (const node of nodes) {
        const branch = node.dataset.branch;
        const color = getComputedStyle(node.querySelector('.main-circle')).fill;
        if (branches.has(branch) && branches.get(branch) !== color) throw new Error('Inconsistent branch color');
        branches.set(branch, color);
      }
      return [...branches.values()];
    });
    assert.equal(new Set(colors).size, colors.length, 'top-level branches have distinct colors');
    const hierarchy = await graph.locator('.node').evaluateAll(nodes => [0, 1, 2].map(depth => {
      const node = nodes.find(n => Number(n.dataset.depth) === depth);
      return {radius: Number(node.querySelector('.main-circle').getAttribute('r')),
        font: parseFloat(getComputedStyle(node.querySelector('text')).fontSize)};
    }));
    assert(hierarchy[0].radius > hierarchy[1].radius && hierarchy[1].radius > hierarchy[2].radius);
    assert(hierarchy[0].font > hierarchy[1].font && hierarchy[1].font > hierarchy[2].font);
    async function assertLabels(root) {
      const result = await root.locator('.node text').evaluateAll(labels => {
        const boxes = labels.filter(el => getComputedStyle(el).visibility === 'visible').map(el => el.getBoundingClientRect());
        return {
          visible: boxes.length > 0,
          overlap: boxes.some((a, i) => boxes.slice(i + 1).some(b =>
            a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top))
        };
      });
      assert(result.visible, 'overview shows labels where space permits');
      assert(!result.overlap, 'visible labels do not overlap each other');
    }
    await assertLabels(graph);
    const count = await graph.locator('.node').count();
    assert(count > 60);
    const layoutState = () => graph.evaluate(root => ({
      camera: root.querySelector('.document-graph__canvas > g').getAttribute('transform'),
      nodes: [...root.querySelectorAll('.node')].map(el => ({
        id: el.dataset.id, position: el.getAttribute('transform'),
        label: el.querySelector('text').style.visibility === 'visible'
          ? el.querySelector('text').getAttribute('transform') : null,
        visibility: el.querySelector('text').style.visibility
      })).sort((a, b) => a.id.localeCompare(b.id))
    }));
    const initialLayout = await layoutState();
    const hoverResult = await graph.evaluate(root => {
      const nodes = [...root.querySelectorAll('.node')];
      const labels = nodes.map(n => n.querySelector('text'));
      const baseline = labels.map(el => ({visible: el.style.visibility, transform: el.getAttribute('transform')}));
      let revealed = 0, hiddenHigher = 0;
      for (const [i, node] of nodes.entries()) {
        if (baseline[i].visible !== 'hidden') continue;
        node.dispatchEvent(new MouseEvent('mouseenter'));
        if (labels[i].style.visibility === 'visible') revealed++;
        labels.forEach((el, j) => {
          if (j === i || baseline[j].visible !== 'visible') return;
          if (el.getAttribute('transform') !== baseline[j].transform) throw new Error('Hover moved another label');
          if (el.style.visibility === 'hidden' && +nodes[j].dataset.depth < +node.dataset.depth) hiddenHigher++;
        });
        node.dispatchEvent(new MouseEvent('mouseleave'));
        labels.forEach((el, j) => {
          if (el.style.visibility !== baseline[j].visible) throw new Error('Mouse leave did not restore labels');
        });
      }
      return {revealed, hiddenHigher};
    });
    assert(hoverResult.revealed > 0, 'hover reveals suppressed labels');
    assert(hoverResult.hiddenHigher > 0, 'hover temporarily hides overlapping higher-level labels');
    await assertLabels(graph);
    const clusters = await graph.locator('.node').evaluateAll(elements => {
      const nodes = elements.map(el => el.__data__);
      return [...new Set(nodes.map(n => n.branch))].map(branch => {
        const members = nodes.filter(n => n.branch === branch);
        const outside = nodes.filter(n => n.branch !== branch);
        const averageDistance = pairs => pairs.reduce((sum, [a, b]) =>
          sum + Math.hypot(a.x - b.x, a.y - b.y), 0) / pairs.length;
        return {
          within: averageDistance(members.flatMap((a, i) => members.slice(i + 1).map(b => [a, b]))),
          between: averageDistance(members.flatMap(a => outside.map(b => [a, b])))
        };
      });
    });
    for (const cluster of clusters) {
      assert(cluster.within < cluster.between * .65, 'each category forms a recognizable initial cluster');
    }
    async function screenshot(name) {
      if (process.env.GRAPH_SCREENSHOTS) await graph.screenshot({path: `${process.env.GRAPH_SCREENSHOTS}/${name}.png`});
    }
    await screenshot('overview');
    const id = await graph.locator('.node[data-depth="0"]').first().getAttribute('data-id');
    const target = graph.locator(`[data-id="${id}"]`);
    const oldRadius = await target.locator('.main-circle').getAttribute('r');
    const overviewScale = await readScale();
    await target.locator('.main-circle').hover();
    await target.locator('text').click();
    const domainScale = await checkZoomTransition(overviewScale, 1);
    assert.equal(await graph.getAttribute('data-center'), id);
    assert.equal(Number(await target.locator('.main-circle').getAttribute('r')), Number(oldRadius) * 1.5);
    assert.equal(await graph.locator('.node').count(), count, 'focus preserves the surrounding graph');
    async function checkNeighborhood(center) {
      const state = await graph.evaluate((root, center) => {
        const data = JSON.parse(root.querySelector('.document-graph__data').textContent);
        const neighbors = new Set([center]);
        for (const edge of data.edges) {
          if (edge.source === center) neighbors.add(edge.target);
          if (edge.target === center) neighbors.add(edge.source);
        }
        const parents = new Map(data.edges.filter(e => e.kind === 'tree').map(e => [e.target, e.source]));
        const treeTargets = new Set();
        for (const node of data.nodes) {
          const path = [node.id];
          while (parents.has(path.at(-1))) path.push(parents.get(path.at(-1)));
          if (path.includes(center)) {
            neighbors.add(node.id);
            if (node.id !== center) treeTargets.add(node.id);
          }
          if (node.id === center) {
            path.forEach(id => neighbors.add(id));
            path.slice(0, -1).forEach(id => treeTargets.add(id));
          }
        }
        return [...root.querySelectorAll('.node')].every(node =>
          node.classList.contains('muted') === !neighbors.has(node.dataset.id)) &&
          [...root.querySelectorAll('.link')].every(line => {
            const edge = line.__data__;
            const active = edge.source.id === center || edge.target.id === center ||
              (edge.kind === 'tree' && treeTargets.has(edge.target.id));
            return line.classList.contains('connected') === active && line.classList.contains('muted') === !active;
          });
      }, center);
      assert(state, 'the full subtree, ancestor path and direct links of the selection stay active');
      assert(await graph.locator('.node.muted').count() > 0);
      assert(await graph.locator('.link.muted').count() > 0);
    }
    await checkNeighborhood(id);
    const isCentered = () => target.evaluate(el => {
      const node = el.querySelector('.main-circle').getBoundingClientRect();
      const svg = el.closest('svg').getBoundingClientRect();
      return Math.hypot(node.x + node.width / 2 - svg.x - svg.width / 2, node.y + node.height / 2 - svg.y - svg.height / 2) < 2;
    });
    assert(await isCentered());
    await screenshot('focused');
    const markerWidth = () => target.locator('.main-circle').evaluate(circle => circle.getBoundingClientRect().width);
    const domainMarkerWidth = await markerWidth();
    await zoomIn.click();
    const biggerScale = await checkZoomTransition(domainScale, 1);
    assert(await markerWidth() > domainMarkerWidth + 1, 'nodes visibly grow as the graph zooms in');
    await zoomOut.focus();
    await page.keyboard.press('Enter');
    const smallerScale = await checkZoomTransition(biggerScale, -1);
    assert(Math.abs(domainScale - smallerScale) < 1e-6);
    assert(Math.abs(await markerWidth() - domainMarkerWidth) < .01);
    assert(await isCentered(), 'the zoom buttons keep the same view center');
    assert.equal(await graph.getAttribute('data-center'), id);
    const box = await graph.boundingBox();
    const pointer = [Math.round(box.x + box.width * .65), Math.round(box.y + box.height * .4)];
    await page.mouse.move(...pointer);
    const anchoredPoint = () => graph.locator('.document-graph__canvas > g').evaluate((g, [x, y]) => {
      const p = new DOMPoint(x, y).matrixTransform(g.getScreenCTM().inverse());
      return [p.x, p.y];
    }, pointer);
    const beforeWheel = await anchoredPoint();
    await page.mouse.wheel(0, -350);
    const wheelScale = await checkZoomTransition(smallerScale, 1);
    const afterWheel = await anchoredPoint();
    assert(Math.hypot(afterWheel[0] - beforeWheel[0], afterWheel[1] - beforeWheel[1]) < .01,
      'wheel zoom stays anchored at the pointer');
    await page.mouse.wheel(0, 350);
    assert(Math.abs(await checkZoomTransition(wheelScale, -1) - smallerScale) < 1e-6);
    const duringScroll = [];
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, -15);
      duringScroll.push(await readScale());
    }
    assert(new Set(duringScroll).size >= 4, 'continuous wheel input advances the view before scrolling stops');
    await page.waitForTimeout(400);
    const afterScroll = await readScale();
    await page.mouse.wheel(0, 120);
    assert(Math.abs(await checkZoomTransition(afterScroll, -1) - smallerScale) < 1e-6);
    const screenFont = await target.locator('text').evaluate(el => parseFloat(getComputedStyle(el).fontSize) * el.getScreenCTM().a);
    assert(Math.abs(screenFont - 20) < .1, 'zoom preserves readable label size');
    const beforePan = await graph.locator('.document-graph__canvas > g').getAttribute('transform');
    await page.mouse.move(box.x + 10, box.y + 80);
    await page.mouse.down(); await page.mouse.move(box.x + 70, box.y + 120, {steps: 10}); await page.mouse.up();
    assert.notEqual(await graph.locator('.document-graph__canvas > g').getAttribute('transform'), beforePan);
    await target.locator('.main-circle').click();
    const refocusedScale = await checkZoomTransition(smallerScale, 1);
    assert(await isCentered());
    const beforeDrag = await target.getAttribute('transform');
    const circle = await target.locator('.main-circle').boundingBox();
    await page.mouse.move(circle.x + circle.width / 2, circle.y + circle.height / 2);
    await page.mouse.down(); await page.mouse.move(circle.x + 90, circle.y + 70, {steps: 12}); await page.mouse.up();
    assert.notEqual(await target.getAttribute('transform'), beforeDrag);
    assert.equal(await graph.getAttribute('data-center'), id, 'drag does not trigger another selection');
    // Follow an actual domain → topic → article path, including offscreen nodes.
    const [topicId, articleId] = await graph.evaluate((root, id) => {
      const tree = JSON.parse(root.querySelector('.document-graph__data').textContent).edges.filter(e => e.kind === 'tree');
      const topic = tree.find(e => e.source === id && tree.some(child => child.source === e.target)).target;
      return [topic, tree.find(e => e.source === topic).target];
    }, id);
    const topic = graph.locator(`[data-id="${topicId}"]`);
    await topic.focus(); await page.keyboard.press('Space');
    const topicScale = await checkZoomTransition(refocusedScale, 1);
    await checkNeighborhood(topicId);
    const article = graph.locator(`[data-id="${articleId}"]`);
    await article.focus(); await page.keyboard.press('Space');
    const articleScale = await checkZoomTransition(topicScale, 1);
    assert.equal(await graph.getAttribute('data-center'), await article.getAttribute('data-id'));
    await checkNeighborhood(articleId);
    await reset.click();
    await checkZoomTransition(articleScale, -1);
    assert.equal(await graph.getAttribute('data-center'), null);
    assert.equal(await graph.locator('.muted, .current, .connected').count(), 0);
    assert.equal(await graph.locator('[aria-pressed="true"]').count(), 0);
    assert.deepEqual(await layoutState(), initialLayout,
      'reset restores initial node positions, camera and labels after dragging and zooming');
    await reset.click();
    await page.waitForTimeout(150);
    assert.deepEqual(await layoutState(), initialLayout, 'repeated reset stays at the initial layout');
    // Reverse an in-progress double zoom before it can reach the requested scale.
    await zoomIn.evaluate(button => { button.click(); button.click(); });
    await page.waitForFunction(start => window.d3.zoomTransform(document.querySelector('.document-graph__canvas')).k > start * 1.05, overviewScale);
    const reversalScale = await zoomOut.evaluate(button => {
      const before = window.d3.zoomTransform(button.closest('.document-graph').querySelector('.document-graph__canvas')).k;
      button.click();
      return before;
    });
    const reversed = await checkZoomTransition(reversalScale, -1);
    assert(Math.abs(reversed - reversalScale / Math.SQRT2) < 1e-6);
    await article.focus(); await page.keyboard.press('Space'); await page.waitForTimeout(850);
    const articleBox = await article.locator('.main-circle').boundingBox();
    const startX = articleBox.x + articleBox.width / 2, startY = articleBox.y + articleBox.height / 2;
    const beforeHold = await graph.locator('.node').evaluateAll(nodes => nodes.map(n => n.getAttribute('transform')));
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.waitForTimeout(450);
    await page.mouse.move(startX + 3, startY + 2);
    await page.waitForTimeout(100);
    assert.deepEqual(await graph.locator('.node').evaluateAll(nodes => nodes.map(n => n.getAttribute('transform'))),
      beforeHold, 'holding and slight jitter do not restart the layout');
    await page.mouse.up();
    await page.waitForTimeout(850);
    assert.equal(new URL(page.url()).pathname, '/', 'single click on the selected article does not navigate');
    await article.locator('.main-circle').dblclick();
    await page.waitForURL(url => url.pathname !== '/');
    await page.goBack(); await page.waitForTimeout(500);
    assert.equal(await page.locator('.document-graph .node').count(), count);
    for (const title of ['Computational science', 'Model reduction']) {
      const section = graph.locator('.node').filter({has: page.locator('title', {hasText: title + ' —'})});
      const url = await section.evaluate(el => el.__data__.url);
      assert(url, 'section has its index URL');
      await section.focus(); await page.keyboard.press('Space'); await page.waitForTimeout(850);
      await section.locator('.main-circle').dblclick();
      await page.waitForURL(new URL(url, origin).href);
      await page.goBack(); await page.waitForTimeout(500);
    }
    assert.deepEqual(errors, []);
    const mobile = await browser.newPage({viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true, reducedMotion: 'reduce'});
    await mobile.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    mobile.on('pageerror', error => errors.push(error.message));
    await mobile.goto(origin);
    const mobileGraph = mobile.locator('.document-graph');
    await mobileGraph.scrollIntoViewIfNeeded();
    await checkControls(mobileGraph);
    await assertLabels(mobileGraph);
    const mobileOverviewScale = await mobileGraph.locator('.document-graph__canvas').evaluate(svg => window.d3.zoomTransform(svg).k);
    const mobileId = await mobile.locator('.document-graph .node[data-depth="0"]').first().getAttribute('data-id');
    const mobileTarget = mobile.locator(`.document-graph [data-id="${mobileId}"]`);
    await mobileTarget.locator('.main-circle').tap();
    const mobileDomainScale = await checkZoomTransition(mobileOverviewScale, 1, mobileGraph);
    assert.equal(await mobileGraph.getAttribute('data-center'), mobileId);
    await mobileGraph.getByRole('button', {name: '그래프 확대', exact: true}).tap();
    const mobileZoomedScale = await checkZoomTransition(mobileDomainScale, 1, mobileGraph);
    assert(Math.abs(mobileZoomedScale / mobileDomainScale - Math.SQRT2) < 1e-6);
    await mobileGraph.getByRole('button', {name: '그래프 축소', exact: true}).tap();
    assert(Math.abs(await checkZoomTransition(mobileZoomedScale, -1, mobileGraph) - mobileDomainScale) < 1e-6);
    await mobile.setViewportSize({width: 430, height: 900});
    await mobile.waitForTimeout(500);
    assert(await mobileTarget.evaluate(el => {
      const circle = el.querySelector('.main-circle').getBoundingClientRect();
      const svg = el.closest('svg').getBoundingClientRect();
      return Math.abs(circle.x + circle.width / 2 - svg.x - svg.width / 2) < 2;
    }));
    await mobile.evaluate(() => document.body.setAttribute('data-md-color-scheme', 'slate'));
    if (process.env.GRAPH_SCREENSHOTS) await mobile.locator('.document-graph').screenshot({path: `${process.env.GRAPH_SCREENSHOTS}/mobile-dark.png`});
    await mobile.locator('.document-graph__reset').tap();
    const mobileResetScale = await checkZoomTransition(mobileDomainScale, -1, mobileGraph);
    assert.equal(await mobile.locator('.document-graph').getAttribute('data-center'), null);
    assert.equal(await mobile.locator('.document-graph .muted').count(), 0);
    const mobileArticle = mobile.locator(`.document-graph [data-id="${articleId}"]`);
    await mobileArticle.focus(); await mobile.keyboard.press('Space');
    await checkZoomTransition(mobileResetScale, 1, mobileGraph);
    const touch = await mobile.context().newCDPSession(mobile);
    const mb = await mobileArticle.locator('.main-circle').boundingBox();
    const mx = mb.x + mb.width / 2, my = mb.y + mb.height / 2;
    const beforeTouch = await mobileArticle.getAttribute('transform');
    await touch.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [{x: mx, y: my}]});
    await mobile.waitForTimeout(400);
    await touch.send('Input.dispatchTouchEvent', {type: 'touchMove', touchPoints: [{x: mx + 3, y: my + 2}]});
    assert.equal(await mobileArticle.getAttribute('transform'), beforeTouch, 'touch jitter does not drag the node');
    await touch.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
    await mobile.waitForTimeout(450);
    assert.equal(new URL(mobile.url()).pathname, '/', 'single tap on the selected article does not navigate');
    await touch.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [{x: mx, y: my}]});
    await touch.send('Input.dispatchTouchEvent', {type: 'touchMove', touchPoints: [{x: mx + 65, y: my + 35}]});
    await mobile.waitForTimeout(100);
    assert.notEqual(await mobileArticle.getAttribute('transform'), beforeTouch, 'touch dragging still moves nodes');
    await touch.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
    assert.equal(new URL(mobile.url()).pathname, '/', 'touch drag does not open a document');
    await mobileArticle.focus(); await mobile.keyboard.press('Space'); await mobile.waitForTimeout(850);
    const centered = await mobileArticle.locator('.main-circle').boundingBox();
    await mobile.touchscreen.tap(centered.x + centered.width / 2, centered.y + centered.height / 2);
    await mobile.touchscreen.tap(centered.x + centered.width / 2, centered.y + centered.height / 2);
    await mobile.waitForURL(url => url.pathname !== '/');
    assert.deepEqual(errors, []);
    console.log('PASS: compact icon controls, animated zoom/focus/reset with either motion preference, subtree and ancestor selection, clusters, zoom/pan, mouse/touch drag, navigation, keyboard and mobile resize.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
