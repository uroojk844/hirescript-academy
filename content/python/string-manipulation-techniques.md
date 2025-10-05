---
title: String Manipulation Techniques
description: Master Python’s string manipulation techniques, including slicing, formatting, and common string methods, to process and transform text effectively.
navigation.order: 3
---

# String Manipulation Techniques

Strings are a fundamental data type in Python, used to represent text. This lesson explores how to manipulate strings using slicing, formatting, and built-in methods, enabling you to process and transform text for various applications.

## Learning Objectives
- Understand Python’s string data type and its properties.
- Learn to slice and index strings for substring extraction.
- Apply string methods for common text operations (e.g., splitting, joining, case conversion).
- Use string formatting techniques (f-strings, `.format()`, `%`).
- Build a real-world project using string manipulation.

## String Basics

### What is a String?
A string is a sequence of characters enclosed in single (`'`) or double (`"`) quotes.

**Example**:
::Editor
#title
string.py
#default
```python
greeting = "Hello, Python!"
name = 'Alice'
print(greeting)  # Hello, Python!
print(type(name))  # <class 'str'>
```
::


### String Immutability
Strings in Python are immutable, meaning they cannot be changed after creation. Operations create new strings instead.

**Example**:
::Editor
#title
immutability.py
#default
```python
text = "Hello"
text = text + " World"  # Creates a new string
print(text)  # Hello World
```
::

## Indexing and Slicing

### Indexing
Access individual characters using their index (0-based).

**Example**:
::Editor
#title
indexing.py
#default
```python
text = "Python"
print(text[0])  # P
print(text[-1])  # n (last character)
```
::
**Expected Output**:
```
P
n
```

### Slicing
Extract substrings using `[start:end:step]`.

**Example**:
::Editor
#title
example.py
#default
```python
text = "Hello, Python!"
print(text[0:5])  # Hello
print(text[7:])   # Python!
print(text[::-1])  # !nohtyP ,olleH (reverse)
```
::

**Expected Output**:
```
Hello
Python!
!nohtyP ,olleH
```

## Common String Methods

### Case Conversion
Methods like `upper()`, `lower()`, `title()`, and `capitalize()` modify string case.

**Example**:
::Editor
#title
example.py
#default
```python
text = "hello world"
print(text.upper())      # HELLO WORLD
print(text.title())      # Hello World
print(text.capitalize())  # Hello world
```
::

**Expected Output**:
```
HELLO WORLD
Hello World
Hello world
```

### Searching and Replacing
Use `find()`, `replace()`, and `count()` to search or modify strings.

**Example**:
::Editor
#title
example.py
#default
```python
text = "I love Python programming"
print(text.find("Python"))  # 7 (index of first occurrence)
print(text.replace("Python", "Java"))  # I love Java programming
print(text.count("o"))  # 3
```
::

**Expected Output**:
```
7
I love Java programming
3
```

### Splitting and Joining
Split strings into lists with `split()` and join lists into strings with `join()`.

**Example**:
::Editor
#title
example.py
#default
```python
text = "apple,banana,orange"
fruits = text.split(",")
print(fruits)  # ['apple', 'banana', 'orange']
joined = "-".join(fruits)
print(joined)  # apple-banana-orange
```
::

**Expected Output**:
```
['apple', 'banana', 'orange']
apple-banana-orange
```

### Stripping Whitespace
Remove leading/trailing whitespace with `strip()`, `lstrip()`, or `rstrip()`.

**Example**:
::Editor
#title
example.py
#default
```python
text = "  Hello  "
print(text.strip())  # Hello
print(text.lstrip())  # Hello  
print(text.rstrip())  #   Hello
```
::
**Expected Output**:
```
Hello
Hello  
  Hello
```

## String Formatting

### F-Strings (Python 3.6+)
Embed expressions inside string literals using `f"..."`.

**Example**:
::Editor
#title
example.py
#default
```python
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")
```
::

**Expected Output**: `My name is Alice and I am 25 years old.`

### `.format()` Method
Use placeholders `{}` with the `.format()` method.

**Example**:
::Editor
#title
example.py
#default
```python
template = "My name is {} and I am {} years old."
print(template.format("Bob", 30))
```
::

**Expected Output**: `My name is Bob and I am 30 years old.`

### % Operator (Legacy)
Use `%` for older-style formatting.

**Example**:
::Editor
#title
example.py
#default
```python
print("My name is %s and I am %d years old." % ("Charlie", 35))
```
::
**Expected Output**: `My name is Charlie and I am 35 years old.`

## Real-World Mini-Project: Username Generator

Create a program to generate usernames from user input, ensuring they are clean and formatted.

**Step 1: Write the Code**
Create `username_generator.py`:
::Editor
#title
username_generator.py
#default
```python
def generate_username(first_name, last_name, birth_year):
    """Generate a username from first name, last name, and birth year."""
    # Clean inputs: strip whitespace and convert to lowercase
    first_name = first_name.strip().lower()
    last_name = last_name.strip().lower()
    
    # Create username: first initial + last name + last two digits of birth year
    username = f"{first_name[0]}{last_name}{str(birth_year)[-2:]}"
    
    # Replace spaces or special characters
    username = username.replace(" ", "_")
    
    return username

# Get user input
first = input("Enter first name: ")
last = input("Enter last name: ")
year = int(input("Enter birth year: "))

# Generate and display username
username = generate_username(first, last, year)
print(f"Your username is: {username}")
```
::

**Step 2: Run the Program**
```bash
python username_generator.py
```
**Sample Input**:
```
Enter first name: Alice 
Enter last name: Smith
Enter birth year: 1995
```
**Expected Output**: `Your username is: asmith95`

## Best Practices
- **Use F-Strings**: Prefer f-strings for modern, readable string formatting.
- **Validate Inputs**: Always clean and validate user input (e.g., strip whitespace).
- **Keep It Readable**: Use descriptive variable names and avoid overly complex string operations.
- **Handle Edge Cases**: Account for empty strings, special characters, or unexpected inputs.
- **Comment Complex Logic**: Explain non-obvious string manipulations for clarity.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Strings | Immutable sequences of characters, enclosed in quotes. |
| Indexing/Slicing | Access characters or substrings using `[start:end:step]`. |
| String Methods | Use `upper()`, `split()`, `replace()`, etc., for text manipulation. |
| String Formatting | Use f-strings or `.format()` for dynamic string creation. |

## What's Next?
In the next lesson, **Object-Oriented Programming**, you’ll learn how to create and use classes to organize code into reusable, modular components.
