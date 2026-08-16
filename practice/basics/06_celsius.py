"""Convert Celsius to Fahrenheit: f = c * 9 / 5 + 32.

Lesson: 01-basics/02-variables-and-data-types.md
"""


def to_fahrenheit(celsius):
    raise NotImplementedError


def run_checks():
    assert to_fahrenheit(0) == 32, f"freezing: expected 32, got {to_fahrenheit(0)!r}"
    assert to_fahrenheit(100) == 212, f"boiling: expected 212, got {to_fahrenheit(100)!r}"
    assert to_fahrenheit(20) == 68, f"room: expected 68, got {to_fahrenheit(20)!r}"
