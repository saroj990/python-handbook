# 07 — Dates, times, and regular expressions

> **~35 min** · Build: count orders that landed before 11:00.  
> **Then:** [drill `04_parse_date`](../practice/intermediate/04_parse_date.py) · [quiz](../quizzes/02-intermediate.md)

Two libraries you will meet in almost every real program: `datetime` for time, `re` for patterns in text.

## Dates and times

```python
from datetime import date, datetime, timedelta, timezone

date.today()
datetime.now()                              # naive: no timezone
datetime.now(timezone.utc)                  # aware

birthday = date(1815, 12, 10)
age_days = date.today() - birthday          # timedelta

later = datetime.now(timezone.utc) + timedelta(days=7, hours=3)
```

A **naive** datetime has no timezone. An **aware** one does. Never subtract one from the other. Prefer aware datetimes in anything that leaves your laptop (`timezone.utc`, or `zoneinfo` for named zones).

```python
from zoneinfo import ZoneInfo

paris = datetime.now(ZoneInfo("Europe/Paris"))
paris.astimezone(ZoneInfo("America/New_York"))
```

### Parsing and formatting

```python
datetime.strptime("2026-08-16", "%Y-%m-%d")
datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M")
date.fromisoformat("2026-08-16")
datetime.fromisoformat("2026-08-16T10:13:00+05:30")
```

ISO 8601 (`fromisoformat` / `isoformat`) is the right default for files and APIs. `strptime` is for messy human formats.

Common format codes: `%Y` year, `%m` month, `%d` day, `%H` hour 00-23, `%M` minute, `%S` second, `%A` weekday name.

### Timedelta arithmetic

```python
delta = timedelta(hours=2, minutes=15)
delta.total_seconds()
```

There is no `years=` on `timedelta` (years vary). For calendrical math ("add one month"), use a dedicated library or handle months yourself.

## Regular expressions

A regex describes a set of strings. Use it when `in`, `split`, and `strip` are not enough — emails, log lines, loosely structured text.

```python
import re

text = "Order #A-1042 shipped 2026-08-16"
match = re.search(r"Order #([A-Z]-(\d+))", text)
if match:
    match.group(0)    # whole match
    match.group(1)    # A-1042
    match.group(2)    # 1042
```

Raw strings (`r"..."`) keep backslashes literal. Always write regexes as raw strings.

### A compact pattern cheat sheet

| Pattern | Means |
|---|---|
| `.` | any character except newline |
| `\d` `\w` `\s` | digit, word char `[A-Za-z0-9_]`, whitespace |
| `\D` `\W` `\S` | the opposites |
| `^` `$` | start / end of string (or line with `re.M`) |
| `*` `+` `?` | 0+, 1+, 0 or 1 |
| `{m,n}` | between m and n |
| `[abc]` | one of a, b, c |
| `[^abc]` | not those |
| `a\|b` | a or b |
| `(...)` | capturing group |
| `(?:...)` | non-capturing group |

### Functions

```python
re.search(pattern, text)     # first match anywhere
re.match(pattern, text)      # only at the start
re.fullmatch(pattern, text)  # entire string
re.findall(r"\d+", text)     # list of strings (or tuples if groups)
re.finditer(r"\d+", text)    # iterator of match objects
re.sub(r"\s+", " ", text)    # replace
re.split(r"[,;]\s*", text)
```

Compile a pattern you use in a loop:

```python
ORDER = re.compile(r"Order #([A-Z]-\d+)")
ORDER.search(line)
```

### Flags

```python
re.search(r"^todo:", text, flags=re.IGNORECASE | re.MULTILINE)
```

`re.I` ignore case, `re.M` `^`/`$` per line, `re.S` dot matches newline, `re.X` verbose (whitespace and comments in the pattern).

### When not to use regex

- HTML or JSON. Use a parser.
- Simple prefix/suffix checks: `s.startswith`, `s.endswith`.
- Splitting on a single character: `s.split(",")`.

Regexes are easy to make unreadable and easy to get slightly wrong. Write a test for a few real examples and a few near-misses.

## Common mistakes

- Comparing naive and aware datetimes.
- Using `datetime.now()` for elapsed time. Use `time.perf_counter()`.
- Greedy `.*` eating more than you meant. Use `.*?` or a tighter character class.
- Parsing HTML with regex.

## Try this

1. Parse `"16/08/2026"` into a `date` and print it as ISO `2026-08-16`.
2. Extract all email-like tokens from a sentence with `findall`. A simple pattern is enough: `[\w.-]+@[\w.-]+`.
3. Replace every run of whitespace in a string with a single space.

**Hints:** `datetime.strptime(..., "%d/%m/%Y").date().isoformat()`. `re.findall(r"[\w.-]+@[\w.-]+", text)`. `re.sub(r"\s+", " ", text).strip()`.

---

Intermediate complete. Continue with [Type hints](../03-advanced/01-type-hints.md).
