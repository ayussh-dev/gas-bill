#!/usr/bin/env python3
"""
Detects frames with a horizontal cut near the bottom (watermark/crop) and attempts
to repair the missing lower portion by reflecting a nearby strip and blending it.

Output images are written to `frames_fixed/` to preserve originals.
"""
from PIL import Image, ImageOps
from pathlib import Path
import statistics

FRAME_DIR = Path('frames')
OUT_DIR = Path('frames_fixed')
OUT_DIR.mkdir(exist_ok=True)

def row_brightness(img, y):
    w = img.width
    pix = img.crop((0,y,img.width,y+1)).convert('L')
    vals = list(pix.getdata())
    return sum(vals)/len(vals)

def detect_cut_row(img):
    h = img.height
    # compute brightness per row for bottom 40% area
    start = max(0, int(h*0.6))
    rows = [row_brightness(img, y) for y in range(start, h)]
    # diffs
    diffs = [abs(rows[i] - rows[i-1]) for i in range(1, len(rows))]
    if not diffs:
        return None
    med = statistics.median(diffs)
    # look for first large diff from bottom
    for i in range(len(diffs)-1, -1, -1):
        if diffs[i] > max(8, med*2.5):
            # return absolute row index of cut (start + i)
            return start + i
    return None

def repair_image(img, cut_row):
    w,h = img.width, img.height
    missing = h - cut_row
    if missing <= 4:
        return img
    # choose source strip height: min(missing,  int(h*0.25))
    src_h = min(max(8, missing), int(h*0.25))
    src_top = max(0, cut_row - src_h)
    src = img.crop((0, src_top, w, src_top+src_h))
    # reflect vertically
    refl = ImageOps.flip(src)
    # if refl shorter than missing, tile it
    canvas = img.copy()
    paste_y = h - refl.height
    canvas.paste(refl, (0, paste_y))
    # blend seam using simple vertical linear gradient mask
    blend_h = min(40, src_h)
    if blend_h > 0:
        mask = Image.new('L', (w, blend_h))
        for y in range(blend_h):
            # fade from 0..255
            v = int(255 * (y / (blend_h-1 if blend_h>1 else 1)))
            for x in range(w):
                mask.putpixel((x,y), v)
        top_region = canvas.crop((0, paste_y - blend_h, w, paste_y))
        bottom_region = canvas.crop((0, paste_y, w, paste_y + blend_h))
        blended = Image.composite(bottom_region, top_region, mask)
        canvas.paste(blended, (0, paste_y - blend_h))
    return canvas

def process_all():
    files = sorted([p for p in FRAME_DIR.iterdir() if p.suffix.lower() in ('.jpg','.jpeg','.png')])
    if not files:
        print('No image files found in', FRAME_DIR)
        return
    repaired = 0
    for p in files:
        img = Image.open(p).convert('RGB')
        cut = detect_cut_row(img)
        if cut and (img.height - cut) > 6:
            out = repair_image(img, cut)
            out.save(OUT_DIR / p.name, quality=95)
            repaired += 1
            print(f'Repaired {p.name}, cut at row {cut}, saved to frames_fixed/')
        else:
            # copy original
            img.save(OUT_DIR / p.name, quality=95)
    print(f'Done. Repaired {repaired}/{len(files)} images. Output in {OUT_DIR}')

if __name__ == '__main__':
    process_all()
