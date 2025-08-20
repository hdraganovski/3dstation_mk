import csv
import re
from pathlib import Path

IN = Path(r"d:/Code/3d_station/src/data/products_mk.csv")
OUT = Path(r"d:/Code/3d_station/src/data/products_mk.fixed.csv")

# regex to find filenames ending with common image extensions
IMG_RE = re.compile(r"([^"]+?\.(?:jpe?g|png|gif|webp|svg|bmp))", re.I)


def extract_filenames(s: str):
    if not s:
        return []
    s = s.strip()
    if s == "":
        return []
    # findall will capture filenames even when in brackets or quoted
    found = IMG_RE.findall(s)
    # strip whitespace from found filenames
    return [f.strip() for f in found]


with IN.open('r', encoding='utf-8', newline='') as f_in:
    reader = csv.reader(f_in)
    rows = list(reader)

# First row is header
header = rows[0]
fixed_rows = [header]

for row in rows[1:]:
    # protect against rows with different column count
    if len(row) < 7:
        # pad to 7 columns
        row = row + [''] * (7 - len(row))
    images_field = row[5]
    files = extract_filenames(images_field)
    if not files:
        new_images = '[]'
    else:
        # ensure single quotes and comma+space separation
        escaped = [f.replace("'", "\'") for f in files]
        new_images = "['" + "', '".join(escaped) + "']"
    row[5] = new_images
    fixed_rows.append(row)

with OUT.open('w', encoding='utf-8', newline='') as f_out:
    writer = csv.writer(f_out, quoting=csv.QUOTE_MINIMAL)
    writer.writerows(fixed_rows)

print(f"Wrote fixed CSV to: {OUT}")
