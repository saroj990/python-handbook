# 04 — Data Science

**About 8 hours.** Ada wants a real answer: after you account for temperature, do weekends sell more?

Install once from the handbook root:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 practice/check.py data_science
```

Notebooks are fine for plots. Stable code belongs in a `.py` file. The café deliverable is five sentences in `answer.md`, not a 40-cell notebook.

| # | Lesson | Time | Drill |
|---|---|---|---|
| 1 | [NumPy](01-numpy.md) | 50 min | [`01_standardize`](../practice/data_science/01_standardize.py), [`02_center_columns`](../practice/data_science/02_center_columns.py) |
| 2 | [pandas](02-pandas.md) | 50 min | Clean `sales.csv` |
| 3 | [Visualization](03-visualization.md) | 40 min | Two-panel weekend plot |
| 4 | [SciPy and statistics](04-scipy-and-stats.md) | 45 min | Welch test + dummy baseline |
| 5 | [End-to-end project](05-end-to-end-project.md) | 60 min | Write the answer |

Then: [Café Shift 4](../labs/northside-cafe/README.md#shift-4--read-the-books-data-science) · [Quiz](../quizzes/04-data-science.md)
