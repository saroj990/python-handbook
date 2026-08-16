# 06 — Control flow

> **~30 min** · Build: a `while` loop that takes orders until `done`.  
> **Then:** [drill `04_fizzbuzz`](../practice/basics/04_fizzbuzz.py) · [Café step 5](../labs/northside-cafe/README.md#5-take-orders)

Programs choose and repeat. Python does both with indentation, not braces.

## `if` / `elif` / `else`

```python
score = 82

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
```

`elif` is "else if". Only one branch runs.

A one-line conditional expression (ternary):

```python
label = "pass" if score >= 60 else "fail"
```

Use it for simple values, not for nested logic.

## `match` (3.10+)

```python
def handle(status: int) -> str:
    match status:
        case 200:
            return "ok"
        case 404:
            return "missing"
        case 400 | 422:
            return "bad request"
        case _:
            return "unknown"
```

`match` also unpacks structures. Reach for it when you have several distinct shapes, not just a chain of integers.

## `for` loops

```python
for item in ["a", "b", "c"]:
    print(item)

for i, item in enumerate(["a", "b", "c"], start=1):
    print(i, item)

for key, value in {"x": 1, "y": 2}.items():
    print(key, value)
```

Prefer iterating the collection directly. `for i in range(len(items))` is usually a smell; use `enumerate` when you need the index.

`range(n)` is `0 .. n-1`. `range(1, 5)` is `1, 2, 3, 4`. `range(0, 10, 2)` steps by 2.

## `while` loops

```python
n = 3
while n > 0:
    print(n)
    n -= 1
```

Use `while` when you do not know how many iterations you need (waiting for input, retrying). Use `for` when you walk a collection or a known range.

## `break`, `continue`, `else` on loops

```python
for n in numbers:
    if n < 0:
        continue      # skip the rest of this iteration
    if n == 0:
        break         # leave the loop
else:
    # runs only if the loop was *not* broken
    print("zero never appeared")
```

The loop-`else` surprises people. It is useful for searches: "I never found it."

## Nested loops and flattening

```python
for row in matrix:
    for cell in row:
        print(cell)
```

If you only need the cells, a comprehension (next section) or `itertools.chain` is often clearer.

## Truthiness in conditions

```python
if items:          # non-empty
    process(items)

if not name:       # empty string or None
    name = "anonymous"
```

Prefer this over `if len(items) > 0` unless the length itself matters.

## Common mistakes

- `if x = 1` — assignment, not comparison. Syntax error in Python, thankfully.
- Infinite `while` because the update sits in the wrong place.
- Modifying a list while you iterate it. Iterate a copy: `for x in items[:]`.

## Try this

1. Print the numbers 1 to 20. For multiples of 3 print `fizz`, of 5 print `buzz`, of both print `fizzbuzz`.
2. Find the first number in a list that is divisible by 7. If none exists, print `"none"`. Use a loop-`else`.
3. Read a simple menu in a `while True` loop that `break`s when the user types `q`.

**Hints:** Check the "both" case first. `for n in nums:` / `if n % 7 == 0: print(n); break` / `else: print("none")`. `input()` returns a string.
