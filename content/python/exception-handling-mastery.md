---
title: Exception Handling Mastery
description: Learn how to handle errors and exceptions in Python to write robust and reliable code.
navigation:
  order: 6
---


# Exception Handling Mastery

Exception handling is a critical skill in Python programming that allows you to manage errors gracefully and ensure your programs run smoothly even when unexpected issues arise. This lesson introduces Python’s exception handling mechanisms, including try-except blocks, custom exceptions, and best practices for robust code.

## Learning Objectives
- Understand what exceptions are and why they occur in Python.
- Learn to use `try`, `except`, `else`, and `finally` blocks effectively.
- Handle specific exceptions and avoid common pitfalls.
- Create and raise custom exceptions for specific use cases.
- Apply exception handling in real-world scenarios.

## Section 1: Understanding Exceptions
Exceptions are errors that occur during program execution, disrupting the normal flow. Python provides built-in exceptions like `ValueError`, `TypeError`, and `ZeroDivisionError`. Exception handling allows you to catch and manage these errors without crashing your program.

**Code Example: Basic Exception Handling**
```python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("Please enter a valid integer!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    print(f"Result: {result}")
finally:
    print("Execution complete.")
```

**Expected Output (if user inputs `5`):**
```
Enter a number: 5
Result: 2.0
Execution complete.
```

**Expected Output (if user inputs `0`):**
```
Enter a number: 0
Cannot divide by zero!
Execution complete.
```

**Expected Output (if user inputs `abc`):**
```
Enter a number: abc
Please enter a valid integer!
Execution complete.
```

**Explanation**:
- The `try` block contains code that might raise an exception.
- `except` blocks catch specific exceptions (`ValueError`, `ZeroDivisionError`).
- The `else` block runs if no exception occurs.
- The `finally` block executes regardless of exceptions, useful for cleanup.

## Section 2: Handling Multiple Exceptions
You can handle multiple exceptions in a single `except` block or chain multiple `except` blocks for specific error types. This makes your code more precise and user-friendly.

**Code Example: Handling Multiple Exceptions**
```python
try:
    file_name = input("Enter file name: ")
    with open(file_name, 'r') as file:
        number = int(file.read())
        result = 100 / number
except (ValueError, ZeroDivisionError) as e:
    print(f"Error: {e}")
except FileNotFoundError:
    print("File not found!")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
```

**Expected Output (if file `data.txt` contains `10`):**
```
Enter file name: data.txt
```

**Expected Output (if file doesn’t exist):**
```
Enter file name: nonexistent.txt
File not found!
```

**Explanation**:
- The `except (ValueError, ZeroDivisionError)` catches multiple exception types.
- A specific `FileNotFoundError` block handles missing files.
- The generic `Exception` block catches any other unexpected errors.

## Section 3: Raising Exceptions
You can raise exceptions explicitly using the `raise` keyword to enforce conditions or signal errors.

**Code Example: Raising Exceptions**
```python
def check_age(age):
    if age < 18:
        raise ValueError("Age must be 18 or older!")
    return f"Welcome, {age}-year-old!"

try:
    user_age = int(input("Enter your age: "))
    print(check_age(user_age))
except ValueError as e:
    print(f"Error: {e}")
```

**Expected Output (if user inputs `16`):**
```
Enter your age: 16
Error: Age must be 18 or older!
```

**Expected Output (if user inputs `20`):**
```
Enter your age: 20
Welcome, 20-year-old!
```

**Explanation**:
- The `raise` statement triggers a `ValueError` with a custom message.
- The `try-except` block catches and displays the error.

## Section 4: Creating Custom Exceptions
You can define custom exceptions by creating a class that inherits from the built-in `Exception` class. This is useful for specific error scenarios in your application.

**Code Example: Custom Exception**
```python
class InsufficientBalanceError(Exception):
    pass

class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientBalanceError(f"Cannot withdraw {amount}. Balance is only {self.balance}!")
        self.balance -= amount
        return self.balance

try:
    account = BankAccount(100)
    print(account.withdraw(150))
except InsufficientBalanceError as e:
    print(f"Error: {e}")
```

**Expected Output:**
```
Error: Cannot withdraw 150. Balance is only 100!
```

**Explanation**:
- `InsufficientBalanceError` is a custom exception class.
- The `withdraw` method raises it when the withdrawal amount exceeds the balance.
- The `try-except` block handles the custom exception.

## Mini-Project: Simple Shopping Cart with Exception Handling
This mini-project simulates a shopping cart where users can add items, check out, and handle errors like insufficient stock or invalid inputs.

**Code Example: Shopping Cart**
```python
class StockError(Exception):
    pass

class ShoppingCart:
    def __init__(self):
        self.items = {}
        self.stock = {"apple": 10, "banana": 5, "orange": 8}
    
    def add_item(self, item, quantity):
        if item not in self.stock:
            raise StockError(f"{item} is not available!")
        if quantity > self.stock[item]:
            raise StockError(f"Only {self.stock[item]} {item}(s) in stock!")
        self.items[item] = self.items.get(item, 0) + quantity
        self.stock[item] -= quantity
        return f"Added {quantity} {item}(s) to cart."
    
    def checkout(self):
        if not self.items:
            raise StockError("Cart is empty!")
        return f"Checkout complete. Items: {self.items}"

try:
    cart = ShoppingCart()
    print(cart.add_item("apple", 3))
    print(cart.add_item("banana", 6))
except StockError as e:
    print(f"Error: {e}")
else:
    print(cart.checkout())
finally:
    print("Shopping session ended.")
```

**Expected Output (if adding 3 apples and 6 bananas):**
```
Added 3 apple(s) to cart.
Error: Only 5 banana(s) in stock!
Shopping session ended.
```

**Explanation**:
- The `ShoppingCart` class manages items and stock.
- Custom `StockError` is raised for invalid items, insufficient stock, or empty cart.
- The `try-except-else-finally` structure handles errors and ensures cleanup.

## Best Practices
- **Be Specific**: Catch specific exceptions (e.g., `ValueError`) rather than a generic `Exception` to avoid masking bugs.
- **Use `finally` for Cleanup**: Ensure resources like files or connections are closed using `finally` or context managers (`with`).
- **Log Errors**: Use logging to record exceptions for debugging (e.g., `import logging`).
- **Avoid Bare `except`**: Never use `except:` without specifying an exception type, as it catches everything, including system exits.
- **Raise Meaningful Exceptions**: Provide clear error messages when raising exceptions to help users understand the issue.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| `try-except` | Catches and handles exceptions to prevent crashes. |
| `else` | Runs when no exception occurs in the `try` block. |
| `finally` | Executes regardless of exceptions, ideal for cleanup. |
| Raising Exceptions | Use `raise` to trigger errors with custom messages. |
| Custom Exceptions | Create specific error classes for unique scenarios. |

## What's Next?
In the next module, **Modules and Packages**, you’ll learn how to organize your Python code into reusable modules and packages, enabling better code structure and scalability.

