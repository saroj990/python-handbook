"""add_item should start a *new* list when bucket is omitted.

The default [] is created once. Every call shares it. Fix that.

Lesson: 01-basics/07-functions.md
"""


def add_item(item, bucket=[]):
    bucket.append(item)
    return bucket


def run_checks():
    a = add_item("latte")
    b = add_item("tea")
    assert a == ["latte"], f"first call should be ['latte'], got {a!r}"
    assert b == ["tea"], f"second call should be ['tea'], not {b!r} — default list is shared"
    c = add_item("muffin", ["scone"])
    assert c == ["scone", "muffin"], f"explicit bucket: {c!r}"
