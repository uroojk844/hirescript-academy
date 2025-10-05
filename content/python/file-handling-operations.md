---
title: File Handling Operations
description: Master Python file operations including reading, writing, CSV/JSON handling, and file management with practical examples.
navigation:
  order: 5
---

# File Handling Operations

Welcome to the File Handling Operations tutorial! In this lesson, you'll master reading, writing, and managing files in Python.

In this tutorial, you'll learn:

- Reading and writing text files
- Working with file modes and context managers
- CSV file operations
- JSON file handling
- Binary file operations
- File and directory management
- Best practices for file handling

## 1. Basic File Operations

### Opening and Closing Files
::Editor
#title
opening_closing.py
#default
```python
# Basic file opening (manual close required)
file = open("example.txt", "r")
content = file.read()
file.close()

# Better approach: using context manager
with open("example.txt", "r") as file:
    content = file.read()
    # File automatically closes after this block
```
::

### File Modes
::Editor
#title
file_modes.py
#default
```python
# Common file modes:
# 'r'  - Read (default)
# 'w'  - Write (overwrites existing file)
# 'a'  - Append (adds to end of file)
# 'x'  - Exclusive creation (fails if file exists)
# 'r+' - Read and write
# 'b'  - Binary mode (e.g., 'rb', 'wb')
# 't'  - Text mode (default, e.g., 'rt', 'wt')

# Examples
file_read = open("data.txt", "r")        # Read text
file_write = open("output.txt", "w")     # Write text
file_append = open("log.txt", "a")       # Append text
file_binary = open("image.png", "rb")    # Read binary
```
::

## 2. Reading Files

### Reading Entire File
::Editor
#title
reading_files.py
#default
```python
# Read entire file as single string
with open("sample.txt", "r") as file:
    content = file.read()
    print("Full content:")
    print(content)
```
::

**Output:**
```
Full content:
Hello, World!
This is line 2.
This is line 3.
```

### Reading Line by Line
::Editor
#title
reading_line_by_line.py
#default
```python
# Method 1: read all lines into a list
with open("sample.txt", "r") as file:
    lines = file.readlines()
    print("All lines:", lines)

# Method 2: iterate through file object
with open("sample.txt", "r") as file:
    for line in file:
        print(f"Line: {line.strip()}")

# Method 3: readline() for single line
with open("sample.txt", "r") as file:
    first_line = file.readline()
    second_line = file.readline()
    print("First:", first_line.strip())
    print("Second:", second_line.strip())
```
::

**Output:**
```
All lines: ['Hello, World!\n', 'This is line 2.\n', 'This is line 3.\n']
Line: Hello, World!
Line: This is line 2.
Line: This is line 3.
First: Hello, World!
Second: This is line 2.
```

### Reading with Specific Encoding
::Editor
#title
reading_with_specific_encoding.py
#default
```python
# Read file with specific encoding
with open("unicode_text.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)

# Handle encoding errors
with open("problematic.txt", "r", encoding="utf-8", errors="ignore") as file:
    content = file.read()
    # errors options: 'ignore', 'replace', 'strict'
```
::

## 3. Writing Files

### Writing Text to Files
::Editor
#title
writing_txt.py
#default
```python
# Write (overwrites existing content)
with open("output.txt", "w") as file:
    file.write("Hello, File!\n")
    file.write("This is a new line.\n")

# Write multiple lines at once
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)

print("File written successfully!")
```
::

**Output:**
```
File written successfully!
```

**Content of output.txt:**
```
Line 1
Line 2
Line 3
```

### Appending to Files
::Editor
#title
appending.py
#default
```python
# Append to existing file
with open("log.txt", "a") as file:
    file.write("New log entry\n")
    file.write("Another entry\n")

# Append with timestamp
from datetime import datetime

with open("log.txt", "a") as file:
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    file.write(f"[{timestamp}] Application started\n")
```
::

### Creating New Files
::Editor
#title
new_files.py
#default
```python
# Create new file (fails if exists)
try:
    with open("newfile.txt", "x") as file:
        file.write("This is a new file\n")
    print("File created successfully!")
except FileExistsError:
    print("File already exists!")
```
::

## 4. Working with CSV Files

### Reading CSV Files
::Editor
#title
reading_csv.py
#default
```python
import csv

# Method 1: Reading as list of lists
with open("data.csv", "r") as file:
    csv_reader = csv.reader(file)
    header = next(csv_reader)  # Get header row
    print("Header:", header)
    
    for row in csv_reader:
        print("Row:", row)

# Method 2: Reading as dictionaries
with open("data.csv", "r") as file:
    csv_reader = csv.DictReader(file)
    
    for row in csv_reader:
        print(f"Name: {row['name']}, Age: {row['age']}")
```
::

**Sample data.csv:**
```
name,age,city
Alice,25,New York
Bob,30,Los Angeles
Charlie,35,Chicago
```

**Output:**
```
Header: ['name', 'age', 'city']
Row: ['Alice', '25', 'New York']
Row: ['Bob', '30', 'Los Angeles']
Row: ['Charlie', '35', 'Chicago']
Name: Alice, Age: 25
Name: Bob, Age: 30
Name: Charlie, Age: 35
```

### Writing CSV Files
::Editor
#title
writing_csv.py
#default
```python
import csv

# Method 1: Writing lists
data = [
    ["name", "age", "city"],
    ["David", 28, "Boston"],
    ["Eve", 32, "Seattle"],
    ["Frank", 45, "Miami"]
]

with open("output.csv", "w", newline="") as file:
    csv_writer = csv.writer(file)
    csv_writer.writerows(data)

# Method 2: Writing dictionaries
data_dict = [
    {"name": "Grace", "age": 29, "city": "Denver"},
    {"name": "Henry", "age": 41, "city": "Austin"}
]

with open("output_dict.csv", "w", newline="") as file:
    fieldnames = ["name", "age", "city"]
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    csv_writer.writeheader()
    csv_writer.writerows(data_dict)

print("CSV files created successfully!")
```
::

### Advanced CSV Operations
::Editor
#title
csv_operations.py
#default
```python
import csv

# Reading with different delimiter
with open("data.tsv", "r") as file:
    csv_reader = csv.reader(file, delimiter="\t")
    for row in csv_reader:
        print(row)

# Writing with custom delimiter and quoting
data = [["Name", "Email"], ["John Doe", "john@example.com"]]

with open("custom.csv", "w", newline="") as file:
    csv_writer = csv.writer(file, delimiter=";", quoting=csv.QUOTE_ALL)
    csv_writer.writerows(data)
```
::

## 5. Working with JSON Files

### Reading JSON Files
::Editor
#title
json.py
#default
```python
import json

# Read JSON file
with open("data.json", "r") as file:
    data = json.load(file)
    print("Type:", type(data))
    print("Data:", data)

# Parse JSON string
json_string = '{"name": "Alice", "age": 25, "skills": ["Python", "JavaScript"]}'
parsed_data = json.loads(json_string)
print("Parsed:", parsed_data)
```
::

**Sample data.json:**
::Editor
#title
data.json
#default
```json
{
    "users": [
        {"id": 1, "name": "Alice", "active": true},
        {"id": 2, "name": "Bob", "active": false}
    ],
    "total": 2
}
```
::

**Output:**
```
Type: <class 'dict'>
Data: {'users': [{'id': 1, 'name': 'Alice', 'active': True}, {'id': 2, 'name': 'Bob', 'active': False}], 'total': 2}
Parsed: {'name': 'Alice', 'age': 25, 'skills': ['Python', 'JavaScript']}
```

### Writing JSON Files
::Editor
#title
writing_json.py
#default
```python
import json

# Data to write
data = {
    "users": [
        {"id": 1, "name": "Alice", "age": 25},
        {"id": 2, "name": "Bob", "age": 30}
    ],
    "total": 2
}

# Write JSON file (formatted)
with open("output.json", "w") as file:
    json.dump(data, file, indent=4)

# Convert Python object to JSON string
json_string = json.dumps(data, indent=2)
print("JSON string:")
print(json_string)

# Write JSON file (compact)
with open("compact.json", "w") as file:
    json.dump(data, file, separators=(",", ":"))
```
::

**Output (output.json):**
```json
{
    "users": [
        {
            "id": 1,
            "name": "Alice",
            "age": 25
        },
        {
            "id": 2,
            "name": "Bob",
            "age": 30
        }
    ],
    "total": 2
}
```

### JSON with Custom Objects
::Editor
#title
custom_objects.py
#default
```python
import json
from datetime import datetime

class Student:
    def __init__(self, name, age, enrollment_date):
        self.name = name
        self.age = age
        self.enrollment_date = enrollment_date

# Custom encoder
class StudentEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Student):
            return {
                "name": obj.name,
                "age": obj.age,
                "enrollment_date": obj.enrollment_date.isoformat()
            }
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

# Encode custom object
student = Student("Charlie", 22, datetime.now())
json_string = json.dumps(student, cls=StudentEncoder, indent=2)
print("Encoded student:")
print(json_string)
```
::

## 6. Binary File Operations

### Reading Binary Files
::Editor
#title
reading_binary_files.py
#default
```python
# Read binary file
with open("image.png", "rb") as file:
    binary_data = file.read()
    print(f"File size: {len(binary_data)} bytes")
    print(f"First 10 bytes: {binary_data[:10]}")

# Read binary in chunks
with open("large_file.bin", "rb") as file:
    chunk_size = 1024  # 1 KB
    while True:
        chunk = file.read(chunk_size)
        if not chunk:
            break
        # Process chunk here
        print(f"Read chunk of {len(chunk)} bytes")
```
::

### Writing Binary Files
::Editor
#title
writing_binary_files.py
#default
```python
# Write binary data
binary_data = bytes([0, 1, 2, 3, 4, 5])
with open("output.bin", "wb") as file:
    file.write(binary_data)

# Copy binary file
with open("source.png", "rb") as source:
    with open("destination.png", "wb") as dest:
        dest.write(source.read())

print("Binary file copied successfully!")
```
::

### Working with ByteArrays
::Editor
#title
bytearrays.py
#default
```python
# Create and manipulate byte array
data = bytearray(b"Hello")
data[0] = ord('J')  # Change 'H' to 'J'
print(data.decode())  # Output: Jello

# Write byte array to file
with open("output.bin", "wb") as file:
    file.write(data)
```
::


## 7. File and Directory Management

### Checking File Existence
::Editor
#title
file_dir_management.py
#default
```python
import os

# Check if file exists
if os.path.exists("file.txt"):
    print("File exists!")
else:
    print("File not found!")

# Check if path is file or directory
if os.path.isfile("data.txt"):
    print("It's a file")
if os.path.isdir("my_folder"):
    print("It's a directory")
```
::

### Getting File Information
::Editor
#title
file_info.py
#default
```python
import os
from datetime import datetime

# Get file statistics
file_path = "data.txt"
if os.path.exists(file_path):
    stats = os.stat(file_path)
    
    print(f"File size: {stats.st_size} bytes")
    print(f"Created: {datetime.fromtimestamp(stats.st_ctime)}")
    print(f"Modified: {datetime.fromtimestamp(stats.st_mtime)}")
    print(f"Accessed: {datetime.fromtimestamp(stats.st_atime)}")

# Get file extension and name
filename = "document.pdf"
name, extension = os.path.splitext(filename)
print(f"Name: {name}, Extension: {extension}")
```
::
### File Operations
::Editor
#title
file_ops.py
#default
```python
import os
import shutil

# Rename file
if os.path.exists("old_name.txt"):
    os.rename("old_name.txt", "new_name.txt")

# Copy file
shutil.copy("source.txt", "destination.txt")

# Move file
shutil.move("file.txt", "new_folder/file.txt")

# Delete file
if os.path.exists("temp.txt"):
    os.remove("temp.txt")
    print("File deleted!")
```
::

### Directory Operations
::Editor
#title
dir_ops.py
#default
```python
import os
import shutil

# Create directory
os.mkdir("new_folder")

# Create nested directories
os.makedirs("parent/child/grandchild", exist_ok=True)

# List directory contents
files = os.listdir(".")
print("Files in current directory:", files)

# List with full paths
for item in os.listdir("."):
    full_path = os.path.join(".", item)
    print(f"{item} - {'DIR' if os.path.isdir(full_path) else 'FILE'}")

# Remove empty directory
os.rmdir("empty_folder")

# Remove directory tree
shutil.rmtree("folder_with_contents")
```
::

### Walking Directory Trees
::Editor
#title
working_dir_trees.py
#default
```python
import os

# Walk through directory tree
for root, dirs, files in os.walk("."):
    print(f"Directory: {root}")
    print(f"Subdirectories: {dirs}")
    print(f"Files: {files}")
    print()

# Find all Python files
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".py"):
            full_path = os.path.join(root, file)
            print(f"Found Python file: {full_path}")
```
::

### Working with Paths
::Editor
#title
working_with_paths.py
#default
```python
import os

# Join paths (OS-independent)
path = os.path.join("folder", "subfolder", "file.txt")
print("Joined path:", path)

# Get absolute path
abs_path = os.path.abspath("file.txt")
print("Absolute path:", abs_path)

# Get directory name and base name
directory = os.path.dirname("/home/user/file.txt")
filename = os.path.basename("/home/user/file.txt")
print(f"Directory: {directory}, Filename: {filename}")

# Expand user home directory
home_path = os.path.expanduser("~/documents")
print("Home path:", home_path)
```
::

### Using Pathlib (Modern Approach)
::Editor
#title
practices.py
#default
```python
from pathlib import Path

# Create Path object
file_path = Path("data") / "files" / "document.txt"
print("Path:", file_path)

# Check existence
if file_path.exists():
    print("File exists!")

# Read file
if file_path.exists():
    content = file_path.read_text()
    print(content)

# Write file
file_path.write_text("Hello, World!")

# Get file properties
print(f"Name: {file_path.name}")
print(f"Suffix: {file_path.suffix}")
print(f"Parent: {file_path.parent}")

# List directory
folder = Path(".")
for item in folder.iterdir():
    print(item, "DIR" if item.is_dir() else "FILE")

# Find files with pattern
for py_file in Path(".").rglob("*.py"):
    print(f"Python file: {py_file}")
```
::

## 8. Practical Examples

### Example 1: Log File Analyzer
::Editor
#title
log_file_analyser.py
#default
```python
from collections import Counter
from datetime import datetime

def analyze_log_file(filename):
    """Analyze web server log file."""
    status_codes = Counter()
    error_lines = []
    
    with open(filename, "r") as file:
        for line in file:
            # Parse log line (simplified)
            parts = line.split()
            if len(parts) >= 9:
                status_code = parts[8]
                status_codes[status_code] += 1
                
                if status_code.startswith("4") or status_code.startswith("5"):
                    error_lines.append(line.strip())
    
    # Print statistics
    print("Status Code Statistics:")
    for code, count in status_codes.most_common():
        print(f"  {code}: {count}")
    
    print(f"\nTotal errors: {len(error_lines)}")
    if error_lines:
        print("First 5 errors:")
        for error in error_lines[:5]:
            print(f"  {error}")

# Usage
# analyze_log_file("access.log")
```
::

### Example 2: CSV Data Processor
::Editor
#title
csv_data_processor.py
#default
```python
import csv

def process_sales_data(input_file, output_file):
    """Calculate total sales by product."""
    sales_by_product = {}
    
    # Read and process
    with open(input_file, "r") as file:
        csv_reader = csv.DictReader(file)
        
        for row in csv_reader:
            product = row["product"]
            quantity = int(row["quantity"])
            price = float(row["price"])
            total = quantity * price
            
            if product in sales_by_product:
                sales_by_product[product] += total
            else:
                sales_by_product[product] = total
    
    # Write results
    with open(output_file, "w", newline="") as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(["Product", "Total Sales"])
        
        for product, total in sorted(sales_by_product.items(), 
                                     key=lambda x: x[1], reverse=True):
            csv_writer.writerow([product, f"${total:.2f}"])
    
    print(f"Processed {len(sales_by_product)} products")
    print(f"Results saved to {output_file}")

# Usage
# process_sales_data("sales.csv", "summary.csv")
```
::


### Example 3: Configuration Manager
::Editor
#title
config_manager.py
#default
```python
import json

class ConfigManager:
    """Manage application configuration."""
    
    def __init__(self, config_file="config.json"):
        self.config_file = config_file
        self.config = self.load_config()
    
    def load_config(self):
        """Load configuration from file."""
        try:
            with open(self.config_file, "r") as file:
                return json.load(file)
        except FileNotFoundError:
            print("Config file not found, using defaults")
            return self.get_default_config()
    
    def get_default_config(self):
        """Return default configuration."""
        return {
            "app_name": "MyApp",
            "version": "1.0.0",
            "debug": False,
            "database": {
                "host": "localhost",
                "port": 5432
            }
        }
    
    def save_config(self):
        """Save configuration to file."""
        with open(self.config_file, "w") as file:
            json.dump(self.config, file, indent=4)
        print("Configuration saved!")
    
    def get(self, key, default=None):
        """Get configuration value."""
        keys = key.split(".")
        value = self.config
        
        for k in keys:
            if isinstance(value, dict):
                value = value.get(k, default)
            else:
                return default
        
        return value
    
    def set(self, key, value):
        """Set configuration value."""
        keys = key.split(".")
        config = self.config
        
        for k in keys[:-1]:
            if k not in config:
                config[k] = {}
            config = config[k]
        
        config[keys[-1]] = value

# Usage
config = ConfigManager()
print("App name:", config.get("app_name"))
print("DB port:", config.get("database.port"))

config.set("debug", True)
config.set("database.port", 3306)
config.save_config()
```
::

### Example 4: File Backup System
::Editor
#title
file_backup_system.py
#default
```python
import os
import shutil
from datetime import datetime
from pathlib import Path

def backup_files(source_dir, backup_dir, extensions=None):
    """Create backup of files with specific extensions."""
    # Create backup directory with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = Path(backup_dir) / f"backup_{timestamp}"
    backup_path.mkdir(parents=True, exist_ok=True)
    
    # Track statistics
    backed_up = 0
    total_size = 0
    
    # Walk through source directory
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            # Check extension if filter provided
            if extensions and not any(file.endswith(ext) for ext in extensions):
                continue
            
            # Create source and destination paths
            source_file = Path(root) / file
            relative_path = source_file.relative_to(source_dir)
            dest_file = backup_path / relative_path
            
            # Create destination directory
            dest_file.parent.mkdir(parents=True, exist_ok=True)
            
            # Copy file
            shutil.copy2(source_file, dest_file)
            
            backed_up += 1
            total_size += source_file.stat().st_size
    
    # Print summary
    print(f"Backup completed!")
    print(f"Files backed up: {backed_up}")
    print(f"Total size: {total_size / 1024:.2f} KB")
    print(f"Backup location: {backup_path}")

# Usage
# backup_files("./documents", "./backups", extensions=[".txt", ".pdf", ".docx"])
```
::

## Best Practices

1. **Always use context managers** (`with` statement) for file operations
2. **Specify encoding** explicitly when working with text files
3. **Handle exceptions** gracefully with try-except blocks
4. **Close files properly** or use context managers
5. **Use pathlib** for modern path operations
6. **Read large files** in chunks to avoid memory issues
7. **Validate file paths** before operations
8. **Use appropriate file modes** to prevent data loss
9. **Set proper file permissions** for security
10. **Create backups** before modifying important files

## Common Pitfalls to Avoid

- Forgetting to close files (use `with` statement)
- Not handling file not found errors
- Mixing text and binary modes
- Reading entire large files into memory
- Using platform-specific path separators
- Not specifying encoding for text files
- Ignoring file permissions and security

## What's Next?

You've mastered file handling in Python! In the next tutorial, we'll explore **Exception Handling Mastery**, where you'll learn to handle errors gracefully and build robust applications.