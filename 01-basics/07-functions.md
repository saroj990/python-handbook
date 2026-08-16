# 07 — Functions

> **~35 min** · Build: `subtotal` and `tax_and_tip` you can call twice.  
> **Then:** [drills `01_clamp`, `05_word_count`](../practice/README.md) · [debug `03_mutable_default`](../practice/debug/03_mutable_default.py)

A function names a piece of work so you can reuse it, test it, and keep the rest of the program short.

```python
def greet(name: str) -> str:
    """Return a greeting for name."""
    return f"Hello, {name}."

print(greet("Ada"))
```

`def` creates a function object and binds it to the name `greet`. The body does not run until you call it.

## Return values

```python
def add(a, b):
    return a + b

def nothing():
    pass
```

A function that does not `return` yields `None`. `print` *displays*; `return` *hands a value back*. Do not confuse them.

You can return several values; they come back as a tuple:

```python
def minmax(values):
    return min(values), max(values)

lo, hi = minmax([3, 1, 4])
```

## Parameters

```python
def connect(host, port=5432, *, timeout=10, secure=True):
    ...
```

- `host` is required and positional-or-keyword.
- `port` has a default.
- `*` means everything after it is keyword-only. Callers must write `timeout=10`, not a bare third argument.

```python
connect("db.local")
connect("db.local", 3306, timeout=5)
connect("db.local", secure=False)
```

Never use a mutable default:

```python
# wrong
def add_item(item, bucket=[]):
    bucket.append(item)
    return bucket

# right
def add_item(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket
```

The default `[]` is created *once*, when the function is defined. Every call shares that same list.

## `*args` and `**kwargs`

```python
def logged(tag, *args, **kwargs):
    print(tag, args, kwargs)

logged("info", 1, 2, level="debug")
# info (1, 2) {'level': 'debug'}
```

`*args` is a tuple of extra positional arguments. `**kwargs` is a dict of extra keyword arguments. Use them to forward arguments, not as a dumping ground that hides the real interface.

Unpacking at the call site:

```python
nums = [1, 2, 3]
print(*nums)                 # print(1, 2, 3)
settings = {"sep": "-"}
print(1, 2, **settings)
```

## Scope

```python
rate = 0.1                   # global

def price(net):
    tax = net * rate         # reads global rate
    return net + tax
```

Assignment makes a name local, unless you say otherwise:

```python
count = 0

def bump():
    global count
    count += 1
```

Prefer returning a new value over `global`. Nested functions can use `nonlocal` to rebind a name in the enclosing function.

## First-class functions

Functions are values. You can pass them, store them, return them:

```python
def apply_twice(fn, x):
    return fn(fn(x))

apply_twice(lambda n: n + 1, 3)   # 5
```

`lambda` is a tiny anonymous function: `lambda args: expression`. Keep it to one expression. If it needs a name or a body, use `def`.

## Docstrings and type hints

The string right after `def` is the docstring. `help(greet)` shows it. Type hints (`name: str`, `-> str`) are optional at runtime but they document the contract. You will go deeper in the advanced section.

## Common mistakes

- Mutable default arguments.
- Forgetting `return` and wondering why the function "returns `None`".
- Using `print` inside a function that should return data. Print at the edges; return in the middle.

## Try this

1. Write `def clamp(n, lo, hi)` that returns `n` limited to `[lo, hi]`.
2. Write `def word_count(text)` that returns a dict of word → count. Split on whitespace and lowercase.
3. Write `def make_multiplier(factor)` that *returns a function* `f(x)` computing `x * factor`.

**Hints:** `max(lo, min(n, hi))`. `for word in text.lower().split():`. Inner `def multiply(x): return x * factor` then `return multiply`.
