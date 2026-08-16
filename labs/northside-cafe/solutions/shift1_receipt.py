MENU = {
    "latte": 4.50,
    "espresso": 3.00,
    "muffin": 2.75,
    "tea": 2.50,
}

TAX_RATE = 0.08
TIP_RATE = 0.15


def subtotal(cart, menu=MENU):
    return sum(menu[name] for name in cart)


def tax_and_tip(amount, tax_rate=TAX_RATE, tip_rate=TIP_RATE):
    return amount * tax_rate, amount * tip_rate


def format_receipt(cart, menu=MENU):
    lines = []
    for name in cart:
        lines.append(f"{name.upper():<18} $ {menu[name]:>6.2f}")
    sub = subtotal(cart, menu)
    tax, tip = tax_and_tip(sub)
    total = sub + tax + tip
    lines.append(f"{'Tax 8%':<18} $ {tax:>6.2f}")
    lines.append(f"{'Tip 15%':<18} $ {tip:>6.2f}")
    lines.append("-" * 27)
    lines.append(f"{'TOTAL':<18} $ {total:>6.2f}")
    return "\n".join(lines)


if __name__ == "__main__":
    cart = ["latte", "latte", "muffin"]
    print(format_receipt(cart))
