# 03 — Object-oriented Python

> **~40 min** · Build: `Menu` and `Order` objects.  
> **Then:** [starter `shift2_order.py`](../labs/northside-cafe/starters/shift2_order.py)

A class is a blueprint for objects that carry data (attributes) and behavior (methods). Use classes when several pieces of data travel together and share operations. A function plus a dict is enough when they do not.

## A first class

```python
class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.balance += amount

    def withdraw(self, amount: float) -> None:
        if amount > self.balance:
            raise ValueError("insufficient funds")
        self.balance -= amount

    def __repr__(self) -> str:
        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"
```

`__init__` is the constructor. `self` is the instance. `__repr__` should look like a constructor call so debugging prints are useful. `!r` uses `repr()` on the value.

```python
acct = BankAccount("Ada", 100)
acct.deposit(40)
print(acct.balance)    # 140
```

## Class attributes vs instance attributes

```python
class Counter:
    created = 0              # shared by all instances

    def __init__(self) -> None:
        Counter.created += 1
        self.value = 0       # per instance
```

A class attribute is the default. Assigning `self.created = ...` creates an *instance* attribute that shadows it. Be explicit: mutate `Counter.created` or `type(self).created`.

## Inheritance

```python
class SavingsAccount(BankAccount):
    def __init__(self, owner: str, balance: float = 0.0, rate: float = 0.02) -> None:
        super().__init__(owner, balance)
        self.rate = rate

    def apply_interest(self) -> None:
        self.balance *= 1 + self.rate
```

`super()` calls the next method in the Method Resolution Order (MRO). Always use it instead of hard-coding `BankAccount.__init__`.

Check types with `isinstance(acct, BankAccount)` (true for subclasses) and `type(acct) is BankAccount` only when you need the exact class.

## Special methods (a useful subset)

| Method | Called by |
|---|---|
| `__repr__` | `repr(x)`, debugging |
| `__str__` | `str(x)`, `print` |
| `__eq__` | `x == y` |
| `__lt__` / `@total_ordering` | sorting |
| `__len__` | `len(x)` |
| `__getitem__` | `x[key]` |
| `__iter__` | `for item in x` |
| `__enter__` / `__exit__` | `with` (next lesson) |
| `__call__` | `x()` |

```python
from functools import total_ordering

@total_ordering
class Version:
    def __init__(self, major: int, minor: int) -> None:
        self.major = major
        self.minor = minor

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Version):
            return NotImplemented
        return (self.major, self.minor) == (other.major, other.minor)

    def __lt__(self, other: object) -> bool:
        if not isinstance(other, Version):
            return NotImplemented
        return (self.major, self.minor) < (other.major, other.minor)
```

Return `NotImplemented` (the singleton) when you cannot compare, so Python can try the other operand.

## Properties

```python
class Celsius:
    def __init__(self, temperature: float) -> None:
        self.temperature = temperature

    @property
    def fahrenheit(self) -> float:
        return self.temperature * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value: float) -> None:
        self.temperature = (value - 32) * 5 / 9
```

A property looks like an attribute (`obj.fahrenheit`) but runs code. Use it to keep a computed value in sync or to validate on assignment.

## Composition over deep hierarchies

Prefer "has a" to long inheritance trees:

```python
class Ledger:
    def __init__(self) -> None:
        self.accounts: list[BankAccount] = []
```

Three levels of inheritance is usually enough to start questioning the design.

## Dataclasses (preview)

For records that are mostly data, `@dataclass` writes `__init__`, `__repr__`, and `__eq__` for you. The advanced section covers this in full. Reach for a dataclass before you write a 20-line boilerplate class.

## Common mistakes

- Forgetting `self` on methods. The error (`takes 1 positional argument but 2 were given`) is confusing the first time.
- Mutable class attributes (`tags: list[str] = []` on the class). Same bug as mutable default arguments.
- Implementing `__eq__` without considering `NotImplemented` and hashing (`__hash__ = None` if the object is mutable).

## Try this

1. Write a `Rectangle(width, height)` with `area` and `perimeter` methods and a useful `__repr__`.
2. Add a `Square` subclass that requires `width == height`.
3. Give `Rectangle` a `@property` `area` instead of a method.

**Hints:** Store `width` and `height`. In `Square.__init__`, if they differ, raise `ValueError`. `@property def area(self): return self.width * self.height`.
