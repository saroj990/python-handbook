# 01 — Getting started

> **~20 min** · Build: print that the shop is open.  
> **Then:** [Café step 1](../labs/northside-cafe/README.md#1-open-the-shop) · tick [PROGRESS](../PROGRESS.md)

Python is a general-purpose language. You write plain text, the interpreter runs it, and you get a result. That loop — write, run, inspect — is the whole craft.

## Install

On macOS and most Linux systems, `python3` is already available or one command away:

```bash
python3 --version
```

You want 3.10 or newer. If the command is missing:

- **macOS:** `brew install python` (Homebrew) or download from [python.org](https://www.python.org/downloads/)
- **Windows:** install from [python.org](https://www.python.org/downloads/) and tick **Add Python to PATH**
- **Linux:** `sudo apt install python3 python3-venv python3-pip` (Debian/Ubuntu)

Confirm `pip` as well:

```bash
python3 -m pip --version
```

Always invoke pip as `python3 -m pip`. That way you install into the same interpreter you run.

## The REPL

The REPL (Read-Eval-Print Loop) is an interactive scratchpad. Start it with:

```bash
python3
```

You should see `>>>`. Type an expression and press Enter:

```python
>>> 2 + 2
4
>>> print("hello")
hello
```

Exit with `exit()` or `Ctrl-D` (macOS/Linux) / `Ctrl-Z` then Enter (Windows).

Use the REPL to test a single idea. Use a file when the idea has more than a few lines.

## Your first script

Create a file named `hello.py`:

```python
name = "Ada"
print(f"Hello, {name}.")
```

Run it from the terminal:

```bash
python3 hello.py
```

The interpreter reads the file from top to bottom. There is no `main` function required, but as programs grow you will wrap the entry point (see [Functions](07-functions.md)).

## Comments and style

```python
# A comment starts with # and lasts until the end of the line.

"""
A triple-quoted string can span lines.
At the top of a file or function it is a docstring, not a comment.
"""
```

Python uses indentation (spaces, not tabs) to mark blocks. Four spaces is the convention. Mixing tabs and spaces is an error.

```python
if True:
    print("indented four spaces")
```

## Virtual environments (preview)

A virtual environment isolates the packages for one project so they do not collide with another. You will use this heavily in the data science section:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Your prompt usually gains a `(.venv)` prefix. `pip install` then stays inside that folder.

## Common mistakes

- Running `python` instead of `python3` on a machine where `python` is still 2.7.
- Saving a file as `python.py` or `test.py` in a way that shadows the standard library. Name scripts after *your* problem, not the language.
- Forgetting that the REPL and a script are different sessions. A variable you defined in the REPL is gone when you run a file.

## Try this

1. Print your name and the result of `7 * 6` from a script.
2. Start the REPL and evaluate `"Python" * 3`. Predict the result before you press Enter.
3. Create a virtual environment in this handbook folder and activate it.

**Hints:** `print()` can take several arguments separated by commas. String multiplication repeats the string. `python3 -m venv .venv` then `source .venv/bin/activate`.
