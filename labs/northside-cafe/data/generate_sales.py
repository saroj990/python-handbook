"""Write data/sales.csv — daily café sales with a few broken rows on purpose."""

from pathlib import Path

import numpy as np
import pandas as pd

rng = np.random.default_rng(7)
n = 180
dates = pd.date_range("2025-04-01", periods=n, freq="D")
temp = rng.normal(22, 6, size=n)
weekend = (dates.dayofweek >= 5).astype(int)
noise = rng.normal(0, 8, size=n)
sales = 40 + 3.2 * temp + 18 * weekend + noise
sales = np.clip(sales, 0, None)

sales[10] = np.nan
temp[25] = 999
sales[40] = -5

df = pd.DataFrame(
    {
        "date": dates,
        "temp_c": np.round(temp, 2),
        "is_weekend": weekend,
        "sales": np.round(sales, 2),
    }
)

out = Path(__file__).resolve().parent / "sales.csv"
df.to_csv(out, index=False)
print(f"wrote {out} ({len(df)} rows)")
