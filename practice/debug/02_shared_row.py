"""zeros(rows, cols) should be a rows×cols grid of 0.

The starter builds a grid where every row is the *same* list.
Change one row and the others follow. Fix the construction.

Lesson: 01-basics/05-collections.md
"""


def zeros(rows, cols):
    return [[0] * cols] * rows


def run_checks():
    g = zeros(3, 4)
    assert g == [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    g[0][0] = 1
    assert g[1][0] == 0, "row 1 changed too — you still have one shared inner list"
    assert g[2][0] == 0, "row 2 changed too"
    assert g[0][0] == 1
