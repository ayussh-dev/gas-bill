#!/usr/bin/env python3
import json
import re
from pathlib import Path
import sys

FRAME_DIR = Path('frames')
OUT_FILE = FRAME_DIR / 'frames.json'
EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg'}

def natural_key(s):
    parts = re.split(r'(\d+)', s)
    return [int(p) if p.isdigit() else p.lower() for p in parts]

def main():
    if not FRAME_DIR.exists():
        print(f'No {FRAME_DIR} directory found. Create it and add your frames, then re-run this script.')
        return 1
    files = [p.name for p in FRAME_DIR.iterdir() if p.is_file() and p.suffix.lower() in EXTS]
    if not files:
        print(f'No image files found in {FRAME_DIR}. Supported extensions: {sorted(list(EXTS))}')
        return 1
    files_sorted = sorted(files, key=natural_key)
    out = [str(FRAME_DIR / name).replace('\\','/') for name in files_sorted]
    OUT_FILE.write_text(json.dumps(out, indent=2))
    print(f'Wrote {OUT_FILE} with {len(out)} entries.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
