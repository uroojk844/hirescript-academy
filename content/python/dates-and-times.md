---
title: Dates and Times
description: Learn to handle date and time data using Python’s datetime module and related libraries for tasks like formatting, calculations, and time zones.
navigation:
  order: 10
---


# Working with Dates and Times

Handling dates and times is crucial in many applications, from logging events to scheduling tasks. Python's built-in `datetime` module, along with third-party libraries like `pytz` for time zones, provides robust tools for working with temporal data. This lesson introduces the fundamentals, making it accessible for beginners while covering practical usage.

## Learning Objectives
- Understand the core classes in the `datetime` module: `date`, `time`, `datetime`, and `timedelta`.
- Create, format, and parse dates and times.
- Perform calculations like adding/subtracting time intervals.
- Handle time zones using `pytz`.
- Apply date/time operations in real-world scenarios.

## Section 1: Basic Date and Time Objects
The `datetime` module includes classes for dates (`date`), times (`time`), and combined date-times (`datetime`). Use `today()` or `now()` for current values.

**Code Example: Creating Date and Time Objects**
::Editor
#title
date_time.py
#default
```python
from datetime import date, time, datetime

# Current date
today = date.today()
print(today)

# Specific date
birth_date = date(2000, 1, 1)
print(birth_date)

# Current datetime
now = datetime.now()
print(now)

# Specific time
lunch_time = time(12, 30)
print(lunch_time)
```
::

**Expected Output (example, assuming run on September 30, 2025):**
```
2025-09-30
2000-01-01
2025-09-30 10:15:45.123456
12:30:00
```

**Explanation**:
- `date.today()` returns the current date.
- `datetime.now()` returns the current date and time.
- Constructors like `date(year, month, day)` create specific instances.
- These objects are immutable and can be used for comparisons.

## Section 2: Formatting and Parsing
Format dates/times as strings using `strftime()`, and parse strings into objects with `strptime()`.

**Code Example: Formatting and Parsing**
::Editor
#title
formatting_parsing.py
#default
```python
from datetime import datetime

now = datetime.now()

# Formatting
formatted = now.strftime("%Y-%m-%d %H:%M:%S")
print(f"Formatted: {formatted}")

# Parsing
parsed = datetime.strptime("2025-09-30 10:00:00", "%Y-%m-%d %H:%M:%S")
print(f"Parsed: {parsed}")
```
::

**Expected Output (example):**
```
Formatted: 2025-09-30 10:15:45
Parsed: 2025-09-30 10:00:00
```

**Explanation**:
- `%Y`, `%m`, `%d` for year, month, day; `%H`, `%M`, `%S` for hours, minutes, seconds.
- `strftime()` converts object to string.
- `strptime()` converts string to object, raising `ValueError` on invalid formats.

## Section 3: Time Deltas and Calculations
`timedelta` represents durations for adding/subtracting from dates/times.

**Code Example: Date Calculations**
::Editor
#title
data_calculations.py
#default
```python
from datetime import datetime, timedelta

now = datetime.now()

# Add 7 days
future = now + timedelta(days=7)
print(f"Future: {future}")

# Subtract 1 hour
past = now - timedelta(hours=1)
print(f"Past: {past}")

# Difference between dates
birth_date = datetime(2000, 1, 1)
age = now - birth_date
print(f"Age in days: {age.days}")
```
::

**Expected Output (example):**
```
Future: 2025-10-07 10:15:45.123456
Past: 2025-09-30 09:15:45.123456
Age in days: 9402
```

**Explanation**:
- `timedelta` accepts `days`, `hours`, `minutes`, etc.
- Addition/subtraction modifies dates/times.
- Subtraction yields a `timedelta` for duration calculations.

## Section 4: Handling Time Zones
Use `pytz` for time zone support, as `datetime` has basic `tzinfo`.

**Code Example: Time Zones**
::Editor
#title
time_zones.py
#default
```python
from datetime import datetime
import pytz

# Current time in UTC
utc_now = datetime.now(pytz.UTC)
print(f"UTC: {utc_now}")

# Convert to New York time
ny_tz = pytz.timezone('America/New_York')
ny_now = utc_now.astimezone(ny_tz)
print(f"New York: {ny_now}")

# Specific time with timezone
meeting = datetime(2025, 10, 1, 14, 0, tzinfo=pytz.UTC)
print(f"Meeting in UTC: {meeting}")
```
::

**Expected Output (example):**
```
UTC: 2025-09-30 10:15:45.123456+00:00
New York: 2025-09-30 06:15:45.123456-04:00
Meeting in UTC: 2025-10-01 14:00:00+00:00
```

**Explanation**:
- `pytz.UTC` for UTC timezone.
- `astimezone()` converts between zones.
- Install `pytz` with `pip install pytz` (assume installed in tutorial env).
- Handles daylight saving automatically.

## Mini-Project: Event Scheduler
This project creates a simple scheduler to add events, check upcoming ones, and calculate time until events.

**Code Example: Event Scheduler**
::Editor
#title
event_schedules.py
#default
```python
from datetime import datetime, timedelta
import pytz

class EventScheduler:
    def __init__(self, timezone='UTC'):
        self.events = []
        self.tz = pytz.timezone(timezone)
    
    def add_event(self, name, date_str, time_str):
        try:
            event_time = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
            event_time = self.tz.localize(event_time)
            self.events.append((name, event_time))
            return f"Added event: {name} at {event_time}"
        except ValueError:
            return "Invalid date/time format!"
    
    def upcoming_events(self):
        now = datetime.now(self.tz)
        upcoming = [(name, event - now) for name, event in self.events if event > now]
        return sorted(upcoming, key=lambda x: x[1])

scheduler = EventScheduler('America/New_York')
print(scheduler.add_event("Meeting", "2025-10-01", "09:00"))
print(scheduler.add_event("Lunch", "2025-09-30", "12:00"))

upcoming = scheduler.upcoming_events()
for name, delta in upcoming:
    print(f"{name} in {delta.days} days, {delta.seconds // 3600} hours")
```
::

**Expected Output (example, assuming now is 2025-09-30 10:00 EDT):**
```
Added event: Meeting at 2025-10-01 09:00:00-04:00
Added event: Lunch at 2025-09-30 12:00:00-04:00
Lunch in 0 days, 2 hours
Meeting in 0 days, 23 hours
```

**Explanation**:
- `EventScheduler` manages events with time zones.
- `add_event` parses and localizes inputs.
- `upcoming_events` calculates deltas and sorts by soonest.
- Demonstrates parsing, time zones, and deltas.

## Best Practices
- **Use UTC for Storage**: Store times in UTC and convert to local when displaying.
- **Handle Exceptions**: Catch `ValueError` in parsing and invalid deltas.
- **Aware vs. Naive**: Prefer timezone-aware datetimes for accuracy.
- **Format Consistently**: Use ISO 8601 ("%Y-%m-%dT%H:%M:%S") for interoperability.
- **Third-Party Libraries**: For complex needs, consider `arrow` or `pendulum` (install via pip).

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Date/Time Classes | `date`, `time`, `datetime` for handling temporal data. |
| Formatting/Parsing | `strftime()` and `strptime()` for string conversions. |
| Timedelta | Add/subtract intervals for calculations. |
| Time Zones | Use `pytz` for accurate zone handling. |
| Calculations | Compute differences and future/past times. |

## What's Next?
In the next module, **Python NumPy Library**, you’ll learn to work with numerical arrays and perform efficient computations for data science tasks.
