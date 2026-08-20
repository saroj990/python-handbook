# Hands-on — Advanced

These examples are small enough to type, but they are the real tools: types, data, tasks, tests, timing.

---

## 1. Annotate and narrow

```python
def find_price(name: str, menu: dict[str, float]) -> float | None:
    return menu.get(name)

price = find_price("latte", {"latte": 4.5})
if price is None:
    print("missing")
else:
    print(round(price * 1.08, 2))
```

After the `None` check, a type checker treats `price` as `float`.

---

## 2. A protocol

```python
from typing import Protocol

class Priced(Protocol):
    def subtotal(self) -> float: ...

def with_tax(thing: Priced, rate: float = 0.08) -> float:
    return thing.subtotal() * (1 + rate)

class Tab:
    def __init__(self, cents: list[float]) -> None:
        self.cents = cents

    def subtotal(self) -> float:
        return sum(self.cents)

print(round(with_tax(Tab([4.5, 2.75])), 2))
```

No inheritance. `Tab` fits because it has `subtotal`.

---

## 3. Frozen `Money`

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Money:
    amount: int
    currency: str = "USD"

    def __post_init__(self) -> None:
        if self.amount < 0:
            raise ValueError("negative")
        if len(self.currency) != 3:
            raise ValueError("currency")

    def plus(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("mismatch")
        return Money(self.amount + other.amount, self.currency)

print(Money(450).plus(Money(275)))
```

Amounts are **cents**. `4.50` dollars is `450`.

---

## 4. Overlap waits with asyncio

```python
import asyncio
import time

async def brew(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return name

async def main() -> None:
    start = time.perf_counter()
    drinks = await asyncio.gather(brew("latte", 0.4), brew("tea", 0.2))
    print(drinks, round(time.perf_counter() - start, 2), "s")

asyncio.run(main())
```

Wall time should be about **0.4s**, not 0.6s.

---

## 5. Threads for blocking work

```python
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

def ping(n: int) -> int:
    time.sleep(0.3)
    return n

start = time.perf_counter()
with ThreadPoolExecutor(max_workers=3) as pool:
    futures = [pool.submit(ping, i) for i in range(3)]
    print([f.result() for f in as_completed(futures)])
print("elapsed", round(time.perf_counter() - start, 2))
```

Three 0.3s sleeps overlap: elapsed near 0.3, not 0.9.

---

## 6. A pytest file

Save as `test_money.py` next to a `Money` that rejects negatives:

```python
import pytest
from money import Money  # adjust the import to your file

def test_plus():
    assert Money(450).plus(Money(50)).amount == 500

def test_negative():
    with pytest.raises(ValueError):
        Money(-1)
```

```bash
pytest test_money.py -q
```

Two dots means two passes.

---

## 7. Parametrize

```python
import pytest

def clamp(n, lo, hi):
    return max(lo, min(n, hi))

@pytest.mark.parametrize("n, expected", [(-1, 0), (5, 5), (99, 10)])
def test_clamp(n, expected):
    assert clamp(n, 0, 10) == expected
```

One failing row reports the inputs. That is the point of a table.

---

## 8. Time the obvious vs the library

```python
import timeit
from collections import Counter

sold = ["latte", "muffin", "latte", "tea"] * 50_000

def by_hand():
    counts = {}
    for name in sold:
        counts[name] = counts.get(name, 0) + 1
    return counts

print("hand", timeit.timeit(by_hand, number=5))
print("counter", timeit.timeit(lambda: Counter(sold), number=5))
```

`Counter` should win. Keep it because it is clearer *and* faster, not because of a hunch.

---

## 9. Identity vs equality

```python
a = [1, 2, 3]
b = a
c = list(a)
print(a is b, a == b)
print(a is c, a == c)
```

`is` is identity. `==` is value. Use `is` for `None`.

---

## 10. A `pyproject.toml` stub

Create this next to a `src/northside/__init__.py`:

```toml
[build-system]
requires = ["setuptools>=69"]
build-backend = "setuptools.build_meta"

[project]
name = "northside"
version = "0.1.0"
requires-python = ">=3.10"
```

Then:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
python -c "import northside; print('ok')"
```

Then: [practice questions](08-practice.md).
