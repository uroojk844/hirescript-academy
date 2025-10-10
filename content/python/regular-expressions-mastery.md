---
title: Regular Expressions Mastery
description: Master the use of regular expressions in Python for powerful text pattern matching, searching, and manipulation.
navigation:
  order: 9
---


# Regular Expressions Mastery

Regular expressions (regex) are a powerful tool for matching patterns in text, enabling tasks like validation, extraction, and substitution. Python's `re` module provides support for regex, making it essential for text processing. This lesson covers regex basics to advanced usage, helping beginners build confidence through clear examples.

## Learning Objectives
- Understand regex syntax and common patterns.
- Use Python's `re` module for searching, matching, and replacing text.
- Apply quantifiers, groups, and anchors in regex.
- Handle advanced features like lookaheads and non-capturing groups.
- Implement regex in real-world text processing scenarios.

## Section 1: Regex Basics
Regex uses special characters to define patterns. Common ones include `.` (any character), `^` (start of string), `$` (end of string), and character classes like `\d` (digit), `\w` (word character), `\s` (whitespace).

**Code Example: Basic Matching**
::Editor
#title
matching.py
#default
```python
import re

text = "The quick brown fox jumps over the lazy dog."
pattern = r"fox"

match = re.search(pattern, text)
if match:
    print(f"Found '{match.group()}' at position {match.start()}-{match.end()}")
```
::

**Expected Output:**
```
Found 'fox' at position 16-19
```

**Explanation**:
- `re.search()` finds the first occurrence of the pattern.
- `r"fox"` is a raw string for the pattern (prevents backslash escaping).
- `match.group()` returns the matched text; `start()` and `end()` give positions.

## Section 2: Character Classes and Quantifiers
Character classes match specific sets (e.g., `[a-z]` for lowercase letters). Quantifiers specify repetition: `*` (0+), `+` (1+), `?` (0 or 1), `{n}` (exactly n).

**Code Example: Matching Emails**
::Editor
#title
emails.py
#default
```python
import re

text = "Contact us at support@example.com or sales@domain.org"
pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"

emails = re.findall(pattern, text)
print(emails)
```
::

**Expected Output:**
```
['support@example.com', 'sales@domain.org']
```

**Explanation**:
- `\b` is a word boundary anchor.
- `[A-Za-z0-9._%+-]+` matches the local part of the email.
- `@[A-Za-z0-9.-]+` matches the domain.
- `\.[A-Za-z]{2,}` matches the top-level domain (e.g., .com).
- `re.findall()` returns all matches as a list.

## Section 3: Groups and Capturing
Groups `()` capture parts of the match for extraction. Use `\1` to reference groups in replacements.

**Code Example: Extracting Phone Numbers**
::Editor
#title
phone_numbers.py
#default
```python
import re

text = "Call me at (123) 456-7890 or 987-654-3210."
pattern = r"(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})"

matches = re.finditer(pattern, text)
for match in matches:
    print(f"Area code: {match.group(1)}, Local: {match.group(2)}-{match.group(3)}")
```
::

**Expected Output:**
```
Area code: 123, Local: 456-7890
Area code: 987, Local: 654-3210
```

**Explanation**:
- `(\d{3})` captures three digits (area code).
- `[-.\s]?` matches optional separators.
- `re.finditer()` returns an iterator of match objects for detailed access.

## Section 4: Advanced Regex: Lookaheads and Lookbehinds
Lookaheads `(?=...)` and lookbehinds `(?<=...)` assert conditions without consuming text. Non-capturing groups `(?:...)` group without capturing.

**Code Example: Password Validation**
::Editor
#title
pwd_validation.py
#default
```python
import re

def validate_password(password):
    pattern = r"^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    if re.match(pattern, password):
        return "Password is valid."
    return "Password is invalid."

print(validate_password("Passw0rd!"))  # Valid
print(validate_password("password"))   # Invalid
```
::

**Expected Output:**
```
Password is valid.
Password is invalid.
```

**Explanation**:
- `^` anchors to start; `$` to end.
- `(?=.*[A-Z])` lookahead for at least one uppercase.
- `(?=.*\d)` for a digit; `(?=.*[@$!%*?&])` for a special char.
- `{8,}` ensures minimum length of 8.

## Mini-Project: Log File Parser
This project parses a simple web server log to extract IP addresses, timestamps, and requested URLs.

**Sample Log (save as 'access.log'):**
```
192.168.1.1 - - [30/Sep/2025:10:00:00] "GET /index.html HTTP/1.1" 200
192.168.1.2 - - [30/Sep/2025:10:05:00] "POST /login HTTP/1.1" 401
```

**Code Example: Log Parser**
::Editor
#title
log_parser.py
#default
```python
import re

def parse_log(file_path):
    pattern = r'(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - - \[(.*?)\] "(GET|POST) (.*?) HTTP/1\.1" (\d{3})'
    with open(file_path, 'r') as file:
        for line in file:
            match = re.match(pattern, line)
            if match:
                ip, timestamp, method, url, status = match.groups()
                print(f"IP: {ip}, Time: {timestamp}, Method: {method}, URL: {url}, Status: {status}")

parse_log('access.log')
```
::

**Expected Output:**
```
IP: 192.168.1.1, Time: 30/Sep/2025:10:00:00, Method: GET, URL: /index.html, Status: 200
IP: 192.168.1.2, Time: 30/Sep/2025:10:05:00, Method: POST, URL: /login, Status: 401
```

**Explanation**:
- The pattern captures IP, timestamp, method, URL, and status code.
- `re.match()` checks from the start of each line.
- Groups extract specific data for analysis or reporting.

## Best Practices
- **Test Patterns**: Use online tools like regex101.com to debug regex.
- **Use Raw Strings**: Always prefix patterns with `r""` to avoid escaping issues.
- **Compile for Efficiency**: Use `re.compile(pattern)` for repeated use to improve performance.
- **Be Specific**: Avoid overly broad patterns (e.g., `.*`) to prevent unexpected matches.
- **Handle Edge Cases**: Test with varied inputs, including empty strings or special characters.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Basic Patterns | Use `.`, `\d`, `\w` for matching characters. |
| Quantifiers | `*`, `+`, `?`, `{n,m}` control repetitions. |
| Groups | `()` capture substrings; `(?:)` for non-capturing. |
| Anchors | `^`, `$`, `\b` for boundaries. |
| Lookaheads | `(?=...)` assert conditions ahead. |

## What's Next?
In the next module, **Working with Dates and Times**, you’ll learn to handle date and time data using Python’s `datetime` module and third-party libraries.
