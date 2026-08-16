# 03 — Visualization with Matplotlib and Seaborn

> **~40 min** · Build: two panels — scatter (hue = weekend) and a box plot.  
> **Then:** save `weekend.png` · [Café step 20](../labs/northside-cafe/README.md#20-show-her)

A plot is an argument: it should make one comparison obvious. Matplotlib is the low-level canvas. Seaborn is a statistical layer on top that speaks pandas.

```python
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
```

## Matplotlib: explicit axes

Prefer the object-oriented API. `plt.plot` talks to a hidden "current" figure and gets confusing in notebooks.

```python
fig, ax = plt.subplots(figsize=(6, 4))
x = np.linspace(0, 2 * np.pi, 200)
ax.plot(x, np.sin(x), label="sin")
ax.plot(x, np.cos(x), label="cos")
ax.set_xlabel("radians")
ax.set_ylabel("value")
ax.set_title("Sine and cosine")
ax.legend()
ax.grid(True, alpha=0.3)
fig.tight_layout()
fig.savefig("trig.png", dpi=150)
plt.show()
```

`savefig` before `show` (some backends close the figure on show). `dpi=150` is a reasonable default for slides; `dpi=300` for print.

Several panels:

```python
fig, axes = plt.subplots(1, 2, figsize=(10, 4), sharey=True)
axes[0].hist(np.random.default_rng(0).normal(size=500), bins=20)
axes[1].boxplot(np.random.default_rng(1).normal(size=500))
```

## Common plot types

| Question | Plot |
|---|---|
| How is one numeric variable distributed? | histogram, KDE, box, violin |
| How do two numerics relate? | scatter, hexbin |
| How does a value change over order/time? | line |
| How do categories compare? | bar |
| How do many variables relate? | pair plot, heatmap of correlations |

```python
rng = np.random.default_rng(0)
ax.scatter(rng.normal(size=80), rng.normal(size=80), alpha=0.7)
ax.hist(rng.normal(size=400), bins=25, edgecolor="white")
ax.bar(["a", "b", "c"], [4, 7, 2])
```

`alpha` helps overplotting. For thousands of points, use `hexbin` or downsample.

## Seaborn: tidy data

Seaborn expects a long DataFrame and a few column names.

```python
tips = sns.load_dataset("tips")        # bundled demo table

sns.histplot(data=tips, x="total_bill", hue="time", kde=True)
sns.scatterplot(data=tips, x="total_bill", y="tip", hue="day", style="time")
sns.boxplot(data=tips, x="day", y="tip", hue="sex")
sns.barplot(data=tips, x="day", y="tip", estimator="mean", errorbar="sd")
sns.relplot(data=tips, x="total_bill", y="tip", col="time", hue="smoker")
```

`relplot`, `displot`, and `catplot` are **figure-level**: they create their own figure and a grid of facets (`col=`, `row=`). `scatterplot`, `histplot`, `boxplot` are **axes-level**: they draw on an `ax` you pass.

```python
fig, ax = plt.subplots()
sns.boxplot(data=tips, x="day", y="tip", ax=ax)
ax.set_title("Tip by day")
```

Set a consistent theme once:

```python
sns.set_theme(style="whitegrid", context="notebook")
```

## Annotation and honesty

```python
ax.axhline(tips["tip"].mean(), color="gray", linestyle="--", label="mean")
ax.annotate("outlier?", xy=(20, 9), xytext=(25, 8),
            arrowprops=dict(arrowstyle="->"))
```

Label axes with units. Start bar charts at zero. Do not use a rainbow colormap for sequential data; `viridis` or `crest` are safer. If two colors mean categories, say so in a legend.

## Heatmaps

```python
numeric = tips.select_dtypes("number")
corr = numeric.corr()
sns.heatmap(corr, annot=True, fmt=".2f", cmap="vlag", center=0)
```

Correlation is not causation. A heatmap of `corr()` is a lead generator for questions, not an answer.

## Saving for the handbook and for papers

```python
fig.savefig("figure.png", dpi=150, bbox_inches="tight")
fig.savefig("figure.svg")              # sharp in browsers
```

Avoid copying screenshots of a notebook window. Save the figure.

## Common mistakes

- Using `plt.plot` in a loop of notebook cells and wondering why lines stack on an old axes. Create a new `fig, ax` each time, or `ax.clear()`.
- Passing wide data to seaborn and fighting it. `melt` first.
- A scatter of 200_000 points that freezes the UI. Sample or hexbin.

## Try this

1. Plot a histogram of 2000 draws from `rng.normal(10, 2, size=2000)` and mark the mean with a vertical line.
2. Using any small DataFrame, draw a seaborn boxplot of a numeric column by a category.
3. Save the figure as both PNG and SVG.

**Hints:** `ax.axvline(arr.mean(), color="black")`. `sns.boxplot(data=df, x="city", y="rainfall_mm", ax=ax)`. `fig.savefig(...)` twice with different suffixes.
