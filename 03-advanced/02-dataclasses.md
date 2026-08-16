# 02 — Dataclasses and structured data

> **~30 min** · Build: frozen `Money` in integer cents.  
> **Then:** [drill `02_money`](../practice/advanced/02_money.py) · [Café step 14](../labs/northside-cafe/README.md#14-type-the-money)

A dataclass is a class whose main job is to hold data. The decorator writes `__init__`, `__repr__`, and `__eq__` from the annotated fields.

```python
from dataclasses import dataclass, field

@dataclass
class User:
    name: str
    year: int
    tags: list[str] = field(default_factory=list)

ada = User("Ada", 1815)
ada.tags.append("mathematician")
```

`field(default_factory=list)` gives each instance its own list. `tags: list[str] = []` would share one list among all instances — the mutable-default bug again.

## Options you will actually use

```python
@dataclass(frozen=True, slots=True, order=True)
class Point:
    x: float
    y: float
```

- `frozen=True` — immutable; hashable if all fields are. Good for dict keys.
- `slots=True` (3.10+) — no `__dict__`; less memory, slightly faster attribute access.
- `order=True` — adds `<` `<=` from the field order, so you can sort.
- `kw_only=True` — constructor is keyword-only; call sites stay readable.

```python
from dataclasses import asdict, replace

asdict(ada)                    # {'name': 'Ada', 'year': 1815, 'tags': [...]}
replace(ada, year=1816)        # new instance if frozen; still a copy either way
```

## When a dataclass is the wrong tool

- Heavy behavior with little data — a regular class is clearer.
- Inheritance trees with overlapping fields — dataclasses can do this, but the rules around defaults get sharp. Prefer composition.
- Validating and coercing external input (JSON, forms) — use a validation library.

## Enums

```python
from enum import Enum, auto

class Status(Enum):
    PENDING = auto()
    DONE = auto()
    FAILED = auto()

Status.DONE
Status["DONE"]
Status.DONE.name     # "DONE"
Status.DONE.value
```

Use enums instead of magic strings for a closed set of states. Compare with `is` (`status is Status.DONE`).

## Structured input: pydantic (optional, widely used)

[pydantic](https://docs.pydantic.dev/) parses and validates data into typed models. It is not in the standard library. Install it when you accept JSON from the outside world.

```python
from pydantic import BaseModel, Field, EmailStr

class Signup(BaseModel):
    email: EmailStr
    age: int = Field(ge=13, le=120)
    terms: bool

user = Signup.model_validate({"email": "ada@example.com", "age": 36, "terms": True})
```

Wrong types or missing fields raise a validation error with a structured message. That is the difference from a dataclass, which will happily store `age="thirty"`.

A practical split:

| Source of data | Tool |
|---|---|
| Values you construct in code | `dataclass` |
| Values that arrive from JSON, forms, APIs | pydantic (or similar) |
| Closed set of names | `Enum` |

## `__post_init__`

```python
@dataclass
class Interval:
    start: int
    end: int

    def __post_init__(self) -> None:
        if self.end < self.start:
            raise ValueError("end before start")
```

Use `__post_init__` for invariants a type hint cannot express. Keep it cheap; it runs on every construction.

## Common mistakes

- Mutable defaults without `default_factory`.
- Making everything `frozen` and then needing to update one field in a loop — `replace` allocates a new object each time. That can be fine; measure if it is hot.
- Using a dataclass as a validation layer for untrusted input.

## Try this

1. Write a frozen `Money(amount: int, currency: str)` dataclass. Amount is integer cents.
2. Add `__post_init__` that rejects a negative amount and a currency that is not 3 letters.
3. Convert an instance to a dict and back by constructing `Money(**asdict(m))`.

**Hints:** `@dataclass(frozen=True)`. `if amount < 0` / `if len(currency) != 3 or not currency.isalpha()`. `asdict` then unpack.
