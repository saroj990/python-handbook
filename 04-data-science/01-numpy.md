# 01 — NumPy

> **~50 min** · Build: weekend vs weekday mean sales with no row loop.  
> **Then:** [drills](../practice/data_science/) · [Café step 18](../labs/northside-cafe/README.md#18-arrays-first)

NumPy is the array library everything else in this section is built on. A NumPy array is a typed, rectangular block of numbers in contiguous memory. Operations run in compiled code over the whole block. That is why `arr.mean()` beats a Python loop over a list of floats.

```python
import numpy as np
```

The conventional alias is `np`.

## Creating arrays

```python
np.array([1, 2, 3])                    # from a list; infers dtype
np.array([1, 2, 3], dtype=np.float64)
np.zeros(5)
np.ones((3, 4))                        # 3 rows, 4 columns
np.full((2, 2), 7)
np.arange(0, 10, 2)                    # 0, 2, 4, 6, 8
np.linspace(0, 1, 5)                   # 5 values from 0 to 1 inclusive
np.eye(3)                              # identity
np.random.default_rng(0).random((2, 3))
```

Prefer `np.random.default_rng(seed)` over the old `np.random.rand`. A `Generator` is explicit and independent.

`dtype` matters. `int64` vs `float64` vs `bool` vs `int32` change memory and overflow behavior.

```python
np.array([1, 2, 3]).dtype      # int64 on 64-bit builds
np.array([1.0, 2.0]).dtype     # float64
```

## Shape, reshape, axes

```python
a = np.arange(12)
a.shape                    # (12,)
b = a.reshape(3, 4)        # 3×4 view when possible
b.ndim                     # 2
b.size                     # 12
b.T                        # transpose
```

`reshape` does not copy if it can return a view. Changing `b` may change `a`. Use `a.reshape(3, 4).copy()` when you need independence.

Axis 0 is rows (down). Axis 1 is columns (across). Reductions take an `axis`:

```python
b.sum()                    # all elements
b.sum(axis=0)              # one value per column
b.sum(axis=1)              # one value per row
b.mean(axis=0)
b.std(axis=0, ddof=1)      # sample standard deviation
```

## Indexing and slicing

```python
x = np.arange(10)
x[3]
x[2:7]
x[::2]
x[x > 5]                   # boolean mask → copy

m = np.arange(12).reshape(3, 4)
m[1, 2]                    # row 1, column 2
m[1]                       # entire row
m[:, 2]                    # entire column
m[0:2, 1:3]
```

**Views vs copies.** Basic slices (`m[0:2, 1:3]`) are usually views. Boolean and fancy index (`m[[0, 2]]`, `m[m > 5]`) return copies. Mutating a view mutates the original.

```python
view = m[0]
view[0] = 999              # m[0, 0] is now 999
```

## Fancy indexing and `np.where`

```python
idx = np.array([0, 2, 2])
x[idx]

rows = np.array([0, 2])
cols = np.array([1, 3])
m[rows, cols]              # pairing: (0,1) and (2,3)

np.where(m > 5, m, 0)      # keep values > 5, else 0
np.argmax(m, axis=1)       # index of max in each row
```

## Vectorization and broadcasting

Write operations on whole arrays. The loop lives in C.

```python
temps_c = np.array([0.0, 20.0, 37.0])
temps_f = temps_c * 9 / 5 + 32
```

**Broadcasting** stretches arrays of compatible shapes so the operation is elementwise without copying the smaller array into a full grid.

Rules, applied from the *trailing* dimension backward:

1. If ranks differ, pad the smaller shape with 1s on the left.
2. Dimensions are compatible if they are equal or one of them is 1.
3. The output size on that axis is the non-1 size.

```python
# (3, 4) + (4,)   →  (3, 4)   row-wise add
# (3, 4) + (3, 1) →  (3, 4)   column-wise add
# (3, 4) + (3,)   →  error    3 and 4 do not match

m = np.arange(12).reshape(3, 4)
m + np.array([1, 0, 0, 1])
m - m.mean(axis=0)         # center each column
```

A column vector is `(n, 1)`, not `(n,)`. The trailing-dimension rule is why that distinction matters.

```python
col = np.array([1, 2, 3])[:, np.newaxis]   # shape (3, 1)
m + col
```

`np.newaxis` (same as `None`) inserts an axis of size 1.

## Universal functions (ufuncs)

```python
np.sqrt(x)
np.exp(x)
np.log1p(x)                # log(1+x), stable for small x
np.clip(x, 0, 10)
np.minimum(a, b)           # elementwise
np.sin(np.linspace(0, 2 * np.pi, 8))
```

Most ufuncs have an `out=` argument to write into an existing array and avoid allocating.

## Linear algebra (enough to be dangerous)

```python
A = np.array([[3.0, 1.0], [1.0, 2.0]])
v = np.array([1.0, 0.0])

A @ v                      # matrix-vector
A @ A                      # matrix-matrix
np.linalg.inv(A)
np.linalg.solve(A, v)      # prefer solve over inv
np.linalg.eig(A)
np.linalg.norm(v)
```

`*` is elementwise. `@` is matrix multiplication. Mixing them up is the most common NumPy bug after broadcasting errors.

## Random numbers

```python
rng = np.random.default_rng(42)
rng.normal(loc=0, scale=1, size=1000)
rng.uniform(0, 1, size=(4, 4))
rng.integers(0, 10, size=8, endpoint=False)
rng.choice(["a", "b", "c"], size=5, replace=True)
rng.permutation(10)
```

Pass a seed for reproducibility. In analysis, fix the seed at the top of the script.

## Performance habits

```python
# slow — Python loop
out = []
for x in arr:
    out.append(x ** 2)

# fast
out = arr ** 2
```

Preallocate when you must loop (`out = np.empty(n)`). Prefer `arr[(arr > 0) & (arr < 1)]` over looping with `and` — use `&` `|` `~` on boolean arrays, and parentheses because those operators bind tightly.

Convert a list once: `np.asarray(xs)`. Repeated `np.array` inside a loop is a hidden copy tax.

## Common mistakes

- `*` vs `@`.
- Assuming a slice is a copy, mutating it, and corrupting the source.
- `axis` confusion: `mean(axis=0)` collapses rows, leaving columns.
- Comparing floats with `==`. Use `np.isclose` / `np.allclose`.

## Try this

1. Create a 5×5 array of integers `0..24`. Extract the middle 3×3.
2. Standardize a 1-D array: subtract the mean and divide by the sample standard deviation (`ddof=1`).
3. Given a matrix `X` with shape `(n, p)`, center each column using broadcasting (no loop).

**Hints:** `np.arange(25).reshape(5, 5)[1:4, 1:4]`. `(x - x.mean()) / x.std(ddof=1)`. `X - X.mean(axis=0)`.
