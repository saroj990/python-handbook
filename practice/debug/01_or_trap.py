"""This function is supposed to return True when n is 1 or 2.

It has a classic bug. Fix the condition.

Lesson: 01-basics/03-operators.md
"""


def is_one_or_two(n):
    if n == 1 or 2:
        return True
    return False


def run_checks():
    assert is_one_or_two(1) is True
    assert is_one_or_two(2) is True
    assert is_one_or_two(3) is False, "3 is not 1 or 2 — the `or 2` is always truthy"
    assert is_one_or_two(0) is False
