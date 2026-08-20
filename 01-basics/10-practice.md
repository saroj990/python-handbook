# Practice — Basics

Close the lessons. Answer in a scratch file. Check the spoiler only after you have a run.

Each question is one small program. Ten greens and the section is yours.

---

**1.** Bind `celsius = 37` and print Fahrenheit using `c * 9 / 5 + 32`. What number do you get?

<details>
<summary>Answer</summary>

`98.6`. If you see `98` you used `//` instead of `/`.
</details>

**2.** What does `bool("")` return? What about `bool("0")`?

<details>
<summary>Answer</summary>

`False` and `True`. Only the empty string is falsy. `"0"` is non-empty.
</details>

**3.** A muffin is `2.75`. Print it as `$ 2.75` using an f-string with two decimal places.

<details>
<summary>Answer</summary>

`print(f"$ {2.75:.2f}")`
</details>

**4.** From `tags = ["oat", "oat", "soy", "oat"]`, build a list of unique tags **in first-seen order**.

<details>
<summary>Answer</summary>

Walk the list; keep a `seen` set; append only when the tag is new. Result: `["oat", "soy"]`. `list(set(tags))` loses order.
</details>

**5.** Write a loop that prints `fizz` for multiples of 3, `buzz` for 5, `fizzbuzz` for both, and the number otherwise, for `1` through `16`. What is the line for 15?

<details>
<summary>Answer</summary>

`fizzbuzz`. Check the “both” case first (`n % 15 == 0` or `n % 3 == 0 and n % 5 == 0`).
</details>

**6.** `if n == 1 or 2:` — for `n = 0`, does the body run? Why?

<details>
<summary>Answer</summary>

Yes. `2` is truthy, so `or 2` is always true. Write `n == 1 or n == 2` or `n in (1, 2)`.
</details>

**7.** Write `def clamp(n, lo, hi)` that returns `n` limited to `[lo, hi]`. What is `clamp(99, 0, 10)`?

<details>
<summary>Answer</summary>

`10`. `return max(lo, min(n, hi))`.
</details>

**8.** Why is `def add_item(item, bucket=[])` a bug? Write the fix.

<details>
<summary>Answer</summary>

The default list is created once. Later calls share it. Use `bucket=None` and `if bucket is None: bucket = []`.
</details>

**9.** `MENU["lasagna"]` raises. How do you get `"n/a"` instead without `try`?

<details>
<summary>Answer</summary>

`MENU.get("lasagna", "n/a")`. `[]` raises `KeyError`; `get` does not.
</details>

**10.** Write a 6-line script that writes `"closed\n"` to `status.txt` with UTF-8 and prints the file back.

<details>
<summary>Answer</summary>

```python
from pathlib import Path
p = Path("status.txt")
p.write_text("closed\n", encoding="utf-8")
print(p.read_text(encoding="utf-8"))
```

Always pass `encoding="utf-8"`.
</details>

---

When these feel easy: [Café Shift 1](../labs/northside-cafe/README.md#shift-1--open-the-shop-basics) and the [basics quiz](../quizzes/01-basics.md).
