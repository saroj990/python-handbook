# 06 — Functional tools

> **~30 min** · Build: bestsellers with `Counter`, not a hand-rolled dict.  
> **Then:** café step 8, this time with `Counter`.

Python is not a functional language, but it has a small, sharp set of tools for transforming data without mutating it in place. Combined with comprehensions and generators, this is how a lot of intermediate Python is written.

## Pure functions

A function is easier to test when it does not change its inputs or depend on hidden state:

```python
def normalize(name: str) -> str:
    return name.strip().title()
```

Contrast with a method that appends to a list you passed in. Both styles are valid; prefer the pure one when the data is small and the pipeline is the point.

## `map`, `filter`, and why comprehensions usually win

```python
names = [" ada", "ALAN", " grace "]
clean = [n.strip().title() for n in names if n.strip()]
```

Equivalent with `map`/`filter`:

```python
clean = list(map(str.title, map(str.strip, filter(str.strip, names))))
```

The comprehension is the one you should write. Keep `map` for a single named function: `map(int, lines)`.

## `functools`

```python
from functools import partial, reduce, lru_cache, cached_property

double = partial(int, base=2)
double("1010")    # 10

from operator import mul
reduce(mul, [1, 2, 3, 4], 1)   # 24
```

`reduce` is rarely clearer than a loop or `sum` / `math.prod`. Use it when you already think in folds.

`partial` freezes some arguments. Handy when an API wants a callback of one argument.

`lru_cache(maxsize=128)` is `cache` with a size limit and statistics (`fn.cache_info()`).

```python
class Report:
    def __init__(self, rows):
        self.rows = rows

    @cached_property
    def total(self):
        return sum(self.rows)
```

`cached_property` computes once per instance. Do not use it if the underlying data will change.

## `operator`

```python
from operator import itemgetter, attrgetter, methodcaller

rows = [("ada", 1815), ("alan", 1912)]
rows.sort(key=itemgetter(1))

people.sort(key=attrgetter("year"))
```

`itemgetter` and `attrgetter` are faster and clearer than a `lambda` that only pulls a field.

## `collections`

```python
from collections import Counter, defaultdict, deque, namedtuple

counts = Counter("abracadabra")
counts.most_common(3)

# group items
groups = defaultdict(list)
for name, dept in staff:
    groups[dept].append(name)

recent = deque(maxlen=5)
recent.append(1)

Point = namedtuple("Point", "x y")
p = Point(3, 4)
p.x
```

`Counter` is the right tool for "how many of each." `defaultdict(list)` removes the `if key not in d: d[key] = []` dance. `deque` is a double-ended queue; `maxlen` drops from the left automatically.

For records you will mutate or type-check, prefer a dataclass over `namedtuple`.

## Sorting and keys

```python
words.sort(key=str.lower)
words.sort(key=len, reverse=True)
rows.sort(key=lambda r: (r["last"], r["first"]))
```

`key` is called once per item. Do not sort by comparing pairs yourself unless you must.

`sorted` returns a new list. `list.sort` is in place and returns `None`.

## Any / all / min / max

```python
any(n < 0 for n in numbers)     # is there a negative?
all(n > 0 for n in numbers)     # are all positive?
max(words, key=len)
min(rows, key=itemgetter("age"))
```

These short-circuit (`any` / `all`) and accept a `key`. Pass a generator expression, not a list, when the source is large.

## Common mistakes

- `list.sort()` used as an expression: `nums = nums.sort()` sets `nums` to `None`.
- `defaultdict` that you then treat as a regular dict and forget missing keys create entries on read (`d[missing]` inserts).
- `reduce` for a simple sum. Use `sum`.

## Try this

1. Count word frequencies in a paragraph with `Counter`. Ignore case and punctuation (you can strip `.,!?`).
2. Group a list of `(city, temp)` pairs into a `defaultdict(list)` of temperatures per city, then compute the mean per city.
3. Sort a list of dicts by `"score"` descending, then `"name"` ascending.

**Hints:** `Counter(w.strip(".,!?").lower() for w in text.split())`. `sum(ts)/len(ts)` after grouping. `key=lambda r: (-r["score"], r["name"])`.
