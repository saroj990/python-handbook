# Quiz — Intermediate

**1.** When should you use a generator expression instead of a list comprehension?

<details>
<summary>Answer</summary>

When you iterate once and the source is large — `sum(n*n for n in range(1_000_000))`. A generator is exhausted after one pass.
</details>

**2.** Why catch `ValueError` instead of `Exception` when `int(text)` fails?

<details>
<summary>Answer</summary>

`int("x")` raises `ValueError`. Catching `Exception` also swallows bugs you did not mean to handle (`AttributeError`, `KeyboardInterrupt` if you go even wider). Narrow catch, then recover.
</details>

**3.** `self` in a method — who passes it?

<details>
<summary>Answer</summary>

Python does, when you write `acct.deposit(40)`. That call is `BankAccount.deposit(acct, 40)`. Forgetting `self` in the `def` gives the confusing “takes 1 positional argument but 2 were given”.
</details>

**4.** What is the difference between an iterable and an iterator?

<details>
<summary>Answer</summary>

An iterable can produce an iterator (`iter(x)`). An iterator is single-pass and implements `__next__`. A list is iterable many times. A generator is an iterator: one pass, then empty.
</details>

**5.** What does `@functools.wraps(fn)` save you from?

<details>
<summary>Answer</summary>

Your wrapper stealing the original name and docstring. Without it, `help()` and stack traces say `wrapper`.
</details>

**6.** Naive vs aware `datetime` — which one should leave your laptop?

<details>
<summary>Answer</summary>

Aware. Naive datetimes have no timezone. Subtracting naive from aware raises. Prefer `datetime.now(timezone.utc)` or `zoneinfo`.
</details>
