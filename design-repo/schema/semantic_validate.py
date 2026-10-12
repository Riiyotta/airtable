#!/usr/bin/env python3
"""Semantic validator for PageSpecs -- everything JSON Schema cannot express.

Usage:
    python3 schema/semantic_validate.py <pagespec.json> [more.json ...] [--quiet]

Exit code 0 = no errors (warnings allowed), 1 = at least one error, 2 = usage problem.

Order of checks for each PageSpec:
  1. Draft-07 validation against schema/pagespec.schema.json (structure, closed enums, content contracts).
     If this fails, the schema errors are reported and the semantic layer is skipped.
  2. Every rule in RULES below. Rule ids + severities MUST equal compatibility/graph.json
     (extraction/verify_all.py fails if they diverge).

All paths are derived from this file's location -- no absolute paths.
"""
import hashlib
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

RULES = {
    "TEMPLATE_NODE_SEQUENCE": "error",
    "ROUTE_TEMPLATE_BINDING": "error",
    "HOME_ROUTE_ONLY": "error",
    "SHELL_HEADER_FIRST": "error",
    "SHELL_FOOTER_LAST": "error",
    "BREADCRUMB_FOLLOWS_HEADER": "error",
    "ONE_HERO_PER_PAGE": "error",
    "MAX_PER_PAGE": "error",
    "HOME_ONLY_SECTIONS": "error",
    "HOME_ASSET_ROLES_ONLY_ON_HOME": "error",
    "NO_OUTBOUND_LINKS": "error",
    "VERBATIM_REAL_COPY": "error",
    "COPY_BUDGET_MAX_WORDS": "error",
    "MOTION_PATTERN_ALLOWED": "error",
    "REDUCED_MOTION_FALLBACK_REQUIRED": "error",
    "MOTION_FALLBACK_GAP": "warn",
    "NO_ADJACENT_SAME_SECTION": "warn",
    "SIDE_BY_SIDE_ALTERNATES": "warn",
    "LOGOS_DIRECTLY_AFTER_HERO": "warn",
    "CTA_NEAR_END": "warn",
    "MOTION_BUDGET": "warn",
    "BRAND_NAME_IN_COPY": "warn",
}

HREF_RE = re.compile(r"^(#[A-Za-z0-9_-]*|/(?!/)[A-Za-z0-9_/-]*)$")
EXTERNAL_RE = re.compile(r"(^//|\b(https?://|mailto:|tel:|javascript:)|\bwww\.[a-z0-9-]+\.[a-z])", re.I)
BREADCRUMBS = {"bk.breadcrumb", "season.breadcrumb"}


def _load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as f:
        return json.load(f)


class Contracts:
    def __init__(self):
        self.schema = _load("schema/pagespec.schema.json")
        self.templates = _load("templates/templates.json")["templates"]
        self.routes = _load("templates/routes.json")["routes"]
        self.graph = _load("compatibility/graph.json")
        self.rules = {r["id"]: r for r in self.graph["rules"]}
        self.assets = _load("assets/asset-roles.json")["roles"]
        self.denylist = {e["sha256"] for e in _load("compatibility/real-copy-denylist.json")["entries"]}
        self.sections = {}
        sdir = os.path.join(REPO, "sections")
        for fn in sorted(os.listdir(sdir)):
            if fn.endswith(".json"):
                d = _load(f"sections/{fn}")
                self.sections[d["id"]] = d
        self.categories = self.graph["categories"]


_C = None


def contracts():
    global _C
    if _C is None:
        _C = Contracts()
    return _C


# ------------------------------------------------------------------ helpers
def tok(section, variant):
    return f"<{section}|{variant or ''}>"


def node_pattern(n):
    sec = re.escape(n["section"])
    var = "(?:" + "|".join(re.escape(v) for v in n["variants"]) + ")" if n.get("variants") else ""
    return f"<{sec}\\|{var}>"


def quant(n):
    lo = n.get("minCount", 1 if n["required"] else 0)
    if n["repeatable"]:
        hi = n.get("maxCount", "")
        return f"{{{lo},{hi}}}"
    return "" if n["required"] else "?"


def template_regex(tpl):
    parts, bodies, i, nodes = [], [], 0, tpl["nodes"]
    while i < len(nodes):
        n = nodes[i]
        if n.get("zone") == "body":
            run = []
            while i < len(nodes) and nodes[i].get("zone") == "body":
                run.append(nodes[i])
                i += 1
            name = f"body{len(bodies)}"
            bodies.append((name, run))
            alt = "|".join(node_pattern(x) for x in run)
            parts.append(f"(?P<{name}>(?:{alt})*)")
        else:
            parts.append(f"(?:{node_pattern(n)}){quant(n)}")
            i += 1
    return re.compile("^" + "".join(parts) + "$"), bodies


def values_at(obj, path):
    cur = [obj]
    for p in path.split("."):
        arr = p.endswith("[]")
        k = p[:-2] if arr else p
        nxt = []
        for c in cur:
            if isinstance(c, dict) and k in c:
                v = c[k]
                if arr:
                    if isinstance(v, list):
                        nxt.extend(v)
                else:
                    nxt.append(v)
        cur = nxt
    out = []
    for v in cur:
        if isinstance(v, str):
            out.append(v)
    return out


def words(s):
    return len(re.findall(r"\S+", s))


def norm(s):
    s = s.lower().replace("—", " ").replace("–", " ")
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def walk(obj, fn, key=None):
    if isinstance(obj, dict):
        for k, v in obj.items():
            walk(v, fn, k)
    elif isinstance(obj, list):
        for v in obj:
            walk(v, fn, key)
    else:
        fn(key, obj)


def copy_strings(node, C):
    sec = C.sections[node["section"]]
    out = []
    for p in sec["content"]["copyBudgets"]:
        out.extend((p, v) for v in values_at(node["content"], p))
    return out


# ------------------------------------------------------------------ validate
def validate(spec, C=None):
    """Return (errors, warnings): lists of (ruleId, message)."""
    C = C or contracts()
    errors, warnings = [], []

    def add(rule, msg):
        (errors if RULES[rule] == "error" else warnings).append((rule, msg))

    try:
        from jsonschema import Draft7Validator
    except ImportError:  # pragma: no cover
        return [("SCHEMA", "python package 'jsonschema' is required")], []
    schema_errs = sorted(Draft7Validator(C.schema).iter_errors(spec), key=lambda e: list(e.absolute_path))
    if schema_errs:
        for e in schema_errs[:25]:
            errors.append(("SCHEMA", f"{'/'.join(map(str, e.absolute_path)) or '<root>'}: {e.message[:300]}"))
        return errors, warnings

    tid, route, nodes = spec["template"], spec["route"], spec["nodes"]
    tpl = C.templates[tid]
    secs = [n["section"] for n in nodes]
    content_nodes = [n for n in nodes if not n["section"].startswith("shell.")]

    # TEMPLATE_NODE_SEQUENCE -- cross-reference the declared template's real node list
    rx, bodies = template_regex(tpl)
    seq = "".join(tok(n["section"], n.get("variant")) for n in nodes)
    m = rx.match(seq)
    if not m:
        exp = " > ".join(f"{n['section']}{'[' + '|'.join(n['variants']) + ']' if n.get('variants') else ''}{'' if n['required'] else '?'}{'*' if n['repeatable'] else ''}{'~' if n.get('zone') == 'body' else ''}" for n in tpl["nodes"])
        got = " > ".join(f"{n['section']}{'[' + n['variant'] + ']' if n.get('variant') else ''}" for n in nodes)
        add("TEMPLATE_NODE_SEQUENCE", f"nodes do not match {tid}. expected: {exp} (~ = unordered body region). got: {got}")
    else:
        for name, run in bodies:
            region = m.group(name)
            for bn in run:
                cnt = len(re.findall(node_pattern(bn), region))
                lo, hi = bn.get("minCount", 0), bn.get("maxCount", 10 ** 6)
                if not lo <= cnt <= hi:
                    add("TEMPLATE_NODE_SEQUENCE", f"{tid}: {bn['section']} appears {cnt}x in the body region; allowed {lo}..{hi}")

    # ROUTE_TEMPLATE_BINDING / HOME_ROUTE_ONLY
    if route in C.routes:
        if C.routes[route]["template"] != tid:
            add("ROUTE_TEMPLATE_BINDING", f"route {route} is a real route bound to {C.routes[route]['template']}, not {tid}")
    else:
        if not tpl.get("acceptsNewRoutes"):
            add("ROUTE_TEMPLATE_BINDING", f"{tid} does not accept new routes (real routes: {', '.join(tpl['routes'])}); got {route}")
        elif not re.match(tpl["newRoutePattern"], route):
            add("ROUTE_TEMPLATE_BINDING", f"route {route} does not match {tid} newRoutePattern {tpl['newRoutePattern']}")
    if (tid == "template.home") != (route == "/"):
        add("HOME_ROUTE_ONLY", f"template.home is only valid on '/', and '/' only with template.home (got {tid} on {route})")

    # shell + breadcrumb
    if not secs or secs[0] != "shell.header" or secs.count("shell.header") != 1:
        add("SHELL_HEADER_FIRST", "shell.header must be node 0 and appear once")
    if not secs or secs[-1] != "shell.footer" or secs.count("shell.footer") != 1:
        add("SHELL_FOOTER_LAST", "shell.footer must be the last node and appear once")
    for i, s in enumerate(secs):
        if s in BREADCRUMBS and i != 1:
            add("BREADCRUMB_FOLLOWS_HEADER", f"{s} at index {i}; must be index 1 directly under the header")

    # hero
    heroes = [s for s in secs if s in C.categories["hero"]]
    hero_less = C.rules["ONE_HERO_PER_PAGE"]["exceptions"]["heroLessTemplates"]
    if len(heroes) > 1:
        add("ONE_HERO_PER_PAGE", f"{len(heroes)} hero sections: {heroes}")
    if not heroes and tid not in hero_less:
        add("ONE_HERO_PER_PAGE", f"{tid} requires exactly one hero section")

    # per-section limits / home-only
    for sid in set(secs):
        cons = C.sections[sid]["constraints"]
        lim = 1 if cons.get("onePerPage") else cons.get("maxPerPage")
        if lim is not None and secs.count(sid) > lim:
            add("MAX_PER_PAGE", f"{sid} appears {secs.count(sid)}x (limit {lim})")
        if C.sections[sid]["homeOnly"] and tid != "template.home":
            add("HOME_ONLY_SECTIONS", f"{sid} is a real-homepage module (homeOnly) and cannot be used on {tid}")

    # asset roles
    roles = set()
    walk(spec["nodes"], lambda k, v: roles.add(v) if k == "assetRole" else None)
    home_roles = sorted(r for r in roles if C.assets.get(r, {}).get("allowedOn") == "template.home")
    if home_roles and tid != "template.home":
        add("HOME_ASSET_ROLES_ONLY_ON_HOME", f"asset roles {home_roles} are real Airtable/customer media allowed only on template.home")
    want = "home-route-reference-only" if home_roles else "none"
    if spec["contentPolicy"]["realBrandAssets"] != want:
        add("HOME_ASSET_ROLES_ONLY_ON_HOME", f"contentPolicy.realBrandAssets must be '{want}' for this page (home roles used: {home_roles or 'none'})")

    # links
    def chk_link(k, v):
        if not isinstance(v, str):
            return
        if k == "href" and not HREF_RE.match(v):
            add("NO_OUTBOUND_LINKS", f"href {v!r} is not a local route or '#'")
        elif EXTERNAL_RE.search(v):
            add("NO_OUTBOUND_LINKS", f"external URL in content: {v!r}")
    walk(spec["nodes"], chk_link)

    # copy: budgets, verbatim real copy, brand name
    for i, n in enumerate(nodes):
        budgets = C.sections[n["section"]]["content"]["copyBudgets"]
        for p, s in copy_strings(n, C):
            mw = budgets[p]["maxWords"]
            if words(s) > mw:
                add("COPY_BUDGET_MAX_WORDS", f"node {i} {n['section']} {p}: {words(s)} words > maxWords {mw}")
            cands = [s] + re.split(r"(?<=[.!?])\s+", s)
            for c in cands:
                h = hashlib.sha256(norm(c).encode()).hexdigest()
                if norm(c) and h in C.denylist:
                    add("VERBATIM_REAL_COPY", f"node {i} {n['section']} {p}: reproduces real Airtable homepage copy")
                    break
            if re.search(r"\bairtable\b", s, re.I):
                add("BRAND_NAME_IN_COPY", f"node {i} {n['section']} {p}: contains 'Airtable'")

    # motion
    gap_patterns = []
    for i, n in enumerate(nodes):
        sec = C.sections[n["section"]]
        allowed = {a["pattern"]: a for a in sec["motion"]["allowedPatterns"]}
        mo = n["motion"]
        a = allowed.get(mo.get("pattern"))
        if a is None:
            add("MOTION_PATTERN_ALLOWED", f"node {i} {n['section']}: pattern {mo.get('pattern')!r} not allowed (allowed: {sorted(allowed)})")
            continue
        vkey = n.get("variant") or "*"
        if vkey not in a["usedByVariants"]:
            add("MOTION_PATTERN_ALLOWED", f"node {i} {n['section']}[{vkey}]: pattern {mo['pattern']} is only used by variants {a['usedByVariants']}")
        # (1.1.0) media slots are static md- illustrations: video media no longer couples to a sweep
        # pattern; the contract's allowedPatterns alone decide (side-by-side allows only 'none').
        if "reducedMotionFallback" not in mo or mo["reducedMotionFallback"] != a["reducedMotionFallback"]:
            add("REDUCED_MOTION_FALLBACK_REQUIRED", f"node {i} {n['section']}: reducedMotionFallback must be {a['reducedMotionFallback']!r} for {mo['pattern']}")
        if a["reducedMotionFallback"] == "not-implemented":
            gap_patterns.append(mo["pattern"])
    if gap_patterns:
        add("MOTION_FALLBACK_GAP", f"patterns with no reduced-motion fallback in the clone: {sorted(set(gap_patterns))}")

    # rhythm
    allowed_rep = set(C.rules["NO_ADJACENT_SAME_SECTION"]["exceptions"]["allowedRepeats"])
    for i in range(1, len(nodes)):
        a, b = nodes[i - 1], nodes[i]
        if a["section"] == b["section"] and a["section"] not in allowed_rep:
            add("NO_ADJACENT_SAME_SECTION", f"nodes {i-1},{i}: consecutive {a['section']}")
        if a["section"] == b["section"] == "season.side-by-side":
            pa, pb = a["content"].get("position"), b["content"].get("position")
            if pa == pb and pa in ("left", "right"):
                add("SIDE_BY_SIDE_ALTERNATES", f"nodes {i-1},{i}: consecutive side-by-side rows both '{pa}'")
        if a["section"] == b["section"] == "bk.media-text-row" and a["content"].get("reverse") == b["content"].get("reverse"):
            add("SIDE_BY_SIDE_ALTERNATES", f"nodes {i-1},{i}: consecutive media-text rows with the same 'reverse'")
    logo_exc = set(C.rules["LOGOS_DIRECTLY_AFTER_HERO"]["exceptions"]["templates"])
    if tid not in logo_exc:
        for i, s in enumerate(secs):
            if s in C.categories["logos"] and (i == 0 or secs[i - 1] not in C.categories["hero"]):
                add("LOGOS_DIRECTLY_AFTER_HERO", f"{s} at index {i} does not directly follow the hero")
    for i, n in enumerate(content_nodes):
        if n["section"] in C.categories["cta"] and i < len(content_nodes) - 3:
            add("CTA_NEAR_END", f"{n['section']} is content node {i} of {len(content_nodes)}; expected within the last 3")
    cont = set(C.graph["continuousMotionPatterns"])
    load = sum(1 for n in nodes if n["motion"]["pattern"] in cont)
    mx = C.rules["MOTION_BUDGET"]["exceptions"]["max"]
    if load > mx:
        add("MOTION_BUDGET", f"{load} continuous/timer motion patterns (max {mx})")
    return errors, warnings


def main(argv):
    files = [a for a in argv if not a.startswith("--")]
    quiet = "--quiet" in argv
    if not files:
        print(__doc__)
        return 2
    bad = 0
    for f in files:
        with open(f, encoding="utf-8") as fh:
            spec = json.load(fh)
        errs, warns = validate(spec)
        if errs:
            bad += 1
            print(f"FAIL {f}: {len(errs)} error(s), {len(warns)} warning(s)")
            for r, msg in errs:
                print(f"  ERROR [{r}] {msg}")
        else:
            print(f"OK   {f}: 0 errors, {len(warns)} warning(s)")
        if not quiet:
            for r, msg in warns:
                print(f"  warn  [{r}] {msg}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
