"""Strip spaces and lowercase an email address.

Lesson: 01-basics/04-strings.md
"""


def clean_email(raw):
    raise NotImplementedError


def run_checks():
    got = clean_email("  Ada.Lovelace@Example.COM ")
    assert got == "ada.lovelace@example.com", f"expected 'ada.lovelace@example.com', got {got!r}"
    assert clean_email("a@b.c") == "a@b.c", f"already clean: got {clean_email('a@b.c')!r}"
