# 01 — Comprehensions

> **~25 min** · Build: flatten a day's carts and count items in one expression.  
> **Then:** [drill `01_invert`](../practice/intermediate/01_invert.py) · [Café step 8](../labs/northside-cafe/README.md#8-popular-items-one-line)

A comprehension builds a collection from an iterable in one expression. Prefer them when the transform is short and has no side effects.

## List comprehensions

```python
squares = [n * n for n in range(10)]
evens = [n for n in range(20) if n % 2 == 0]
labels = [f"id-{n:03}" for n in range(5)]
```

The general form:

```text
[expression for item in iterable if condition]
```

Nested loops:

```python
pairs = [(x, y) for x in range(3) for y in range(3) if x != y]
```

Read left to right the same way you would write nested `for` loops. If the expression needs more than one line of logic, use a regular loop.

## Dict and set comprehensions

```python
index = {word: i for i, word in enumerate(["a", "b", "c"])}
unique_lengths = {len(w) for w in ["to", "be", "or", "not"]}
```

A dict comprehension with a repeated key keeps the *last* value.

## Generator expressions

Parentheses instead of brackets produce a generator: values computed lazily, one at a time.

```python
total = sum(n * n for n in range(1_000_000))
```

No extra list is built. Use this when you only iterate once and the source is large.

A generator expression is exhausted after one pass:

```python
gen = (n for n in range(3))
list(gen)   # [0, 1, 2]
list(gen)   # []
```

## When not to use a comprehension

- The body has side effects (`print`, writing a file). Use a `for` loop.
- You need `break`, `else`, or early `return`.
- Nesting goes past two levels. Clarity wins.

`map` and `filter` still exist. A comprehension is usually more readable to Python programmers. Use `map` when you already have a named function and no extra logic: `map(str.upper, names)`.

## `zip`, `enumerate`, and unpacking

These pair naturally with comprehensions:

```python
names = ["ada", "alan"]
years = [1815, 1912]
people = {name: year for name, year in zip(names, years)}

ranked = [f"{i}. {name}" for i, name in enumerate(names, start=1)]
```

`zip` stops at the shortest input. `zip(..., strict=True)` (3.10+) errors if lengths differ — prefer that when mismatch is a bug.

## Common mistakes

- Building a huge list you only sum once. Use a generator expression.
- A comprehension that calls a mutating method and also tries to use the result. Keep mutation in a loop.
- Walrus-heavy comprehensions that hide control flow. If you need `:=` more than once, write a loop.

## Try this

1. From a list of strings, build a list of their lengths, but only for strings longer than 3 characters.
2. Invert a dict `{name: id}` to `{id: name}`.
3. Compute the sum of cubes of odd numbers below 1000 without building a list.

**Hints:** `[len(s) for s in words if len(s) > 3]`. `{v: k for k, v in d.items()}` — last key wins on collision. `sum(n**3 for n in range(1000) if n % 2)`.
