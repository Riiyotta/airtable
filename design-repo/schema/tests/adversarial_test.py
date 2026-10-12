#!/usr/bin/env python3
"""Adversarial suite: every rule must actually reject a bad PageSpec, and every real PageSpec must pass.

    python3 schema/tests/adversarial_test.py

Controls  : schema/example.pagespec.json + all 25 schema/fixtures (one per real route) -> 0 errors.
Mutations : hand-written negatives per rule (schema layer, structural, runtime, compliance) +
            generic loops over EVERY template: drop each required node, and re-declare each fixture
            under every other template -> each must be rejected.
Warn checks: warn-severity rules must fire as warnings without producing errors.
Exit 0 only if every expectation holds. Paths derive from this file's location.
"""
import copy
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SCHEMA_DIR = os.path.dirname(HERE)
REPO = os.path.dirname(SCHEMA_DIR)
sys.path.insert(0, SCHEMA_DIR)
import semantic_validate as sv  # noqa: E402

C = sv.contracts()
TEMPLATES = C.templates
ROUTES = C.routes


def load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as f:
        return json.load(f)


EXAMPLE = load("schema/example.pagespec.json")
FIXTURES = {r: load(v["fixture"]) for r, v in ROUTES.items()}
passed = failed = 0
log = []


def check(name, spec, expect_rule=None, expect_warn=None):
    """expect_rule: rule id that must appear among errors (None = control, expects 0 errors)."""
    global passed, failed
    errs, warns = sv.validate(spec, C)
    rules = {r for r, _ in errs}
    wrules = {r for r, _ in warns}
    if expect_warn:
        ok = not errs and expect_warn in wrules
        what = f"0 errors + warn {expect_warn}"
    elif expect_rule == "ANY":
        ok = bool(errs)
        what = "rejected (any rule; 3-node templates fall below nodes.minItems=3 so SCHEMA may fire first)"
    elif expect_rule is None:
        ok = not errs
        what = "0 errors"
    else:
        ok = expect_rule in rules
        what = f"rejected by {expect_rule}"
    status = "PASS" if ok else "FAIL"
    if ok:
        passed += 1
    else:
        failed += 1
    log.append(f"{status} {name}: expected {what}; got errors={sorted(rules) or '[]'} warns={sorted(wrules) or '[]'}")


def ex():
    return copy.deepcopy(EXAMPLE)


def idx(spec, section, nth=0):
    hits = [i for i, n in enumerate(spec["nodes"]) if n["section"] == section]
    return hits[nth]


def fx(route):
    return copy.deepcopy(FIXTURES[route])


# ------------------------------------------------------------------ controls
check("control: example.pagespec.json", ex())
for r, s in FIXTURES.items():
    check(f"control: fixture {r} ({s['template']})", copy.deepcopy(s))

# ------------------------------------------------------------------ schema layer
s = ex(); s["template"] = "template.blog-post"; check("schema: unknown template enum", s, "SCHEMA")
s = ex(); del s["nodes"][2]["motion"]; check("schema: node missing motion", s, "SCHEMA")
s = ex(); del s["nodes"][2]["motion"]["reducedMotionFallback"]; check("schema: motion missing reducedMotionFallback", s, "SCHEMA")
s = ex(); s["nodes"][2]["motion"]["reducedMotionFallback"] = "transitions-removed"; check("schema: wrong (but valid-enum) fallback for pattern", s, "SCHEMA")
s = ex(); s["nodes"][2]["section"] = "season.testimonial-wall"; check("schema: invented section type", s, "SCHEMA")
s = ex(); s["nodes"][2]["motion"]["inventedAnimation"] = "spin"; check("schema: invented motion field", s, "SCHEMA")
s = ex(); s["nodes"][2]["content"]["videoUrl"] = "/assets/x.mp4"; check("schema: invented content field", s, "SCHEMA")
s = ex(); i = idx(s, "season.side-by-side"); s["nodes"][i]["content"]["media"]["assetRole"] = "stock.photo"; check("schema: invented assetRole", s, "SCHEMA")
s = ex(); s["nodes"][2]["variant"] = "big"; check("schema: variant on a variant-less section", s, "SCHEMA")
s = ex(); i = idx(s, "season.cta"); s["nodes"][i]["variant"] = "c"; check("schema: variant outside enum", s, "SCHEMA")
s = ex(); s["contentPolicy"]["copy"] = "real-airtable-copy"; check("schema: contentPolicy.copy not original-placeholder", s, "SCHEMA")
s = ex(); i = idx(s, "season.cta"); s["nodes"][i]["content"]["actions"][0]["href"] = "https://www.airtable.com/signup"; check("schema: external href", s, "SCHEMA")
s = ex(); i = idx(s, "season.side-by-side"); s["nodes"][i]["content"]["media"]["ratio"] = "21/9"; check("schema: media ratio outside observed enum", s, "SCHEMA")
s = fx("/contact-sales"); s["nodes"][1]["content"]["form"]["submission"] = "network"; check("schema: contact form must stay visual-only", s, "SCHEMA")
s = ex(); s["nodes"][2]["content"]["actions"] = s["nodes"][2]["content"]["actions"] * 2; check("schema: hero actions above observed maxItems", s, "SCHEMA")

# ------------------------------------------------------------------ structural
s = ex(); s["nodes"].insert(3, copy.deepcopy(s["nodes"][2])); check("structure: duplicate hero", s, "ONE_HERO_PER_PAGE")
s = ex(); s["nodes"].insert(3, copy.deepcopy(s["nodes"][2])); check("structure: duplicate hero breaks template sequence", s, "TEMPLATE_NODE_SEQUENCE")
s = ex(); del s["nodes"][idx(s, "season.breadcrumb")]; check("structure: required breadcrumb removed", s, "TEMPLATE_NODE_SEQUENCE")
s = ex(); s["nodes"].append(s["nodes"].pop(0)); check("structure: header moved to the end", s, "SHELL_HEADER_FIRST")
s = ex(); s["nodes"].insert(1, s["nodes"].pop()); check("structure: footer moved up", s, "SHELL_FOOTER_LAST")
s = ex(); b = s["nodes"].pop(idx(s, "season.breadcrumb")); s["nodes"].insert(3, b); check("structure: breadcrumb not under header", s, "BREADCRUMB_FOLLOWS_HEADER")
s = ex(); s["template"] = "template.season-solution"; s["route"] = "/solutions/new-team"; check("structure: declared template contradicts node list", s, "TEMPLATE_NODE_SEQUENCE")
s = ex(); i = idx(s, "season.side-by-side"); s["nodes"].insert(i, copy.deepcopy(s["nodes"][i])); s["nodes"].insert(i, copy.deepcopy(s["nodes"][i])); check("structure: 6 side-by-side rows (template max 5)", s, "TEMPLATE_NODE_SEQUENCE")
s = ex(); i = idx(s, "season.side-by-side"); [s["nodes"].insert(i, copy.deepcopy(s["nodes"][i])) for _ in range(2)]; check("structure: side-by-side over maxPerPage", s, "MAX_PER_PAGE")
s = ex(); i = idx(s, "season.cta"); s["nodes"][i]["variant"] = "b-green"; s["nodes"][i]["motion"] = {"pattern": "none", "trigger": "none", "reducedMotionFallback": "not-applicable"}; check("structure: variant not allowed by the template", s, "TEMPLATE_NODE_SEQUENCE")
s = fx("/solutions/marketing"); i = idx(s, "season.tabber", 1); s["nodes"][i]["variant"] = "labels"; check("structure: (section,variant) keying -- second tabber must be 'logos'", s, "TEMPLATE_NODE_SEQUENCE")
s = ex(); home = fx("/"); s["nodes"].insert(-1, copy.deepcopy(home["nodes"][idx(home, "home.resources")])); check("structure: homeOnly section on a Season page", s, "HOME_ONLY_SECTIONS")
s = ex(); home = fx("/"); s["nodes"].insert(-1, copy.deepcopy(home["nodes"][idx(home, "home.resources")])); check("compliance: real homepage media role off the homepage", s, "HOME_ASSET_ROLES_ONLY_ON_HOME")

# ------------------------------------------------------------------ routes
s = ex(); s["route"] = "/pricing"; check("route: real route bound to another template", s, "ROUTE_TEMPLATE_BINDING")
s = ex(); s["route"] = "/features/governance"; check("route: new route outside template pattern", s, "ROUTE_TEMPLATE_BINDING")
s = fx("/contact-sales"); s["route"] = "/contact-us"; check("route: new route on a single-route template", s, "ROUTE_TEMPLATE_BINDING")
s = fx("/"); s["route"] = "/home"; check("route: template.home off '/'", s, "HOME_ROUTE_ONLY")
s = ex(); s["route"] = "/platform/new-feature"; check("route: new route matching pattern is accepted (control)", s)

# ------------------------------------------------------------------ runtime / compliance
s = ex(); s["nodes"][2]["content"]["headline"] += " " + " ".join(["more"] * 30); check("runtime: maxWords overflow (hero headline)", s, "COPY_BUDGET_MAX_WORDS")
s = ex(); i = idx(s, "season.faq") if any(n["section"] == "season.faq" for n in s["nodes"]) else idx(s, "season.cards"); s["nodes"][i]["content"]["headline"] = "word " * 40; check("runtime: maxWords overflow (section headline)", s, "COPY_BUDGET_MAX_WORDS")
s = ex(); s["nodes"][2]["content"]["sub"] = "This canary sentence proves the verbatim copy denylist works."; check("compliance: verbatim real-copy hash (canary)", s, "VERBATIM_REAL_COPY")
src_hero = os.path.join(os.path.dirname(REPO), "src", "components", "Hero.jsx")
if os.path.isfile(src_hero):
    import re
    real = re.search(r"const DEFAULT_TITLE = '([^']+)'", open(src_hero, encoding="utf-8").read()).group(1)
    s = ex(); s["nodes"][2]["content"]["headline"] = real; check("compliance: verbatim real homepage h1 (read from sibling src at runtime)", s, "VERBATIM_REAL_COPY")
else:
    log.append("SKIP compliance: verbatim real homepage h1 -- sibling source tree absent (canary case above still proves the hash path)")
s = ex(); s["nodes"][2]["content"]["sub"] = "Read more at https://example.com today."; check("compliance: external URL inside copy", s, "NO_OUTBOUND_LINKS")
s = ex(); s["contentPolicy"]["realBrandAssets"] = "home-route-reference-only"; check("compliance: contentPolicy claims home brand assets on a Season page", s, "HOME_ASSET_ROLES_ONLY_ON_HOME")
s = fx("/"); s["contentPolicy"]["realBrandAssets"] = "none"; check("compliance: home uses real media but policy says none", s, "HOME_ASSET_ROLES_ONLY_ON_HOME")
s = fx("/platform/hyperdb"); i = idx(s, "season.logos"); s["nodes"][i]["motion"] = {"pattern": "season-logo-cycle", "trigger": "timer", "reducedMotionFallback": "autoplay-stopped"}; check("motion: pattern valid for section but not for variant a2", s, "MOTION_PATTERN_ALLOWED")
s = ex(); i = idx(s, "season.side-by-side"); s["nodes"][i]["content"]["media"]["video"] = True; check("motion: video media is static since 1.1.0 -- pattern 'none' accepted (control)", s)
s = ex(); i = idx(s, "season.side-by-side"); s["nodes"][i]["content"]["media"]["video"] = True
s["nodes"][i]["motion"] = {"pattern": "season-placeholder-video-sweep", "trigger": "continuous", "reducedMotionFallback": "animation-removed"}
check("motion: retired season-placeholder-video-sweep pattern (removed with the md- illustrations)", s, "SCHEMA")

# ------------------------------------------------------------------ media slots: generated.ui-illustration (1.1.0)
s = ex(); i = idx(s, "season.side-by-side"); s["nodes"][i]["content"]["media"]["assetRole"] = "placeholder.media"; check("asset: retired role placeholder.media", s, "SCHEMA")
s = ex(); i = idx(s, "season.side-by-side"); s["nodes"][i]["content"]["media"]["assetRole"] = "home.product-screenshot"; check("asset: real product screenshot role in a generated media slot", s, "SCHEMA")
s = ex(); i = idx(s, "season.hero"); s["nodes"][i]["content"]["media"]["assetRole"] = "home.product-video"; check("asset: real product video role in the Season hero slot", s, "SCHEMA")
s = ex(); i = idx(s, "season.side-by-side"); s["nodes"][i]["content"]["media"]["kind"] = "kanban"; check("asset: invented media.kind field (kind is derived from slot copy, not settable)", s, "SCHEMA")
s = ex(); i = idx(s, "season.side-by-side"); s["nodes"][i]["content"]["media"]["src"] = "/assets/screenshot.png"; check("asset: invented media.src on a generated slot", s, "SCHEMA")
s = fx("/"); i = idx(s, "home.resources"); s["nodes"][i]["content"]["cards"][0]["media"]["assetRole"] = "generated.ui-illustration"; check("asset: generated illustration replacing a pinned home.* media field", s, "SCHEMA")
s = fx("/solutions"); i = idx(s, "bk.media-text-row"); s["nodes"][i]["content"]["media"]["assetRole"] = "stock.photo"; check("asset: invented role on bk.media-text-row", s, "SCHEMA")
s = fx("/solutions"); check("control: bk.media-text-row with generated.ui-illustration", s)

# ------------------------------------------------------------------ warn-severity rules (must warn, must not error)
s = ex(); rows = [i for i, n in enumerate(s["nodes"]) if n["section"] == "season.side-by-side"]; s["nodes"][rows[1]]["content"]["position"] = s["nodes"][rows[0]]["content"]["position"]; check("warn: side-by-side rows not alternating", s, expect_warn="SIDE_BY_SIDE_ALTERNATES")
s = ex(); i = idx(s, "season.cta"); n = s["nodes"].pop(i); s["nodes"].insert(4, n); check("warn: CTA far from the end", s, expect_warn="CTA_NEAR_END")
s = fx("/platform/hyperdb"); i = idx(s, "season.logos"); n = s["nodes"].pop(i); s["nodes"].insert(i + 2, n); check("warn: logos not directly after hero", s, expect_warn="LOGOS_DIRECTLY_AFTER_HERO")
s = ex(); s["nodes"][2]["content"]["headline"] = "Why teams choose Airtable"; check("warn: brand name in copy", s, expect_warn="BRAND_NAME_IN_COPY")
s = fx("/"); check("warn: known reduced-motion gaps surface on the homepage", s, expect_warn="MOTION_FALLBACK_GAP")
s = ex(); hy = fx("/platform/hyperdb"); s["nodes"].insert(3, copy.deepcopy(hy["nodes"][idx(hy, "season.logos")]))
check("warn: motion budget exceeded (logo flip + integrations marquee + carousel marquee + CTA bars = 4 > 3)", s, expect_warn="MOTION_BUDGET")

# ------------------------------------------------------------------ generic loops over every template
for tid, t in TEMPLATES.items():
    base = FIXTURES[t["routes"][0]]
    seen = set()
    for k, n in enumerate(base["nodes"]):
        # drop the first instance of each required template node
        tn = next((x for x in t["nodes"] if x["section"] == n["section"] and (not x.get("variants") or n.get("variant") in x["variants"])), None)
        key = (n["section"], n.get("variant"))
        if tn is None or not tn["required"] or key in seen:
            continue
        cnt = sum(1 for m in base["nodes"] if (m["section"], m.get("variant")) == key)
        if tn.get("minCount", 1) < cnt:
            continue  # dropping one of a repeat stays within the allowed count
        seen.add(key)
        s = copy.deepcopy(base); del s["nodes"][k]
        exp = "TEMPLATE_NODE_SEQUENCE" if not n["section"].startswith("shell.") else ("SHELL_HEADER_FIRST" if n["section"] == "shell.header" else "SHELL_FOOTER_LAST")
        check(f"generic: {tid} without required {n['section']}[{n.get('variant') or ''}]", s, exp if len(base["nodes"]) > 3 else "ANY")
for r, f in FIXTURES.items():
    for tid, t in TEMPLATES.items():
        if tid == f["template"]:
            continue
        s = copy.deepcopy(f); s["template"] = tid
        s["route"] = t["routes"][0]
        check(f"generic: {r} nodes re-declared as {tid}", s, "TEMPLATE_NODE_SEQUENCE")

# ------------------------------------------------------------------ report
for line in log:
    print(line)
print(f"\nadversarial suite: {passed} passed, {failed} failed ({passed + failed} checks)")
sys.exit(1 if failed else 0)
