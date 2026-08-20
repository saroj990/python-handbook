# Hands-on — Data science

Install once: `pip install -r requirements.txt`. Run these in a script or a notebook.

---

## 1. Make an array

```python
import numpy as np

prices = np.array([4.50, 3.00, 2.75, 2.50])
print(prices.dtype, prices.shape)
print(prices * 1.08)
print(prices.sum(), prices.mean())
```

`*` is elementwise. The taxed vector has four values, not one.

---

## 2. Reshape and axes

```python
import numpy as np

week = np.arange(14).reshape(2, 7)
print(week)
print("per day (columns)", week.sum(axis=0))
print("per week (rows)", week.sum(axis=1))
```

`axis=0` collapses rows (down). `axis=1` collapses columns (across).

---

## 3. Boolean mask

```python
import numpy as np

sales = np.array([40.0, 55.0, 12.0, 80.0, 61.0])
hot = sales[sales >= 50]
print(hot)
print(np.where(sales >= 50, sales, 0))
```

`sales[sales >= 50]` is a **copy**. Writing into it does not change `sales`.

---

## 4. Broadcast a column mean

```python
import numpy as np

X = np.array([[1.0, 10.0], [3.0, 20.0], [5.0, 30.0]])
centered = X - X.mean(axis=0)
print(centered)
print(centered.mean(axis=0))
```

Column means of `centered` should be ~0. No Python loop.

---

## 5. `@` vs `*`

```python
import numpy as np

A = np.array([[3.0, 1.0], [1.0, 2.0]])
v = np.array([1.0, 0.0])
print("matmul", A @ v)
print("times ", A * v)
```

`@` is matrix-vector. `*` repeats `v` across rows (broadcast) and multiplies elementwise.

---

## 6. A tiny DataFrame

```python
import pandas as pd

df = pd.DataFrame({
    "day": ["Mon", "Sat", "Sun", "Mon"],
    "sales": [40.0, 70.0, 66.0, 42.0],
    "temp_c": [18.0, 24.0, 23.0, 17.0],
})
print(df.head())
print(df.groupby("day")["sales"].mean())
df["hot"] = df["temp_c"] > 20
print(df)
```

---

## 7. Clean then join

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "city": ["Pune", "Pune", "Oslo"],
    "rain": [12.0, np.nan, 4.0],
})
cities = pd.DataFrame({"city": ["Pune", "Oslo"], "country": ["IN", "NO"]})
clean = df.dropna(subset=["rain"])
print(len(df), "->", len(clean))
print(clean.merge(cities, on="city", how="left"))
```

Always print row counts before and after a drop or a merge.

---

## 8. Two panels

```python
import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(0)
temp = rng.normal(22, 6, size=80)
sales = 40 + 3 * temp + rng.normal(0, 8, size=80)

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].scatter(temp, sales, alpha=0.7)
axes[0].set_xlabel("temp_c")
axes[0].set_ylabel("sales")
axes[1].hist(sales, bins=12, edgecolor="white")
fig.tight_layout()
fig.savefig("hands_on_sales.png", dpi=150)
print("wrote hands_on_sales.png")
```

---

## 9. A t-test and a line

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(0)
weekday = rng.normal(50, 10, size=40)
weekend = rng.normal(60, 10, size=40)
print(stats.ttest_ind(weekday, weekend, equal_var=False))

x = np.linspace(0, 10, 50)
y = 2.5 * x + 1 + rng.normal(0, 1.5, size=50)
fit = stats.linregress(x, y)
print(fit.slope, fit.intercept, fit.rvalue)
```

---

## 10. Train / test a line

```python
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.dummy import DummyRegressor

rng = np.random.default_rng(0)
x = np.linspace(0, 10, 80)
y = 2.5 * x + 1 + rng.normal(0, 2, size=80)
X = x.reshape(-1, 1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)

dummy = DummyRegressor(strategy="mean").fit(X_tr, y_tr)
model = LinearRegression().fit(X_tr, y_tr)
print("dummy", mean_absolute_error(y_te, dummy.predict(X_te)))
print("model", mean_absolute_error(y_te, model.predict(X_te)))
```

The linear model should beat the dummy mean. If it does not, the data has no line.

Then: [practice questions](07-practice.md).
