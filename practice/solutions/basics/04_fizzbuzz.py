def fizzbuzz(n):
    labels = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            labels.append("fizzbuzz")
        elif i % 3 == 0:
            labels.append("fizz")
        elif i % 5 == 0:
            labels.append("buzz")
        else:
            labels.append(str(i))
    return labels
