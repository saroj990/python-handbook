# 04 — Iterators and generators

> **~35 min** · Build: yield orders from a log, one line at a time.  
> **Then:** [drill `03_window`](../practice/intermediate/03_window.py) · [Café step 11](../labs/northside-cafe/README.md#11-replay-the-log)

Anything you can put in a `for` loop is iterable. Understanding that protocol lets you write lazy pipelines that do not load everything into memory.

## The iterator protocol

An **iterable** implements `__iter__` and returns an iterator.

An **iterator** implements `__next__` (and usually `__iter__` returning `self`). `next()` raises `StopIteration` when finished.

```python
class Countdown:
    def __init__(self, start: int) -> None:
        self.current = start

    def __iter__(self) -> "Countdown":
        return self

    def __next__(self) -> int:
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in Countdown(3):
    print(n)    # 3 2 1
```

`iter(x)` calls `x.__iter__()`. `list(x)` consumes the iterator.

A list is iterable but not an iterator: you can iterate it many times. An iterator is single-pass.

## Generators

A function with `yield` is a generator factory. Calling it returns a generator object (an iterator).

```python
def countdown(start: int):
    current = start
    while current > 0:
        yield current
        current -= 1

list(countdown(3))   # [3, 2, 1]
```

Execution pauses at `yield` and resumes on the next `next()`. State lives in the frame. This is far less code than a class.

## `yield from`

```python
def flatten(rows):
    for row in rows:
        yield from row
```

`yield from` delegates to another iterable. Useful for chaining generators.

## Generator pipelines

```python
def read_lines(path):
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\n")

def non_empty(lines):
    for line in lines:
        if line.strip():
            yield line

def numbered(lines):
    for i, line in enumerate(lines, start=1):
        yield f"{i}: {line}"

pipeline = numbered(non_empty(read_lines("notes.txt")))
for item in pipeline:
    print(item)
```

Each stage is a small function. Nothing materializes the whole file.

## `itertools` (the useful core)

```python
import itertools as it

it.islice(countdown(100), 5)       # first 5
it.chain([1, 2], [3, 4])           # 1 2 3 4
it.cycle("ab")                     # a b a b ... (infinite)
it.repeat(0, 3)                    # 0 0 0
it.product("AB", "12")             # A1 A2 B1 B2
it.combinations([1, 2, 3], 2)      # (1,2) (1,3) (2,3)
it.permutations([1, 2, 3], 2)
it.groupby(sorted(words))          # consecutive groups
```

`itertools` is lazy. Wrap with `list(...)` only when you need a concrete collection.

## Infinite streams and `islice`

```python
def naturals():
    n = 0
    while True:
        yield n
        n += 1

from itertools import islice
list(islice(naturals(), 5))   # [0, 1, 2, 3, 4]
```

Never `list()` an infinite generator.

## Common mistakes

- Calling a generator function and forgetting that you get a generator, not the values: `countdown(3)` vs `list(countdown(3))`.
- Reusing an exhausted generator.
- Building a list in a generator "just in case." If the caller needs a list, they can call `list()`.

## Try this

1. Write `def window(items, size)` that yields overlapping slices of length `size`.
2. Write `def unique(items)` that yields each value the first time it appears, using a `seen` set.
3. Use `itertools.product` to generate all two-letter strings from `"ABC"`.

**Hints:** Convert to a list or walk with an index; yield `items[i:i+size]`. `if item not in seen: seen.add(item); yield item`. `product(letters, repeat=2)` then `"".join(pair)`.
