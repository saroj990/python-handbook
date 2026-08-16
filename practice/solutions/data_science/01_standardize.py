import numpy as np


def standardize(x):
    return (x - x.mean()) / x.std(ddof=1)
