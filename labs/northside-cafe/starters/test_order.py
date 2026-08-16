"""Shift 3, step 15 — run: pytest labs/northside-cafe/starters/test_order.py

Import Order from your finished shift2_order (or copy the class above this file).
"""

import pytest

from shift2_order import Menu, Order, UnknownItem


def test_empty_is_zero():
    order = Order(Menu({"latte": 4.50}))
    assert order.subtotal() == 0


def test_two_lattes():
    order = Order(Menu({"latte": 4.50}))
    order.add("latte")
    order.add("latte")
    assert order.subtotal() == 9.0


def test_unknown_raises():
    order = Order(Menu({"latte": 4.50}))
    with pytest.raises(UnknownItem):
        order.add("lasagna")
