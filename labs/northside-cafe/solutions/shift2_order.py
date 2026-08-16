class UnknownItem(Exception):
    """Raised when a name is not on the menu."""


class Menu:
    def __init__(self, prices):
        self.prices = dict(prices)

    def price(self, name):
        if name not in self.prices:
            raise UnknownItem(name)
        return self.prices[name]


class Order:
    def __init__(self, menu):
        self.menu = menu
        self.items = []

    def add(self, name):
        self.menu.price(name)  # raises if unknown
        self.items.append(name)

    def subtotal(self):
        return sum(self.menu.price(name) for name in self.items)

    def __repr__(self):
        return f"Order({self.items!r})"
