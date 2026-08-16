# Quiz — Advanced

**1.** Do type hints change what the program does at runtime?

<details>
<summary>Answer</summary>

Almost never. Python does not enforce them. Checkers (`mypy`, `pyright`) and your editor do. Libraries like pydantic *do* enforce, on purpose.
</details>

**2.** Why `field(default_factory=list)` instead of `tags: list[str] = []` on a dataclass?

<details>
<summary>Answer</summary>

`[]` is one shared list for every instance — the mutable-default bug again. `default_factory=list` builds a new list per instance.
</details>

**3.** You have 200 HTTP requests to make. Threads, processes, or asyncio?

<details>
<summary>Answer</summary>

Asyncio if you can use an async HTTP client. Threads if the library is blocking. Processes are the wrong tool: the work is waiting, not computing, and process startup is expensive.
</details>

**4.** Why does a tight Python loop not get faster with threads in CPython?

<details>
<summary>Answer</summary>

The GIL: only one thread runs Python bytecode at a time. Threads help when they *wait* (I/O). CPU-bound Python needs processes, or a C library (NumPy) that releases the GIL.
</details>

**5.** You optimized a function and the tests still pass. Are you done?

<details>
<summary>Answer</summary>

Not until you measured. Profile first (`cProfile`, `timeit`), change the hot part, re-measure. Fast and wrong is worse than slow and right — that is why the test comes *before* the tweak.
</details>
