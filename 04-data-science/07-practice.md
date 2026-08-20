# Practice — Data science

---

**1.** In NumPy, what is the difference between `*` and `@`?

<details>
<summary>Answer</summary>

`*` is elementwise. `@` is matrix multiplication. Mixing them up is the usual bug after broadcasting errors.
</details>

**2.** `m[0:2]` vs `m[m > 5]` — which is usually a view? Why does it matter?

<details>
<summary>Answer</summary>

Basic slices are usually **views** (writes hit the original). Boolean / fancy index return **copies**.
</details>

**3.** Standardize a 1-D array with sample std (`ddof=1`). Write the one-liner.

<details>
<summary>Answer</summary>

`(x - x.mean()) / x.std(ddof=1)`
</details>

**4.** `X` has shape `(n, p)`. Center each **column** with broadcasting.

<details>
<summary>Answer</summary>

`X - X.mean(axis=0)`  
`axis=0` collapses rows, leaving one mean per column.
</details>

**5.** `df[df.year > 1900]["name"] = "x"` is cursed. Write the fix.

<details>
<summary>Answer</summary>

`df.loc[df["year"] > 1900, "name"] = "x"`  
Chained `[]` may write to a copy.
</details>

**6.** After `merge(..., how="left")` the row count jumped. What probably happened?

<details>
<summary>Answer</summary>

The join key was not unique on one side, so rows duplicated. Check `value_counts` on the key before merging.
</details>

**7.** Which seaborn function creates its **own figure** and a grid of facets: `scatterplot` or `relplot`?

<details>
<summary>Answer</summary>

`relplot` (figure-level, `col=` / `row=`). `scatterplot` is axes-level: pass `ax=`.
</details>

**8.** `np.std(x)` vs `np.std(x, ddof=1)` — which matches a sample standard deviation?

<details>
<summary>Answer</summary>

`ddof=1` (divide by `n-1`). NumPy’s default `ddof=0` is the population version.
</details>

**9.** A t-test on weekend vs weekday sales is significant. Can you tell Ada “weekends cause more sales”?

<details>
<summary>Answer</summary>

No. Weekends might just be hotter. Control for temperature (regression), plot first, and write the caveat.
</details>

**10.** Why split **before** you scale features in scikit-learn?

<details>
<summary>Answer</summary>

Scaling on all rows leaks the test distribution into training. Fit a `Pipeline` (`StandardScaler` then the model) on the train split only.
</details>

---

Finish the path: [end-to-end project](05-end-to-end-project.md), [Café Shift 4](../labs/northside-cafe/README.md#shift-4--read-the-books-data-science), [quiz](../quizzes/04-data-science.md).
