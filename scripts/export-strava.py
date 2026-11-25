"""Build the portfolio's aggregate workout snapshot from Strava activities.csv."""
import argparse
import csv
import json
from collections import defaultdict
from datetime import datetime
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("activities", type=Path)
args = parser.parse_args()

counts = defaultdict(int)
meters = defaultdict(float)
with args.activities.open(encoding="utf-8-sig", newline="") as source:
    rows = csv.reader(source)
    headers = next(rows)
    date_index = headers.index("Activity Date")
    sport_index = headers.index("Activity Type")
    # Strava repeats Distance: the summary is in km, the detailed field in meters.
    distance_columns = [index for index, name in enumerate(headers) if name == "Distance"]
    distance_index = distance_columns[-1]
    scale = 1000 if len(distance_columns) == 1 else 1
    for row in rows:
        day = datetime.strptime(row[date_index], "%b %d, %Y, %I:%M:%S %p").date()
        sport = row[sport_index].strip()
        if not sport:
            raise ValueError("Missing activity type")
        key = (day.isoformat(), sport)
        counts[key] += 1
        meters[key] += float(row[distance_index] or row[distance_columns[0]] or 0) * (scale if row[distance_index] else 1000)
if not counts:
    raise ValueError("No activities in export")

target = Path(__file__).resolve().parents[1] / "public/data/strava-workouts.json"
target.parent.mkdir(parents=True, exist_ok=True)
temp = target.with_suffix(".tmp")
temp.write_text(json.dumps([
    {"day": day, "sport": sport, "count": count, "meters": round(meters[day, sport], 1)}
    for (day, sport), count in sorted(counts.items())
], separators=(",", ":")) + "\n", encoding="utf-8")
temp.replace(target)
print(f"{sum(counts.values())} workouts, {len(counts)} daily sport totals")
