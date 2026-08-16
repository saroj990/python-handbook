# Practice drills

Short functions. Instant feedback. No extra packages.

```bash
# from the handbook root
python3 practice/check.py              # everything
python3 practice/check.py basics       # one folder
python3 practice/check.py 01_clamp     # one drill by name
```

Each drill file has a function with `raise NotImplementedError`. Replace that line. Leave the checks at the bottom alone — they are how you know you are done.

| Folder | When |
|---|---|
| [`basics/`](basics/) | After the matching basics lesson |
| [`intermediate/`](intermediate/) | After the matching intermediate lesson |
| [`advanced/`](advanced/) | After type hints / dataclasses |
| [`data_science/`](data_science/) | After NumPy (needs `pip install -r requirements.txt`) |
| [`debug/`](debug/) | Anytime. The function is *wrong*. Make it right. |

A pass looks like this:

```text
  ok   basics/01_clamp
  FAIL basics/02_clean_email
       expected 'ada@example.com'
       got      '  Ada@Example.COM '

2 drills · 1 passed · 1 failed
Next: basics/02_clean_email
```

Failed checks tell you the inputs. They do not tell you the algorithm. That is your job.

Stuck? Hints live in the lesson the drill names at the top of the file. Full worked functions are in [`solutions/`](solutions/).
