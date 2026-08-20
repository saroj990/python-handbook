# Practice — Advanced

---

**1.** Write the return type of `def find(name: str) -> ?` when the name might be missing.

<details>
<summary>Answer</summary>

`str | None` (or `Optional[str]`). After `if user is None: return`, the checker knows the rest is `str`.
</details>

**2.** `list[int] | None` vs `list[int | None]` — which one is “the whole list is missing”?

<details>
<summary>Answer</summary>

`list[int] | None`. The other is a list that may contain `None` entries.
</details>

**3.** Why `field(default_factory=list)` instead of `tags: list[str] = []` on a dataclass?

<details>
<summary>Answer</summary>

`[]` is one shared list for every instance. `default_factory=list` builds a new list each time.
</details>

**4.** 200 HTTP calls. Threads, processes, or asyncio — pick one and say why.

<details>
<summary>Answer</summary>

Asyncio if the client is async. Threads if the library blocks. Processes are the wrong cost: the work is waiting, not computing.
</details>

**5.** Why will a tight pure-Python loop not speed up with threads in CPython?

<details>
<summary>Answer</summary>

The GIL: only one thread runs Python bytecode at a time. Threads help I/O waits. CPU-bound Python wants processes or a C library (NumPy).
</details>

**6.** `time.sleep` inside `async def` — what goes wrong?

<details>
<summary>Answer</summary>

The event loop freezes. Use `await asyncio.sleep(...)`.
</details>

**7.** Write a pytest that expects `ValueError` from `Money(-1)`.

<details>
<summary>Answer</summary>

```python
with pytest.raises(ValueError):
    Money(-1)
```
</details>

**8.** You “optimized” a function and tests still pass. Are you done?

<details>
<summary>Answer</summary>

Not until you measured (`timeit` / `cProfile`) on a realistic input. Fast and wrong is worse than slow and right — hence tests first.
</details>

**9.** `list.sort()` assigned back: `nums = nums.sort()`. What is `nums`?

<details>
<summary>Answer</summary>

`None`. `list.sort` sorts in place and returns `None`. Use `nums.sort()` or `nums = sorted(nums)`.
</details>

**10.** Library vs application: who pins exact dependency versions?

<details>
<summary>Answer</summary>

An **application** you deploy (lock file / hashed `requirements.txt`). A **library** you publish should keep abstract ranges so you do not fight your users’ other packages.
</details>

---

Next: [Café Shift 3](../labs/northside-cafe/README.md#shift-3--tighten-the-system-advanced) and the [advanced quiz](../quizzes/03-advanced.md).
