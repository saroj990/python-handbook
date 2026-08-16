# 03 — Operators and expressions

> **~20 min** · Build: tax and tip from operators, not a calculator.  
> **Then:** [debug `01_or_trap`](../practice/debug/01_or_trap.py) — a condition that is always true.

An expression is anything that produces a value. Operators combine values.

## Arithmetic

| Operator | Meaning | Example |
|---|---|---|
| `+` `-` `*` | add, subtract, multiply | `3 * 4` |
| `/` | true division (always `float`) | `7 / 2` → `3.5` |
| `//` | floor division | `7 // 2` → `3` |
| `%` | remainder | `7 % 2` → `1` |
| `**` | power | `2 ** 8` → `256` |

Unary minus: `-n`. Parentheses control order: `(1 + 2) * 3`.

## Comparison

```python
3 == 3.0     # True   — value equality
3 != 4       # True
3 < 4 <= 5   # True   — chained comparisons
"a" < "b"    # True   — lexicographic, Unicode code points
```

`==` compares values. `is` compares *identity* (same object in memory). Use `is` only for `None` and the rare case where identity is the point:

```python
if result is None:
    ...
```

Do not write `if x is 256` or `if name is "Ada"`. Those can appear to work and then fail.

## Boolean operators

```python
True and False    # False
True or False     # True
not True          # False
```

`and` and `or` short-circuit and return one of the operands, not necessarily a bool:

```python
"" or "fallback"     # "fallback"
"hello" and "world"  # "world"
```

This is why `name = raw or "anonymous"` is a common idiom.

## Membership and identity

```python
"py" in "python"     # True
3 in [1, 2, 3]       # True
"age" in {"age": 9}  # True  — checks keys, not values
```

`not in` is the negation.

## Bitwise (you will need these later)

```python
5 & 3    # 1    bitwise AND
5 | 3    # 7    bitwise OR
5 ^ 3    # 6    bitwise XOR
5 << 1   # 10   shift left (multiply by 2)
5 >> 1   # 2    shift right
```

Useful for flags and some performance-sensitive code. Skip them until a problem asks for them.

## Assignment operators

```python
n = 10
n += 2     # n = n + 2
n *= 3
```

There is no `++`. Write `n += 1`.

Walrus operator (`:=`) assigns *inside* an expression (Python 3.8+):

```python
if (length := len(items)) > 10:
    print(f"too many: {length}")
```

Use it when you would otherwise compute the same value twice. Do not sprinkle it everywhere.

## Operator precedence (the useful subset)

Highest to lowest, roughly: `**`, unary `+`/`-`, `* / // %`, `+ -`, comparisons, `not`, `and`, `or`. When in doubt, use parentheses. Clarity beats memorizing the table.

## Common mistakes

- `=` vs `==`.
- Expecting `/` to return an `int`. Use `//` when you want an integer.
- Writing `if n == 1 or 2` — that is always true, because `2` is truthy. Write `if n in (1, 2)`.

## Try this

1. Determine whether a year `year` is a leap year: divisible by 4, but not by 100 unless also by 400.
2. Rewrite `if x > 0 and x < 10` using a chained comparison.
3. Predict `0 or 1 and 2 or 3` before you run it. Then run it.

**Hints:** Leap year: `(year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)`. `and` binds tighter than `or`.
