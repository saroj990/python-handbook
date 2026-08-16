# 02 — Error handling

> **~30 min** · Build: raise `UnknownItem` instead of crashing the register.  
> **Then:** [drill `02_safe_div`](../practice/intermediate/02_safe_div.py) · [Café step 9](../labs/northside-cafe/README.md#9-unknown-drinks-are-errors)

Errors are values you did not plan for: a missing file, bad input, a network timeout. Python reports them as exceptions. You catch the ones you can recover from and let the rest fail loudly.

## Raising and catching

```python
def parse_positive(text: str) -> int:
    number = int(text)
    if number <= 0:
        raise ValueError(f"expected a positive int, got {number}")
    return number

try:
    value = parse_positive(user_input)
except ValueError as exc:
    print(f"could not parse: {exc}")
else:
    print("ok", value)
finally:
    print("always runs")
```

- `try`: the risky work.
- `except`: recovery for a *specific* type.
- `else`: runs if no exception was raised.
- `finally`: cleanup, whether or not something failed.

Catch the narrowest type you can handle. `except Exception` is a last resort (logging, then re-raise). Never write a bare `except:` — it also catches `KeyboardInterrupt` and `SystemExit`.

## Built-in exceptions you will see

| Exception | Typical cause |
|---|---|
| `ValueError` | Right type, wrong value (`int("x")`) |
| `TypeError` | Wrong type (`len(3)`) |
| `KeyError` | Missing dict key |
| `IndexError` | List index out of range |
| `FileNotFoundError` | Path does not exist |
| `ZeroDivisionError` | `/ 0` |
| `AttributeError` | Object has no such attribute |

`FileNotFoundError` is a subclass of `OSError`. Catch the subclass when that is all you mean.

## Re-raising and chaining

```python
try:
    raw = load()
except OSError as exc:
    raise RuntimeError("config is unreadable") from exc
```

`from exc` keeps the original traceback. That is what you want when you wrap a low-level error in a domain error.

Bare `raise` inside an `except` re-raises the same exception after you have logged or cleaned up.

## Custom exceptions

```python
class ConfigError(Exception):
    """Raised when a config file is invalid."""


class MissingKey(ConfigError):
    def __init__(self, key: str):
        super().__init__(f"missing key: {key}")
        self.key = key
```

Subclass `Exception`, not `BaseException`. Give the hierarchy names that match your problem (`ConfigError`, `ParseError`), not `MyError`.

## EAFP vs LBYL

Python style prefers **Easier to Ask Forgiveness than Permission**:

```python
# EAFP
try:
    config = json.loads(path.read_text())
except FileNotFoundError:
    config = {}

# LBYL (look before you leap)
if path.exists():
    config = json.loads(path.read_text())
else:
    config = {}
```

EAFP avoids race conditions (the file can vanish between `exists` and `read`). LBYL is fine when the check is cheap and not racy, such as `if x is None`.

## Assertions

```python
assert 0 <= probability <= 1, "probability out of range"
```

`assert` documents an invariant for developers. It can be stripped with `python -O`. Do not use it to validate user input or anything that must always run.

## Common mistakes

- Catching `Exception` and swallowing it (`except Exception: pass`). The bug disappears; the program limps on.
- Using exceptions for ordinary control flow in a tight loop. They are not free.
- Raising `Exception("message")` instead of a specific type.

## Try this

1. Write `def safe_div(a, b)` that returns `None` when `b` is 0 instead of raising.
2. Write `def read_json(path)` that raises your `ConfigError` if the file is missing or not valid JSON. Chain the original exception.
3. Catch both `ValueError` and `TypeError` in one `except` clause.

**Hints:** `try/except ZeroDivisionError`. `except (FileNotFoundError, json.JSONDecodeError) as exc: raise ConfigError(...) from exc`. `except (ValueError, TypeError):`.
