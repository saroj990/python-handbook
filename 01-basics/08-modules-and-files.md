# 08 — Modules, packages, and file I/O

> **~30 min** · Build: write `orders.json` and read it back.  
> **Then:** finish [Café Shift 1](../labs/northside-cafe/README.md#7-save-the-day) · [quiz](../quizzes/01-basics.md)

A program larger than one file is a set of modules. A module is just a `.py` file. A package is a directory of modules (often with `__init__.py`).

## Importing

```python
import math
math.sqrt(9)

from math import sqrt, pi
sqrt(9)

import math as m
m.pi
```

`from math import *` dumps names into your namespace. Avoid it. You will not know where a name came from.

The standard library is large. A few you will use immediately:

| Module | Use |
|---|---|
| `math` | `sqrt`, `log`, `ceil` |
| `random` | `randint`, `choice`, `shuffle` |
| `datetime` | dates and times (see intermediate) |
| `json` | `json.loads`, `json.dumps` |
| `pathlib` | paths as objects |
| `collections` | `Counter`, `defaultdict` |
| `sys` | `argv`, `exit` |
| `os` | environment, process (prefer `pathlib` for paths) |

## Your own modules

```
project/
  main.py
  greeter.py
```

`greeter.py`:

```python
def greet(name: str) -> str:
    return f"Hello, {name}."
```

`main.py`:

```python
from greeter import greet

if __name__ == "__main__":
    print(greet("Ada"))
```

`__name__` is `"__main__"` only when the file is run directly. When another file imports it, `__name__` is the module name. That guard keeps import side effects from running.

Run from the project directory:

```bash
python3 main.py
```

## Packages

```
project/
  app/
    __init__.py
    greeter.py
  main.py
```

```python
from app.greeter import greet
```

`__init__.py` can be empty. It marks the directory as a package (and can re-export public names).

## File I/O with `pathlib`

```python
from pathlib import Path

path = Path("notes.txt")
path.write_text("first line\nsecond line\n", encoding="utf-8")

text = path.read_text(encoding="utf-8")
lines = path.read_text(encoding="utf-8").splitlines()

path.exists()
path.suffix          # ".txt"
path.parent
```

For large files or line-by-line processing, open a stream:

```python
from pathlib import Path

with Path("notes.txt").open(encoding="utf-8") as f:
    for line in f:
        print(line.rstrip())
```

`with` closes the file even if an error occurs. Always specify `encoding="utf-8"` for text.

Binary mode:

```python
data = Path("image.png").read_bytes()
Path("copy.png").write_bytes(data)
```

## JSON

```python
import json
from pathlib import Path

record = {"name": "Ada", "year": 1815}
Path("ada.json").write_text(json.dumps(record, indent=2), encoding="utf-8")

loaded = json.loads(Path("ada.json").read_text(encoding="utf-8"))
```

JSON keys are strings. JSON has no tuples or sets — they become lists.

## Command-line arguments (minimal)

```python
import sys

# python3 main.py Alice
if len(sys.argv) > 1:
    name = sys.argv[1]
else:
    name = "world"
```

For real CLIs, use `argparse` (standard library) later.

## Common mistakes

- Opening a file and forgetting `with`, so the file stays open on an exception.
- Using `"r"` on Windows text files without `encoding` and getting mojibake.
- Circular imports: `a` imports `b` which imports `a`. Split shared code into a third module.

## Try this

1. Write `stats.py` with a function `mean(numbers)` and a `main` that reads numbers from a file, one per line, and prints the mean.
2. Save a dict of three cities and their populations to `cities.json` and read it back.
3. Use `Path(__file__).parent` to find a data file next to your script, regardless of the current working directory.

**Hints:** `sum(numbers) / len(numbers)` after converting each line with `float`. `json.dumps` / `json.loads`. `__file__` is the path of the current module.

---

Basics complete. Continue with [Comprehensions](../02-intermediate/01-comprehensions.md).
