# 05 — Collections

> **~35 min** · Build: a `MENU` dict and a cart list.  
> **Then:** [drill `03_unique_in_order`](../practice/basics/03_unique_in_order.py) · [debug `02_shared_row`](../practice/debug/02_shared_row.py)

Python's four everyday containers: list, tuple, set, dict. Choose by what you need to do, not by habit.

| Type | Ordered | Mutable | Unique items | Lookup |
|---|---|---|---|---|
| `list` | yes | yes | no | by index |
| `tuple` | yes | no | no | by index |
| `set` | no | yes | yes | by value |
| `dict` | yes (insertion) | yes | unique keys | by key |

## Lists

```python
nums = [3, 1, 4]
nums.append(1)
nums.insert(0, 0)
nums.extend([5, 9])
nums.pop()            # remove and return last
nums.remove(1)        # remove first matching value
nums.sort()           # in place
sorted(nums)          # new list
len(nums)
nums[0]
nums[-1]
nums[1:3]
```

Lists can hold mixed types, but a list of one kind of thing is easier to reason about.

List multiplication copies *references*:

```python
row = [0] * 4          # fine for immutables
grid = [[0] * 4] * 3   # bug: three names for one inner list
grid = [[0] * 4 for _ in range(3)]  # correct
```

## Tuples

```python
point = (3, 4)
x, y = point
singleton = (42,)      # the comma makes a tuple, not the parentheses
```

Use tuples for fixed records (a point, a database row) and as dict keys. A tuple of lists is still "mutable" in the sense that the inner lists can change; the tuple itself cannot be reassigned at an index.

## Sets

```python
tags = {"python", "data", "python"}
# {"python", "data"}
"data" in tags         # O(1) average
tags.add("ml")
tags.discard("missing")  # no error if absent
a | b                  # union
a & b                  # intersection
a - b                  # difference
```

Items must be hashable (immutable: numbers, strings, tuples of hashables). A list cannot go in a set.

## Dictionaries

```python
person = {"name": "Ada", "year": 1815}
person["name"]
person.get("city", "unknown")
person["city"] = "London"
person.keys()
person.values()
person.items()         # (key, value) pairs

for key, value in person.items():
    print(key, value)
```

`person["missing"]` raises `KeyError`. `get` returns a default instead.

Dicts preserve insertion order (guaranteed since 3.7). That means you can treat them as ordered maps.

Merging (3.9+):

```python
combined = left | right
left |= extra
```

## Choosing a collection

- Sequence you will change: **list**
- Fixed record or dict key: **tuple**
- Membership tests, uniqueness: **set**
- Lookup by name or id: **dict**

## Copying

```python
shallow = original.copy()
import copy
deep = copy.deepcopy(original)
```

A shallow copy copies the container, not nested containers. After `b = a.copy()`, `b[0] is a[0]` is still true if that item is a list.

## Common mistakes

- `[[0] * n] * m` for a matrix.
- Iterating a dict and adding/removing keys. Iterate `list(d)` or build a new dict.
- Using a list when you only need "is this in the collection?" — a set is the right tool.

## Try this

1. From `words = ["to", "be", "or", "not", "to", "be"]`, build a list of unique words *in the order they first appear*.
2. Count how many times each word appears. Store counts in a dict.
3. Given two lists of student ids, find ids that appear in both (use sets).

**Hints:** Walk the list; add to the result only if the word is not already in a `seen` set. For counts, `counts[w] = counts.get(w, 0) + 1`, or wait for `collections.Counter` in intermediate. Intersection: `set(a) & set(b)`.
