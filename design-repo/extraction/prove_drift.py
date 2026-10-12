#!/usr/bin/env python3
"""Prove that verify_all.py actually FAILS on drift (not just that it passes on a clean repo).

    python3 extraction/prove_drift.py

For each mutation: copy design-repo/ to a fresh temp dir, inject one defect, run verify_all.py there,
and require a non-zero exit AND the expected check name marked FAIL. A clean copy must pass.
When the sibling clone source exists, copies are run with --source-root pointing at it so external
citation drift is provable too; otherwise that one case is skipped (internal-citation cases still run).
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_ROOT = os.path.dirname(REPO)
HAVE_SRC = os.path.isfile(os.path.join(SRC_ROOT, "src", "App.jsx"))


def jload(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def jdump(p, o):
    with open(p, "w", encoding="utf-8") as f:
        json.dump(o, f, indent=2, ensure_ascii=False)


def m_phantom_allowlist(d):
    p = os.path.join(d, "tokens/llm/component-allowlist.json"); a = jload(p)
    a["sections"]["season.phantom"] = dict(next(iter(a["sections"].values())), contract="sections/season.phantom.json"); jdump(p, a)


def m_orphan_contract(d):
    p = os.path.join(d, "tokens/llm/component-allowlist.json"); a = jload(p)
    a["sections"].pop("season.stats"); jdump(p, a)


def m_internal_cite_range(d):
    p = os.path.join(d, "extraction/measured-values.json"); a = jload(p)
    a["entries"][0]["evidence"].append({"ref": "design-repo/README.md:99999", "anchor": "x"}); jdump(p, a)


def m_internal_cite_anchor(d):
    p = os.path.join(d, "extraction/measured-values.json"); a = jload(p)
    a["entries"][0]["evidence"].append({"ref": "design-repo/README.md:1", "anchor": "this text is not on line one"}); jdump(p, a)


def m_external_cite_range(d):
    p = os.path.join(d, "sections/season.hero.json"); a = jload(p)
    ref = a["implementedBy"][0]["ref"]; a["implementedBy"][0]["ref"] = re.sub(r":\d+(-\d+)?$", ":99999", ref); jdump(p, a)


def m_external_cite_wrong_lines(d):
    p = os.path.join(d, "sections/season.hero.json"); a = jload(p)
    ref = a["implementedBy"][0]["ref"]; path, line = ref.rsplit(":", 1)
    a["implementedBy"][0]["ref"] = f"{path}:{int(line.split('-')[0]) + 40}"; jdump(p, a)  # in range, wrong code


def m_count(d):
    p = os.path.join(d, "registry.manifest.json"); a = jload(p); a["counts"]["sections"] += 1; jdump(p, a)


def m_allow_version(d):
    p = os.path.join(d, "tokens/llm/component-allowlist.json"); a = jload(p); a["allowlistVersion"] = "1.0.1"; jdump(p, a)


def m_pinned_policy(d):
    p = os.path.join(d, "assets/asset-roles.json"); a = jload(p)
    a["roles"]["home.customer-logo"]["generationPolicy"] = "may-generate-new"  # valid enum member, wrong for a real trademark
    jdump(p, a)


def m_graph_severity(d):
    p = os.path.join(d, "compatibility/graph.json"); a = jload(p)
    for r in a["rules"]:
        if r["id"] == "NO_OUTBOUND_LINKS":
            r["severity"] = "warn"
    jdump(p, a)


def m_abs_path(d):
    with open(os.path.join(d, "CHANGELOG.md"), "a", encoding="utf-8") as f:
        f.write("\nbuilt at " + "/" + "Users/someone/project/design-repo\n")  # assembled at runtime so this file stays clean


def m_motion_open(d):
    p = os.path.join(d, "schema/pagespec.schema.json"); a = jload(p)
    a["definitions"]["motion.season.hero"]["oneOf"][0]["additionalProperties"] = True; jdump(p, a)


def m_content_hex(d):
    p = os.path.join(d, "tokens/00-foundation/color.json"); a = jload(p)
    k = next(iter(a["color"]["content"])); a["color"]["content"][k]["$value"] = "#123456"; jdump(p, a)


def m_entrypoint_outside(d):
    p = os.path.join(d, "registry.manifest.json"); a = jload(p); a["entryPoints"]["clone-spec"] = "../CLONE_SPEC.md"; jdump(p, a)


def m_readme_count(d):
    p = os.path.join(d, "README.md"); t = open(p, encoding="utf-8").read()
    t = re.sub(r"(\| `sections` \| )(\d+)", lambda m: m.group(1) + str(int(m.group(2)) + 1), t, count=1)
    open(p, "w", encoding="utf-8").write(t)


def m_route_binding(d):
    p = os.path.join(d, "templates/routes.json"); a = jload(p); a["routes"]["/about"]["template"] = "template.season-solution"; jdump(p, a)


def m_missing_script(d):
    os.remove(os.path.join(d, "schema/tests/adversarial_test.py"))


def m_ia_route_as_stub(d):
    # Copy the sibling IA next to the scratch repo, demote /about to a stub route, point verify_all at it.
    ia = jload(os.path.join(SRC_ROOT, "ia", "ia.json"))
    for t in ia["templates"]:
        if "/about" in t.get("routes", []):
            t["routes"].remove("/about"); t["routeCount"] -= 1
    stub = next(t for t in ia["templates"] if "shell.stub-notice" in t.get("sections", []))
    stub["routes"].append("/about"); stub["routeCount"] += 1
    p = os.path.join(os.path.dirname(d), "ia.json"); jdump(p, ia)
    return ["--ia", p]


CASES = [
    ("phantom allowlist entry", m_phantom_allowlist, "ALLOWLIST_PARITY", False),
    ("contract without allowlist entry", m_orphan_contract, "ALLOWLIST_PARITY", False),
    ("internal citation out of range", m_internal_cite_range, "CITATIONS", False),
    ("internal citation anchor mismatch", m_internal_cite_anchor, "CITATIONS", False),
    ("external citation out of range", m_external_cite_range, "CITATIONS", True),
    ("external citation in range but wrong lines", m_external_cite_wrong_lines, "CITATIONS", True),
    ("manifest count drift", m_count, "COUNTS", False),
    ("allowlistVersion drift", m_allow_version, "ALLOWLIST_VERSION", False),
    ("pinned real-brand asset policy changed to another valid value", m_pinned_policy, "ASSET_ROLES", False),
    ("graph rule severity diverges from validator", m_graph_severity, "GRAPH_VALIDATOR_AGREEMENT", False),
    ("absolute local path", m_abs_path, "NO_ABSOLUTE_PATHS", False),
    ("motion schema opened", m_motion_open, "MOTION_SCHEMA_CLOSED", False),
    ("content hex not in token catalog", m_content_hex, "TOKENS", False),
    ("entryPoint outside the package", m_entrypoint_outside, "ENTRYPOINTS_INSIDE_REPO", False),
    ("README count drift", m_readme_count, "README_COUNTS", False),
    ("route bound to the wrong template", m_route_binding, "ROUTE_COVERAGE", False),
    ("promised script missing", m_missing_script, "SCRIPTS_EXIST", False),
    ("built route demoted to a stub in ia.json", m_ia_route_as_stub, "IA_ROUTES", True),
]


def run(copy_dir, extra=()):
    cmd = [sys.executable, os.path.join(copy_dir, "extraction", "verify_all.py")]
    if HAVE_SRC:
        cmd += ["--source-root", SRC_ROOT]
    cmd += list(extra)
    p = subprocess.run(cmd, capture_output=True, text=True)
    return p.returncode, p.stdout + p.stderr


def fresh():
    base = tempfile.mkdtemp(prefix="drift-")
    d = os.path.join(base, "design-repo")
    shutil.copytree(REPO, d, ignore=shutil.ignore_patterns("__pycache__", ".DS_Store"))
    return base, d


def main():
    ok_all = True
    base, d = fresh()
    rc, out = run(d)
    clean_ok = rc == 0
    print(f"{'PASS' if clean_ok else 'FAIL'} clean copy passes verify_all (exit {rc})")
    if not clean_ok:
        print(out)
    ok_all &= clean_ok
    shutil.rmtree(base)
    for name, fn, check, needs_src in CASES:
        if needs_src and not HAVE_SRC:
            print(f"SKIP {name} -- needs the sibling clone source")
            continue
        base, d = fresh()
        extra = fn(d) or []
        rc, out = run(d, extra)
        caught = rc != 0 and re.search(rf"^FAIL {check}\b", out, re.M) is not None
        print(f"{'PASS' if caught else 'FAIL'} drift caught: {name} -> {check} FAIL (exit {rc})")
        if not caught:
            print(out)
        ok_all &= caught
        shutil.rmtree(base)
    print("\nprove_drift:", "every injected drift was caught" if ok_all else "SOME DRIFT WAS NOT CAUGHT")
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
