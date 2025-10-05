---
title: Data Structures Essentials
description: Master Python's core data structures including Lists, Tuples, Dictionaries, and Sets with practical examples.
navigation:
  order: 2
---

# Data Structures Essentials

Welcome to the Data Structures Essentials tutorial! In this lesson, you'll master Python's core data structures and learn how to manipulate them effectively.

In this tutorial, you'll learn:

- Working with Lists (creation, methods, comprehensions)
- Mastering Tuples (immutability, packing/unpacking)
- Dictionary operations (keys, values, methods)
- Set operations (union, intersection, difference)
- Choosing the right data structure

## 1. Lists - Dynamic Arrays

Lists are ordered, mutable collections that can store any type of data.

### Creating Lists
::Editor
#title
list.py
#default
```python
# Different ways to create lists
empty_list = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
nested = [[1, 2], [3, 4], [5, 6]]

print("Empty list:", empty_list)
print("Numbers:", numbers)
print("Mixed types:", mixed)
print("Nested list:", nested)
```
::

**Output:**
```
Empty list: []
Numbers: [1, 2, 3, 4, 5]
Mixed types: [1, 'hello', 3.14, True]
Nested list: [[1, 2], [3, 4], [5, 6]]
```

### Accessing Elements
::Editor
#title
accessing.py
#default
```python
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

# Indexing (0-based)
print("First fruit:", fruits[0])
print("Last fruit:", fruits[-1])
print("Second to last:", fruits[-2])

# Slicing [start:end:step]
print("First three:", fruits[0:3])
print("From index 2:", fruits[2:])
print("Every other:", fruits[::2])
print("Reversed:", fruits[::-1])
```
::

**Output:**
```
First fruit: apple
Last fruit: elderberry
Second to last: date
First three: ['apple', 'banana', 'cherry']
From index 2: ['cherry', 'date', 'elderberry']
Every other: ['apple', 'cherry', 'elderberry']
Reversed: ['elderberry', 'date', 'cherry', 'banana', 'apple']
```

### Modifying Lists
::Editor
#title
modifying.py
#default
```python
colors = ["red", "green", "blue"]

# Adding elements
colors.append("yellow")          # Add to end
print("After append:", colors)

colors.insert(1, "orange")       # Insert at index
print("After insert:", colors)

colors.extend(["purple", "pink"])  # Add multiple
print("After extend:", colors)

# Removing elements
colors.remove("green")           # Remove by value
print("After remove:", colors)

popped = colors.pop()            # Remove last
print("Popped item:", popped)
print("After pop:", colors)

del colors[0]                    # Delete by index
print("After del:", colors)
```
::

**Output:**
```
After append: ['red', 'green', 'blue', 'yellow']
After insert: ['red', 'orange', 'green', 'blue', 'yellow']
After extend: ['red', 'orange', 'green', 'blue', 'yellow', 'purple', 'pink']
After remove: ['red', 'orange', 'blue', 'yellow', 'purple', 'pink']
Popped item: pink
After pop: ['red', 'orange', 'blue', 'yellow', 'purple']
After del: ['orange', 'blue', 'yellow', 'purple']
```

### List Methods
::Editor
#title
list_methods.py
#default
```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Common methods
print("Length:", len(numbers))
print("Count of 1:", numbers.count(1))
print("Index of 4:", numbers.index(4))

# Sorting
numbers.sort()
print("Sorted:", numbers)

numbers.reverse()
print("Reversed:", numbers)

# Copy
numbers_copy = numbers.copy()
print("Copy:", numbers_copy)

# Clear
numbers_copy.clear()
print("Cleared copy:", numbers_copy)
```
:: 

**Output:**
```
Length: 8
Count of 1: 2
Index of 4: 2
Sorted: [1, 1, 2, 3, 4, 5, 6, 9]
Reversed: [9, 6, 5, 4, 3, 2, 1, 1]
Copy: [9, 6, 5, 4, 3, 2, 1, 1]
Cleared copy: []
```

### List Comprehensions
::Editor
#title
list_comprehensions.py
#default
```python
# Basic list comprehension
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)

# With condition
evens = [x for x in range(1, 11) if x % 2 == 0]
print("Even numbers:", evens)

# With if-else
labels = ["even" if x % 2 == 0 else "odd" for x in range(1, 6)]
print("Labels:", labels)

# Nested comprehension
matrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]
print("Matrix:", matrix)
```
::

**Output:**
```
Squares: [1, 4, 9, 16, 25]
Even numbers: [2, 4, 6, 8, 10]
Labels: ['odd', 'even', 'odd', 'even', 'odd']
Matrix: [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
```

## 2. Tuples - Immutable Sequences

Tuples are ordered, immutable collections. Once created, they cannot be modified.

### Creating Tuples
::Editor
#title
tuples.py
#default
```python
# Different ways to create tuples
empty_tuple = ()
single_item = (42,)              # Comma is required!
coordinates = (10, 20)
mixed = (1, "hello", 3.14, True)
nested = ((1, 2), (3, 4))

print("Empty:", empty_tuple)
print("Single:", single_item)
print("Coordinates:", coordinates)
print("Mixed:", mixed)
print("Nested:", nested)
```
::

**Output:**
```
Empty: ()
Single: (42,)
Coordinates: (10, 20)
Mixed: (1, 'hello', 3.14, True)
Nested: ((1, 2), (3, 4))
```

### Tuple Operations
::Editor
#title
tuple_operations.py
#default
```python
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)

# Concatenation
combined = tuple1 + tuple2
print("Combined:", combined)

# Repetition
repeated = tuple1 * 3
print("Repeated:", repeated)

# Indexing and slicing (same as lists)
print("First element:", combined[0])
print("Last three:", combined[-3:])

# Methods
print("Count of 2:", combined.count(2))
print("Index of 5:", combined.index(5))
```
::

**Output:**
```
Combined: (1, 2, 3, 4, 5, 6)
Repeated: (1, 2, 3, 1, 2, 3, 1, 2, 3)
First element: 1
Last three: (4, 5, 6)
Count of 2: 1
Index of 5: 4
```

### Tuple Packing and Unpacking
::Editor
#title
packing_unpacking.py
#default
```python
# Packing
person = "John", 25, "Engineer"
print("Packed tuple:", person)

# Unpacking
name, age, profession = person
print(f"Name: {name}, Age: {age}, Profession: {profession}")

# Unpacking with *
numbers = (1, 2, 3, 4, 5)
first, *middle, last = numbers
print("First:", first)
print("Middle:", middle)
print("Last:", last)

# Swapping variables
a, b = 10, 20
print(f"Before swap: a={a}, b={b}")
a, b = b, a
print(f"After swap: a={a}, b={b}")
```
::

**Output:**
```
Packed tuple: ('John', 25, 'Engineer')
Name: John, Age: 25, Profession: Engineer
First: 1
Middle: [2, 3, 4]
Last: 5
Before swap: a=10, b=20
After swap: a=20, b=10
```

## 3. Dictionaries - Key-Value Pairs

Dictionaries store data as key-value pairs. Keys must be unique and immutable.

### Creating Dictionaries
::Editor
#title
dict.py
#default
```python
# Different ways to create dictionaries
empty_dict = {}
student = {"name": "Alice", "age": 20, "grade": "A"}
using_dict = dict(name="Bob", age=22, grade="B")
from_tuples = dict([("x", 1), ("y", 2), ("z", 3)])

print("Empty:", empty_dict)
print("Student:", student)
print("Using dict():", using_dict)
print("From tuples:", from_tuples)
```
::

**Output:**
```
Empty: {}
Student: {'name': 'Alice', 'age': 20, 'grade': 'A'}
Using dict(): {'name': 'Bob', 'age': 22, 'grade': 'B'}
From tuples: {'x': 1, 'y': 2, 'z': 3}
```

### Accessing and Modifying
::Editor
#title
dict_access_modify.py
#default
```python
person = {"name": "Charlie", "age": 30, "city": "New York"}

# Accessing values
print("Name:", person["name"])
print("Age:", person.get("age"))
print("Country:", person.get("country", "USA"))  # Default value

# Modifying
person["age"] = 31
person["email"] = "charlie@email.com"
print("Updated:", person)

# Deleting
del person["city"]
removed_age = person.pop("age")
print("After deletion:", person)
print("Removed age:", removed_age)
```
::

**Output:**
```
Name: Charlie
Age: 30
Country: USA
Updated: {'name': 'Charlie', 'age': 31, 'city': 'New York', 'email': 'charlie@email.com'}
After deletion: {'name': 'Charlie', 'email': 'charlie@email.com'}
Removed age: 31
```

### Dictionary Methods
::Editor
#title
dict_methods.py
#default
```python
inventory = {"apples": 50, "bananas": 30, "oranges": 25}

# Keys, values, items
print("Keys:", list(inventory.keys()))
print("Values:", list(inventory.values()))
print("Items:", list(inventory.items()))

# Update
inventory.update({"grapes": 40, "apples": 60})
print("After update:", inventory)

# setdefault
inventory.setdefault("pears", 20)
print("After setdefault:", inventory)

# Copy
inv_copy = inventory.copy()
print("Copy:", inv_copy)
```
::

**Output:**
```
Keys: ['apples', 'bananas', 'oranges']
Values: [50, 30, 25]
Items: [('apples', 50), ('bananas', 30), ('oranges', 25)]
After update: {'apples': 60, 'bananas': 30, 'oranges': 25, 'grapes': 40}
After setdefault: {'apples': 60, 'bananas': 30, 'oranges': 25, 'grapes': 40, 'pears': 20}
Copy: {'apples': 60, 'bananas': 30, 'oranges': 25, 'grapes': 40, 'pears': 20}
```

### Dictionary Comprehensions
::Editor
#title
dict_comprehensions.py
#default
```python
# Basic dictionary comprehension
squares_dict = {x: x**2 for x in range(1, 6)}
print("Squares:", squares_dict)

# With condition
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print("Even squares:", even_squares)

# From two lists
keys = ["name", "age", "city"]
values = ["David", 28, "Boston"]
person = {k: v for k, v in zip(keys, values)}
print("Person:", person)

# Invert dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print("Inverted:", inverted)
```
::

**Output:**
```
Squares: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
Even squares: {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}
Person: {'name': 'David', 'age': 28, 'city': 'Boston'}
Inverted: {1: 'a', 2: 'b', 3: 'c'}
```

## 4. Sets - Unique Collections

Sets are unordered collections of unique elements.

### Creating Sets
::Editor
#title
sets.py
#default
```python
# Different ways to create sets
empty_set = set()                # {} creates empty dict!
numbers = {1, 2, 3, 4, 5}
from_list = set([1, 2, 2, 3, 3, 4])  # Duplicates removed
from_string = set("hello")

print("Empty set:", empty_set)
print("Numbers:", numbers)
print("From list:", from_list)
print("From string:", from_string)
```
::

**Output:**
```
Empty set: set()
Numbers: {1, 2, 3, 4, 5}
From list: {1, 2, 3, 4}
From string: {'e', 'h', 'l', 'o'}
```

### Set Operations
::Editor
#title
set_operations.py
#default
```python
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# Union (all elements)
print("Union:", a | b)
print("Union method:", a.union(b))

# Intersection (common elements)
print("Intersection:", a & b)
print("Intersection method:", a.intersection(b))

# Difference (in a but not in b)
print("Difference a-b:", a - b)
print("Difference b-a:", b - a)

# Symmetric difference (in either but not both)
print("Symmetric difference:", a ^ b)
print("Symmetric diff method:", a.symmetric_difference(b))
```
::

**Output:**
```
Union: {1, 2, 3, 4, 5, 6, 7, 8}
Union method: {1, 2, 3, 4, 5, 6, 7, 8}
Intersection: {4, 5}
Intersection method: {4, 5}
Difference a-b: {1, 2, 3}
Difference b-a: {8, 6, 7}
Symmetric difference: {1, 2, 3, 6, 7, 8}
Symmetric diff method: {1, 2, 3, 6, 7, 8}
```

### Modifying Sets
::Editor
#title
set_modify.py
#default
```python
colors = {"red", "green", "blue"}

# Adding elements
colors.add("yellow")
print("After add:", colors)

colors.update(["purple", "pink", "orange"])
print("After update:", colors)

# Removing elements
colors.remove("green")  # Raises error if not found
print("After remove:", colors)

colors.discard("brown")  # No error if not found
print("After discard:", colors)

popped = colors.pop()  # Removes arbitrary element
print("Popped:", popped)
print("After pop:", colors)
```
::

**Output:**
```
After add: {'blue', 'green', 'yellow', 'red'}
After update: {'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'red'}
After remove: {'blue', 'yellow', 'orange', 'purple', 'pink', 'red'}
After discard: {'blue', 'yellow', 'orange', 'purple', 'pink', 'red'}
Popped: blue
After pop: {'yellow', 'orange', 'purple', 'pink', 'red'}
```

### Set Comprehensions
::Editor
#title
set_comprehensions.py
#default
```python
# Basic set comprehension
squares = {x**2 for x in range(1, 6)}
print("Squares:", squares)

# With condition
even_squares = {x**2 for x in range(1, 11) if x % 2 == 0}
print("Even squares:", even_squares)

# Remove duplicates from list
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 5]
unique = {x for x in numbers}
print("Unique:", unique)
```
::

**Output:**
```
Squares: {1, 4, 9, 16, 25}
Even squares: {64, 4, 36, 100, 16}
Unique: {1, 2, 3, 4, 5}
```

## 5. Practical Examples

### Example 1: Student Grade Management
::Editor
#title
stud_grade_management.py
#default
```python
# Using dictionary to store student grades
students = {
    "Alice": [85, 90, 88],
    "Bob": [78, 82, 80],
    "Charlie": [92, 95, 93]
}

# Calculate average grades
for name, grades in students.items():
    average = sum(grades) / len(grades)
    print(f"{name}'s average: {average:.2f}")

# Find highest scoring student
averages = {name: sum(grades)/len(grades) for name, grades in students.items()}
top_student = max(averages, key=averages.get)
print(f"\nTop student: {top_student} with {averages[top_student]:.2f}")
```
::

**Output:**
```
Alice's average: 87.67
Bob's average: 80.00
Charlie's average: 93.33

Top student: Charlie with 93.33
```

### Example 2: Word Frequency Counter
::Editor
#title
word_freq_counter.py
#default
```python
text = "hello world hello python python python"

# Using dictionary to count word frequency
word_count = {}
for word in text.split():
    word_count[word] = word_count.get(word, 0) + 1

print("Word frequencies:", word_count)

# Using set to find unique words
unique_words = set(text.split())
print("Unique words:", unique_words)
print("Number of unique words:", len(unique_words))
```
::

**Output:**
```
Word frequencies: {'hello': 2, 'world': 1, 'python': 3}
Unique words: {'world', 'python', 'hello'}
Number of unique words: 3
```

### Example 3: List Manipulation
::Editor
#title
list_manpulation.py
#default
```python
# Remove duplicates while preserving order
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
unique_ordered = []
seen = set()

for num in numbers:
    if num not in seen:
        unique_ordered.append(num)
        seen.add(num)

print("Original:", numbers)
print("Unique (ordered):", unique_ordered)

# Flatten nested list
nested = [[1, 2], [3, 4], [5, 6]]
flattened = [item for sublist in nested for item in sublist]
print("Flattened:", flattened)
```
::

**Output:**
```
Original: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
Unique (ordered): [3, 1, 4, 5, 9, 2, 6]
Flattened: [1, 2, 3, 4, 5, 6]
```

## Choosing the Right Data Structure

| Data Structure | Use When You Need |
|----------------|-------------------|
| **List** | Ordered collection, allow duplicates, need to modify |
| **Tuple** | Ordered collection, immutable, return multiple values |
| **Dictionary** | Key-value pairs, fast lookups by key |
| **Set** | Unique elements, set operations (union, intersection) |

## Best Practices

- Use lists for ordered, mutable sequences
- Use tuples for fixed data that shouldn't change
- Use dictionaries for key-based lookups
- Use sets to eliminate duplicates and perform set operations
- Use list/dict/set comprehensions for concise, readable code
- Choose immutable types (tuples) as dictionary keys
- Use `get()` method for safe dictionary access with defaults

## What's Next?

You've mastered Python's core data structures! In the next tutorial, we'll explore **String Manipulation Techniques**, where you'll learn advanced string operations, formatting, and text processing.