from dataclasses import dataclass


@dataclass(frozen=True)
class Money:
    amount: int
    currency: str = "USD"

    def __post_init__(self):
        if self.amount < 0:
            raise ValueError("amount cannot be negative")
        if len(self.currency) != 3 or not self.currency.isalpha():
            raise ValueError("currency must be 3 letters")

    def plus(self, other):
        if self.currency != other.currency:
            raise ValueError("currency mismatch")
        return Money(self.amount + other.amount, self.currency)
