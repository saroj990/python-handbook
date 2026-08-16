# Quiz — Data science

**1.** In NumPy, what is the difference between `*` and `@`?

<details>
<summary>Answer</summary>

`*` is elementwise. `@` is matrix multiplication. Mixing them up is the most common NumPy bug after broadcasting errors.
</details>

**2.** `m[0:2]` is usually a view. `m[m > 5]` is a copy. Why does that matter?

<details>
<summary>Answer</summary>

Writing into a view changes the original array. Writing into a copy does not. Boolean and fancy index return copies; basic slices usually do not.
</details>

**3.** `df[df.year > 1900]["name"] = "x"` — why is this cursed?

<details>
<summary>Answer</summary>

Chained assignment. The first `[]` may return a copy, so the write vanishes. Use `df.loc[df["year"] > 1900, "name"] = "x"`.
</details>

**4.** You compute `df.groupby("city")["rain"].mean()` and also `df["rain"].mean()`. Which answers “is this city wetter than usual?”

<details>
<summary>Answer</summary>

Compare the group mean to the overall mean (or to other cities). A single overall mean has no group in it. Always know the denominator.
</details>

**5.** A t-test on weekend vs weekday sales is significant. Can you tell Ada “weekends cause more sales”?

<details>
<summary>Answer</summary>

No. Weekends might just be hotter, or you ran twelve tests and published the one that “worked.” Control for temperature (regression), plot first, and write the caveat. Significance is not a mechanism.
</details>

**6.** Why split *before* you scale features in scikit-learn?

<details>
<summary>Answer</summary>

Scaling on all rows leaks the test distribution into the train step. A `Pipeline` with `StandardScaler` then the model, fit only on the train split, keeps the test honest.
</details>
