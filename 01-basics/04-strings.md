# 04 — Strings

> **~25 min** · Build: a receipt with lined-up prices.  
> **Then:** [drill `02_clean_email`](../practice/basics/02_clean_email.py) · [Café step 3](../labs/northside-cafe/README.md#3-print-a-receipt-line)

Strings are immutable sequences of Unicode characters. Once created, you cannot change a character in place; you build a new string.

```python
s = "Python"
s[0]          # "P"
s[-1]         # "n"
s[0:2]        # "Py"   slice: start inclusive, end exclusive
s[::2]        # "Pto"  every second character
```

`s[0] = "J"` raises `TypeError`. Write `s = "J" + s[1:]` if you must.

## Quotes and raw strings

```python
'single'
"double"
"""triple, can span
lines"""
r"C:\new\temp"     # raw: backslashes are literal
```

Use double quotes as the default; switch when the string itself contains `"`.

## Useful methods

```python
text = "  Hello, World  "
text.strip()                 # "Hello, World"
text.lower()                 # "  hello, world  "
text.upper()
"hello, world".title()       # "Hello, World"
"world" in text.lower()      # True
text.replace("World", "Ada")
"a,b,c".split(",")           # ["a", "b", "c"]
"-".join(["a", "b", "c"])    # "a-b-c"
"42".isdigit()               # True
"hello".startswith("he")
```

Methods return new strings. The original is unchanged.

## f-strings (preferred formatting)

```python
name = "Ada"
n = 3
print(f"{name} has {n} apples")
print(f"{n:.2f}")            # 3.00
print(f"{name:>10}")         # right-align in 10 characters
print(f"{1_000_000:,}")      # 1,000,000
```

Older styles still appear in code you will read:

```python
"{} has {}".format(name, n)
"%s has %d" % (name, n)
```

Prefer f-strings in new code.

## Escape sequences

```python
"line\nbreak"
"tab\there"
"quote: \"hi\""
"backslash: \\"
```

## Encoding

A `str` is text. A `bytes` object is raw bytes. Convert at the edges (files, network):

```python
text = "café"
data = text.encode("utf-8")   # b'caf\xc3\xa9'
data.decode("utf-8")          # "café"
```

Always specify `encoding="utf-8"` when you open text files. Do not rely on the platform default.

## Common mistakes

- Forgetting that `strip()` only removes edges, not the middle.
- Using `+` in a loop to build a large string. Collect pieces in a list and `"".join(parts)`.
- Comparing strings with different case: `"Ada" == "ada"` is `False`. Normalize with `.casefold()` for case-insensitive compares.

## Try this

1. Given `email = "  Ada.Lovelace@Example.COM "`, produce a cleaned lowercase address with no surrounding spaces.
2. Turn `"red, green, blue"` into the string `"[red] [green] [blue]"`.
3. Write an f-string that prints `pi` to 4 decimal places (`pi = 3.14159265`).

**Hints:** `strip()` then `lower()`. `split(",")`, strip each piece, wrap in brackets, `join` with spaces. `{pi:.4f}`.
