"""Parse '16/08/2026' (day/month/year) and return ISO '2026-08-16'.

Lesson: 02-intermediate/07-datetime-and-regex.md
"""


def to_iso(text):
    raise NotImplementedError


def run_checks():
    assert to_iso("16/08/2026") == "2026-08-16", f"got {to_iso('16/08/2026')!r}"
    assert to_iso("01/01/2000") == "2000-01-01", f"got {to_iso('01/01/2000')!r}"
