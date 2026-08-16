# 04 — SciPy and statistics

> **~45 min** · Build: a Welch t-test, then a model that must beat a dummy mean.  
> **Then:** [Café step 21](../labs/northside-cafe/README.md#21-answer-in-sentences)

NumPy does array math. SciPy adds algorithms: statistics, optimization, interpolation, linear algebra extras. scikit-learn adds predictive models with a uniform `fit` / `predict` API. You do not need all of SciPy. You need a few honest summaries and one baseline model.

```python
import numpy as np
from scipy import stats
```

## Descriptive statistics

```python
rng = np.random.default_rng(0)
x = rng.normal(loc=10, scale=2, size=200)

np.mean(x)
np.median(x)
np.std(x, ddof=1)
np.quantile(x, [0.25, 0.5, 0.75])
stats.skew(x)
stats.kurtosis(x)
```

Mean follows outliers; median does not. Report both when the distribution is skewed. `ddof=1` is the sample standard deviation (divide by `n-1`). NumPy defaults to `ddof=0` (population). Know which one you want.

pandas: `df["col"].describe()`, `.median()`, `.quantile(0.9)`.

## Distributions

```python
stats.norm.cdf(1.96)              # ≈ 0.975
stats.norm.ppf(0.975)             # ≈ 1.96
stats.norm.pdf(0)                 # density at 0
stats.norm.rvs(size=5, random_state=0)
```

`cdf` is the cumulative probability. `ppf` is the inverse (quantile). Other families: `stats.t`, `stats.expon`, `stats.binom`, `stats.poisson`. Each has the same method names.

## Confidence intervals and tests

A confidence interval is a range produced by a procedure that covers the true parameter in (say) 95% of repeated samples. It is not "95% probability this particular interval contains the truth" in the everyday sense. Still, it is a useful measure of precision.

```python
mean = np.mean(x)
sem = stats.sem(x)                # standard error of the mean
ci = stats.t.interval(0.95, df=len(x) - 1, loc=mean, scale=sem)
```

A t-test against a hypothesized mean:

```python
stats.ttest_1samp(x, popmean=10)
```

Two independent samples:

```python
y = rng.normal(11, 2, size=180)
stats.ttest_ind(x, y, equal_var=False)    # Welch
```

Paired:

```python
stats.ttest_rel(before, after)
```

The p-value is the probability, *if the null were true*, of a result at least this extreme. It is not the probability the null is true. A small p-value is not a large effect. Always report an effect size or the two means.

```python
# simple effect size: difference in means / pooled scale
```

Nonparametric alternative when you do not trust normality for small n: `stats.mannwhitneyu`, `stats.wilcoxon`.

Correlation:

```python
stats.pearsonr(a, b)              # linear
stats.spearmanr(a, b)             # rank
```

Pearson is sensitive to outliers. Plot first.

## Fitting a line with NumPy / SciPy

```python
n = 80
x = np.linspace(0, 10, n)
y = 2.5 * x + 1.0 + rng.normal(0, 2, size=n)

slope, intercept = np.polyfit(x, y, deg=1)
# or
result = stats.linregress(x, y)
result.slope, result.intercept, result.rvalue, result.pvalue
```

Residuals (`y - (slope * x + intercept)`) should look like unstructured noise. If they fan out or curve, the model is wrong.

## scikit-learn: a baseline model

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

X = x.reshape(-1, 1)              # sklearn wants 2-D features
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0
)

model = Pipeline([
    ("scale", StandardScaler()),
    ("lin", LinearRegression()),
])
model.fit(X_train, y_train)
pred = model.predict(X_test)

mean_absolute_error(y_test, pred)
r2_score(y_test, pred)
```

Rules that prevent self-deception:

- Split **before** you scale or choose features. A `Pipeline` does this correctly.
- Compare to a dummy: predict the training mean. If you cannot beat that, stop.
- `random_state` makes the split repeatable.

Classification uses the same pattern: `LogisticRegression`, `accuracy_score` / `f1_score`, and `stratify=y` in the split when classes are imbalanced.

## Optimization and interpolation (pointers)

```python
from scipy.optimize import minimize
from scipy.interpolate import interp1d

def sse(params):
    slope, intercept = params
    return np.sum((y - (slope * x + intercept)) ** 2)

fit = minimize(sse, x0=[0.0, 0.0])

f = interp1d(x, y, kind="linear")
f(3.3)
```

Reach for these when you have a custom objective or uneven samples. For a straight line, `linregress` is enough.

## Common mistakes

- Running many tests and reporting the one that "worked" (p-hacking). Pre-specify, or correct for multiplicity.
- Training and evaluating on the same rows.
- Interpreting `r2_score` on a non-linear mess as "the model is 80% correct."
- Using `np.std` without `ddof=1` in a sample-statistics writeup.

## Try this

1. Draw two samples of size 40 from normals with means 0 and 0.6. Run Welch's t-test. Note the p-value. Increase size to 400 and compare.
2. Compute Pearson and Spearman on a pair of arrays where one outlier is added. Plot them.
3. Fit `LinearRegression` on a train split and report MAE on the test split vs a dummy mean predictor.

**Hints:** `ttest_ind(..., equal_var=False)`. One huge `y` value will crash Pearson more than Spearman. `DummyRegressor(strategy="mean")` from `sklearn.dummy`.
