---
title: Best Practices & Production Code
description: Learn how to write clean, maintainable, and production-ready Python code, following style guides, testing strategies, and deployment best practices.
navigation:
   order: 20
---

# Best Practices & Production Code

Writing production-ready Python code means creating programs that are reliable, maintainable, and efficient. This lesson covers best practices for coding style, documentation, testing, and deployment to ensure your projects are robust and professional.

## Learning Objectives
- Understand Python coding standards (e.g., PEP 8).
- Learn to write clear, maintainable, and well-documented code.
- Apply testing strategies to ensure code reliability.
- Explore deployment techniques for Python applications.
- Build a production-ready script with a real-world example.

## Following Python Coding Standards

### PEP 8: Style Guide for Python Code
PEP 8 is Python’s official style guide, ensuring consistent and readable code.

**Key Guidelines**:
- Use 4 spaces for indentation (no tabs).
- Limit lines to 79 characters for readability.
- Use descriptive variable names (e.g., `user_count` instead of `uc`).
- Functions and variables: `snake_case`; Classes: `CamelCase`.

**Example**:
::Editor
#title
practices.py
#default
```python
# Bad
def calc(x,y):return x+y

# Good
def calculate_sum(number_one, number_two):
    """Calculate the sum of two numbers."""
    return number_one + number_two
```
::

**Tool**: Use `flake8` to check PEP 8 compliance:
```bash
pip install flake8
flake8 my_script.py
```

**Expected Output**: Lists style violations, if any.

## Writing Maintainable Code

### Modular Code
Break code into reusable functions and modules.

**Example**:
Instead of:
::Editor
#title
practices.py
#default
```python
# Bad: Everything in one block
print("Processing data...")
data = [1, 2, 3]
result = sum(data) / len(data)
print(result)
```
::

Use:
::Editor
#title
practices.py
#default
```python
# Good: Modular function
def calculate_average(numbers):
    """Calculate the average of a list of numbers."""
    return sum(numbers) / len(numbers)

if __name__ == "__main__":
    print("Processing data...")
    data = [1, 2, 3]
    result = calculate_average(data)
    print(f"Average: {result}")
```
::

### Documentation
Write docstrings for functions, classes, and modules.

**Example**:
::Editor
#title
practices.py
#default
```python
def fetch_data(url):
    """Fetch data from a given URL and return the response text.

    Args:
        url (str): The URL to fetch data from.

    Returns:
        str: The response text from the URL.
    """
    import requests
    response = requests.get(url)
    return response.text
```
::

## Testing Your Code

### Unit Testing with `unittest`
Use Python’s built-in `unittest` module to write tests.

**Example**:
Create `test_calculate.py`:
::Editor
#title
test_calculate.py
#default
```python
import unittest
from my_script import calculate_average

class TestCalculateAverage(unittest.TestCase):
    def test_positive_numbers(self):
        result = calculate_average([1, 2, 3])
        self.assertEqual(result, 2.0)

    def test_empty_list(self):
        with self.assertRaises(ZeroDivisionError):
            calculate_average([])

if __name__ == "__main__":
    unittest.main()
```
:: 

Run tests:
```bash
python -m unittest test_calculate.py
```

**Expected Output**:
```
..
----------------------------------------------------------------------
Ran 2 tests in 0.001s

OK
```

### Linting and Formatting
Use tools like `black` for auto-formatting:
```bash
pip install black
black my_script.py
```

## Deployment Best Practices

### Using Virtual Environments
Always deploy projects in isolated virtual environments (see Lesson 19).

**Example**:
```bash
python -m venv prod_env
source prod_env/bin/activate
pip install -r requirements.txt
```

### Logging
Add logging instead of `print` for production code.

**Example**:
::Editor
#title
logging.py
#default
```python
import logging

logging.basicConfig(level=logging.INFO, filename="app.log")
logger = logging.getLogger(__name__)

def process_data(data):
    logger.info("Starting data processing")
    try:
        result = calculate_average(data)
        logger.info(f"Processing complete: {result}")
        return result
    except Exception as e:
        logger.error(f"Error: {e}")
        raise
```
::

**Expected Output**: Logs written to `app.log`.

## Real-World Mini-Project: Building a Production-Ready CLI Tool
Create a command-line tool to fetch and summarize weather data from an API.

**Step 1: Set Up Environment**
```bash
python -m venv weather_app_env
source weather_app_env/bin/activate
pip install requests
pip freeze > requirements.txt
```

**Step 2: Write the Tool**
Create `weather_tool.py`:
::Editor
#title
weather_tool.py
#default
```python
import logging
import requests
import argparse

logging.basicConfig(level=logging.INFO, filename="weather.log")
logger = logging.getLogger(__name__)

def fetch_weather(city):
    """Fetch weather data for a given city using OpenWeatherMap API.

    Args:
        city (str): The city name.

    Returns:
        dict: Weather data or None if the request fails.
    """
    api_key = "YOUR_API_KEY"  # Replace with your OpenWeatherMap API key
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
    try:
        logger.info(f"Fetching weather for {city}")
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Failed to fetch weather: {e}")
        return None

def display_weather(data):
    """Display weather data in a formatted way."""
    if data:
        temp = data["main"]["temp"] - 273.15  # Convert Kelvin to Celsius
        description = data["weather"][0]["description"]
        print(f"Weather: {description}, Temperature: {temp:.1f}°C")
    else:
        print("Error: Could not fetch weather data.")

def main():
    parser = argparse.ArgumentParser(description="Fetch weather for a city.")
    parser.add_argument("city", help="Name of the city")
    args = parser.parse_args()

    data = fetch_weather(args.city)
    display_weather(data)

if __name__ == "__main__":
    main()
```
::

**Step 3: Test the Tool**
```bash
python weather_tool.py London
```

**Expected Output** (with a valid API key):
```
Weather: clear sky, Temperature: 15.5°C
```

**Step 4: Write Tests**
Create `test_weather_tool.py`:
::Editor
#title
weather_tool.py
#default
```python
import unittest
from weather_tool import fetch_weather

class TestWeatherTool(unittest.TestCase):
    def test_invalid_city(self):
        result = fetch_weather("InvalidCity123")
        self.assertIsNone(result)

if __name__ == "__main__":
    unittest.main()
```
::

**Step 5: Deploy**
Package the tool with a `requirements.txt` and share it. Ensure the API key is stored securely (e.g., in an environment variable).

## Best Practices
- **Follow PEP 8**: Use tools like `flake8` and `black` to enforce style consistency.
- **Write Docstrings**: Document every function and module clearly.
- **Test Thoroughly**: Aim for high test coverage using `unittest` or `pytest`.
- **Use Logging**: Replace `print` with `logging` for better debugging in production.
- **Secure Secrets**: Store API keys and credentials in environment variables or configuration files.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| PEP 8 | Python’s style guide for readable, consistent code. |
| Modular Code | Break code into reusable functions and modules. |
| Testing | Use `unittest` or `pytest` to ensure code reliability. |
| Logging | Use `logging` for production-ready debugging. |
| Deployment | Use virtual environments and secure configuration for deployment. |

## What's Next?
This is the final lesson in the Python tutorials module. Next, apply these skills to a real-world project, such as building a web app, automating tasks, or analyzing data. Explore advanced topics like concurrency, machine learning, or cloud deployment to continue your Python journey.

