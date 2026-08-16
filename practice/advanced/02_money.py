"""Integer cents. Reject negatives. amount + other.amount for the same currency.

Lesson: 03-advanced/02-dataclasses.md
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class Money:
    amount: int
    currency: str = "USD"

    def __post_init__(self):
        raise NotImplementedError

    def plus(self, other):
        raise NotImplementedError


def run_checks():
    m = Money(450)
    assert m.amount == 450
    try:
        Money(-1)
    except ValueError:
        pass
    else:
        raise AssertionError("negative amount should raise ValueError")
    total = Money(450).plus(Money(275))
    assert total.amount == 725, f"450+275 cents → {total.amount!r}"
    try:
        Money(1, "USD").plus(Money(1, "EUR"))
    except ValueError:
        return
    raise AssertionError("mixed currencies should raise ValueError")
