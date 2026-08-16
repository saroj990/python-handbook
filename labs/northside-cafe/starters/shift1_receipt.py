"""Shift 1, step 6 — fill in the functions, then run this file.

    python3 labs/northside-cafe/starters/shift1_receipt.py
"""

MENU = {
    "latte": 4.50,
    "espresso": 3.00,
    "muffin": 2.75,
    "tea": 2.50,
}

TAX_RATE = 0.08
TIP_RATE = 0.15


def subtotal(cart, menu=MENU):
    """Sum of menu prices for each name in cart."""
    raise NotImplementedError


def tax_and_tip(amount, tax_rate=TAX_RATE, tip_rate=TIP_RATE):
    """Return (tax, tip) on a pre-tax amount. Tip is on the pre-tax amount."""
    raise NotImplementedError


def format_receipt(cart, menu=MENU):
    """Return a multi-line receipt string. See the café lab for the layout."""
    raise NotImplementedError


if __name__ == "__main__":
    cart = ["latte", "latte", "muffin"]
    print(format_receipt(cart))
    print("subtotal", subtotal(cart))
    print("tax, tip", tax_and_tip(subtotal(cart)))
