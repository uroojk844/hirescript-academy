---
title: Modules and Packages
description: Learn how to organize Python code into reusable modules and packages for better code structure and scalability.
navigation:
  order: 7
---


# Modules and Packages

Modules and packages in Python allow you to organize code into reusable, modular components, making your projects more maintainable and scalable. This lesson covers creating, importing, and managing modules and packages, along with practical applications.

## Learning Objectives
- Understand the difference between modules and packages.
- Create and import custom modules.
- Organize code into packages with multiple modules.
- Use standard library and third-party modules effectively.
- Apply modules and packages in a real-world project.

## Section 1: Understanding Modules
A **module** is a single Python file (`.py`) containing functions, classes, or variables that can be imported into other scripts. Python’s standard library provides many built-in modules, like `math` or `datetime`.

**Code Example: Creating and Importing a Module**
Create a file named `math_utils.py`:
::Editor
#title
math_utils.py
#default
```python
# math_utils.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

PI = 3.14159
```
::

Now, use it in another script:
::Editor
#title
math_utils.py
#default
```python
# main.py
import math_utils

result1 = math_utils.add(5, 3)
result2 = math_utils.subtract(5, 3)
print(f"Add: {result1}, Subtract: {result2}, PI: {math_utils.PI}")
```
::

**Expected Output:**
```
Add: 8, Subtract: 2, PI: 3.14159
```

**Explanation**:
- `math_utils.py` is a module containing functions and a constant.
- The `import` statement makes the module’s contents available.
- Use dot notation (`math_utils.add`) to access module contents.

## Section 2: Importing Modules
Python offers several ways to import modules:
- `import module_name`: Imports the entire module.
- `from module_name import item`: Imports specific items.
- `import module_name as alias`: Uses an alias for brevity.
- `from module_name import *`: Imports everything (avoid this to prevent namespace pollution).

**Code Example: Different Import Methods**
::Editor
#title
diff_import_methods.py
#default
```python
import math
from datetime import datetime as dt
from math_utils import add, PI

print(math.sqrt(16))  # Using standard library module
print(dt.now())       # Using alias
print(add(10, 5))     # Using imported function
print(PI)             # Using imported constant
```
::

**Expected Output (example):**
```
4.0
2025-09-30 23:10:45.123456
15
3.14159
```

**Explanation**:
- `math` is a standard library module.
- `datetime` is imported with an alias (`dt`).
- Specific items (`add`, `PI`) are imported from `math_utils`.

## Section 3: Creating Packages
A **package** is a directory containing multiple modules and a special `__init__.py` file (which can be empty). Packages allow you to group related modules.

**Example Structure:**
```
my_package/
├── __init__.py
├── utilities.py
├── calculations.py
```

Create `utilities.py`:
::Editor
#title
utilities.py
#default
```python
# my_package/utilities.py
def greet(name):
    return f"Hello, {name}!"
```
::


Create `calculations.py`:
::Editor
#title
calculations.py
#default
```python
# my_package/calculations.py
def multiply(a, b):
    return a * b
```
::

Use the package in a script:
::Editor
#title
examples.py
#default
```python
# main.py
from my_package.utilities import greet
from my_package.calculations import multiply

print(greet("Alice"))
print(multiply(4, 5))
```
::

**Expected Output:**
```
Hello, Alice!
20
```

**Explanation**:
- The `__init__.py` file marks `my_package` as a package.
- Modules inside the package are accessed using dot notation (`my_package.utilities`).
- Import specific functions to use them directly.

## Section 4: Using Third-Party Packages
Third-party packages, like `requests` or `numpy`, can be installed using `pip`. They extend Python’s functionality for specialized tasks.

**Code Example: Using the `requests` Module**
::Editor
#title
requests.py
#default
```python
import requests

try:
    response = requests.get("https://api.github.com")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()[:2]}")  # Print first two items
except requests.RequestException as e:
    print(f"Error fetching data: {e}")
```
::

**Expected Output (example):**
```
Status Code: 200
Response: {'current_user_url': 'https://api.github.com/user', 'current_user_authorizations_html_url': 'https://github.com/settings/connections/applications{/client_id}'}
```

**Explanation**:
- The `requests` module fetches data from a URL.
- Exception handling ensures the program doesn’t crash if the request fails.
- Install `requests` using `pip install requests`.

## Mini-Project: Personal Finance Tracker Package
This project creates a package to track income and expenses, organized into modules for calculations and reporting.

**Package Structure:**
```
finance_tracker/
├── __init__.py
├── transactions.py
├── reports.py
```

Create `transactions.py`:
::Editor
#title
transactions.py
#default
```python
# finance_tracker/transactions.py
class Transaction:
    def __init__(self, amount, category, type_):
        if type_ not in ["income", "expense"]:
            raise ValueError("Type must be 'income' or 'expense'")
        self.amount = amount
        self.category = category
        self.type_ = type_
```
::

Create `reports.py`:
::Editor
#title
reports.py
#default
```python
# finance_tracker/reports.py
def generate_report(transactions):
    total_income = sum(t.amount for t in transactions if t.type_ == "income")
    total_expense = sum(t.amount for t in transactions if t.type_ == "expense")
    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": total_income - total_expense
    }
```
::

Main script:
::Editor
#title
main.py
#default
```python
# main.py
from finance_tracker.transactions import Transaction
from finance_tracker.reports import generate_report

transactions = [
    Transaction(1000, "Salary", "income"),
    Transaction(300, "Groceries", "expense"),
    Transaction(200, "Rent", "expense")
]

report = generate_report(transactions)
print(f"Report: {report}")
```
::

**Expected Output:**
```
Report: {'total_income': 1000, 'total_expense': 500, 'balance': 500}
```

**Explanation**:
- The `finance_tracker` package organizes code into `transactions` and `reports` modules.
- `transactions.py` defines a `Transaction` class for managing financial data.
- `reports.py` generates a summary of income, expenses, and balance.
- The main script demonstrates importing and using the package.

## Best Practices
- **Keep Modules Focused**: Each module should have a single responsibility (e.g., calculations vs. utilities).
- **Use Descriptive Names**: Choose clear names for modules and packages (e.g., `finance_tracker`).
- **Avoid Circular Imports**: Ensure modules don’t import each other in a loop.
- **Use `__init__.py` Wisely**: Initialize packages with imports or configurations if needed.
- **Document Modules**: Add docstrings to modules and functions for clarity.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Module | A single `.py` file containing reusable code. |
| Package | A directory with `__init__.py` and multiple modules. |
| Importing | Use `import`, `from`, or aliases to access module contents. |
| Third-Party Packages | Extend functionality with tools like `pip`. |
| Organization | Group related modules into packages for scalability. |

## What's Next?
In the next module, **Advanced Python Concepts**, you’ll explore decorators, generators, and context managers to write more efficient and expressive Python code.

