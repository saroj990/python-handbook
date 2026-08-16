"""(x - mean) / sample_std, using ddof=1. Use NumPy, no Python loop.

Lesson: 04-data-science/01-numpy.md
"""


def standardize(x):
    raise NotImplementedError


def run_checks():
    import numpy as np

    x = np.array([2.0, 4.0, 4.0, 4.0, 5.0, 5.0, 7.0, 9.0])
    z = standardize(x)
    assert hasattr(z, "shape"), "return a NumPy array"
    assert np.isclose(z.mean(), 0.0, atol=1e-10), f"mean should be ~0, got {z.mean()}"
    assert np.isclose(z.std(ddof=1), 1.0, atol=1e-10), f"sample std should be ~1, got {z.std(ddof=1)}"
