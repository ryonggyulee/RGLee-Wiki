import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RENDERER = ROOT / ".agents/skills/illustrate-wiki-summary/scripts/render.py"


class SummaryDiagramTests(unittest.TestCase):
    def test_cli_boundary(self):
        workspace = ROOT / "experiment"
        workspace.mkdir(exist_ok=True)
        with tempfile.TemporaryDirectory(dir=workspace) as directory:
            work = Path(directory)
            prompt = work / "prompt.txt"
            prompt.write_text("도입 도식", encoding="utf-8")
            cli = work / "skills/.system/imagegen/scripts/image_gen.py"
            cli.parent.mkdir(parents=True)
            cli.write_text(
                "import os, sys\nfrom pathlib import Path\n"
                "assert os.environ['OPENAI_BASE_URL'] == 'https://api.openai.com/v1'\n"
                "assert 'OPENAI_LOG' not in os.environ and 'HTTPS_PROXY' not in os.environ\n"
                "key = os.getenv('OPENAI_API_KEY')\n"
                "if '--dry-run' in sys.argv:\n"
                "    assert key is None\n"
                "else:\n"
                "    assert key == 'test-only-sentinel' and key not in str(sys.argv)\n"
                "    Path(sys.argv[sys.argv.index('--out') + 1]).with_suffix('.attempt').touch()\n"
                "    print(key, file=sys.stderr)\n"
                "    sys.exit(1)\n",
                encoding="utf-8",
            )
            env = dict(CODEX_HOME=directory, OPENAI_API_KEY="test-only-sentinel",
                       OPENAI_BASE_URL="https://unused.invalid", OPENAI_LOG="debug", HTTPS_PROXY="unused")
            command = [sys.executable, "-I", str(RENDERER), str(prompt)]
            preview = subprocess.run(command, env=env, capture_output=True)
            self.assertEqual(preview.returncode, 0, preview.stderr)
            self.assertEqual(list(work.glob("draft-*")), [])
            failure = subprocess.run(command + ["--generate"], env=env, capture_output=True)
            self.assertNotEqual(failure.returncode, 0)
            self.assertEqual(len(list(work.glob("draft-*/summary.attempt"))), 1)
            for result in (preview, failure):
                self.assertNotIn(b"test-only-sentinel", result.stdout + result.stderr)
