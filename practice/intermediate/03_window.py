"""Yield overlapping slices of length size. Skip if remaining items < size.

Lesson: 02-intermediate/04-iterators-and-generators.md
"""


def window(items, size):
    raise NotImplementedError


def run_checks():
    got = list(window([1, 2, 3, 4], 2))
    assert got == [[1, 2], [2, 3], [3, 4]], f"got {got!r}"
    assert list(window([1, 2], 3)) == [], f"too short should be empty, got {list(window([1, 2], 3))!r}"
    assert list(window("abcd", 3)) == [["a", "b", "c"], ["b", "c", "d"]] or list(
        window("abcd", 3)
    ) == [list("abc"), list("bcd")] or list(window("abcd", 3)) == ["abc", "bcd"], (
        f"windows of 'abcd', size 3 → {list(window('abcd', 3))!r}"
    )
