"""Shift 2, step 10 — an Order that refuses unknown items."""


class UnknownItem(Exception):
    """Raised when a name is not on the menu."""


class Menu:
    def __init__(self, prices):
        self.prices = dict(prices)

    def price(self, name):
        raise NotImplementedError


class Order:
    def __init__(self, menu):
        self.menu = menu
        self.items = []

    def add(self, name):
        raise NotImplementedError

    def subtotal(self):
        raise NotImplementedError

    def __repr__(self):
        return f"Order({self.items!r})"


if __name__ == "__main__":
    menu = Menu({"latte": 4.50, "muffin": 2.75})
    order = Order(menu)
    order.add("latte")
    order.add("muffin")
    print(order, "subtotal", order.subtotal())
    try:
        order.add("lasagna")
    except UnknownItem as exc:
        print("rejected", exc)
