"""Unique values, first-seen order preserved.

Lesson: 01-basics/05-collections.md
"""


def unique_in_order(items):
    raise NotImplementedError


def run_checks():
    words = ["to", "be", "or", "not", "to", "be"]
    got = unique_in_order(words)
    assert got == ["to", "be", "or", "not"], f"expected ['to', 'be', 'or', 'not'], got {got!r}"
    assert unique_in_order([]) == [], f"empty should stay empty, got {unique_in_order([])!r}"
    assert unique_in_order([1, 1, 1]) == [1], f"expected [1], got {unique_in_order([1, 1, 1])!r}"
