# 04 — Testing

> **~35 min** · Build: three tests that prove `Order` cannot sell lasagna.  
> **Then:** [café `test_order.py`](../labs/northside-cafe/starters/test_order.py)

A test is a small program that checks another program. Write tests for the contracts you care about: a function's return value, an error it must raise, a file it must produce.

Python's standard library includes `unittest`. Most new projects use [pytest](https://docs.pytest.org/). This lesson uses pytest.

```bash
pip install pytest
pytest
```

## A first test

```python
# clamp.py
def clamp(n: float, lo: float, hi: float) -> float:
    return max(lo, min(n, hi))
```

```python
# test_clamp.py
from clamp import clamp

def test_inside_range():
    assert clamp(5, 0, 10) == 5

def test_below():
    assert clamp(-1, 0, 10) == 0

def test_above():
    assert clamp(99, 0, 10) == 10
```

pytest collects functions named `test_*` in files named `test_*.py`. `assert` is enough; pytest rewrites the assertion and shows both sides on failure.

## Exceptions

```python
import pytest

def test_lo_greater_than_hi():
    with pytest.raises(ValueError):
        clamp(1, 10, 0)
```

If your function does not yet raise, this test fails — which is the point. Write the test, then the code.

## Parametrize

```python
@pytest.mark.parametrize(
    "n, lo, hi, expected",
    [
        (5, 0, 10, 5),
        (-1, 0, 10, 0),
        (99, 0, 10, 10),
        (0, 0, 10, 0),
    ],
)
def test_clamp_table(n, lo, hi, expected):
    assert clamp(n, lo, hi) == expected
```

One test function, many cases. When one row fails, pytest reports which values.

## Fixtures

A fixture is setup you reuse. pytest injects it by parameter name.

```python
from pathlib import Path
import pytest

@pytest.fixture
def tmp_notes(tmp_path: Path) -> Path:
    path = tmp_path / "notes.txt"
    path.write_text("alpha\nbeta\n", encoding="utf-8")
    return path

def test_line_count(tmp_notes: Path):
    assert tmp_notes.read_text(encoding="utf-8").count("\n") == 2
```

`tmp_path` is a built-in fixture: a fresh temporary directory per test. Do not write test files into the repo.

## What to test

- Pure functions: inputs and outputs. Cheap and stable.
- Edge cases: empty list, `None`, zero, unicode, a missing key.
- Errors: the exception type and, when it matters, the message.
- Integration: one test that reads a small real file or hits a fake HTTP server.

Avoid testing the framework, private helpers that only exist because of your current design, and floating-point equality without a tolerance (`pytest.approx(0.1 + 0.2)`).

## Arrangement

```
project/
  src/mypkg/...
  tests/test_....py
```

Keep tests next to the idea they protect. Name them after the behavior: `test_empty_list_returns_zero`, not `test_1`.

## `unittest` in brief

```python
import unittest
from clamp import clamp

class TestClamp(unittest.TestCase):
    def test_inside(self):
        self.assertEqual(clamp(5, 0, 10), 5)
```

Run with `python -m unittest`. Fine for the standard library and legacy code. pytest can collect `unittest` tests too.

## Common mistakes

- Tests that depend on machine timezone, current date, or network without isolating them.
- Assertions that are too weak (`assert result` — many wrong values are truthy).
- Testing implementation details (`assert obj._cache == ...`) so every refactor breaks the suite.

## Try this

1. Write tests for `word_count` from the functions lesson: empty string, repeated words, mixed case.
2. Add a test that `word_count` raises `TypeError` if you pass `None`.
3. Parametrize at least four cases.

**Hints:** `assert word_count("") == {}`. `pytest.raises(TypeError)`. A list of `(text, expected)` tuples in `@parametrize`.
