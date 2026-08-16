#!/usr/bin/env python3
"""Run handbook drills. From the repo root: python3 practice/check.py"""

from __future__ import annotations

import importlib.util
import sys
import traceback
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FOLDERS = ("basics", "intermediate", "advanced", "data_science", "debug")


def load(path: Path):
    spec = importlib.util.spec_from_file_location(path.stem, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot load {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def drill_files(filter_text: str | None) -> list[Path]:
    files: list[Path] = []
    for folder in FOLDERS:
        files.extend(sorted((ROOT / folder).glob("*.py")))
    files = [p for p in files if not p.name.startswith("_")]
    if not filter_text:
        return files
    needle = filter_text.lower().replace("-", "_")
    return [p for p in files if needle in p.as_posix().lower() or needle == p.parent.name]


def run_one(path: Path) -> str | None:
    """Return None on success, or a short failure message."""
    try:
        module = load(path)
    except NotImplementedError as exc:
        return f"not implemented yet ({exc})"
    except Exception:
        return traceback.format_exc(limit=4)

    checks = getattr(module, "run_checks", None)
    if checks is None:
        return "no run_checks() in this file"
    try:
        checks()
    except NotImplementedError:
        return "function still raises NotImplementedError"
    except AssertionError as exc:
        return str(exc) or "assertion failed"
    except Exception:
        return traceback.format_exc(limit=4)
    return None


def main(argv: list[str]) -> int:
    filter_text = argv[1] if len(argv) > 1 else None
    files = drill_files(filter_text)
    if not files:
        print(f"no drills match {filter_text!r}")
        print("try: basics  intermediate  advanced  data_science  debug  01_clamp")
        return 2

    passed = 0
    first_fail: Path | None = None
    print()
    for path in files:
        label = f"{path.parent.name}/{path.stem}"
        error = run_one(path)
        if error is None:
            print(f"  ok   {label}")
            passed += 1
        else:
            print(f"  FAIL {label}")
            for line in error.strip().splitlines()[:8]:
                print(f"       {line}")
            if first_fail is None:
                first_fail = path

    total = len(files)
    print()
    print(f"{total} drills · {passed} passed · {total - passed} failed")
    if first_fail is not None:
        print(f"Next: {first_fail.parent.name}/{first_fail.stem}")
        print(f"Edit {first_fail.relative_to(ROOT.parent)} and run this checker again.")
        return 1
    print("All green. Take the next lesson, or open the café lab.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
