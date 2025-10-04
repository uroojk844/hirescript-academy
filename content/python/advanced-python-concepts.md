---
title: Advanced Python Concepts
description: Explore advanced features like decorators, generators, and context managers to write more efficient and expressive Python code.
navigation:
  order: 8
---

# Advanced Python Concepts

Python offers powerful advanced features that enable you to write cleaner, more efficient, and reusable code. This lesson delves into concepts such as decorators, generators, comprehensions, and context managers, which are essential for intermediate to advanced Python programming.

## Learning Objectives
- Understand and apply decorators to modify function behavior.
- Use generators for memory-efficient iteration.
- Leverage list, dictionary, and set comprehensions for concise data manipulation.
- Implement context managers for resource management.
- Explore lambda functions and higher-order functions.

## Section 1: Decorators
Decorators are functions that modify the behavior of other functions or methods without changing their code. They are often used for logging, authentication, or performance measurement.

**Code Example: Simple Decorator**
```python
def log_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args: {args}, kwargs: {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper

@log_decorator
def add(a, b):
    return a + b

add(5, 3)
```

**Expected Output:**
```
Calling add with args: (5, 3), kwargs: {}
add returned: 8
```

**Explanation**:
- `log_decorator` is a decorator function that wraps the original function (`add`).
- The `@log_decorator` syntax applies the decorator to `add`.
- The wrapper logs the call and result without altering the original function.

## Section 2: Generators
Generators are functions that yield values one at a time, saving memory for large datasets. They use `yield` instead of `return` and can be iterated over like lists.

**Code Example: Generator for Fibonacci Sequence**
```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num, end=" ")
```

**Expected Output:**
```
0 1 1 2 3 5 8 13 21 34 
```

**Explanation**:
- The `fibonacci` generator yields numbers one by one.
- It doesn’t store the entire sequence in memory, making it efficient for large `n`.
- Use `for` loops or `list(fibonacci(10))` to consume the generator.

## Section 3: Comprehensions
Comprehensions provide a concise way to create lists, dictionaries, or sets from iterables, often replacing loops.

**Code Example: List, Dict, and Set Comprehensions**
```python
# List Comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]
print(squares)

# Dictionary Comprehension
word_lengths = {word: len(word) for word in ["apple", "banana", "cherry"]}
print(word_lengths)

# Set Comprehension
unique_vowels = {char for word in ["hello", "world"] for char in word if char in "aeiou"}
print(unique_vowels)
```

**Expected Output:**
```
[0, 4, 16, 36, 64]
{'apple': 5, 'banana': 6, 'cherry': 6}
{'o', 'e'}
```

**Explanation**:
- List: Creates squares of even numbers.
- Dict: Maps words to their lengths.
- Set: Collects unique vowels from strings.
- Comprehensions are readable and efficient alternatives to `for` loops.

## Section 4: Context Managers
Context managers handle resource acquisition and release using `with` statements, ensuring cleanup (e.g., closing files).

**Code Example: Custom Context Manager**
```python
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        self.end = time.time()
        print(f"Execution time: {self.end - self.start} seconds")

with Timer():
    sum(range(1000000))
```

**Expected Output (example):**
```
Execution time: 0.015625 seconds
```

**Explanation**:
- `__enter__` runs when entering the `with` block.
- `__exit__` runs when exiting, even if an exception occurs.
- Useful for timing code, managing connections, or locks.

## Section 5: Lambda Functions and Higher-Order Functions
Lambda functions are anonymous functions defined with `lambda`. Higher-order functions take or return functions.

**Code Example: Lambda with Map and Filter**
```python
numbers = [1, 2, 3, 4, 5]

# Lambda with map
squared = list(map(lambda x: x**2, numbers))
print(squared)

# Lambda with filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)
```

**Expected Output:**
```
[1, 4, 9, 16, 25]
[2, 4]
```

**Explanation**:
- `map` applies the lambda to each element.
- `filter` selects elements based on the lambda condition.
- Lambdas are ideal for short, one-time functions.

## Mini-Project: Text Analyzer with Advanced Features
This project uses decorators, generators, and comprehensions to analyze text files, counting words and generating reports.

**Code Example: Text Analyzer**
```python
import time

def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timing_decorator
def word_generator(file_path):
    with open(file_path, 'r') as file:
        for line in file:
            for word in line.split():
                yield word.lower()

def analyze_text(file_path):
    words = list(word_generator(file_path))
    word_count = len(words)
    unique_words = len(set(words))
    common_words = {word: words.count(word) for word in set(words) if words.count(word) > 1}
    return {
        "total_words": word_count,
        "unique_words": unique_words,
        "common_words": common_words
    }

# Assume 'sample.txt' contains: "Hello world hello again"
print(analyze_text('sample.txt'))
```

**Expected Output (example):**
```
word_generator took 0.0001 seconds
{'total_words': 4, 'unique_words': 3, 'common_words': {'hello': 2}}
```

**Explanation**:
- `timing_decorator` measures execution time.
- `word_generator` yields words lazily from a file.
- `analyze_text` uses comprehensions to compute statistics.
- This setup is efficient for large files.

## Best Practices
- **Use Decorators Sparingly**: Apply them for cross-cutting concerns like logging, not core logic.
- **Prefer Generators for Large Data**: Avoid lists when processing streams to save memory.
- **Keep Comprehensions Simple**: If too complex, use loops for readability.
- **Implement `__enter__` and `__exit__` Properly**: Handle exceptions in `__exit__` if needed.
- **Combine Features Judiciously**: Use lambdas in higher-order functions but name complex ones.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Decorators | Modify functions dynamically with wrappers. |
| Generators | Yield values iteratively for efficiency. |
| Comprehensions | Concise creation of lists, dicts, sets. |
| Context Managers | Manage resources with `with` statements. |
| Lambdas | Anonymous functions for short expressions. |

## What's Next?
In the next module, **Regular Expressions Mastery**, you’ll learn to use regex for powerful text pattern matching and manipulation.

