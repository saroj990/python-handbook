# 02 — pandas

> **~50 min** · Build: a tidy monthly table Ada can pin on the wall.  
> **Then:** [Café step 19](../labs/northside-cafe/README.md#19-tables)

pandas is the table library. A **Series** is a 1-D labeled array. A **DataFrame** is a 2-D table: columns are Series that share an index. Underneath, numeric columns are NumPy arrays.

```python
import pandas as pd
import numpy as np
```

## Building frames

```python
df = pd.DataFrame(
    {
        "name": ["Ada", "Alan", "Grace"],
        "year": [1815, 1912, 1906],
        "field": ["math", "cs", "cs"],
    }
)

pd.Series([10, 20, 30], index=["a", "b", "c"], name="score")
pd.read_csv("data.csv")
pd.read_json("data.json")
pd.read_parquet("data.parquet")      # needs pyarrow or fastparquet
```

Inspect before you compute:

```python
df.head()
df.tail(2)
df.shape
df.dtypes
df.info()
df.describe()                        # numeric summary
df["field"].value_counts()
```

## Selecting

```python
df["name"]                           # Series
df[["name", "year"]]                 # DataFrame
df.loc[0, "name"]                    # label-based
df.loc[df["year"] > 1900, ["name", "field"]]
df.iloc[0:2, 0:2]                    # position-based
```

Use `loc` (labels) and `iloc` (integer positions) explicitly. `df[0]` is a column named `0` if it exists, not a row. Chained assignment (`df[df.year > 1900]["name"] = "x"`) is a bug factory — it may write to a copy. Write:

```python
df.loc[df["year"] > 1900, "name"] = "x"
```

## Filtering and assigning

```python
cs = df[df["field"] == "cs"]
modern = df[df["year"].between(1900, 2000)]
df["century"] = df["year"] // 100 + 1
df["label"] = np.where(df["year"] < 1900, "19th", "20th")
```

Combine conditions with `&` `|` `~` and parentheses, same as NumPy.

## Missing data

pandas uses `NaN` (float) and `pd.NA` (newer nullable dtypes) for missing values.

```python
df.isna().sum()
df.dropna(subset=["year"])
df["year"].fillna(df["year"].median())
df["field"].fillna("unknown")
```

`fillna` on a Series does not change the frame unless you assign back, or you pass `inplace=True` (prefer assignment; it is easier to reason about).

## Grouping and aggregation

```python
df.groupby("field")["year"].mean()
df.groupby("field").agg(
    n=("name", "count"),
    first_year=("year", "min"),
    last_year=("year", "max"),
)
df.groupby("field").size()
```

`groupby` splits, applies, combines. After a groupby, the group keys become the index unless you pass `as_index=False`.

```python
(
    df.groupby("field", as_index=False)
    .agg(mean_year=("year", "mean"))
    .sort_values("mean_year")
)
```

Method chaining like this is idiomatic. Parentheses let you break lines.

## Joins and concatenation

```python
extra = pd.DataFrame({"name": ["Ada", "Alan"], "country": ["UK", "UK"]})
df.merge(extra, on="name", how="left")
pd.concat([df, more_rows], ignore_index=True)
```

`how`: `inner`, `left`, `right`, `outer`. Check row counts before and after a merge. A duplicated key silently explodes the table.

## Reshape

```python
long = df.melt(id_vars=["name"], value_vars=["year", "century"])
wide = long.pivot(index="name", columns="variable", values="value")
```

Tidy (long) data: one observation per row, one variable per column. Most seaborn plots and groupbys want tidy data. `pivot` / `pivot_table` go wide; `melt` goes long.

```python
df.pivot_table(index="field", values="year", aggfunc=["mean", "count"])
```

## Time series (brief)

```python
s = pd.Series([1, 2, 3, 4], index=pd.date_range("2026-01-01", periods=4, freq="D"))
s.resample("2D").mean()
s.rolling(2).mean()
```

`pd.to_datetime(df["date"])` is the first step on any column that looks like a date but is still `object`.

## Apply vs vectorize

```python
df["name"].str.upper()               # string accessor — vectorized
df["year"].clip(lower=1800)
df["name"].map({"Ada": "A. Lovelace"})

# last resort
df["name"].apply(lambda s: s[:1])
```

`.str`, `.dt`, and arithmetic are much faster than `apply` with a Python function. Use `apply` when the logic is truly row-wise and awkward to express otherwise.

## Setting an index

```python
indexed = df.set_index("name")
indexed.loc["Ada"]
indexed.reset_index()
```

A meaningful index makes `loc` and joins clearer. For a simple table you will group often, a default `RangeIndex` is fine.

## Writing out

```python
df.to_csv("out.csv", index=False)
df.to_parquet("out.parquet", index=False)
```

Prefer parquet for anything you will reload in Python: types survive, files are smaller. CSV is for humans and other tools.

## Common mistakes

- Chained assignment.
- Merging on a column that is not unique and not noticing the row count jump.
- Treating the string `"NaN"` or `""` as missing — `na_values=` in `read_csv`, then `replace`.
- `groupby` then immediately indexing with `[]` in a way that returns a Series when you wanted a frame. Use `agg` with named outputs.

## Try this

1. Build a DataFrame of 8 rows: city, month, rainfall_mm. Compute mean rainfall per city.
2. Add a column `wet` that is `True` when rainfall is above the overall median.
3. Left-join a small city→country table and count rows before and after.

**Hints:** `groupby("city")["rainfall_mm"].mean()`. `df["rainfall_mm"] > df["rainfall_mm"].median()`. `merge(..., how="left")` then `len(df)`.
