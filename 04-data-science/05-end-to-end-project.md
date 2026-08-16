# 05 — End-to-end analysis project

> **~60 min** · Deliverable: five sentences in `answer.md`, plus a plot.  
> **Then:** [Café Shift 4](../labs/northside-cafe/README.md#shift-4--read-the-books-data-science) · [quiz](../quizzes/04-data-science.md)

This lesson walks a complete, small analysis: generate a realistic table, clean it, explore it, test one question, fit a baseline model, and write a short conclusion. Type the code into a file named `analysis.py` or a notebook. Do not copy blindly — change a column and see what breaks.

The question:

> After controlling for temperature, do weekends have different ice-cream sales than weekdays?

That is a concrete, falsifiable question. Vague questions ("what insights can we find?") produce vague notebooks.

## 1. Create the dataset

We synthesize data so the handbook does not depend on a download. The generator is also a lesson: if you can fake a table, you understand its columns.

```python
from pathlib import Path

import numpy as np
import pandas as pd

rng = np.random.default_rng(7)
n = 180
dates = pd.date_range("2025-04-01", periods=n, freq="D")
temp = rng.normal(22, 6, size=n)
weekend = (dates.dayofweek >= 5).astype(int)
noise = rng.normal(0, 8, size=n)
sales = 40 + 3.2 * temp + 18 * weekend + noise
sales = np.clip(sales, 0, None)

# inject a few problems you will have to clean
sales[10] = np.nan
temp[25] = 999  # broken sensor
sales[40] = -5  # impossible

df = pd.DataFrame(
    {
        "date": dates,
        "temp_c": temp,
        "is_weekend": weekend,
        "sales": sales,
    }
)

data_path = Path("ice_cream.csv")
df.to_csv(data_path, index=False)
print(f"wrote {data_path} ({len(df)} rows)")
```

## 2. Load and inspect

```python
df = pd.read_csv("ice_cream.csv", parse_dates=["date"])
print(df.head())
print(df.dtypes)
print(df.describe())
print(df.isna().sum())
```

Write down what "good" looks like before you clean: temperature in a human range, sales ≥ 0, one row per date, no missing `date`.

## 3. Clean

```python
clean = df.copy()
clean.loc[clean["temp_c"] > 50, "temp_c"] = np.nan
clean.loc[clean["sales"] < 0, "sales"] = np.nan
clean = clean.dropna(subset=["temp_c", "sales"])
clean = clean.sort_values("date").drop_duplicates("date")
clean["is_weekend"] = clean["is_weekend"].astype(int)
```

Report how many rows you dropped and why. Silent drops are how analyses lie.

```python
print(f"dropped {len(df) - len(clean)} of {len(df)} rows")
```

## 4. Explore

```python
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_theme(style="whitegrid")

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
sns.scatterplot(
    data=clean, x="temp_c", y="sales", hue="is_weekend", ax=axes[0], alpha=0.7
)
axes[0].set_title("Sales vs temperature")

sns.boxplot(data=clean, x="is_weekend", y="sales", ax=axes[1])
axes[1].set_title("Sales by weekend flag")
fig.tight_layout()
fig.savefig("explore.png", dpi=150)
```

You should see an upward slope with temperature and a higher box on weekends. If you do not, the generator or the clean step is wrong — fix that before modeling.

```python
print(clean.groupby("is_weekend")["sales"].agg(["mean", "std", "count"]))
print(clean[["temp_c", "sales"]].corr())
```

## 5. A statistical check

Weekends might just be hotter. Compare sales with a t-test *and* look at temperature by group.

```python
from scipy import stats

weekday = clean.loc[clean["is_weekend"] == 0, "sales"]
weekend = clean.loc[clean["is_weekend"] == 1, "sales"]
print(stats.ttest_ind(weekday, weekend, equal_var=False))
print(clean.groupby("is_weekend")["temp_c"].mean())
```

A raw t-test does not control for temperature. It is a first look, not the answer.

## 6. A baseline model

Linear regression: `sales ~ temp_c + is_weekend`. The weekend coefficient is the estimated difference at the same temperature.

```python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.dummy import DummyRegressor

features = clean[["temp_c", "is_weekend"]]
target = clean["sales"]

X_train, X_test, y_train, y_test = train_test_split(
    features, target, test_size=0.25, random_state=0
)

dummy = DummyRegressor(strategy="mean")
dummy.fit(X_train, y_train)

model = LinearRegression()
model.fit(X_train, y_train)

print("dummy MAE", mean_absolute_error(y_test, dummy.predict(X_test)))
print("model MAE", mean_absolute_error(y_test, model.predict(X_test)))
print("coefficients", dict(zip(features.columns, model.coef_)))
print("intercept", model.intercept_)
```

The weekend coefficient should land near the `18` we baked into the generator. It will not match exactly (noise, dropped rows, a random split). That gap is the point: even with a known truth, estimates move.

## 7. Write the answer

A complete analysis ends in sentences, not only plots.

Example shape (fill in *your* numbers):

> After dropping *k* broken rows, daily sales rise with temperature (correlation *r*). A linear model that includes temperature and a weekend flag beats a mean baseline on held-out days (MAE *a* vs *b*). The weekend coefficient is about *c* extra units of sales at the same temperature, which is consistent with weekends mattering beyond weather. This is simulated data; on real data I would next check holidays, store closures, and whether residuals fan out on hot days.

## 8. Project checklist

Use this on the next real dataset.

1. **Question** — one sentence, with a population and a comparison.
2. **Load** — `head`, `dtypes`, missingness, row count.
3. **Clean** — rules written down; row-count delta printed.
4. **Explore** — one or two plots that address the question.
5. **Model / test** — the simplest method that can answer it; a baseline.
6. **Answer** — numbers plus caveats. What would change your mind?

## Try this

1. Add a `rain_mm` column to the generator that slightly lowers sales, then include it in the regression. Does the weekend coefficient move?
2. Replace the random split with a time split: train on the first 75% of dates, test on the last 25%. Why is that fairer for daily data?
3. Repeat the whole analysis with a different seed. Which numbers stay stable?

**Hints:** Subtract `0.4 * rain` in the sales formula. `iloc[:cutoff]` / `iloc[cutoff:]` instead of `train_test_split`. Stability across seeds is a cheap robustness check.

---

You now have a path from `print("hello")` to a small empirical argument. Go back to any lesson that felt thin and redo the exercises with a dataset you care about.
