# Hands-on — Intermediate

Run these after the matching lesson. They are short on purpose: one idea, one output.

---

## 1. Comprehend the cart

```python
carts = [
    ["latte", "muffin"],
    ["latte", "tea", "latte"],
    ["espresso"],
]
items = [name for cart in carts for name in cart]
paid = [name for name in items if name != "tea"]
print(items)
print(paid)
print({name: items.count(name) for name in set(items)})
```

`items` has five names. The dict counts `latte` as 3.

---

## 2. Catch a bad price

```python
def parse_price(text):
    try:
        value = float(text)
    except ValueError as exc:
        raise ValueError(f"not a price: {text!r}") from exc
    if value < 0:
        raise ValueError("price cannot be negative")
    return value

for raw in ["4.50", "free", "-1"]:
    try:
        print(raw, "->", parse_price(raw))
    except ValueError as exc:
        print(raw, "error:", exc)
```

Only `"4.50"` should print a number.

---

## 3. A tiny `Order`

```python
class UnknownItem(Exception):
    pass

class Order:
    def __init__(self, menu):
        self.menu = menu
        self.items = []

    def add(self, name):
        if name not in self.menu:
            raise UnknownItem(name)
        self.items.append(name)

    def subtotal(self):
        return sum(self.menu[name] for name in self.items)

    def __repr__(self):
        return f"Order({self.items!r})"

order = Order({"latte": 4.50, "muffin": 2.75})
order.add("latte")
order.add("muffin")
print(order, order.subtotal())
try:
    order.add("lasagna")
except UnknownItem as exc:
    print("rejected", exc)
```

---

## 4. Yield a log

```python
def replay(lines):
    for line in lines:
        line = line.strip()
        if line:
            yield line.split(",")

log = ["latte,muffin", "", "tea", "espresso,espresso"]
for cart in replay(log):
    print(cart)
```

Empty lines disappear. You get three carts, not four.

---

## 5. Time a function

```python
import functools
import time

def timed(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = fn(*args, **kwargs)
        print(f"{fn.__name__}: {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

@timed
def close_out(n):
    return sum(range(n))

print(close_out(200_000))
```

---

## 6. A `closing` context manager

```python
from contextlib import contextmanager
from pathlib import Path

@contextmanager
def shop_status(path):
    Path(path).write_text("OPEN\n", encoding="utf-8")
    try:
        yield
    finally:
        Path(path).write_text("CLOSED\n", encoding="utf-8")

with shop_status("status.txt"):
    print("selling...")
print(Path("status.txt").read_text(encoding="utf-8"))
```

After the `with` block the file must say `CLOSED`.

---

## 7. Count with `Counter`

```python
from collections import Counter, defaultdict

sold = ["latte", "latte", "muffin", "tea", "latte"]
print(Counter(sold).most_common(2))

by_hour = defaultdict(list)
for hour, item in [(8, "latte"), (8, "muffin"), (9, "tea")]:
    by_hour[hour].append(item)
print(dict(by_hour))
```

---

## 8. Morning rush

```python
from datetime import datetime, time

raw = [
    "2026-08-16 08:41 latte,latte",
    "2026-08-16 11:05 muffin",
    "2026-08-16 10:59 tea",
]
cutoff = time(11, 0)
morning = 0
for line in raw:
    stamp, cart = line[:16], line[17:]
    when = datetime.strptime(stamp, "%Y-%m-%d %H:%M")
    if when.time() < cutoff:
        morning += 1
        print(when.time(), cart)
print("morning orders", morning)
```

Two orders before 11:00.

---

## 9. Pull an order id with regex

```python
import re

text = "Order #A-1042 shipped"
match = re.search(r"Order #([A-Z]-(\d+))", text)
print(match.group(0))
print(match.group(1))
print(match.group(2))
print(re.findall(r"\d+", "table 4, 2 lattes, $9.00"))
```

---

## 10. Invert and window

```python
index = {"ada": 1, "alan": 2, "grace": 1}
print({value: key for key, value in index.items()})

def window(items, size):
    seq = list(items)
    for i in range(len(seq) - size + 1):
        yield seq[i : i + size]

print(list(window(["a", "b", "c", "d"], 3)))
```

The inverted dict keeps **grace** for id `1` (last key wins).

Then: [practice questions](09-practice.md).
