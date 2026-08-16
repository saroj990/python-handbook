"""Divide a by b. Return None when b is 0 instead of raising.

Lesson: 02-intermediate/02-error-handling.md
"""


def safe_div(a, b):
    raise NotImplementedError


def run_checks():
    assert safe_div(10, 2) == 5, f"10/2 → {safe_div(10, 2)!r}"
    assert safe_div(1, 0) is None, f"1/0 should be None, got {safe_div(1, 0)!r}"
    assert safe_div(0, 2) == 0, f"0/2 → {safe_div(0, 2)!r}"
