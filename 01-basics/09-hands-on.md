# Hands-on — Basics

Type every example into a file or the REPL. Run it. Change one number and run it again. That is the whole skill.

Save scripts in a folder of your own, not inside the handbook, unless you are fine deleting them later.

---

## 1. Open the register

```python
shop = "Northside Café"
print(shop)
print("open")
```

Expected:

```text
Northside Café
open
```

**Tweak:** print the shop name three times with `shop * 3` — notice there are no spaces.

---

## 2. Price a drink

```python
latte = 4.50
tax_rate = 0.08
tax = latte * tax_rate
total = latte + tax
print(latte, tax, total)
print(type(latte), type(tax_rate))
```

`latte` and `tax` are `float`. The total should be `4.86`.

**Tweak:** set `latte = "4.50"` and run again. You should get a `TypeError`. Convert with `float(...)` to fix it.

---

## 3. Make change

A customer pays with a 10-dollar note.

```python
price = 4.50
paid = 10
change = paid - price
print(f"change: ${change:.2f}")
print("enough?", paid >= price)
print("needs two notes?", price > 5)
```

**Tweak:** try `price = 12`. The change goes negative. Add an `if` later (example 7) to refuse that.

---

## 4. A receipt line

```python
item = "latte"
price = 4.5
print(f"{item.upper():<12} ${price:>6.2f}")
print(f"{'tax':<12} ${price * 0.08:>6.2f}")
```

Expected something like:

```text
LATTE        $  4.50
tax          $  0.36
```

`:<12` left-aligns in 12 characters. `:>6.2f` is a right-aligned amount with two decimals.

---

## 5. The menu is a dict

```python
MENU = {"latte": 4.50, "espresso": 3.00, "muffin": 2.75, "tea": 2.50}
cart = ["latte", "muffin", "latte"]

subtotal = 0.0
for name in cart:
    print(name, MENU[name])
    subtotal += MENU[name]
print("subtotal", subtotal)
print("unique items", set(cart))
```

Subtotal is `11.75`. The set drops the duplicate latte.

**Tweak:** add `"scone": 3.25` to `MENU` and put `"scone"` in the cart.

---

## 6. Loyalty: every 3rd drink is tagged

```python
for n in range(1, 11):
    if n % 3 == 0:
        print(n, "stamp")
    else:
        print(n, "regular")
```

You should see `stamp` on 3, 6, 9.

**Tweak:** also print `bonus` when `n` is a multiple of 5. Check 15 first if you combine the conditions.

---

## 7. A tiny order loop

```python
MENU = {"latte": 4.50, "tea": 2.50}
cart = []

while True:
    name = input("item (or done): ").strip().lower()
    if name == "done":
        break
    if name in MENU:
        cart.append(name)
        print("added", name)
    else:
        print("unknown item")

print("cart", cart)
print("n items", len(cart))
```

Run it. Type `latte`, then `soup`, then `done`. The cart should be `['latte']`.

---

## 8. Functions for tax and tip

```python
def tax_on(amount, rate=0.08):
    return amount * rate

def tip_on(amount, rate=0.15):
    return amount * rate

def total(amount):
    return amount + tax_on(amount) + tip_on(amount)

print(round(total(4.50), 2))
print(round(total(11.75), 2))
```

First total ≈ `5.54`. Second ≈ `14.45`.

**Tweak:** give `total` an optional `tip_rate` and pass `0` for no tip.

---

## 9. Unpack a row

```python
row = ("latte", 4.50, 2)
name, price, qty = row
line = price * qty
print(f"{qty} x {name} = {line:.2f}")

first, *rest = ["muffin", "tea", "scone"]
print(first)
print(rest)
```

---

## 10. Save the last order

```python
from pathlib import Path
import json

order = {"items": ["latte", "muffin"], "subtotal": 7.25}
path = Path("last_order.json")
path.write_text(json.dumps(order, indent=2), encoding="utf-8")

loaded = json.loads(path.read_text(encoding="utf-8"))
print(loaded["items"])
print(path.exists())
```

Open `last_order.json` in the editor. You should see real JSON, not Python dict syntax (keys in double quotes).

Then: [10 practice questions](10-practice.md).
