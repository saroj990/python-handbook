# 01 — Type hints

> **~30 min** · Build: annotate `subtotal` so the editor catches a string price.  
> **Then:** [drill `01_first`](../practice/advanced/01_first.py)

Type hints document the contract of a function. They are not enforced at runtime by Python itself. Tools such as `mypy`, `pyright`, and your editor read them and catch mismatches before you run the code.

```python
def greet(name: str, times: int = 1) -> str:
    return " ".join([f"Hello, {name}."] * times)
```

## Built-in generics (3.9+)

```python
def unique(items: list[str]) -> set[str]:
    return set(items)

def index(rows: list[dict[str, int]]) -> dict[str, int]:
    ...
```

Older code uses `from typing import List, Dict, Set`. In new code, prefer the built-ins: `list[int]`, `dict[str, int]`, `tuple[int, str]`, `set[str]`.

A tuple of unknown length: `tuple[int, ...]`. A fixed pair: `tuple[str, int]`.

## Optional, unions, and `None`

```python
def find(name: str) -> str | None:
    ...
```

`str | None` is the modern form of `Optional[str]`. A value that can be two types: `int | str`.

After you check, the type checker *narrows*:

```python
user = find("ada")
if user is None:
    return
print(user.upper())    # user is str here
```

## `Any`, `object`, and when to stay vague

- `Any` turns the checker off for that value. Use it as an escape hatch, not a habit.
- `object` means "I will not touch this except to pass it through."
- If you truly do not know, `object` is more honest than `Any`.

## Type aliases and `TypeAlias`

```python
type JSON = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None
# 3.12+ syntax. On 3.10/3.11:
# JSON = dict[str, Any]  or a TypeAlias
```

Use aliases when the same nested type appears in several signatures.

## Protocols (structural typing)

You do not always need a shared base class. A protocol describes the methods you need:

```python
from typing import Protocol

class Closable(Protocol):
    def close(self) -> None: ...

def shutdown(resource: Closable) -> None:
    resource.close()
```

Anything with a `close()` method is accepted — files, sockets, your own objects. This is typing for duck typing.

## Generics

```python
from typing import TypeVar

T = TypeVar("T")

def first(items: list[T]) -> T:
    return items[0]
```

Python 3.12:

```python
def first[T](items: list[T]) -> T:
    return items[0]
```

`first` returns the same type that is in the list. Without a TypeVar, the checker would only know `list[object]` or similar.

## `TypedDict` and `Literal`

```python
from typing import TypedDict, Literal

class UserRow(TypedDict):
    name: str
    year: int

def paint(color: Literal["red", "green", "blue"]) -> None:
    ...
```

`TypedDict` types dicts you cannot yet turn into a dataclass (JSON APIs). `Literal` restricts a value to a small set of constants.

## Casts and runtime checks

```python
from typing import cast

value = cast(int, unknown)   # tell the checker; does nothing at runtime
```

`cast` is a lie you take responsibility for. Prefer `isinstance` when the value is truly unknown.

At runtime you can use `typing.get_type_hints` or libraries like `pydantic` (next lesson) if you need enforcement.

## Running a checker

```bash
pip install mypy
mypy your_module.py
```

Start with `mypy --strict` on new modules. Relax file-by-file on legacy code rather than turning the whole project off.

## Common mistakes

- Annotating everything as `Any` "to make mypy happy." You have gained nothing.
- Using `list` without a parameter when you mean `list[str]`.
- Forgetting that `x: list[int] | None` is not the same as `x: list[int | None]`.

## Try this

1. Annotate `def clamp(n, lo, hi)` so all three arguments and the return value are `float`.
2. Write a `Protocol` named `Reader` with `read(self) -> str`. Type a function that takes a `Reader`.
3. Give `def pairwise(items: list[T])` a return type of `list[tuple[T, T]]`.

**Hints:** `def clamp(n: float, lo: float, hi: float) -> float`. Any object with `.read()` satisfies the protocol. `TypeVar("T")` on both the input list and the pairs.
