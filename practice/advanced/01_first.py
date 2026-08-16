"""Return the first item. Use a TypeVar in the signature if you like —
the checker only cares about the runtime behavior.

Lesson: 03-advanced/01-type-hints.md
"""


def first(items):
    raise NotImplementedError


def run_checks():
    assert first([10, 20]) == 10, f"got {first([10, 20])!r}"
    assert first(["ada"]) == "ada", f"got {first(['ada'])!r}"
    try:
        first([])
    except IndexError:
        return
    raise AssertionError("empty list should raise IndexError")
