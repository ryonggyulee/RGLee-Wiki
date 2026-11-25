"""Render one wiki diagram with Codex's imagegen CLI from an authoring environment."""

import argparse
import os
import subprocess
import sys
import tempfile
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("prompt", type=Path, help="experiment/ 아래의 UTF-8 도안 파일")
    parser.add_argument("--generate", action="store_true", help="OpenAI Images API로 한 장 생성")
    args = parser.parse_args()
    experiment = Path(__file__).resolve().parents[4] / "experiment"
    prompt = args.prompt.resolve()
    if experiment not in prompt.parents or not prompt.is_file():
        parser.error("experiment/ 아래의 도안 파일을 지정하세요.")
    if not prompt.read_text(encoding="utf-8").strip():
        parser.error("도안 파일이 비어 있습니다.")

    codex_home = Path(os.environ.get("CODEX_HOME") or Path.home() / ".codex")
    cli = codex_home / "skills/.system/imagegen/scripts/image_gen.py"
    if not cli.is_file():
        parser.error("Codex의 imagegen 스킬을 설치하고 CODEX_HOME 경로를 확인하세요.")

    # The SDK receives credentials only for live calls. Ignore inherited proxies,
    # alternate API hosts, debug settings and TLS key log paths.
    env = {"OPENAI_BASE_URL": "https://api.openai.com/v1"}
    output_dir = prompt.parent
    if args.generate:
        key = os.environ.get("OPENAI_API_KEY")
        if not key:
            parser.error("로컬 터미널 또는 비밀 관리자에서 OPENAI_API_KEY를 설정하세요.")
        env["OPENAI_API_KEY"] = key
        output_dir = Path(tempfile.mkdtemp(prefix="draft-", dir=prompt.parent))
    output = output_dir / "summary.png"
    command = [
        sys.executable, "-I", str(cli), "generate", "--model", "gpt-image-2",
        "--prompt-file", str(prompt), "--no-augment", "--size", "1536x1024",
        "--quality", "medium", "--n", "1", "--output-format", "png", "--out", str(output),
    ]
    if not args.generate:
        command.append("--dry-run")
    # Upstream tracebacks may contain server-provided credential fragments.
    result = subprocess.run(command, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode:
        parser.exit(1, "요청을 완료하지 못했습니다. 도안과 SDK 설치, 모델 접근 권한, 연결 상태를 확인하세요.\n")
    if args.generate:
        if not output.is_file() or not output.stat().st_size:
            parser.exit(1, "이미지 파일을 받지 못했습니다.\n")
        print(output)
    else:
        print("요청 구성 확인 완료 · gpt-image-2 · 1536×1024 PNG · API 호출 0회")


if __name__ == "__main__":
    main()
