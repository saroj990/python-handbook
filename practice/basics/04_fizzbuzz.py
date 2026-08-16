"""Return labels for 1..n inclusive.

3 → 'fizz', 5 → 'buzz', both → 'fizzbuzz', else the number as a string.

Lesson: 01-basics/06-control-flow.md
"""


def fizzbuzz(n):
    raise NotImplementedError


def run_checks():
    got = fizzbuzz(15)
    assert isinstance(got, list), f"return a list, got {type(got).__name__}"
    assert got[0] == "1", f"position 1 should be '1', got {got[0]!r}"
    assert got[2] == "fizz", f"3 should be 'fizz', got {got[2]!r}"
    assert got[4] == "buzz", f"5 should be 'buzz', got {got[4]!r}"
    assert got[14] == "fizzbuzz", f"15 should be 'fizzbuzz', got {got[14]!r}"
    assert len(got) == 15, f"expected 15 items, got {len(got)}"
