---
title: Virtual Environments Management
description: Learn how to create, manage, and use virtual environments in Python to isolate project dependencies and ensure consistent development environments.
navigation.order: 19
---

# Virtual Environments Management

Virtual environments are essential tools in Python development, allowing you to create isolated spaces for project dependencies. This lesson explores how to set up, manage, and use virtual environments effectively, ensuring your projects remain organized and conflict-free.

## Learning Objectives
- Understand the purpose and benefits of virtual environments.
- Learn to create and activate virtual environments using `venv` and `virtualenv`.
- Manage packages within virtual environments.
- Explore best practices for organizing and maintaining virtual environments.
- Apply virtual environment knowledge in a real-world project setup.

## Setting Up Virtual Environments

### What is a Virtual Environment?
A virtual environment is an isolated Python environment that allows you to install packages specific to a project without affecting the global Python installation. This prevents version conflicts and keeps your system clean.

### Creating a Virtual Environment with `venv`
Python's built-in `venv` module is the standard way to create virtual environments.

**Step 1: Create a Virtual Environment**
Run the following command in your terminal to create a virtual environment named `myenv`:
```bash
python -m venv myenv
```
This creates a folder named `myenv` containing a fresh Python environment.

**Expected Output**: A new directory (`myenv`) with subfolders like `bin` (or `Scripts` on Windows), `lib`, and `include`.

**Step 2: Activate the Virtual Environment**
Activate the environment to use its isolated Python and `pip`.

- On macOS/Linux:
  ```bash
  source myenv/bin/activate
  ```
- On Windows:
  ```bash
  myenv\Scripts\activate
  ```

**Expected Output**: Your terminal prompt changes, typically prefixed with `(myenv)`.

**Step 3: Verify the Environment**
Check the active Python and `pip` versions:
```bash
python --version
pip --version
```
**Expected Output**:
```
Python 3.x.x
pip x.x.x from .../myenv/... (python 3.x)
```

### Installing Packages in a Virtual Environment
With the environment activated, use `pip` to install packages. For example:
```bash
pip install requests
```

**Expected Output**: The `requests` library is installed only in `myenv`, not globally.

### Deactivating the Virtual Environment
To exit the virtual environment:
```bash
deactivate
```
**Expected Output**: Your terminal prompt returns to normal.

## Using `virtualenv` (Alternative Tool)
`virtualenv` is a third-party tool offering additional features, like supporting older Python versions.

**Step 1: Install `virtualenv`**
```bash
pip install virtualenv
```

**Step 2: Create and Activate**
```bash
virtualenv myenv2
source myenv2/bin/activate  # macOS/Linux
myenv2\Scripts\activate     # Windows
```

The workflow is similar to `venv`, but `virtualenv` may be preferred in specific cases.

## Managing Dependencies
### Exporting Dependencies
Save your project’s dependencies to a `requirements.txt` file:
```bash
pip freeze > requirements.txt
```
**Expected Output**: A file `requirements.txt` listing installed packages, e.g.:
```
requests==2.28.1
```

### Installing Dependencies
Share your project by installing dependencies from `requirements.txt`:
```bash
pip install -r requirements.txt
```

## Real-World Mini-Project: Setting Up a Web Scraping Project
Let’s set up a virtual environment for a web scraping project using `requests` and `beautifulsoup4`.

**Step 1: Create and Activate Environment**
```bash
python -m venv scraper_env
source scraper_env/bin/activate  # macOS/Linux
scraper_env\Scripts\activate    # Windows
```

**Step 2: Install Dependencies**
```bash
pip install requests beautifulsoup4
pip freeze > requirements.txt
```

**Step 3: Write a Simple Scraper**
Create a file `scraper.py`:
::Editor
#title
scraper.py
#default
```python
import requests
from bs4 import BeautifulSoup

url = "https://example.com"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract all paragraph texts
paragraphs = soup.find_all('p')
for p in paragraphs:
    print(p.text)
```
::

**Step 4: Run the Script**
```bash
python scraper.py
```

**Expected Output**: Prints all paragraph texts from `example.com`.

**Step 5: Share the Project**
Share the `requirements.txt` and `scraper.py` with a teammate, who can recreate the environment using:
```bash
python -m venv scraper_env
source scraper_env/bin/activate
pip install -r requirements.txt
```

## Best Practices
- **One Environment per Project**: Create a unique virtual environment for each project to avoid dependency conflicts.
- **Store Environments in Project Folders**: Keep the environment folder (e.g., `venv`) inside the project directory for organization.
- **Use `requirements.txt`**: Always maintain a `requirements.txt` file to document dependencies.
- **Avoid Global Installs**: Install packages only within virtual environments to keep your system Python clean.
- **Version Control Ignore**: Add the virtual environment folder (e.g., `venv/`) to `.gitignore` to avoid committing it.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Virtual Environment | Isolated Python environment for project-specific dependencies. |
| `venv` vs `virtualenv` | `venv` is built-in and sufficient; `virtualenv` offers extra features. |
| Dependency Management | Use `pip freeze` and `requirements.txt` to manage and share dependencies. |
| Activation/Deactivation | Use `source` or `Scripts\activate` to enter, `deactivate` to exit. |

## What's Next?
In the next lesson, **Best Practices & Production Code**, you’ll learn how to write clean, maintainable, and production-ready Python code, including style guides and deployment tips.

