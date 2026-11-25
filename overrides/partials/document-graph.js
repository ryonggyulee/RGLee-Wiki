/*
MIT License

Copyright (c) 2025 develmusa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/* Adapted from develmusa/mkdocs-network-graph-plugin, static/graph.js
 * commit 79bcdf5db686086e316ffab77c73030f75565426, Copyright (c) 2025 develmusa.
 * MIT license: vendor/mkdocs-network-graph-plugin.LICENSE (also embedded below).
 * Retains the D3 force/link/node/tick/drag renderer; replaces modal/sidebar UI
 * with an inline graph and animated focus. See README.md for modifications.
 */
(() => {
  const root = document.currentScript.previousElementSibling.previousElementSibling.previousElementSibling;
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const graph = JSON.parse(root.querySelector('.document-graph__data').textContent);
  const d3 = window.d3;
  const svg = d3.select(root.querySelector('.document-graph__canvas'));
  const g = svg.append('g');
  const width = () => svg.node().clientWidth;
  const height = () => svg.node().clientHeight;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nodesData = graph.nodes.map(n => ({...n}));
  const nodesById = new Map(nodesData.map(n => [n.id, n]));
  const parents = new Map(graph.edges.filter(e => e.kind === 'tree').map(e => [e.target, e.source]));
  // Seed navigation branches in separate regions; retain that grouping while
  // document links pull related pages toward one another.
  const branches = [...new Set(nodesData.map(n => n.branch))];
  const branchRadius = branches.length > 1 ? Math.sqrt(nodesData.length) * 28 : 0;
  for (const [index, branch] of branches.entries()) {
    const angle = 2 * Math.PI * index / branches.length - Math.PI / 2;
    const members = nodesData.filter(n => n.branch === branch);
    members.forEach((n, i) => {
      n.clusterX = Math.cos(angle) * branchRadius;
      n.clusterY = Math.sin(angle) * branchRadius;
      const offset = Math.sqrt(i) * 25;
      n.x = n.clusterX + Math.cos(i * 2.399963) * offset;
      n.y = n.clusterY + Math.sin(i * 2.399963) * offset;
    });
  }
  // Reserve a separate anchor for each topic and keep its articles nearby.
  for (const branch of branches) {
    const topics = nodesData.filter(n => n.branch === branch && n.depth === 1);
    topics.forEach((topic, i) => {
      const angle = 2 * Math.PI * i / topics.length;
      const spread = Math.max(140, topics.length * 38);
      const x = topic.clusterX + Math.cos(angle) * spread;
      const y = topic.clusterY + Math.sin(angle) * spread;
      const members = nodesData.filter(n => n === topic || parents.get(n.id) === topic.id);
      members.forEach((n, j) => {
        n.clusterX = x;
        n.clusterY = y;
        n.x = x + Math.cos(j * 2.399963) * Math.sqrt(j) * 38;
        n.y = y + Math.sin(j * 2.399963) * Math.sqrt(j) * 38;
      });
    });
  }
  // Theme palettes are shared by the map and its navigable legend.
  const branchColor = d3.scaleOrdinal().domain(branches)
    .range(['var(--graph-blue)', 'var(--graph-amber)', 'var(--graph-violet)', 'var(--graph-jade)']);
  const domains = nodesData.filter(n => n.depth === 0);
  const legend = d3.select(root.querySelector('.document-graph__legend')).selectAll('button')
    .data(domains).join('button').attr('type', 'button')
    .style('--graph-branch-color', d => branchColor(d.branch))
    .attr('aria-label', d => d.label + ' 중심으로 보기')
    .text(d => d.label).on('click', (event, d) => focusNode(d));
  const summary = root.querySelector('.document-graph__summary');
  const openLink = root.querySelector('.document-graph__open');
  const articleCount = nodesData.filter(n => !n.id.startsWith('section:')).length;
  const topicCount = nodesData.filter(n => n.depth === 1 && n.id.startsWith('section:')).length;
  function showContext(d) {
    summary.textContent = d ? (nodesById.get(parents.get(d.id))?.label || '분류') :
      `문서 ${articleCount}개 · 주제 그룹 ${topicCount}개`;
    openLink.hidden = !d?.url;
    if (d?.url) {
      openLink.href = d.url;
      openLink.textContent = d.label;
      openLink.setAttribute('aria-label', d.label + ' 열기');
    } else {
      openLink.removeAttribute('href');
      if (d) summary.textContent = d.label;
    }
    legend.classed('is-active', n => n.branch === d?.branch)
      .attr('aria-pressed', n => String(n.branch === d?.branch));
  }
  showContext(null);
  const processedLinksMap = new Map();
  for (const link of graph.edges) {
    const key = JSON.stringify([link.source, link.target].sort());
    if (!processedLinksMap.has(key)) processedLinksMap.set(key, {...link});
  }
  const processedLinks = Array.from(processedLinksMap.values());
  let currentNode = null;
  let activeNodes = new Set();
  let hoveredNode = null;
  let scale = 1;
  const dragThreshold = 8; // Screen pixels: tolerate mouse/finger jitter.
  let lastTap = null;
  const radius = d => (d.depth === 0 ? 14 : d.depth === 1 ? 9 : 4.5) * (d === currentNode ? 1.5 : 1);
  const zoom = d3.zoom().scaleExtent([.15, 4]).clickDistance(5)
    .on('start', event => { if (event.sourceEvent) svg.interrupt(); })
    .on('zoom', event => {
      scale = event.transform.k;
      g.attr('transform', event.transform);
      // Labels and hit targets retain their screen size even when zoomed out.
      node.select('.glyph').attr('transform', `scale(${1 / scale})`);
      placeLabels();
    });
  svg.call(zoom).on('dblclick.zoom', null);
  root.querySelectorAll('[data-zoom]').forEach(button => {
    button.addEventListener('click', () => {
      const factor = button.dataset.zoom === 'in' ? 1.4 : 1 / 1.4;
      svg.interrupt().transition().duration(reducedMotion ? 0 : 180).call(zoom.scaleBy, factor);
    });
  });
  const regions = g.append('g').attr('class', 'graph-regions').attr('aria-hidden', 'true')
    .selectAll('path').data(domains.map(d => ({
      branch: d.branch, members: nodesData.filter(n => n.branch === d.branch)
    }))).join('path').style('--graph-branch-color', d => branchColor(d.branch));
  const outline = d3.line().curve(d3.curveBasisClosed);
  const padding = d3.range(8).map(i => [48 * Math.cos(i * Math.PI / 4), 48 * Math.sin(i * Math.PI / 4)]);

  const link = g.append('g').attr('class', 'links').selectAll('line')
    .data(processedLinks).enter().append('line').attr('class', e => 'link link--' + e.kind);
  const node = g.append('g').attr('class', 'nodes').selectAll('g')
    .data(nodesData).enter().append('g')
    .attr('class', 'node').attr('data-id', d => d.id).attr('data-depth', d => d.depth)
    .attr('data-branch', d => d.branch)
    .style('--graph-branch-color', d => branchColor(d.branch))
    .attr('tabindex', 0).attr('role', 'button').attr('aria-label', d => d.label)
    .attr('aria-pressed', 'false')
    .on('mouseenter', function(event, d) { hoveredNode = d; d3.select(this).raise(); placeLabels(); })
    .on('mouseleave', () => { hoveredNode = null; placeLabels(); })
    .on('focus', function(event, d) { hoveredNode = d; d3.select(this).raise(); placeLabels(); })
    .on('blur', () => { hoveredNode = null; placeLabels(); })
    .on('click', (event, d) => {
      if (event.defaultPrevented) return;
      activateNode(event, d);
    })
    .on('dblclick', (event, d) => {
      event.preventDefault();
      event.stopPropagation();
      if (d.url) window.location.assign(d.url);
    })
    .on('keydown', (event, d) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (event.key === 'Enter' && currentNode === d && d.url) window.location.assign(d.url);
        else focusNode(d);
      }
    })
    .call(d3.drag().clickDistance(dragThreshold)
      .on('start', dragstarted).on('drag', dragged).on('end', dragended));
  node.sort((a, b) => b.depth - a.depth);
  const glyph = node.append('g').attr('class', 'glyph');
  glyph.append('circle').attr('class', 'hit-area').attr('r', 22);
  glyph.filter(d => d.depth === 0).append('circle').attr('class', 'domain-ring').attr('r', 17);
  glyph.append('circle').attr('class', 'main-circle').attr('r', radius);
  glyph.append('title').text(d => d.url ? `${d.label} — 더블클릭 또는 더블탭하여 문서 열기` : d.label);
  const label = glyph.append('text').attr('x', 0);
  label.each(function(d) {
    const words = d.label.split(/\s+/);
    const lines = [''];
    for (const word of words) {
      const last = lines.length - 1;
      if (lines[last] && (lines[last] + ' ' + word).length > 23) lines.push(word);
      else lines[last] += (lines[last] ? ' ' : '') + word;
    }
    d.labelLines = lines.length;
    const text = d3.select(this);
    lines.forEach((line, i) => text.append('tspan').attr('x', 0).attr('dy', i ? '1.15em' : 0).text(line));
    d.labelBox = this.getBBox();
  });
  function placeLabels() {
    // At overview scale not every title can fit. Keep every node visible and
    // choose non-overlapping labels, revealing more as the user zooms/pans.
    // Resolve geometry independently of label priority so hover never moves labels.
    const transform = d3.zoomTransform(svg.node());
    // Shrink invisible tap padding in the overview so it cannot cover a neighbor.
    node.select('.hit-area').attr('r', d => Math.max(radius(d), Math.min(22,
      ...nodesData.filter(n => n !== d).map(n => Math.hypot(n.x - d.x, n.y - d.y) * scale / 2))));
    const priority = d => d === hoveredNode ? -3 : d === currentNode ? -2 : d.depth < 2 ? d.depth : activeNodes.has(d) ? 2 : 3;
    const ordered = [...nodesData].sort((a, b) => priority(a) - priority(b) || a.depth - b.depth);
    const nodeBoxes = nodesData.map(d => {
      const [x, y] = transform.apply([d.x, d.y]);
      return {x: x - radius(d) - 3, y: y - radius(d) - 3, w: 2 * radius(d) + 6, h: 2 * radius(d) + 6};
    });
    const occupied = [];
    const intersects = (a, b) => a.x < b.x + b.w + 3 && a.x + a.w + 3 > b.x && a.y < b.y + b.h + 3 && a.y + a.h + 3 > b.y;
    const elements = new Map();
    label.each(function(d) { elements.set(d.id, this); });
    for (const d of ordered) {
      const el = elements.get(d.id), box = d.labelBox;
      const [x, y] = transform.apply([d.x, d.y]);
      const gap = radius(d) + 9;
      const candidates = [[gap, -box.height / 2], [-gap - box.width, -box.height / 2],
        [-box.width / 2, gap], [-box.width / 2, -gap - box.height],
        [gap, gap], [-gap - box.width, gap], [gap, -gap - box.height], [-gap - box.width, -gap - box.height]];
      let placement = null;
      for (const [dx, dy] of candidates) {
        const rect = {x: x + dx, y: y + dy, w: box.width, h: box.height};
        if (rect.x < 4 || rect.y < 4 || rect.x + rect.w > width() - 4 || rect.y + rect.h > height() - 4) continue;
        if (!nodeBoxes.some(other => intersects(rect, other))) { placement = {dx, dy, rect}; break; }
      }
      if (!placement && x >= 0 && x <= width() && y >= 0 && y <= height() &&
          (d === currentNode || d === hoveredNode || d.depth === 0)) {
        const left = Math.max(4, Math.min(x + gap, width() - box.width - 4));
        const top = Math.max(4, Math.min(y - box.height / 2, height() - box.height - 4));
        placement = {dx: left - x, dy: top - y, rect: {x: left, y: top, w: box.width, h: box.height}};
      }
      // A higher-priority label hides an intersecting label at its normal
      // anchor; it never sends that label searching for another position.
      if (placement) {
        el.setAttribute('transform', `translate(${placement.dx - box.x},${placement.dy - box.y})`);
        if (occupied.some(other => intersects(placement.rect, other))) placement = null;
      }
      el.style.visibility = placement ? 'visible' : 'hidden';
      if (placement) occupied.push(placement.rect);
    }
  }
  // Upstream's force simulation, with more space for readable labels.
  const simulation = d3.forceSimulation(nodesData)
    .force('link', d3.forceLink(processedLinks).id(d => d.id).distance(e => e.source.depth === 0 ? 220 : 100)
      .strength(e => e.kind === 'tree' ? .5 : .04))
    .force('charge', d3.forceManyBody().strength(-380))
    .force('center', d3.forceCenter(0, 0))
    .force('x', d3.forceX(d => d.clusterX).strength(.14))
    .force('y', d3.forceY(d => d.clusterY).strength(.14))
    .force('collide', d3.forceCollide(d => d.depth < 2 ? Math.max(65, d.labelBox.width / 2 + 15) : 35))
    .stop();
  for (let i = 0; i < 240; i++) simulation.tick();
  const initialLayout = nodesData.map(({x, y, vx, vy}) => ({x, y, vx, vy}));
  const initialAlpha = simulation.alpha();
  function tick() {
    regions.attr('d', region => outline(d3.polygonHull(region.members.flatMap(n =>
      padding.map(([dx, dy]) => [n.x + dx, n.y + dy])))));

    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    node.attr('transform', d => `translate(${d.x},${d.y})`);
    placeLabels();
  }
  simulation.on('tick', tick);
  tick();
  // Use stable overview bounds: zoom-scaled labels must not change the fit.
  const initialBounds = g.node().getBBox();
  function focusNode(d) {
    currentNode = d;
    showContext(d);
    regions.classed('outside', region => region.branch !== d.branch);
    node.filter(n => n === d).raise();
    root.dataset.center = d.id;
    node.classed('current', n => n === d).attr('aria-pressed', n => String(n === d));
    node.select('.main-circle').interrupt().transition().duration(reducedMotion ? 0 : 300).attr('r', radius);
    activeNodes = new Set([d]);
    processedLinks.forEach(e => {
      if (e.source === d) activeNodes.add(e.target);
      if (e.target === d) activeNodes.add(e.source);
    });
    const ancestorChildren = new Set();
    let child = d.id;
    while (parents.has(child) && !ancestorChildren.has(child)) {
      ancestorChildren.add(child);
      child = parents.get(child);
      activeNodes.add(nodesById.get(child));
    }
    const isActiveLink = e => e.source === d || e.target === d ||
      (e.kind === 'tree' && ancestorChildren.has(e.target.id));
    node.classed('muted', n => !activeNodes.has(n));
    link.classed('connected', isActiveLink).classed('muted', e => !isActiveLink(e));
    placeLabels();
    // Move the camera through the existing graph: no redraw, random layout or
    // disappearing neighbors. Interrupting a flight starts at its current frame.
    simulation.stop();
    // Frame nearby nodes around the selection. A distant cross-link should not
    // force the camera all the way back out to the overview.
    const neighbors = [...activeNodes].filter(n => n !== d);
    const dx = d3.quantile(neighbors, .75, n => Math.abs(n.x - d.x)) || 1;
    const dy = d3.quantile(neighbors, .75, n => Math.abs(n.y - d.y)) || 1;
    const focusScale = Math.max(overviewScale(), Math.min(1, (width() / 2 - 40) / dx, (height() / 2 - 40) / dy));
    const target = d3.zoomIdentity.translate(width() / 2, height() / 2).scale(focusScale)
      .translate(-d.x, -d.y);
    svg.interrupt().transition().duration(reducedMotion ? 0 : 750)
      .ease(d3.easeCubicInOut).call(zoom.transform, target);
  }
  root.querySelector('.document-graph__reset').addEventListener('click', () => {
    svg.interrupt();
    simulation.stop().alpha(initialAlpha).alphaTarget(0);
    nodesData.forEach((d, i) => {
      Object.assign(d, initialLayout[i], {fx: null, fy: null});
      delete d.gesture;
    });
    currentNode = null;
    showContext(null);
    regions.classed('outside', false);
    activeNodes.clear();
    lastTap = null;
    hoveredNode = null;
    delete root.dataset.center;
    node.classed('current', false).classed('muted', false).attr('aria-pressed', 'false');
    node.select('.main-circle').interrupt().attr('r', radius);
    node.sort((a, b) => b.depth - a.depth);
    link.classed('connected', false).classed('muted', false);
    tick();
    fit();
  });
  function dragstarted(event, d) {
    svg.interrupt();
    simulation.stop();
    d.gesture = {x: event.x, y: event.y, moved: false};
  }
  function dragged(event, d) {
    if (!d.gesture.moved) {
      if (Math.hypot(event.x - d.gesture.x, event.y - d.gesture.y) * scale <= dragThreshold) return;
      d.gesture.moved = true;
      lastTap = null;
      simulation.alphaTarget(.2).restart();
    }
    d.fx = event.x; d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    const moved = d.gesture.moved;
    delete d.gesture;
    d.fx = null; d.fy = null;
    // Touch movement can cancel the browser's synthetic click even within the
    // tap tolerance. Resolve touch taps here and prevent a duplicate click.
    if (event.sourceEvent.type === 'touchend') {
      event.sourceEvent.preventDefault();
      if (!moved) {
        const now = performance.now();
        if (lastTap && lastTap.node === d && now - lastTap.time < 350) {
          lastTap = null;
          if (d.url) window.location.assign(d.url);
        } else {
          lastTap = {node: d, time: now};
          focusNode(d);
        }
      }
    }
  }
  function activateNode(event, d) {
    if ((event.ctrlKey || event.metaKey) && d.url) window.open(d.url, '_blank', 'noopener');
    else focusNode(d);
  }
  function overviewScale() {
    return Math.max(.15, Math.min(1, (width() - 64) / initialBounds.width, (height() - 64) / initialBounds.height));
  }
  function fit() {
    if (currentNode) {
      const t = d3.zoomTransform(svg.node());
      svg.interrupt().call(zoom.transform, d3.zoomIdentity.translate(width() / 2, height() / 2)
        .scale(t.k).translate(-currentNode.x, -currentNode.y));
      return;
    }
    const bounds = initialBounds;
    const k = overviewScale();
    svg.call(zoom.transform, d3.zoomIdentity.translate(width() / 2, height() / 2).scale(k)
      .translate(-(bounds.x + bounds.width / 2), -(bounds.y + bounds.height / 2)));
  }
  fit();
  const observer = new ResizeObserver(fit);
  observer.observe(svg.node());
  // Home uses Material's normal navigation; disconnect if replaced dynamically.
  const removal = new MutationObserver(() => {
    if (!root.isConnected) { simulation.stop(); observer.disconnect(); removal.disconnect(); }
  });
  removal.observe(document.body, {childList: true, subtree: true});
})();
