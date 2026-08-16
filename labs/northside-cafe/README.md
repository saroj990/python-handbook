# Northside Café

Ada opened a corner café. The espresso machine is fine. The “system” is a notebook, a jar of receipts, and a guess about which pastry to bake.

You are the new hire who knows Python. Your job is to replace the notebook, one shift at a time.

```text
  customer ──► order ──► receipt ──► log.json ──► sales.csv ──► a decision
```

Work in `starters/`. Run a file with `python3 starters/shift1_receipt.py` from this folder (or from the handbook root, use the full path). There is no single correct style. There *is* a correct receipt: the numbers have to add up.

---

## Shift 1 — Open the shop (Basics)

Do this while you work through [01-basics](../../01-basics/). Each step names the lesson that unlocks it.

### 1. Open the shop

**After:** [Getting started](../../01-basics/01-getting-started.md)

Create `starters/hello_shop.py` and run it.

```python
shop = "Northside Café"
print(f"{shop} is open.")
```

Change the shop name. Run it again. That is the whole loop: edit, run, look.

### 2. Price a drink

**After:** [Variables](../../01-basics/02-variables-and-data-types.md) and [Operators](../../01-basics/03-operators.md)

A latte is `4.50`. Tax is `8%`. A tip is `15%` of the *pre-tax* price.

Print the tax, the tip, and the total, each on its own line. Use variables. Do not type the final numbers by hand.

**Check:** total should be `4.50 + 4.50 * 0.08 + 4.50 * 0.15`.

### 3. Print a receipt line

**After:** [Strings](../../01-basics/04-strings.md)

```text
LATTE               $ 4.50
Tax 8%              $ 0.36
Tip 15%             $ 0.68
--------------------
TOTAL               $ 5.54
```

Use f-strings and alignment (`{name:<18}`, `{amount:>6.2f}`). Prices are money: two decimal places, always.

### 4. A real menu

**After:** [Collections](../../01-basics/05-collections.md)

```python
MENU = {
    "latte": 4.50,
    "espresso": 3.00,
    "muffin": 2.75,
    "tea": 2.50,
}
```

Given `cart = ["latte", "latte", "muffin"]`, compute the subtotal by walking the list. Print each line and the subtotal.

**Stretch:** use a set to print the unique items in the cart, in any order.

### 5. Take orders

**After:** [Control flow](../../01-basics/06-control-flow.md)

In a `while True` loop, `input("item (or done): ")`.

- If the name is on the menu, add it to a cart list.
- If the name is `done`, break and print the receipt.
- Otherwise print `unknown item` and keep looping.

Type a few orders. Misspell one on purpose. You should not crash.

### 6. Functions you can reuse

**After:** [Functions](../../01-basics/07-functions.md)

Open [`starters/shift1_receipt.py`](starters/shift1_receipt.py). Fill in the three functions. Run:

```bash
python3 starters/shift1_receipt.py
```

You should see a total of `11.75` before tax for the sample cart, then tax and tip on that subtotal.

### 7. Save the day

**After:** [Modules and files](../../01-basics/08-modules-and-files.md)

After printing the receipt, write `orders.json` with the cart, subtotal, tax, tip, and total. Read it back and print `saved N items`.

You now have a shop that can take an order and remember it. That is Shift 1.

---

## Shift 2 — Run the floor (Intermediate)

The café is busy. Bad input happens. The close-out report should not be a pile of loops.

### 8. Popular items, one line

**After:** [Comprehensions](../../02-intermediate/01-comprehensions.md)

From a list of carts (a list of lists), build a flat list of every item sold, then a dict of `item → count`. Use a comprehension for the flat list. `Counter` is allowed if you have already read [Functional tools](../../02-intermediate/06-functional-tools.md).

### 9. Unknown drinks are errors

**After:** [Error handling](../../02-intermediate/02-error-handling.md)

Raise a custom `UnknownItem` when someone orders `"lasagna"`. Catch it at the input loop and keep the café open. Do not catch `Exception`.

### 10. `Order` and `Menu` objects

**After:** [Object-oriented Python](../../02-intermediate/03-object-oriented-python.md)

Open [`starters/shift2_order.py`](starters/shift2_order.py). An `Order` should accept items, refuse unknowns, and know its subtotal. `__repr__` should be useful in the REPL.

### 11. Replay the log

**After:** [Iterators and generators](../../02-intermediate/04-iterators-and-generators.md)

Write `def iter_orders(path)` that yields one parsed order at a time from a text log (one JSON object per line). Do not `json.loads` the whole file into a list if you can help it.

### 12. Time the close-out

**After:** [Decorators](../../02-intermediate/05-decorators-and-context-managers.md)

Decorate the report function with `@timed` so Ada can see how long close-out takes. Optional: a `closing(path)` context manager that writes `OPEN` / `CLOSED` into a status file.

### 13. When did they come in?

**After:** [Datetime and regex](../../02-intermediate/07-datetime-and-regex.md)

Parse lines like `2026-08-16 08:41  latte,latte,muffin`. Build a `datetime` and a cart. Count how many orders landed before 11:00.

---

## Shift 3 — Tighten the system (Advanced)

The code works. Now it has to survive a second developer (you, in a month).

### 14. Type the money

**After:** [Type hints](../../03-advanced/01-type-hints.md) and [Dataclasses](../../03-advanced/02-dataclasses.md)

A frozen `Money` type in integer cents. No floats in the core. Convert at the edges (`4.50` → `450`). `__post_init__` rejects negative cents.

### 15. Prove the receipt

**After:** [Testing](../../03-advanced/04-testing.md)

Write three pytest tests for `Order`: empty cart is `0`, two lattes, and unknown item raises. Run `pytest starters/test_order.py`.

### 16. Do not guess the slow part

**After:** [Performance](../../03-advanced/05-performance-and-internals.md)

Generate 50_000 fake carts. Time “count with a dict in a loop” vs `Counter`. Read the numbers. Keep the faster one in the report.

---

## Shift 4 — Read the books (Data science)

Ada wants a real answer, not a vibe:

> After we account for temperature, do weekends sell more?

This is the same question as the [end-to-end project](../../04-data-science/05-end-to-end-project.md), with café data.

### 17. Invent history, then distrust it

Generate a year of daily rows with [`data/generate_sales.py`](data/generate_sales.py):

```bash
python3 data/generate_sales.py
```

That writes `data/sales.csv`. Open it. There are missing values and a broken sensor on purpose.

### 18. Arrays first

**After:** [NumPy](../../04-data-science/01-numpy.md)

Load `sales` and `temp_c` with `np.loadtxt` or via pandas then `.to_numpy()`. Standardize temperature. Compute weekend vs weekday mean sales *without* a Python loop over rows.

### 19. Tables

**After:** [pandas](../../04-data-science/02-pandas.md)

Clean the impossible values. `groupby` month and weekend. Print a tidy summary table Ada could pin on the wall.

### 20. Show her

**After:** [Visualization](../../04-data-science/03-visualization.md)

Two panels: sales vs temperature (hue = weekend), and a box plot of sales by weekend. Save `weekend.png`. If the weekend box is not higher, your clean step ate the signal — go look.

### 21. Answer in sentences

**After:** [SciPy and the project](../../04-data-science/05-end-to-end-project.md)

Welch t-test on raw sales, then a linear model `sales ~ temp + is_weekend`. Beat a dummy mean baseline. Write five sentences in `answer.md`. Numbers plus a caveat. That file is the deliverable, not the notebook.

---

## If you get stuck

1. Re-run the smallest example from the lesson.
2. Print the type and the value (`print(type(x), x)`).
3. Compare with [`solutions/`](solutions/) — read one function, not the whole file.
4. Change one thing. Run again.

When Shift 4 is done, you have a shop, a log, a test, a plot, and a written answer. That is a portfolio piece. Put it in its own folder and keep going.
