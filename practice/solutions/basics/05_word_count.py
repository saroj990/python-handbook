def word_count(text):
    counts = {}
    for raw in text.split():
        word = raw.strip(".,!?;:\"'").lower()
        if not word:
            continue
        counts[word] = counts.get(word, 0) + 1
    return counts
