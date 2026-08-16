def window(items, size):
    seq = list(items)
    for i in range(len(seq) - size + 1):
        yield seq[i : i + size]
