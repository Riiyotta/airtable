#!/usr/bin/env python3
"""Recompute the raw design-value histograms that back tokens/00-foundation.

Reads the sibling clone source (../src relative to design-repo/) -- build-time
evidence only. When the source tree is absent (e.g. the design-repo was copied
somewhere on its own) this prints a warning and exits 0 without touching
extraction/histograms.json, which is the committed snapshot.

Usage: python3 extraction/compute_histograms.py [--write | --json]
"""
import collections, json, os, re, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT = os.path.dirname(REPO)
SRC = os.path.join(PROJECT, "src")

HEX = re.compile(r"#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b")
RGBA = re.compile(r"rgba?\(\s*[0-9.]+\s*,\s*[0-9.]+\s*,\s*[0-9.]+\s*(?:,\s*[0-9.]+\s*)?\)")
FS_CSS = re.compile(r"font-size:\s*([0-9.]+)px")
FS_TW = re.compile(r"text-\[([0-9.]+)px\]")
FW_CSS = re.compile(r"font-weight:\s*(var\(--w[rs]\)|[0-9]{3})")
RAD_CSS = re.compile(r"border-radius:\s*([0-9.]+(?:px|%))\s*;")
RAD_TW = re.compile(r"rounded-\[([0-9.]+px)\]")
DUR = re.compile(r"(?<![0-9.])([0-9]*\.?[0-9]+m?s)\b(?=[^;{}]*(?:ease|linear|cubic-bezier|;|\)|,))")


def norm_hex(h):
    h = h.lower()
    if len(h) == 4:
        h = "#" + "".join(c * 2 for c in h[1:])
    return h


def main():
    if not os.path.isdir(SRC):
        print(f"WARN: sibling source tree not found next to design-repo ({os.path.relpath(SRC, REPO)}); "
              "keeping committed extraction/histograms.json snapshot.")
        return 0
    color, fsize, fweight, radius, dur = (collections.Counter() for _ in range(5))
    files = 0
    for dp, _, fns in os.walk(SRC):
        for fn in sorted(fns):
            if not fn.endswith((".css", ".jsx", ".js")):
                continue
            files += 1
            txt = open(os.path.join(dp, fn), encoding="utf-8").read()
            # drop svg path data so path coordinates are not read as colours/sizes
            txt = re.sub(r'\bd="[^"]*"', "", txt)
            for m in HEX.findall(txt):
                color[norm_hex(m)] += 1
            for m in RGBA.findall(txt):
                color[re.sub(r"\s+", "", m.lower())] += 1
            for m in FS_CSS.findall(txt) + FS_TW.findall(txt):
                fsize[m + "px"] += 1
            for m in FW_CSS.findall(txt):
                fweight[m] += 1
            for m in RAD_CSS.findall(txt) + RAD_TW.findall(txt):
                radius[m] += 1
            if fn.endswith(".css"):
                for m in re.findall(r"(?:transition|animation)[^;{}]*;", txt):
                    for d in re.findall(r"(?<![0-9.a-z-])([0-9]*\.?[0-9]+m?s)\b", m):
                        dur[d] += 1
    out = {
        "generatedBy": "extraction/compute_histograms.py",
        "scope": "src/**/*.{css,jsx,js} (svg path data stripped)",
        "filesScanned": files,
        "color": dict(color.most_common()),
        "fontSize": dict(fsize.most_common()),
        "fontWeight": dict(fweight.most_common()),
        "borderRadius": dict(radius.most_common()),
        "cssDuration": dict(dur.most_common()),
    }
    if "--write" in sys.argv:
        with open(os.path.join(REPO, "extraction", "histograms.json"), "w") as f:
            json.dump(out, f, indent=2)
            f.write("\n")
        print("wrote extraction/histograms.json")
    elif "--json" in sys.argv:
        print(json.dumps(out))
    else:
        print(json.dumps({k: (list(v.items())[:25] if isinstance(v, dict) else v) for k, v in out.items()}, indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main())
