"""Encode ordered PNG frames on a white background for an inline wiki figure."""

import argparse
from pathlib import Path
from tempfile import NamedTemporaryFile

from PIL import Image


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    parser.add_argument("frames", type=Path, nargs="+", help="PNG files in playback order")
    parser.add_argument("--delay-ms", type=int, default=900, help="Time per frame (default 900 ms)")
    args = parser.parse_args()
    if args.output.suffix.lower() != ".gif" or len(args.frames) < 2:
        parser.error("Specify a .gif output and at least two PNG frames.")
    if not 10 <= args.delay_ms <= 655350 or args.delay_ms % 10:
        parser.error("GIF delay must be 10 to 655350 ms in steps of 10 ms.")

    frames = []
    for path in args.frames:
        with Image.open(path) as source:
            if source.format != "PNG" or (frames and source.size != frames[0].size):
                parser.error(f"Expected a PNG matching the other frames in size: {path}")
            rgba = source.convert("RGBA")
            frame = Image.new("RGB", rgba.size, "white")
            frame.paste(rgba, mask=rgba.getchannel("A"))
            frames.append(frame)

    with NamedTemporaryFile(dir=args.output.parent, delete=False) as output:
        temp = Path(output.name)
    try:
        frames[0].save(temp, format="GIF", save_all=True, append_images=frames[1:],
                       duration=args.delay_ms, loop=0, disposal=2)
        temp.replace(args.output)
    finally:
        if temp.exists():
            temp.unlink()


if __name__ == "__main__":
    main()
