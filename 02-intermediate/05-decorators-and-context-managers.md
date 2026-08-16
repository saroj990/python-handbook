# 05 — Decorators and context managers

> **~35 min** · Build: `@timed` on the close-out report.  
> **Then:** [Café step 12](../labs/northside-cafe/README.md#12-time-the-close-out)

Two tools for wrapping behavior: decorators wrap *functions* (or classes); context managers wrap *blocks* of code, especially setup and teardown.

## Decorators

A decorator is a callable that takes a function and returns a function.

```python
import functools
import time

def timed(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = fn(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{fn.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timed
def work(n: int) -> int:
    return sum(range(n))
```

`@timed` is the same as `work = timed(work)`.

`@functools.wraps(fn)` copies the original name and docstring onto `wrapper`. Without it, stack traces and `help()` show `wrapper`.

## Decorators with arguments

You need an extra layer: a factory that returns the actual decorator.

```python
def repeat(times: int):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(times):
                result = fn(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def ping():
    print("pong")
```

## Class as a decorator, and decorating methods

A class with `__call__` can be a decorator. More commonly you decorate methods:

```python
class Cached:
    def __init__(self):
        self._value = None

    @property
    def value(self):
        return self._value
```

`@staticmethod` and `@classmethod` are built-in decorators:

```python
class User:
    def __init__(self, name: str) -> None:
        self.name = name

    @classmethod
    def from_email(cls, email: str) -> "User":
        return cls(email.split("@")[0])

    @staticmethod
    def valid_email(email: str) -> bool:
        return "@" in email
```

`classmethod` receives the class (`cls`), so subclasses get the subclass. `staticmethod` is just a function namespaced on the class — often a plain module-level function is clearer.

`@functools.cache` (3.9+) memoizes a pure function:

```python
from functools import cache

@cache
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
```

Only cache functions whose result depends solely on the arguments, with hashable arguments.

## Context managers

`with` guarantees cleanup:

```python
with open("notes.txt", encoding="utf-8") as f:
    text = f.read()
# file is closed here, even if read() failed
```

A class-based context manager:

```python
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc, tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"block took {self.elapsed:.4f}s")
        return False   # do not swallow exceptions

with Timer():
    work(1_000_000)
```

`__exit__` receives exception info. Return `True` only if you handled the exception and want it suppressed.

## `contextlib`

```python
from contextlib import contextmanager, suppress, ExitStack

@contextmanager
def chdir(path):
    import os
    previous = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(previous)

with suppress(FileNotFoundError):
    Path("optional.txt").unlink()
```

`ExitStack` lets you enter a dynamic number of context managers (for example, opening N files).

## Common mistakes

- Forgetting `@wraps`, then wondering why the function is named `wrapper`.
- Caching a function that depends on global or current time.
- Returning `True` from `__exit__` by accident and hiding bugs.

## Try this

1. Write a `@logged` decorator that prints the function name and arguments before the call.
2. Write a `opened(path, mode)` context manager using `@contextmanager` that opens and closes a file.
3. Time a block with `Timer` and store `elapsed` on the instance so the caller can read it after the `with`.

**Hints:** `print(fn.__name__, args, kwargs)` then `return fn(...)`. `f = open(...); try: yield f; finally: f.close()`. Bind `timer = Timer()` and `with timer:`.
