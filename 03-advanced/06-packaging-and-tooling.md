# 06 — Packaging and tooling

> **~30 min** · Build: put the café in a `src/` package you can `pip install -e`.  
> **Then:** [quiz](../quizzes/03-advanced.md)

A project you can install, test, and share has a known layout, declared dependencies, and a few commands that always work the same way.

## Layout

```
myproject/
  pyproject.toml
  README.md
  src/
    myproject/
      __init__.py
      clamp.py
  tests/
    test_clamp.py
```

The `src/` layout prevents you from accidentally importing the local folder instead of the installed package. Tests import `myproject` the same way users will.

## `pyproject.toml` (minimum)

```toml
[build-system]
requires = ["setuptools>=69", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "myproject"
version = "0.1.0"
description = "A small example package"
readme = "README.md"
requires-python = ">=3.10"
dependencies = []

[project.optional-dependencies]
dev = ["pytest", "mypy", "ruff"]
```

Install the project in editable mode while you develop:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

`myproject` is now importable anywhere, and edits to `src/` show up immediately.

## Tools worth installing once

| Tool | Job |
|---|---|
| `ruff` | lint and format, very fast |
| `mypy` or `pyright` | type check |
| `pytest` | tests |
| `pip-tools` or `uv` | lock dependencies |

```bash
ruff check .
ruff format .
mypy src
pytest
```

Pick a formatter and let it win arguments about quotes and commas. [Ruff](https://docs.astral.sh/ruff/) can replace a pile of older linters.

## Pinning dependencies

`dependencies` in `pyproject.toml` are the abstract requirements (`pandas>=2.2`). For an application you deploy, also keep a lock file (`requirements.txt` with hashes, or `uv.lock`) so every machine installs the same versions.

For a *library* you publish, keep abstract ranges so you do not fight your users' other packages.

This handbook's `requirements.txt` is the application style: a concrete stack for the data science section.

## Scripts and entry points

```toml
[project.scripts]
greet = "myproject.cli:main"
```

After install, the user runs `greet` and Python calls `main()` in `myproject/cli.py`. Prefer this over telling people `python path/to/script.py`.

## Publishing (overview)

1. `pip install build twine`
2. `python -m build` → `dist/*.whl` and `dist/*.tar.gz`
3. Upload to [TestPyPI](https://test.pypi.org/) first, then PyPI

You need an account and an API token. Version numbers only go forward. Yank a bad release; do not reuse a version.

## Environments, again

One virtual environment per project. Do not install project packages into the system Python. Do not share a single global `venv` for every repo.

`python3 -m pip install ...` while the venv is active. Check with `which python` (macOS/Linux) — it should point inside `.venv`.

## Common mistakes

- Committing `.venv` or `__pycache__`. Add them to `.gitignore`.
- Mixing `pip install` from two different Pythons and wondering why `import` fails.
- Putting application code at the repo root so `import clamp` works in tests but fails after install.

## Try this

1. Turn one of your exercise functions into a package with the `src/` layout and a `pyproject.toml`.
2. Add a `pytest` test and run it against the editable install.
3. Add `ruff` as a dev dependency and run `ruff check` on `src/`.

**Hints:** `pip install -e ".[dev]"`. Tests import the package name, not a relative file path. `ruff` reads the tree you point at.

---

Advanced complete. Continue with [NumPy](../04-data-science/01-numpy.md).
