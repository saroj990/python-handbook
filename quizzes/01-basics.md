# Quiz — Basics

Close the lessons. Answer on paper or in a scratch file. Then open the spoiler.

**1.** What does `bool("False")` return, and why?

<details>
<summary>Answer</summary>

`True`. Any non-empty string is truthy, including `"False"` and `"0"`.
</details>

**2.** You write `b = a` where `a` is a list, then `b.append(1)`. What happened to `a`?

<details>
<summary>Answer</summary>

`a` gained `1` as well. Assignment binds a name; it does not copy the list. Use `a.copy()`.
</details>

**3.** Why is `if n == 1 or 2` the wrong way to test “n is 1 or 2”?

<details>
<summary>Answer</summary>

`2` is always truthy, so the whole condition is always true. Write `n in (1, 2)` or `n == 1 or n == 2`.
</details>

**4.** A latte is $4.50, tax 8%, tip 15% on the pre-tax price. What is the total?

<details>
<summary>Answer</summary>

`4.50 * 1.23 = 5.535`, which you print as `5.54` with two decimal places. Compute it; do not hard-code.
</details>

**5.** Why is `def add(item, bucket=[])` a bug?

<details>
<summary>Answer</summary>

The default list is created once, when the function is defined. Every call that omits `bucket` shares that same list. Use `bucket=None` and create a new list inside.
</details>

**6.** `print` vs `return` — which one does the *caller* get?

<details>
<summary>Answer</summary>

`return`. `print` only displays. A function that prints and does not return yields `None`.
</details>
