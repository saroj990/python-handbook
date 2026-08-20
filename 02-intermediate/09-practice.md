# Practice — Intermediate

Write a small solution first. Open the spoiler only to compare.

---

**1.** Using a comprehension, from `words = ["to", "be", "or", "not"]` build a dict of word → length. What is the value for `"not"`?

<details>
<summary>Answer</summary>

`{"to": 2, "be": 2, "or": 2, "not": 3}` via `{w: len(w) for w in words}`.
</details>

**2.** `sum(n*n for n in range(1_000_000))` vs `[n*n for n in range(1_000_000)]` then `sum`. Which allocates a million-item list?

<details>
<summary>Answer</summary>

The square-bracket version. Parentheses make a generator: values are produced, then discarded.
</details>

**3.** Write `safe_div(a, b)` that returns `None` when `b` is 0. Do not use a pre-check; use `try`.

<details>
<summary>Answer</summary>

```python
def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
```
</details>

**4.** Why catch `UnknownItem` instead of `Exception` at the register?

<details>
<summary>Answer</summary>

`Exception` also swallows bugs (`AttributeError`, typos). Catch the error you can recover from; let the rest fail loudly.
</details>

**5.** `Order` needs `add` and `subtotal`. What does a useful `__repr__` look like in the REPL?

<details>
<summary>Answer</summary>

Something you could paste as a constructor: `Order(['latte', 'muffin'])`. Use `!r` on the list.
</details>

**6.** A generator `countdown(3)` — what is `list(countdown(3))` the **second** time you call `list` on the **same** object?

<details>
<summary>Answer</summary>

`[]`. Generators are single-pass. Call `countdown(3)` again to restart.
</details>

**7.** What does `@functools.wraps(fn)` change about a decorator?

<details>
<summary>Answer</summary>

The wrapper keeps `fn`'s `__name__` and docstring. Without it, `help()` and stack traces say `wrapper`.
</details>

**8.** `Counter("abracadabra").most_common(2)` — name the two winning letters.

<details>
<summary>Answer</summary>

`a` (5) and `b` (2), or `a` and `r` if ties break by first-seen — `r` also has 2. Check your Python: `most_common` orders by count, then by first appearance for ties. In 3.10+ you typically get `[('a', 5), ('b', 2)]`.
</details>

**9.** Parse `"16/08/2026"` into ISO `"2026-08-16"`.

<details>
<summary>Answer</summary>

`datetime.strptime("16/08/2026", "%d/%m/%Y").date().isoformat()`
</details>

**10.** Naive `datetime.now()` vs `datetime.now(timezone.utc)` — which should you send over the network?

<details>
<summary>Answer</summary>

The aware one (`timezone.utc` or a `ZoneInfo`). Naive datetimes have no timezone; mixing naive and aware raises.
</details>

---

Next: [Café Shift 2](../labs/northside-cafe/README.md#shift-2--run-the-floor-intermediate) and the [intermediate quiz](../quizzes/02-intermediate.md).
