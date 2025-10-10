---
title: Python Basics Foundation
description: Learn what Python is and why it's revolutionizing the tech industry.
navigation:
  order: 1
---

# Python Basics Foundation

Welcome to your Python journey! As your guide through this learning path, I'll help you build a solid foundation in Python programming. This module covers the essential building blocks that every Python developer must master.

In this tutorial, you'll learn:

- How to work with variables and data types
- How to use operators for computations
- How to write conditional statements
- How to create and use loops
- How to define and call functions

## Variables and Data Types

Variables are containers that store data. Python is dynamically typed, meaning you don't need to declare variable types explicitly.

::Editor
#title
variables.py

#default
```python
# Numeric Types
age = 25                    # Integer
price = 19.99              # Float
complex_num = 3 + 4j       # Complex number

# String Type
name = "Alice"
message = 'Hello, Python!'
multiline = """This is a
multiline string"""

# Boolean Type
is_student = True
has_passed = False

# Printing variables
print(f"Name: {name}, Age: {age}")
print(f"Price: ${price}")
print(f"Is student: {is_student}")
```
::

### Explanation

Python has several built-in data types. Integers store whole numbers without decimal points. Floats handle decimal numbers for precise calculations. Strings hold text data enclosed in quotes (single, double, or triple). Booleans represent `True` or `False` values for logical operations. Complex numbers are used for advanced mathematical computations.

The `f-string` syntax (`f"...{variable}..."`) provides a clean way to embed variables directly into strings.

## Type Conversion

Sometimes you need to convert data from one type to another.

::Editor
#title
type_conversion.py

#default
```python
# String to Integer
age_str = "25"
age_int = int(age_str)
print(f"Age as integer: {age_int}, Type: {type(age_int)}")

# Integer to String
count = 100
count_str = str(count)
print(f"Count as string: '{count_str}', Type: {type(count_str)}")

# String to Float
price_str = "49.99"
price_float = float(price_str)
print(f"Price: {price_float}, Type: {type(price_float)}")

# Float to Integer (truncates decimal)
pi = 3.14159
pi_int = int(pi)
print(f"Pi as integer: {pi_int}")

# Integer to Boolean
zero = 0
non_zero = 5
print(f"bool(0) = {bool(zero)}")        # False
print(f"bool(5) = {bool(non_zero)}")    # True
```
::

### Explanation

Type conversion allows you to transform data between different types. Use `int()` to convert to integers, `float()` for decimals, `str()` for text, and `bool()` for boolean values. Note that converting float to int truncates the decimal part. When converting to boolean, zero and empty values become `False`, while non-zero values become `True`.

## Operators

Operators perform operations on variables and values.

::Editor
#title
operators.py

#default
```python
# Arithmetic Operators
a = 10
b = 3

addition = a + b           # 13
subtraction = a - b        # 7
multiplication = a * b     # 30
division = a / b           # 3.333...
floor_division = a // b    # 3 (integer division)
modulus = a % b            # 1 (remainder)
exponent = a ** b          # 1000 (10 to the power of 3)

print(f"{a} + {b} = {addition}")
print(f"{a} / {b} = {division}")
print(f"{a} // {b} = {floor_division}")
print(f"{a} % {b} = {modulus}")
print(f"{a} ** {b} = {exponent}")

# Comparison Operators
x = 5
y = 10

print(f"{x} == {y}: {x == y}")   # Equal to
print(f"{x} != {y}: {x != y}")   # Not equal to
print(f"{x} < {y}: {x < y}")     # Less than
print(f"{x} > {y}: {x > y}")     # Greater than
print(f"{x} <= {y}: {x <= y}")   # Less than or equal
print(f"{x} >= {y}: {x >= y}")   # Greater than or equal

# Logical Operators
is_adult = True
has_id = False

print(f"is_adult AND has_id: {is_adult and has_id}")   # Both must be True
print(f"is_adult OR has_id: {is_adult or has_id}")     # At least one True
print(f"NOT is_adult: {not is_adult}")                  # Inverts the value
```
::

### Explanation

Arithmetic operators perform mathematical calculations. Division (`/`) always returns a float, while floor division (`//`) returns an integer by discarding the decimal. The modulus operator (`%`) gives you the remainder after division, which is useful for checking if numbers are even or odd.

Comparison operators return boolean values and are essential for making decisions in your code. Logical operators (`and`, `or`, `not`) combine multiple conditions to create complex logical expressions.

## Conditional Statements

Conditional statements allow your program to make decisions based on conditions.

::Editor
#title
conditionals.py

#default
```python
# Simple if statement
temperature = 25

if temperature > 30:
    print("It's hot outside!")
    print("Stay hydrated.")

# if-else statement
age = 18

if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")

# if-elif-else statement
score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'

print(f"Score: {score}, Grade: {grade}")

# Nested conditions
username = "admin"
password = "secret123"

if username == "admin":
    if password == "secret123":
        print("Access granted!")
    else:
        print("Incorrect password.")
else:
    print("User not found.")

# Multiple conditions
hour = 14
is_weekend = False

if hour >= 9 and hour < 17 and not is_weekend:
    print("Office is open.")
else:
    print("Office is closed.")
```
::

### Explanation

Conditional statements execute different code blocks based on whether conditions are true or false. The `if` statement checks a condition and executes code only if true. Adding `else` provides an alternative path when the condition is false. The `elif` (else if) allows checking multiple conditions in sequence, executing only the first true condition's block.

Indentation is crucial in Python as it defines code blocks. All statements within a condition must be indented consistently (typically 4 spaces). You can nest conditions inside other conditions for complex decision-making logic.

## Loops

Loops allow you to repeat code multiple times efficiently.

::Editor
#title
loops.py

#default
```python
# For loop with range
print("Counting from 1 to 5:")
for i in range(1, 6):
    print(i)

# For loop with list
fruits = ["apple", "banana", "cherry", "date"]
print("\nFruits in the basket:")
for fruit in fruits:
    print(f"- {fruit}")

# For loop with enumerate (get index and value)
print("\nFruits with indices:")
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# While loop
count = 1
print("\nWhile loop counting:")
while count <= 5:
    print(f"Count: {count}")
    count += 1

# While loop with user input simulation
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    attempts += 1
    print(f"Attempt {attempts} of {max_attempts}")
    # In real scenario, you'd check user input here
    if attempts == 2:  # Simulating success on attempt 2
        print("Success!")
        break
else:
    print("Maximum attempts reached.")

# Loop control statements
print("\nSkipping even numbers:")
for num in range(1, 11):
    if num % 2 == 0:
        continue  # Skip even numbers
    print(num)

print("\nStopping at 5:")
for num in range(1, 11):
    if num == 6:
        break  # Stop the loop
    print(num)
```
::

### Explanation

The `for` loop iterates over a sequence (like a list or range). The `range(start, stop)` function generates numbers from start up to (but not including) stop. When looping over lists, you can use `enumerate()` to get both the index and the value.

The `while` loop continues executing as long as its condition remains true. Be careful to modify the condition variable inside the loop to avoid infinite loops. The `break` statement exits the loop immediately, while `continue` skips the rest of the current iteration and moves to the next one.

The `else` clause after a loop executes only if the loop completes normally without encountering a `break`.

## Functions

Functions are reusable blocks of code that perform specific tasks.

::Editor
#title
functions.py

#default
```python
# Simple function
def greet():
    print("Hello, welcome to Python!")

greet()  # Calling the function

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")
greet_person("Bob")

# Function with multiple parameters
def calculate_area(length, width):
    area = length * width
    return area

rectangle_area = calculate_area(5, 3)
print(f"Area of rectangle: {rectangle_area}")

# Function with default parameters
def greet_with_title(name, title="Mr."):
    print(f"Hello, {title} {name}!")

greet_with_title("Smith")              # Uses default title
greet_with_title("Johnson", "Dr.")     # Uses provided title

# Function with multiple return values
def calculate_stats(numbers):
    total = sum(numbers)
    count = len(numbers)
    average = total / count
    return total, count, average

nums = [10, 20, 30, 40, 50]
sum_val, count_val, avg_val = calculate_stats(nums)
print(f"Sum: {sum_val}, Count: {count_val}, Average: {avg_val}")

# Function with variable arguments
def calculate_sum(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(f"Sum of 1, 2, 3: {calculate_sum(1, 2, 3)}")
print(f"Sum of 5, 10, 15, 20: {calculate_sum(5, 10, 15, 20)}")

# Function with keyword arguments
def create_profile(**info):
    print("User Profile:")
    for key, value in info.items():
        print(f"{key}: {value}")

create_profile(name="Alice", age=25, city="New York", profession="Engineer")

# Lambda functions (anonymous functions)
square = lambda x: x ** 2
add = lambda a, b: a + b

print(f"Square of 5: {square(5)}")
print(f"Sum of 3 and 7: {add(3, 7)}")

# Using lambda with map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(f"Original: {numbers}")
print(f"Squared: {squared}")
```
::

### Explanation

Functions encapsulate reusable code and make programs more organized and maintainable. Define functions using the `def` keyword, followed by the function name and parentheses. Parameters are variables that receive values when the function is called.

The `return` statement sends a value back to the caller. Functions can return multiple values as a tuple, which can be unpacked into separate variables. Default parameters provide fallback values when arguments aren't provided.

The `*args` syntax allows functions to accept any number of positional arguments, while `**kwargs` accepts any number of keyword arguments. Lambda functions are concise, one-line functions useful for simple operations, often used with functions like `map()`, `filter()`, and `sorted()`.

## Practical Example: Grade Calculator

Let's combine what we've learned to build a practical grade calculator.

::Editor
#title
grade_calculator.py

#default
```python
def calculate_grade(score):
    """
    Calculate letter grade based on numeric score.
    
    Parameters:
        score (int/float): Numeric score between 0 and 100
    
    Returns:
        str: Letter grade (A, B, C, D, or F)
    """
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    elif score >= 60:
        return 'D'
    else:
        return 'F'

def calculate_average(scores):
    """Calculate average of a list of scores."""
    if len(scores) == 0:
        return 0
    return sum(scores) / len(scores)

def display_report(student_name, scores):
    """Display complete grade report for a student."""
    print(f"\n{'='*40}")
    print(f"Grade Report for {student_name}")
    print(f"{'='*40}")
    
    for i, score in enumerate(scores, 1):
        grade = calculate_grade(score)
        print(f"Subject {i}: {score:5.1f} - Grade: {grade}")
    
    average = calculate_average(scores)
    final_grade = calculate_grade(average)
    
    print(f"{'-'*40}")
    print(f"Average Score: {average:.2f}")
    print(f"Final Grade: {final_grade}")
    print(f"{'='*40}")

# Example usage
student_scores = [85, 92, 78, 88, 95]
display_report("Alice Johnson", student_scores)

# Calculate grades for multiple students
students = {
    "Bob Smith": [75, 82, 79, 88],
    "Carol White": [95, 98, 92, 97],
    "David Brown": [68, 72, 65, 70]
}

for name, scores in students.items():
    display_report(name, scores)
```
::

### Key Points

This practical example demonstrates how different concepts work together. Functions are modular and reusable, making the code organized and maintainable. Docstrings document what functions do, helping other developers understand your code. Conditional logic determines grades based on scores, while loops process multiple subjects and students efficiently.

## Best Practices

Always use meaningful variable names that describe their purpose (use `student_age` instead of `x`). Follow Python's PEP 8 style guide for consistent code formatting. Add comments to explain complex logic, but write self-documenting code when possible. Use functions to break down complex tasks into smaller, manageable pieces.

Initialize variables before using them in loops or conditions. Avoid using global variables when local variables suffice. Test edge cases in your conditions (zero, negative, maximum values). Use appropriate data types for your variables (don't store numbers as strings unless necessary).

## Common Pitfalls to Avoid

Forgetting the colon at the end of `if`, `for`, `while`, and `def` statements is a syntax error. Incorrect indentation will cause `IndentationError`. Using assignment (`=`) instead of comparison (`==`) in conditions leads to bugs. Modifying a list while iterating over it can cause unexpected behavior. Forgetting to return a value from a function when you need one results in `None`.

Creating infinite loops by forgetting to update the condition variable will hang your program. Comparing floating-point numbers with exact equality can fail due to precision issues.

## What’s Next?

You've mastered Python's fundamental building blocks! In the next module, we'll explore **Data Structures Essentials**, where you'll learn about lists, tuples, sets, and dictionaries—powerful tools for organizing and manipulating data efficiently.

### Key Takeaways:
- Variables store different data types (int, float, string, boolean)
- Operators perform arithmetic, comparison, and logical operations
- Conditional statements (`if`, `elif`, `else`) control program flow
- Loops (`for`, `while`) automate repetitive tasks
- Functions make code reusable and modular
- Practice combining these concepts in real-world projects

## Practice Exercise
1. Create a variable for your name and age, and print them using an f-string.
2. Convert a string number to an integer and perform a calculation.
3. Write a conditional statement to check if a number is positive, negative, or zero.
4. Use a `for` loop to print even numbers from 1 to 10.
5. Write a function that calculates the square of a number and test it.