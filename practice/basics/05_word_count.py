"""Count words. Lowercase, split on whitespace. Ignore punctuation at edges.

Lesson: 01-basics/07-functions.md
"""


def word_count(text):
    raise NotImplementedError


def run_checks():
    assert word_count("") == {}, f"empty string → {word_count('')!r}"
    got = word_count("To be or not to be")
    assert got.get("to") == 2, f"'to' should be 2, got {got!r}"
    assert got.get("be") == 2, f"'be' should be 2, got {got!r}"
    assert got.get("or") == 1, f"'or' should be 1, got {got!r}"
    punct = word_count("Hello, hello!")
    assert punct.get("hello") == 2, f"strip punctuation: got {punct!r}"
