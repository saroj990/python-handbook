"""Keep n inside the closed interval [lo, hi].

Lesson: 01-basics/07-functions.md
"""


def clamp(n, lo, hi):
    raise NotImplementedError


def run_checks():
    assert clamp(5, 0, 10) == 5, f"expected 5, got {clamp(5, 0, 10)!r}  (inputs 5, 0, 10)"
    assert clamp(-1, 0, 10) == 0, f"expected 0, got {clamp(-1, 0, 10)!r}  (below range)"
    assert clamp(99, 0, 10) == 10, f"expected 10, got {clamp(99, 0, 10)!r}  (above range)"
    assert clamp(0, 0, 10) == 0, f"expected 0, got {clamp(0, 0, 10)!r}  (on the edge)"
