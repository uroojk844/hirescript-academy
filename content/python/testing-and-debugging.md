---
title: Testing and Debugging
description: Master techniques for testing Python code with unit tests and debugging tools to ensure reliability and identify issues efficiently.
navigation:
  order: 18
---

# Testing and Debugging

Testing and debugging are crucial for developing reliable Python applications. This lesson covers writing unit tests using `unittest` and `pytest`, debugging code with `pdb`, and integrating these practices into your workflow to catch errors early and maintain code quality.

## Learning Objectives
- Understand the importance of testing and debugging.
- Write and run unit tests using `unittest` and `pytest`.
- Use debugging tools like `pdb` to step through code.
- Implement test-driven development (TDD) basics.
- Build a project with tests and debugging examples.

## 1. Introduction to Testing
Testing verifies that code behaves as expected. Unit tests focus on individual functions or methods. Python provides built-in modules like `unittest` and third-party libraries like `pytest` for testing.

**Installation for pytest**:

```python
pip install pytest
```

## 2. Writing Unit Tests with unittest
The `unittest` module is part of Python's standard library and supports test discovery, fixtures, and assertions.

**Example: unittest**
::Editor
#title
unittest.py
#default
```python
import unittest

def add_numbers(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b

class TestMathFunctions(unittest.TestCase):
    """Test cases for math functions."""

    def test_add_numbers(self):
        """Test adding two numbers."""
        self.assertEqual(add_numbers(2, 3), 5)
        self.assertEqual(add_numbers(-1, 1), 0)
        self.assertEqual(add_numbers(0, 0), 0)

if __name__ == "__main__":
    unittest.main()
```
::

**Running Tests**:
```bash
python test_math.py
```

**Expected Output**:
```plaintext
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

## 3. Writing Tests with pytest
`pytest` is more flexible and requires less boilerplate code than `unittest`. It supports fixtures and parameterized tests.

**Example: pytest**
::Editor
#title
pytest.py
#default
```python
def multiply_numbers(a: int, b: int) -> int:
    """Multiply two numbers."""
    return a * b

def test_multiply_numbers():
    """Test multiplying two numbers."""
    assert multiply_numbers(2, 3) == 6
    assert multiply_numbers(-1, 1) == -1
    assert multiply_numbers(0, 5) == 0
```
::
**Running Tests**:
```bash
pytest test_multiply.py
```

**Expected Output**:
```plaintext
============================= test session starts ==============================
collected 1 item                                                               

test_multiply.py .                                                      [100%]

============================== 1 passed in 0.00s ===============================
```

## 4. Debugging with pdb
`pdb` is Python's built-in debugger, allowing you to set breakpoints, inspect variables, and step through code.

**Example: Using pdb**
::Editor
#title
using_pdb.py
#default
```python
import pdb

def divide_numbers(a: float, b: float) -> float:
    """Divide two numbers."""
    pdb.set_trace()  # Set breakpoint
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

result = divide_numbers(10, 2)
print(result)
```
::

**Running with pdb**:
```bash
python debug_divide.py
```

**pdb Commands**:
- `n` (next): Execute the next line.
- `s` (step): Step into a function.
- `c` (continue): Continue execution until the next breakpoint.
- `p variable` (print): Print the value of a variable.
- `q` (quit): Quit the debugger.

**Expected Interaction**:
```plaintext
> debug_divide.py(6)divide_numbers()
-> if b == 0:
(Pdb) p a
10
(Pdb) p b
2
(Pdb) n
> debug_divide.py(8)divide_numbers()
-> return a / b
(Pdb) c
5.0
```

## 5. Test-Driven Development (TDD)
TDD involves writing tests before implementing code. This ensures requirements are clear and code is testable.

**TDD Workflow**:
1. Write a failing test.
2. Implement the minimal code to pass the test.
3. Refactor the code while keeping tests passing.

**Example: TDD for a Function**
::Editor
#title
TDD.py
#default
```python
# Test first (failing)
def test_subtract_numbers():
    assert subtract_numbers(5, 3) == 2

# Implement
def subtract_numbers(a: int, b: int) -> int:
    return a - b

# Run test (passing)
```
::

## Mini-Project: Calculator with Tests and Debugging
Create a simple calculator with addition, subtraction, multiplication, and division, including unit tests and debugging support.

**Code (calculator.py)**:
::Editor
#title
calci.py
#default
```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='calculator.log'
)

class Calculator:
    """A simple calculator class."""
    
    def add(self, a: float, b: float) -> float:
        """Add two numbers."""
        logging.info(f"Adding {a} + {b}")
        return a + b
    
    def subtract(self, a: float, b: float) -> float:
        """Subtract two numbers."""
        logging.info(f"Subtracting {a} - {b}")
        return a - b
    
    def multiply(self, a: float, b: float) -> float:
        """Multiply two numbers."""
        logging.info(f"Multiplying {a} * {b}")
        return a * b
    
    def divide(self, a: float, b: float) -> float:
        """Divide two numbers."""
        logging.info(f"Dividing {a} / {b}")
        if b == 0:
            logging.error("Division by zero attempted")
            raise ValueError("Cannot divide by zero")
        return a / b
```
::

**Test Code (test_calculator.py)**:
::Editor
#title
test_calci.py
#default
```python
import pytest
from calculator import Calculator

@pytest.fixture
def calc():
    """Fixture to create a Calculator instance."""
    return Calculator()

def test_add(calc):
    """Test addition."""
    assert calc.add(2, 3) == 5
    assert calc.add(-1, 1) == 0

def test_subtract(calc):
    """Test subtraction."""
    assert calc.subtract(5, 3) == 2
    assert calc.subtract(0, 0) == 0

def test_multiply(calc):
    """Test multiplication."""
    assert calc.multiply(2, 3) == 6
    assert calc.multiply(-1, 1) == -1

def test_divide(calc):
    """Test division."""
    assert calc.divide(10, 2) == 5
    with pytest.raises(ValueError):
        calc.divide(10, 0)
```
::

**Running Tests**:
```bash
pytest test_calculator.py
```

**Expected Output**:
```plaintext
============================= test session starts ==============================
collected 4 items                                                               

test_calculator.py ....                                                 [100%]

============================== 4 passed in 0.00s ===============================
```

**Debugging Example**:
Add `import pdb; pdb.set_trace()` inside the `divide` method to debug division by zero.

**Log File (`calculator.log`)**:
```plaintext
2025-09-30 23:55:45,123 - INFO - Adding 2 + 3
2025-09-30 23:55:45,124 - INFO - Subtracting 5 - 3
2025-09-30 23:55:45,125 - INFO - Multiplying 2 * 3
2025-09-30 23:55:45,126 - INFO - Dividing 10 / 2
2025-09-30 23:55:45,127 - INFO - Dividing 10 / 0
2025-09-30 23:55:45,128 - ERROR - Division by zero attempted
```

## Best Practices
- **Write Tests Early**: Follow TDD to define requirements upfront.
- **Use Assertions Wisely**: Test edge cases, expected failures, and normal scenarios.
- **Isolate Tests**: Use fixtures to set up and tear down test environments.
- **Debug Systematically**: Use breakpoints and inspect variables step-by-step.
- **Log Test Runs**: Track test executions and failures for analysis.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| unittest | Standard library for writing and running tests. |
| pytest | Flexible testing framework with fixtures and assertions. |
| pdb | Built-in debugger for stepping through code. |
| TDD | Write tests before code to ensure testability. |
| Assertions | Verify expected outcomes in tests. |

## What's Next?
Explore **Virtual Environments Management** (Lesson 19) to learn how to isolate dependencies for your tested projects.
