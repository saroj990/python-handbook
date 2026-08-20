# Python Handbook

You do not learn Python by highlighting a tutorial. You learn it by breaking a receipt, fixing a bug, and watching a test go green.

This handbook is a path from a first script to a small data analysis. Every stretch of reading has something you can *run*.

```text
  read a lesson  →  fail a drill  →  fix it  →  ship a café feature
```

## Open it like an app

The lessons stay Markdown. `serve.py` turns them into a local reader with a sidebar, search, dark mode, and progress that lives in your browser.

```bash
python3 serve.py
```

That opens [http://127.0.0.1:8000/app/](http://127.0.0.1:8000/app/). Stop with Ctrl-C. Add `--no-browser` if you only want the URL.

After a Vercel deploy (HTTPS), the reader is an installable app. Chrome, Edge, and Android show **Install** in the top bar. On iPhone, tap **Share → Add to Home Screen**. Lessons cache after the first visit so you can keep reading offline.

You still edit drills and café files in Cursor. The app is for reading, ticking boxes, and jumping to the next lesson.

## Deploy on Vercel

The reader is a static site. Vercel only needs to host the files — there is no build step.

1. Put the handbook in a GitHub repository and push it.
2. On [vercel.com](https://vercel.com), click **Add New… → Project** and import that repo.
3. Set **Framework Preset** to **Other**. Leave **Build Command** and **Output Directory** empty (the project root is the site).
4. Click **Deploy**.

The live URL will redirect `/` to `/app/`. Lessons load from paths like `/01-basics/01-getting-started.md`.

From a terminal, after `npm i -g vercel` or with `npx`:

```bash
npx vercel
```

Accept the defaults (link to an existing project or create one). `npx vercel --prod` publishes to production.

Progress checkboxes stay in each visitor’s browser (`localStorage`). They are not shared across devices.

## Three tracks, one path

| Track | What it is | Start |
|---|---|---|
| **Lessons** | Short chapters. Type the examples. | [Getting started](01-basics/01-getting-started.md) |
| **Drills** | One function, a checker, instant pass/fail | [`python3 practice/check.py`](practice/README.md) |
| **Café lab** | One story for the whole book: computerize Northside Café | [Open the shop](labs/northside-cafe/README.md) |

Tick boxes in [PROGRESS.md](PROGRESS.md) as you go. Take the [quiz](quizzes/01-basics.md) at the end of a section before you unlock the next café shift.

Python 3.10+ assumed.

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt    # needed from the data science section on
python3 practice/check.py          # everything will fail. that is the point.
```

## A good hour

1. Read **one** lesson (about 20 minutes). Type the snippets.
2. Run the matching **drill** until `ok`.
3. Do the **café step** that names that lesson.
4. Stop. Tomorrow, the next lesson — not three more chapters.

If you only have fifteen minutes, do a [debug puzzle](practice/debug/). They are broken on purpose.

## Learning path

| Section | Time | You leave able to… |
|---|---|---|
| [01 Basics](01-basics/) | ~6 hours | Write a script that takes an order and saves it |
| [02 Intermediate](02-intermediate/) | ~6 hours | Model the shop with objects, errors, and a log |
| [03 Advanced](03-advanced/) | ~6 hours | Type, test, and measure the close-out |
| [04 Data Science](04-data-science/) | ~8 hours | Answer Ada with a plot and a model |

---

### 01 — Basics

| Lesson | You will build | Drill |
|---|---|---|
| [Getting started](01-basics/01-getting-started.md) | Print that the café is open | — |
| [Variables and types](01-basics/02-variables-and-data-types.md) | Price a drink | [`06_celsius`](practice/basics/06_celsius.py) |
| [Operators](01-basics/03-operators.md) | Tax and tip | [debug `01_or_trap`](practice/debug/01_or_trap.py) |
| [Strings](01-basics/04-strings.md) | A lined-up receipt | [`02_clean_email`](practice/basics/02_clean_email.py) |
| [Collections](01-basics/05-collections.md) | A menu dict and a cart | [`03_unique_in_order`](practice/basics/03_unique_in_order.py) |
| [Control flow](01-basics/06-control-flow.md) | A `while` order loop | [`04_fizzbuzz`](practice/basics/04_fizzbuzz.py) |
| [Functions](01-basics/07-functions.md) | Reusable `subtotal` | [`01_clamp`](practice/basics/01_clamp.py), [`05_word_count`](practice/basics/05_word_count.py) |
| [Modules and files](01-basics/08-modules-and-files.md) | `orders.json` | — |
| [Hands-on examples](01-basics/09-hands-on.md) | 10 typed programs | — |
| [Practice questions](01-basics/10-practice.md) | 10 problems | spoilers in-page |

Then: [Café Shift 1](labs/northside-cafe/README.md#shift-1--open-the-shop-basics) · [Quiz](quizzes/01-basics.md)

### 02 — Intermediate

| Lesson | You will build | Drill |
|---|---|---|
| [Comprehensions](02-intermediate/01-comprehensions.md) | Item counts in one expression | [`01_invert`](practice/intermediate/01_invert.py) |
| [Error handling](02-intermediate/02-error-handling.md) | `UnknownItem` | [`02_safe_div`](practice/intermediate/02_safe_div.py) |
| [Object-oriented Python](02-intermediate/03-object-oriented-python.md) | `Order` and `Menu` | — |
| [Iterators and generators](02-intermediate/04-iterators-and-generators.md) | Replay a log lazily | [`03_window`](practice/intermediate/03_window.py) |
| [Decorators and context managers](02-intermediate/05-decorators-and-context-managers.md) | Time the close-out | — |
| [Functional tools](02-intermediate/06-functional-tools.md) | Bestsellers with `Counter` | — |
| [Datetime and regex](02-intermediate/07-datetime-and-regex.md) | Morning-rush count | [`04_parse_date`](practice/intermediate/04_parse_date.py) |
| [Hands-on examples](02-intermediate/08-hands-on.md) | 10 typed programs | — |
| [Practice questions](02-intermediate/09-practice.md) | 10 problems | spoilers in-page |

Then: [Café Shift 2](labs/northside-cafe/README.md#shift-2--run-the-floor-intermediate) · [Quiz](quizzes/02-intermediate.md)

### 03 — Advanced

| Lesson | You will build | Drill |
|---|---|---|
| [Type hints](03-advanced/01-type-hints.md) | A typed `first` | [`01_first`](practice/advanced/01_first.py) |
| [Dataclasses](03-advanced/02-dataclasses.md) | Integer-cent `Money` | [`02_money`](practice/advanced/02_money.py) |
| [Async and concurrency](03-advanced/03-async-and-concurrency.md) | Choose a tool for waiting vs CPU | — |
| [Testing](03-advanced/04-testing.md) | `pytest` on `Order` | [café tests](labs/northside-cafe/starters/test_order.py) |
| [Performance](03-advanced/05-performance-and-internals.md) | Time `Counter` vs a loop | — |
| [Packaging](03-advanced/06-packaging-and-tooling.md) | An installable project layout | — |
| [Hands-on examples](03-advanced/07-hands-on.md) | 10 typed programs | — |
| [Practice questions](03-advanced/08-practice.md) | 10 problems | spoilers in-page |

Then: [Café Shift 3](labs/northside-cafe/README.md#shift-3--tighten-the-system-advanced) · [Quiz](quizzes/03-advanced.md)

### 04 — Data Science

| Lesson | You will build | Drill |
|---|---|---|
| [NumPy](04-data-science/01-numpy.md) | Weekend mean without a row loop | [`01_standardize`](practice/data_science/01_standardize.py) |
| [pandas](04-data-science/02-pandas.md) | A tidy monthly table | — |
| [Visualization](04-data-science/03-visualization.md) | A two-panel plot Ada can pin up | — |
| [SciPy and statistics](04-data-science/04-scipy-and-stats.md) | A test and a baseline model | — |
| [End-to-end project](04-data-science/05-end-to-end-project.md) | Five sentences in `answer.md` | — |

Then: [Café Shift 4](labs/northside-cafe/README.md#shift-4--read-the-books-data-science) · [Quiz](quizzes/04-data-science.md)

---

## How the pages are written

- Code blocks are complete enough to run.
- **Try this** at the end of a lesson is extra. The drill and the café step are the real homework.
- **Hints** are not full solutions. Worked drill code is in [`practice/solutions/`](practice/solutions/) — peek after you have a theory.
- **Common mistakes** are the bugs the debug folder turns into puzzles.

Start here: [Getting started](01-basics/01-getting-started.md). First command after that: `python3 practice/check.py basics`.
