# 05 — Performance and CPython internals

> **~30 min** · Measure: `Counter` vs a counting loop on 50_000 carts.  
> **Then:** [Café step 16](../labs/northside-cafe/README.md#16-do-not-guess-the-slow-part)

Make the program correct first. Then measure. Then change the slow part. Guessing which loop is hot is a reliable way to waste a day.

## Measure

```python
import timeit

timeit.timeit("sum(range(1000))", number=10_000)
```

For a real program:

```bash
python -m cProfile -s tottime your_script.py
```

`tottime` is time spent *in* the function, not in its children. That is usually the column you want.

In notebooks and REPLs, `%timeit` (IPython) is convenient. For a single block:

```python
from time import perf_counter

start = perf_counter()
...
print(perf_counter() - start)
```

Do not use `time.time()` for intervals; it can jump if the clock is adjusted.

## The usual wins, in order

1. **Use a better algorithm.** `O(n^2)` in Python will lose to `O(n log n)` even in a slower language.
2. **Use the right collection.** `x in list` is O(n); `x in set` is O(1) average.
3. **Stay in C.** `sum`, `min`, `sort`, NumPy, pandas — these run in compiled code. A Python `for` loop that adds floats will lose to `array.sum()`.
4. **Avoid work.** Cache a pure function (`functools.cache`). Do not build a list you only iterate once (generator).
5. **Then** consider processes, Cython, or rewriting a kernel.

## Why a Python loop is slow

Each iteration of a Python `for` loop is a trip through the interpreter: load names, check types, allocate objects. An integer in Python is a heap object, not a CPU register.

```python
# slow
total = 0
for x in data:
    total += x * x

# faster: stay in C
total = sum(x * x for x in data)

# fastest for numeric arrays: NumPy
total = (arr * arr).sum()
```

The generator form still walks Python objects. NumPy walks a contiguous buffer of machine numbers. That is why the data science section exists.

## The GIL, briefly

CPython's Global Interpreter Lock allows only one thread to execute Python bytecode at a time. It simplifies memory management. Consequences:

- Threads overlap *waiting*, not *computing* in Python.
- Many C extensions (NumPy math, `zlib`, some I/O) release the GIL while they work, so threads can help even for CPU if the work is in C.
- Multiple processes have multiple GILs.

This is an implementation detail of CPython, not of the Python language. Other implementations differ.

## Memory and objects

```python
import sys
sys.getsizeof(0)          # the int object, not "a 64-bit integer"
sys.getsizeof([0] * 1000)
```

`getsizeof` does not include referred-to objects. A list of a million small ints is a million objects plus the list pointer array.

`__slots__` and frozen dataclasses with `slots=True` cut per-instance `__dict__` overhead when you create millions of objects. For a few thousand, it does not matter.

## Micro-optimizations that are usually not worth it

- Replacing `x.append` with a preallocated list.
- Localizing globals (`sqrt = math.sqrt` inside a hot function) — real, small, and rarely the bottleneck.
- Bit tricks instead of readable arithmetic.

If `cProfile` does not point at the line, leave it alone.

## A profiling workflow

1. Write a test so you cannot "speed up" a wrong result.
2. Profile a realistic input, not `range(10)`.
3. Change one thing.
4. Re-measure.
5. Stop when it is fast enough.

"Fast enough" is a product decision: a script that runs overnight can stay ugly; an API that must answer in 50 ms cannot.

## Common mistakes

- Optimizing before you have a profile.
- Copying data into lists "for speed" and then wondering why memory exploded.
- Using threads to parallelize a pure-Python image filter. Use NumPy, or processes, or a library that already did this.

## Try this

1. Time `x in big_list` vs `x in big_set` for a million integers. Use `timeit`.
2. Profile a function that computes the sum of squares two ways: a `for` loop and `sum(x*x for x in ...)`.
3. Read the top three lines of a `cProfile` report and identify whether they are your code or a library.

**Hints:** Build `list(range(1_000_000))` and `set` of the same. `timeit.timeit(lambda: n in container, number=1000)`. `python -m cProfile -s tottime`.
