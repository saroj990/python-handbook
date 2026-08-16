"""Invert a dict {name: id} → {id: name}. Last name wins if ids collide.

Lesson: 02-intermediate/01-comprehensions.md
"""


def invert(mapping):
    raise NotImplementedError


def run_checks():
    got = invert({"ada": 1, "alan": 2})
    assert got == {1: "ada", 2: "alan"}, f"got {got!r}"
    collided = invert({"ada": 1, "grace": 1})
    assert collided == {1: "grace"}, f"last key should win, got {collided!r}"
    assert invert({}) == {}, f"empty: {invert({})!r}"
