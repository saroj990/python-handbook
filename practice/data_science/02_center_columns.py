"""Subtract each column mean from that column. X is shape (n, p).

Lesson: 04-data-science/01-numpy.md
"""


def center_columns(X):
    raise NotImplementedError


def run_checks():
    import numpy as np

    X = np.array([[1.0, 10.0], [3.0, 20.0], [5.0, 30.0]])
    C = center_columns(X)
    assert C.shape == X.shape, f"shape {C.shape} != {X.shape}"
    assert np.allclose(C.mean(axis=0), 0.0), f"column means should be 0, got {C.mean(axis=0)}"
    assert np.allclose(C[:, 0], np.array([-2.0, 0.0, 2.0])), f"first column: {C[:, 0]}"
