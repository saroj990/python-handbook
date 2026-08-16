# 03 — Async and concurrency

> **~40 min** · Decide: 200 supplier pings — threads, processes, or asyncio?  
> **Then:** the “Try this” sleeps. Feel the wall-clock difference.

Three ways to overlap work in Python, for three different problems:

| Tool | Best for | Shares memory | Limited by |
|---|---|---|---|
| `asyncio` | many I/O waits (HTTP, sockets, DB) | yes | the event loop; one thread |
| `threading` | blocking I/O you cannot make async | yes | the GIL for CPU work |
| `multiprocessing` | CPU-bound work | no (separate processes) | process overhead, pickling |

The GIL (Global Interpreter Lock) means only one thread runs Python bytecode at a time in CPython. Threads still help when they *wait* (disk, network). They do not speed up a tight Python loop. Processes do, because each has its own interpreter.

## `asyncio` — concurrent I/O

```python
import asyncio

async def fetch(name: str, delay: float) -> str:
    await asyncio.sleep(delay)     # stand-in for network I/O
    return f"{name} done"

async def main() -> None:
    results = await asyncio.gather(
        fetch("a", 0.4),
        fetch("b", 0.2),
        fetch("c", 0.3),
    )
    print(results)

asyncio.run(main())
```

`async def` defines a coroutine. Calling it does not run the body; it returns a coroutine object. `await` schedules the wait and lets the loop run other tasks. `asyncio.gather` runs several coroutines concurrently and collects results.

Rules of thumb:

- `await` only inside `async def`.
- Do not call blocking functions (`time.sleep`, `requests.get`, heavy disk) on the event loop. Use `asyncio.to_thread(...)` or a process pool.
- `asyncio.run()` is the entry point of a program. Do not nest it.

Timeouts and cancellation:

```python
async with asyncio.timeout(2):     # 3.11+
    await fetch("slow", 5)
```

## Threads — blocking I/O you do not control

```python
from concurrent.futures import ThreadPoolExecutor, as_completed

def check(url: str) -> tuple[str, int]:
    # blocking library you cannot rewrite
    ...

with ThreadPoolExecutor(max_workers=8) as pool:
    futures = [pool.submit(check, url) for url in urls]
    for future in as_completed(futures):
        print(future.result())
```

Protect shared mutable state with a `threading.Lock`. Prefer returning values from workers over writing a shared list without a lock.

## Processes — CPU-bound work

```python
from concurrent.futures import ProcessPoolExecutor

def crunch(n: int) -> int:
    return sum(i * i for i in range(n))

if __name__ == "__main__":
    with ProcessPoolExecutor() as pool:
        print(list(pool.map(crunch, [5_000_000, 5_000_000, 5_000_000])))
```

The `if __name__ == "__main__"` guard is required on macOS and Windows (the new process re-imports the module). Arguments and return values must be pickleable.

`multiprocessing.Queue` and shared memory exist for heavier designs. Start with `ProcessPoolExecutor.map`.

## Choosing

1. Waiting on hundreds of sockets or HTTP calls, and you can use async libraries (`httpx`, `aiofiles`): **asyncio**.
2. A few blocking third-party calls: **threads**.
3. NumPy already releases the GIL for many operations; a single process may be enough. If the work is *your* Python loops over CPU: **processes**, or rewrite the hot loop in NumPy (data science section).

Do not mix all three until you have a reason. Concurrency bugs are real: races, deadlocks, pickle errors, "why is my async function sequential? I forgot `await`."

## Common mistakes

- Using `time.sleep` inside `async def`. The whole loop freezes. Use `await asyncio.sleep`.
- Starting processes without the `__main__` guard and getting a recursive explosion of processes.
- Assuming threads will speed up number-crunching in pure Python. They will not.

## Try this

1. Run three `asyncio.sleep` tasks of 1 second with `gather` and confirm the wall time is about 1 second, not 3.
2. Use `ThreadPoolExecutor` to run `time.sleep(0.5)` four times and print when each finishes.
3. Explain in a comment why `ProcessPoolExecutor` would be a bad fit for that sleep example.

**Hints:** `time.perf_counter()` around `asyncio.run`. `as_completed` prints in finish order. Processes cost more to start than the sleep they would wait through; the work is I/O (waiting), not CPU.
