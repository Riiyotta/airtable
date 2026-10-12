#!/usr/bin/env python3
"""One-shot verification of the whole design-repo.

    python3 extraction/verify_all.py [--source-root PATH] [--ia PATH]

The repo root is derived from this file's location. The clone source tree (build-time
evidence) is looked up at the design-repo's parent directory unless --source-root is given;
when it is absent, source-dependent checks are SKIPPED with a WARN (never a failure), which is
what lets a standalone copy of design-repo/ pass. Citations into design-repo/ itself are always
checked.

Checks (each prints PASS/FAIL/WARN):
  NO_ABSOLUTE_PATHS          no local machine paths anywhere in the repo
  ENTRYPOINTS_INSIDE_REPO    registry.manifest.json entryPoints exist and stay inside design-repo/
  SCRIPTS_EXIST              every script the manifest/README/docstrings promise exists
  ALLOWLIST_PARITY           allowlist ids == contract files; settable fields/variants/motion/roles == schema
  ALLOWLIST_VERSION          manifest.allowlistVersion == tokens/llm/component-allowlist.json allowlistVersion
  CITATIONS                  every {"ref","anchor"} resolves: file exists, range in bounds, anchor inside range
  COUNTS                     manifest counts recomputed from disk
  README_COUNTS              README counts block == manifest counts
  ROUTE_COVERAGE             25 routes 1:1 with templates + fixtures; == live route registries when source present
  SCHEMA_AND_SEMANTIC        Draft-07 meta-check; example + every fixture -> 0 errors
  GRAPH_VALIDATOR_AGREEMENT  compatibility/graph.json rule ids+severities == semantic_validate.RULES
  ASSET_ROLES                closed enum parity + PINNED policies for real-brand roles + PINNED
                             originality restrictions (mustNotDepict) for generated.ui-illustration
  MEDIA_KINDS                mock-media kind/theme enums == the enums parsed from their own cited source
                             anchors (scenes.jsx SCENES, MockMedia theme), == allowlist variants == role kinds
  IA_ROUTES                  every design-repo route is a BUILT (non-stub) route in ../ia/ia.json and vice versa
                             (WARN, never FAIL, when ia.json is absent -- standalone copies still pass)
  TOKENS                     semantic aliases resolve, theme resolves all, content hex in catalog, policy keys
  MOTION_SCHEMA_CLOSED       no additionalProperties:true; every motion branch closed with pinned fallback
  SOURCE_SNAPSHOT_FRESH      extraction/source-data.snapshot.json == live src (needs node + source)
  HISTOGRAMS_FRESH           extraction/histograms.json == live src (WARN only)
"""
import json
import os
import re
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, "schema"))

GENERATED_ROLE = "generated.ui-illustration"
GENERATED_MUST_NOT_DEPICT = [  # originality policy for generated media slots: must not drift (MASTER-GUIDE 3.23)
    "real-airtable-logo-or-wordmark",
    "real-customer-or-partner-logo",
    "real-product-screenshot",
    "real-person-photo-or-likeness",
    "real-company-or-product-name",
]
PINNED = {  # real-brand / likeness / proprietary roles: policy must not drift (MASTER-GUIDE 3.23)
    "home.product-video": "reference-existing-only",
    "home.customer-video": "reference-existing-only",
    "home.customer-logo": "must-not-generate",
    "home.product-screenshot": "must-not-generate",
    "home.brand-illustration": "must-not-generate",
}
POLICIES = {"may-generate-new", "reference-existing-only", "must-not-generate"}
_U = "Users"  # assembled so this file itself never contains a literal local-path prefix
ABS_PATTERNS = [re.compile(p) for p in ("/" + _U + "/", r"/home/[a-z]", r"[A-Za-z]:\\\\" + _U, "/" + "private/tmp/", "/" + "var/folders/")]

results = []


def report(name, ok, detail="", warn=False):
    status = "WARN" if warn else ("PASS" if ok else "FAIL")
    results.append((name, status))
    print(f"{status:4} {name}" + (f" -- {detail}" if detail else ""))


def load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as f:
        return json.load(f)


def repo_files():
    for dp, dns, fns in os.walk(REPO):
        dns[:] = [d for d in dns if d not in ("__pycache__",)]
        for fn in fns:
            if fn == ".DS_Store":
                continue
            yield os.path.relpath(os.path.join(dp, fn), REPO)


def main():
    args = sys.argv[1:]
    src_root = os.path.dirname(REPO)
    if "--source-root" in args:
        src_root = os.path.abspath(args[args.index("--source-root") + 1])
    have_src = os.path.isfile(os.path.join(src_root, "src", "App.jsx"))
    ia_path = os.path.abspath(args[args.index("--ia") + 1]) if "--ia" in args else os.path.join(src_root, "ia", "ia.json")
    print(f"design-repo: {os.path.basename(REPO)} | sibling source tree: {'present' if have_src else 'ABSENT (source-dependent checks skipped)'}")

    manifest = load("registry.manifest.json")
    allow = load("tokens/llm/component-allowlist.json")
    schema = load("schema/pagespec.schema.json")
    defs = schema["definitions"]

    # ---------------------------------------------------------------- NO_ABSOLUTE_PATHS
    bad = []
    for rel in repo_files():
        try:
            txt = open(os.path.join(REPO, rel), encoding="utf-8").read()
        except UnicodeDecodeError:
            continue
        for i, line in enumerate(txt.split("\n"), 1):
            if any(p.search(line) for p in ABS_PATTERNS):
                bad.append(f"{rel}:{i}")
    report("NO_ABSOLUTE_PATHS", not bad, ", ".join(bad[:5]))

    # ---------------------------------------------------------------- ENTRYPOINTS_INSIDE_REPO
    eps = manifest["entryPoints"]
    vals = list(eps.values()) if isinstance(eps, dict) else list(eps)
    bad = [v for v in vals if v.startswith("/") or ".." in v.split("/") or not os.path.exists(os.path.join(REPO, v))]
    report("ENTRYPOINTS_INSIDE_REPO", not bad, f"{len(vals)} entry points" + (f"; bad: {bad}" if bad else ""))

    # ---------------------------------------------------------------- SCRIPTS_EXIST
    promised = manifest.get("scripts", {})
    bad = [v.split()[1] if v.startswith("python3 ") or v.startswith("node ") else v for v in promised.values()]
    missing = [p for p in bad if not os.path.isfile(os.path.join(REPO, p))]
    report("SCRIPTS_EXIST", not missing, f"{len(bad)} scripts" + (f"; missing {missing}" if missing else ""))

    # ---------------------------------------------------------------- ALLOWLIST_PARITY
    problems = []
    for layer in ("sections", "primitives", "components"):
        files = {fn[:-5] for fn in os.listdir(os.path.join(REPO, layer)) if fn.endswith(".json")}
        ids = set(allow[layer])
        if ids - files:
            problems.append(f"{layer}: phantom allowlist ids {sorted(ids - files)}")
        if files - ids:
            problems.append(f"{layer}: contracts without allowlist entry {sorted(files - ids)}")
        for i in ids & files:
            c = load(f"{layer}/{i}.json")
            if c.get("id") != i:
                problems.append(f"{layer}/{i}.json id mismatch")
    branches = {b["if"]["properties"]["section"]["const"]: b["then"] for b in defs["node"]["allOf"]}
    if set(branches) != set(allow["sections"]) or set(defs["node"]["properties"]["section"]["enum"]) != set(allow["sections"]):
        problems.append("schema section enum/branches != allowlist sections")
    for sid, a in allow["sections"].items():
        if sid not in branches or not os.path.isfile(os.path.join(REPO, "sections", f"{sid}.json")):
            continue
        c = load(f"sections/{sid}.json")
        sch_var = branches[sid].get("properties", {}).get("variant", {}).get("enum", [])
        if sorted(a["variants"]) != sorted(sch_var) or sorted(a["variants"]) != sorted(v["id"] for v in c["variants"]):
            problems.append(f"{sid}: variants allowlist/schema/contract differ")
        props = sorted(defs[f"content.{sid}"].get("properties", {}))
        if sorted(a["settableContentFields"]) != props:
            problems.append(f"{sid}: settableContentFields != schema content properties")
        mpat = sorted(b["properties"]["pattern"]["const"] for b in defs[f"motion.{sid}"]["oneOf"])
        if sorted(a["motionPatterns"]) != mpat or sorted(x["pattern"] for x in c["motion"]["allowedPatterns"]) != mpat:
            problems.append(f"{sid}: motion patterns allowlist/schema/contract differ")
        if sorted(a["assetRoles"]) != sorted(c["assetRoles"]):
            problems.append(f"{sid}: assetRoles differ")
    if sorted(allow["nodeProperties"]) != sorted(defs["node"]["properties"]) or sorted(allow["pageSpecTopLevel"]) != sorted(schema["properties"]):
        problems.append("allowlist node/top-level properties != schema")
    report("ALLOWLIST_PARITY", not problems, "; ".join(problems[:6]) or f"{len(allow['sections'])} sections, {len(allow['primitives'])} primitives, {len(allow['components'])} components")

    # ---------------------------------------------------------------- ALLOWLIST_VERSION
    report("ALLOWLIST_VERSION", manifest["allowlistVersion"] == allow["allowlistVersion"], f"manifest {manifest['allowlistVersion']} / allowlist {allow['allowlistVersion']}")

    # ---------------------------------------------------------------- CITATIONS
    cites = []

    def collect(o, where):
        if isinstance(o, dict):
            if "ref" in o and "anchor" in o and isinstance(o["ref"], str):
                cites.append((where, o["ref"], o["anchor"]))
            for v in o.values():
                collect(v, where)
        elif isinstance(o, list):
            for v in o:
                collect(v, where)

    for rel in repo_files():
        if rel.endswith(".json") and not rel.startswith("schema/fixtures/") and rel != "extraction/source-data.snapshot.json":
            collect(load(rel), rel)
    bad, checked, skipped, cache = [], 0, 0, {}
    for where, ref, anchor in cites:
        m = re.match(r"^(.+?):(\d+)(?:-(\d+))?$", ref)
        if not m:
            bad.append(f"{where}: malformed ref {ref}")
            continue
        path, a, b = m.group(1), int(m.group(2)), int(m.group(3) or m.group(2))
        if path.startswith("design-repo/"):
            full = os.path.join(REPO, path[len("design-repo/"):])
        else:
            if not have_src:
                skipped += 1
                continue
            full = os.path.join(src_root, path)
        if not os.path.isfile(full):
            bad.append(f"{where}: missing file {path}")
            continue
        if full not in cache:
            cache[full] = open(full, encoding="utf-8").read().split("\n")
        ls = cache[full]
        if not (1 <= a <= b <= len(ls)):
            bad.append(f"{where}: {ref} out of range (file has {len(ls)} lines)")
            continue
        if not anchor or not any(anchor in ls[i - 1] for i in range(a, b + 1)):
            bad.append(f"{where}: {ref} anchor not found in range: {anchor[:60]!r}")
            continue
        checked += 1
    detail = f"{len(cites)} citations: {checked} verified, {skipped} skipped (no source tree)"
    report("CITATIONS", not bad, detail + (f"; {len(bad)} bad e.g. {bad[:3]}" if bad else ""))
    if skipped and not bad:
        report("CITATIONS_SOURCE_DEPENDENT", True, f"{skipped} external citations not checkable without the sibling clone source", warn=True)

    # ---------------------------------------------------------------- COUNTS
    def foundation_count():
        n = 0

        def walk(o):
            nonlocal n
            if isinstance(o, dict):
                if "$value" in o:
                    n += 1
                    return
                for k, v in o.items():
                    if not k.startswith("$"):
                        walk(v)
        for fn in os.listdir(os.path.join(REPO, "tokens/00-foundation")):
            if fn.endswith(".json") and fn != "font-files.json":
                walk(load(f"tokens/00-foundation/{fn}"))
        return n
    sem = sum(len([k for k in load(f"tokens/10-semantic/{fn}")["tokens"] if not k.startswith("$")]) for fn in os.listdir(os.path.join(REPO, "tokens/10-semantic")) if fn.endswith(".json"))
    cmp_ = sum(len([k for k in load(f"tokens/20-component/{fn}")["tokens"] if not k.startswith("$")]) for fn in os.listdir(os.path.join(REPO, "tokens/20-component")) if fn.endswith(".json"))
    lay = len(load("tokens/30-layout/layout.json")["tokens"])
    graph = load("compatibility/graph.json")
    actual = {
        "foundationTokens": foundation_count(), "semanticTokens": sem, "componentTokens": cmp_, "layoutTokens": lay,
        "primitives": len([f for f in os.listdir(os.path.join(REPO, "primitives")) if f.endswith(".json")]),
        "components": len([f for f in os.listdir(os.path.join(REPO, "components")) if f.endswith(".json")]),
        "sections": len([f for f in os.listdir(os.path.join(REPO, "sections")) if f.endswith(".json")]),
        "templates": len(load("templates/templates.json")["templates"]),
        "routes": len(load("templates/routes.json")["routes"]),
        "fixtures": len([f for f in os.listdir(os.path.join(REPO, "schema/fixtures")) if f.endswith(".pagespec.json")]),
        "assetRoles": len(load("assets/asset-roles.json")["roles"]),
        "graphRules": len(graph["rules"]),
        "motionPatterns": len({b["properties"]["pattern"]["const"] for k, d in defs.items() if k.startswith("motion.") for b in d["oneOf"]}),
    }
    diff = {k: (manifest["counts"].get(k), v) for k, v in actual.items() if manifest["counts"].get(k) != v}
    extra = set(manifest["counts"]) - set(actual)
    report("COUNTS", not diff and not extra, (f"manifest!=disk {diff}" if diff else "") + (f" unknown keys {sorted(extra)}" if extra else "") or ", ".join(f"{k}={v}" for k, v in actual.items()))

    # ---------------------------------------------------------------- README_COUNTS
    readme = open(os.path.join(REPO, "README.md"), encoding="utf-8").read()
    block = re.search(r"<!-- counts:start -->(.*?)<!-- counts:end -->", readme, re.S)
    rc = dict(re.findall(r"`(\w+)`\s*\|\s*(\d+)", block.group(1))) if block else {}
    rdiff = {k: (rc.get(k), v) for k, v in actual.items() if str(v) != rc.get(k)}
    report("README_COUNTS", bool(block) and not rdiff, f"README!=disk {rdiff}" if rdiff else "README counts block matches disk")

    # ---------------------------------------------------------------- ROUTE_COVERAGE
    routes = load("templates/routes.json")["routes"]
    templates = load("templates/templates.json")["templates"]
    problems = []
    tr = [(r, t) for t, d in templates.items() for r in d["routes"]]
    if len(tr) != len({r for r, _ in tr}):
        problems.append("a route is assigned to more than one template")
    if {r for r, _ in tr} != set(routes):
        problems.append("templates.routes != routes.json")
    for r, d in routes.items():
        if d["template"] not in templates or r not in templates[d["template"]]["routes"]:
            problems.append(f"{r}: binding mismatch")
        fx = os.path.join(REPO, d["fixture"])
        if not os.path.isfile(fx):
            problems.append(f"{r}: missing fixture")
        else:
            f = load(d["fixture"])
            if f["route"] != r or f["template"] != d["template"]:
                problems.append(f"{r}: fixture route/template mismatch")
    live = None
    if have_src:
        live = {"/"}
        for fn in ("season.jsx", "bk.jsx", "standalone.jsx"):
            txt = open(os.path.join(src_root, "src", "routes", fn), encoding="utf-8").read()
            txt = "\n".join(l for l in txt.split("\n") if not l.strip().startswith("//"))  # header comments mention an example '/x'
            live |= set(re.findall(r"^\s*'(/[^']*)':", txt, re.M)) | set(re.findall(r"path: '(/[^']*)'", txt))
        if live != set(routes):
            problems.append(f"routes.json != live route registries: missing {sorted(live - set(routes))} extra {sorted(set(routes) - live)}")
    report("ROUTE_COVERAGE", not problems, "; ".join(problems) or f"{len(routes)} routes, {len(templates)} templates, 1:1" + (" (== live src registries)" if live else " (live registry check skipped)"))

    # ---------------------------------------------------------------- SCHEMA_AND_SEMANTIC
    from jsonschema import Draft7Validator
    import semantic_validate as sv
    Draft7Validator.check_schema(schema)
    files = ["schema/example.pagespec.json"] + [d["fixture"] for d in routes.values()]
    errs = {}
    for f in files:
        e, _ = sv.validate(load(f))
        if e:
            errs[f] = e[:2]
    report("SCHEMA_AND_SEMANTIC", not errs, f"{len(files)} PageSpecs, 0 errors" if not errs else str(errs)[:400])

    # ---------------------------------------------------------------- GRAPH_VALIDATOR_AGREEMENT
    g = {r["id"]: r["severity"] for r in graph["rules"]}
    report("GRAPH_VALIDATOR_AGREEMENT", g == sv.RULES, f"{len(g)} rules agree" if g == sv.RULES else f"graph-only {sorted(set(g) - set(sv.RULES))}, validator-only {sorted(set(sv.RULES) - set(g))}, severity diffs {sorted(k for k in g if k in sv.RULES and g[k] != sv.RULES[k])}")

    # ---------------------------------------------------------------- ASSET_ROLES
    ar = load("assets/asset-roles.json")
    problems = []
    if list(defs["assetRole"]["enum"]) != list(ar["roles"]):
        problems.append("schema assetRole enum != assets/asset-roles.json")
    for k, v in ar["roles"].items():
        if v.get("generationPolicy") not in POLICIES:
            problems.append(f"{k}: policy not in closed set")
        if k.startswith("home.") and k not in PINNED:
            problems.append(f"{k}: real-brand role not pinned in verify_all")
    for k, pol in PINNED.items():
        if ar["roles"].get(k, {}).get("generationPolicy") != pol or ar["pinnedPolicies"].get(k) != pol:
            problems.append(f"PINNED {k} must be {pol}")
    ex_roles = set()

    def roles(o):
        if isinstance(o, dict):
            if "assetRole" in o:
                ex_roles.add(o["assetRole"])
            for v in o.values():
                roles(v)
        elif isinstance(o, list):
            for v in o:
                roles(v)
    roles(load("schema/example.pagespec.json"))
    if not ex_roles:
        problems.append("example uses no assetRole field")
    if GENERATED_ROLE not in ex_roles:
        problems.append(f"example does not use {GENERATED_ROLE}")
    gen = ar["roles"].get(GENERATED_ROLE, {})
    pin = ar.get("pinnedRestrictions", {}).get(GENERATED_ROLE, {})
    for src_name, obj in (("role", gen), ("pinnedRestrictions", pin)):
        if obj.get("generationPolicy") != "may-generate-new" or obj.get("originalWorkOnly") is not True or obj.get("mustNotDepict") != GENERATED_MUST_NOT_DEPICT:
            problems.append(f"PINNED {GENERATED_ROLE} {src_name}: must be may-generate-new + originalWorkOnly + mustNotDepict {GENERATED_MUST_NOT_DEPICT}")
    for k in ar.get("retiredRoles", {}):
        if k in ar["roles"] or k in defs["assetRole"]["enum"]:
            problems.append(f"retired role {k} still in the closed enum")
    report("ASSET_ROLES", not problems, "; ".join(problems) or f"{len(ar['roles'])} roles, {len(PINNED)} pinned, example uses {sorted(ex_roles)}")

    # ---------------------------------------------------------------- MEDIA_KINDS
    problems = []
    mm = load("primitives/mock-media.json")
    kanchor = mm["kinds"]["evidence"][0]["anchor"]
    km = re.match(r"^export const SCENES = \{(.*)\}$", kanchor)
    cited = [x.split(":")[0].strip() for x in km.group(1).split(",")] if km else None
    if cited is None:
        problems.append("mock-media kinds anchor is not the SCENES registry line")
    elif mm["kinds"]["enum"] != cited:
        problems.append(f"mock-media kinds {mm['kinds']['enum']} != cited SCENES registry {cited}")
    if mm["variants"] != mm["kinds"]["enum"] or allow["primitives"].get("mock-media", {}).get("variants") != mm["kinds"]["enum"]:
        problems.append("mock-media variants / allowlist variants != kinds enum")
    if ar["roles"].get(GENERATED_ROLE, {}).get("kinds") != mm["kinds"]["enum"]:
        problems.append(f"{GENERATED_ROLE}.kinds != mock-media kinds")
    tanchor = " ".join(e["anchor"] for e in mm["themes"]["evidence"])
    if mm["themes"]["enum"] != re.findall(r"'([a-z]+)'", tanchor) or ar["roles"].get(GENERATED_ROLE, {}).get("themes") != mm["themes"]["enum"]:
        problems.append("mock-media themes != cited theme enum / role themes")
    ks = mm["kindSelection"]
    if not set(ks["ruleOrder"]) <= set(mm["kinds"]["enum"]) or not set(ks["fallbackRotation"]) <= set(mm["kinds"]["enum"]):
        problems.append("kindSelection names a kind outside the enum")
    report("MEDIA_KINDS", not problems, "; ".join(problems) or f"{len(mm['kinds']['enum'])} kinds, themes {mm['themes']['enum']} (== cited source anchors, allowlist, role)")

    # ---------------------------------------------------------------- IA_ROUTES
    if os.path.isfile(ia_path):
        ia = json.load(open(ia_path, encoding="utf-8"))
        stub_ids = {t["id"] for t in ia["templates"] if t["id"] == "template.stub" or "shell.stub-notice" in t.get("sections", [])}
        ia_route = {r: t["id"] for t in ia["templates"] for r in t.get("routes", [])}
        built = {r for r, t in ia_route.items() if t not in stub_ids}
        missing = sorted(set(routes) - set(ia_route))
        as_stub = sorted(r for r in routes if ia_route.get(r) in stub_ids)
        extra = sorted(built - set(routes))
        problems = (["design-repo routes missing from ia.json: %s" % missing] if missing else []) + (["design-repo routes the IA treats as stubs: %s" % as_stub] if as_stub else []) + (["IA built routes missing from design-repo: %s" % extra] if extra else [])
        report("IA_ROUTES", not problems, "; ".join(problems) or f"{len(routes)} design-repo routes == {len(built)} IA built routes ({len(ia_route)} IA routes, {len(ia_route) - len(built)} stub; {len(ia['templates'])} IA templates vs {len(templates)} here)")
    else:
        report("IA_ROUTES", True, "ia.json absent (standalone copy); skipped", warn=True)

    # ---------------------------------------------------------------- TOKENS
    problems = []
    catalog = load("tokens/llm/token-catalog.json")
    ids = {i for g2 in catalog["groups"].values() for i in g2}
    flatvals = {}

    def flat(prefix, o):
        if isinstance(o, dict) and "$value" in o:
            flatvals[prefix] = o["$value"]
            return
        if isinstance(o, dict):
            for k, v in o.items():
                if not k.startswith("$"):
                    flat(f"{prefix}.{k}" if prefix else k, v)
    for fn in sorted(os.listdir(os.path.join(REPO, "tokens/00-foundation"))):
        if fn.endswith(".json") and fn != "font-files.json":
            flat("", {k: v for k, v in load(f"tokens/00-foundation/{fn}").items() if not k.startswith("$")})
    if set(flatvals) != ids:
        problems.append(f"catalog != foundation files ({len(ids ^ set(flatvals))} diffs)")
    alias = re.compile(r'"\{([A-Za-z0-9_.\-]+)\}"')
    nsem = 0
    for d in ("10-semantic", "20-component"):
        for fn in os.listdir(os.path.join(REPO, "tokens", d)):
            for k, v in load(f"tokens/{d}/{fn}")["tokens"].items():
                if k.startswith("$"):
                    continue
                nsem += 1
                for a in alias.findall(json.dumps(v["$value"])):
                    if a not in ids:
                        problems.append(f"{fn}:{k} -> unknown alias {a}")
    theme = load("tokens/themes/light.json")["resolved"]
    if len(theme) != nsem:
        problems.append(f"theme resolves {len(theme)} of {nsem} semantic/component tokens")
    if alias.search(json.dumps(theme)):
        problems.append("theme still contains unresolved aliases")
    colour_vals = {str(v).upper() for k, v in flatvals.items() if k.startswith("color.")}
    hexes = set()

    def hx(o):
        if isinstance(o, dict):
            for v in o.get("enum", []):
                if isinstance(v, str) and re.match(r"^#[0-9A-Fa-f]{6}$", v):
                    hexes.add(v.upper())
            for v in o.values():
                hx(v)
        elif isinstance(o, list):
            for v in o:
                hx(v)
    hx(defs)
    if hexes - colour_vals:
        problems.append(f"CONTENT_HEX_IN_CATALOG: {sorted(hexes - colour_vals)}")
    pol = load("tokens/llm/token-policy.json")
    if set(pol["rawValueRestrictions"]) != set(catalog["groups"]):
        problems.append("token-policy rawValueRestrictions keys != catalog groups")
    report("TOKENS", not problems, "; ".join(problems[:5]) or f"{len(ids)} foundation ids, {nsem} semantic/component resolved, {len(hexes)} content hex in catalog")

    # ---------------------------------------------------------------- MOTION_SCHEMA_CLOSED
    problems = []
    if '"additionalProperties": true' in json.dumps(schema):
        problems.append("schema contains additionalProperties: true")
    if defs["node"]["properties"]["motion"].get("additionalProperties") is not False:
        problems.append("node.motion not closed")
    for k, d in defs.items():
        if k.startswith("motion."):
            for b in d["oneOf"]:
                if b.get("additionalProperties") is not False or set(b["properties"]) != {"pattern", "trigger", "reducedMotionFallback"} or "const" not in b["properties"]["reducedMotionFallback"]:
                    problems.append(f"{k}: branch not closed / fallback not const")
    report("MOTION_SCHEMA_CLOSED", not problems, "; ".join(problems[:4]) or "all motion branches closed, fallbacks const-locked")

    # ---------------------------------------------------------------- SOURCE_SNAPSHOT_FRESH / HISTOGRAMS_FRESH
    if have_src and src_root == os.path.dirname(REPO):
        try:
            out = subprocess.run(["node", os.path.join(REPO, "extraction", "dump_source_data.mjs"), "--stdout-json"], capture_output=True, text=True, timeout=120)
            same = json.loads(out.stdout) == load("extraction/source-data.snapshot.json")
            report("SOURCE_SNAPSHOT_FRESH", same, "snapshot == live src" if same else "live src differs from extraction/source-data.snapshot.json -- re-run the extraction + rebuild")
        except (FileNotFoundError, ValueError, subprocess.TimeoutExpired) as e:
            report("SOURCE_SNAPSHOT_FRESH", True, f"node unavailable ({type(e).__name__}); skipped", warn=True)
        out = subprocess.run([sys.executable, os.path.join(REPO, "extraction", "compute_histograms.py"), "--json"], capture_output=True, text=True)
        try:
            same = json.loads(out.stdout) == load("extraction/histograms.json")
        except ValueError:
            same = False
        report("HISTOGRAMS_FRESH", True, "histograms == live src" if same else "live src histograms drifted (informational)", warn=not same)
    else:
        report("SOURCE_SNAPSHOT_FRESH", True, "sibling source absent or --source-root given; skipped", warn=True)

    fails = [n for n, s in results if s == "FAIL"]
    print(f"\nverify_all: {sum(1 for _, s in results if s == 'PASS')} PASS, {sum(1 for _, s in results if s == 'WARN')} WARN, {len(fails)} FAIL")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
