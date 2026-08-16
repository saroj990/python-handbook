# 02 — Variables and data types

> **~25 min** · Build: store a latte price and compute tax.  
> **Then:** [drill `06_celsius`](../practice/basics/06_celsius.py) · [Café step 2](../labs/northside-cafe/README.md#2-price-a-drink)

A variable is a name bound to a value. Python does not declare types at the name; the *value* has a type.

```python
count = 3
label = "apples"
ready = True
```

Names are case-sensitive. `count` and `Count` are different. Use `snake_case` for variables and functions.

## The built-in types you will use first

| Type | Example | Meaning |
|---|---|---|
| `int` | `42`, `-7` | Whole numbers, unlimited size |
| `float` | `3.14`, `1e-3` | Floating-point (IEEE 754 double) |
| `bool` | `True`, `False` | Boolean; a subclass of `int` |
| `str` | `"hi"`, `'hi'` | Text (Unicode) |
| `None` | `None` | The absence of a value |

```python
>>> type(42)
<class 'int'>
>>> type(3.14)
<class 'float'>
>>> type(True)
<class 'bool'>
>>> type(None)
<class 'NoneType'>
```

`type()` is useful while learning. In real code, prefer `isinstance(x, int)` when you must check.

## Assignment is binding, not copying a box

```python
a = [1, 2, 3]
b = a          # b and a refer to the same list
b.append(4)
print(a)       # [1, 2, 3, 4]
```

For immutable values (`int`, `float`, `str`, `tuple`) this rarely surprises you. For lists and dicts it does. To copy a list: `b = a.copy()` or `b = list(a)`.

## Multiple assignment

```python
x, y = 10, 20
x, y = y, x          # swap without a temp
name, age = "Lin", 31
```

The number of names on the left must match the number of values on the right, unless you use starred unpacking:

```python
first, *rest = [1, 2, 3, 4]
# first == 1, rest == [2, 3, 4]
```

## Conversion

```python
int("42")        # 42
float("3.5")     # 3.5
str(42)          # "42"
bool(0)          # False
bool("0")        # True  — non-empty strings are truthy
```

`int("3.14")` raises `ValueError`. Convert through `float` first, or use `int(float("3.14"))`.

Values that are false in a boolean context: `False`, `0`, `0.0`, `""`, `[]`, `{}`, `set()`, `None`. Everything else is true.

## Numbers in a bit more depth

```python
10 / 3      # 3.333...   always a float
10 // 3     # 3          floor division
10 % 3      # 1          remainder
2 ** 10     # 1024       power
```

Floats are approximations:

```python
>>> 0.1 + 0.2
0.30000000000000004
```

For money or exact decimals, use `decimal.Decimal`. For data science you will usually stay with `float` and be aware of rounding.

## Constants (by convention)

Python has no true constants. Uppercase names signal "do not rebind this":

```python
MAX_RETRIES = 3
API_URL = "https://example.com"
```

## Common mistakes

- Using `=` (assignment) where you meant `==` (equality).
- Treating `None` as the string `"None"`.
- Mutating a list you thought you had copied.

## Try this

1. Bind `celsius = 20` and compute Fahrenheit: `f = celsius * 9 / 5 + 32`.
2. What does `bool("False")` return? Check, then explain why.
3. Unpack `"one two three".split()` into three names.

**Hints:** Any non-empty string is truthy, including `"False"` and `"0"`. `split()` with no arguments splits on whitespace and returns a list.
