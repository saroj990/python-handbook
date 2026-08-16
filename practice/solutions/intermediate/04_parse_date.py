from datetime import datetime


def to_iso(text):
    return datetime.strptime(text, "%d/%m/%Y").date().isoformat()
