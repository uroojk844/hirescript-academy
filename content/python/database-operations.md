---
title: Database Operations 
description: Learn to interact with databases using SQLite and SQL in Python, covering creating, querying, and managing data for persistent storage.
navigation:
  order: 17
---

# Database Operations (SQLite & SQL Basics)

Databases are essential for storing and managing data in applications. This lesson introduces **SQLite**, a lightweight, serverless database, and **SQL** (Structured Query Language) basics to perform CRUD operations (Create, Read, Update, Delete) using Python’s `sqlite3` module. You'll learn to create tables, insert data, query results, and integrate databases into applications.

## Learning Objectives
- Understand SQLite and SQL fundamentals.
- Create and manage database tables using SQL.
- Perform CRUD operations with Python’s `sqlite3` module.
- Handle database errors and ensure data integrity.
- Build a real-world project integrating a database.

## 1. Introduction to SQLite and SQL
**SQLite** is a self-contained, file-based database ideal for small to medium-sized applications. **SQL** is the language used to interact with relational databases, allowing you to create, query, and manipulate data.

**Why SQLite?**
- No server setup required.
- Lightweight and embedded in Python via the `sqlite3` module.
- Perfect for learning and prototyping.

**Importing sqlite3**:
::Editor
#title
sqlite3.py
#default
```python
import sqlite3
```
::

## 2. Creating a Database and Table
Use `sqlite3` to connect to a database and create tables to store structured data.

**Example: Creating a Table**
::Editor
#title
table.py
#default
```python
import sqlite3
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='database_operations.log'
)

def create_table():
    """Create a tasks table in the database."""
    try:
        conn = sqlite3.connect('tasks.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                done BOOLEAN DEFAULT 0
            )
        ''')
        conn.commit()
        logging.info("Created tasks table")
        print("Tasks table created successfully")
    except sqlite3.Error as e:
        logging.error(f"Error creating table: {e}")
        print(f"Error: {e}")
    finally:
        conn.close()

create_table()
```
::

**Expected Output**:
```plaintext
Tasks table created successfully
```

**Log File (`database_operations.log`)**:
```plaintext
2025-09-30 23:50:45,123 - INFO - Created tasks table
```

## 3. Inserting Data (Create)
Insert data into tables using the SQL `INSERT` statement.

**Example: Inserting Data**
::Editor
#title
insert_data.py
#default
```python
def add_task(title: str):
    """Add a task to the database."""
    try:
        conn = sqlite3.connect('tasks.db')
        cursor = conn.cursor()
        
        cursor.execute('INSERT INTO tasks (title, done) VALUES (?, ?)', (title, False))
        conn.commit()
        logging.info(f"Added task: {title}")
        print(f"Task '{title}' added successfully")
    except sqlite3.Error as e:
        logging.error(f"Error adding task: {e}")
        print(f"Error: {e}")
    finally:
        conn.close()

add_task("Learn SQL")
add_task("Build database app")
```
::

**Expected Output**:
```plaintext
Task 'Learn SQL' added successfully
Task 'Build database app' added successfully
```

**Log File**:
```plaintext
2025-09-30 23:50:46,124 - INFO - Added task: Learn SQL
2025-09-30 23:50:46,125 - INFO - Added task: Build database app
```

## 4. Querying Data (Read)
Retrieve data using the SQL `SELECT` statement.

**Example: Querying Data**
::Editor
#title
querying_data.py
#default
```python
def get_tasks():
    """Retrieve all tasks from the database."""
    try:
        conn = sqlite3.connect('tasks.db')
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, title, done FROM tasks')
        tasks = cursor.fetchall()
        logging.info("Fetched all tasks")
        
        for task in tasks:
            print(f"ID: {task[0]}, Title: {task[1]}, Done: {task[2]}")
        return tasks
    except sqlite3.Error as e:
        logging.error(f"Error fetching tasks: {e}")
        print(f"Error: {e}")
        return []
    finally:
        conn.close()

get_tasks()
```
::

**Expected Output**:
```plaintext
ID: 1, Title: Learn SQL, Done: 0
ID: 2, Title: Build database app, Done: 0
```

**Log File**:
```plaintext
2025-09-30 23:50:47,126 - INFO - Fetched all tasks
```

## 5. Updating and Deleting Data
Modify existing data with `UPDATE` and remove data with `DELETE`.

**Example: Update and Delete**
::Editor
#title
update_delete.py
#default
```python
def update_task(task_id: int, done: bool):
    """Update the done status of a task."""
    try:
        conn = sqlite3.connect('tasks.db')
        cursor = conn.cursor()
        
        cursor.execute('UPDATE tasks SET done = ? WHERE id = ?', (done, task_id))
        conn.commit()
        if cursor.rowcount == 0:
            logging.warning(f"Task ID {task_id} not found")
            print(f"Task ID {task_id} not found")
        else:
            logging.info(f"Updated task ID {task_id} to done={done}")
            print(f"Task ID {task_id} updated successfully")
    except sqlite3.Error as e:
        logging.error(f"Error updating task: {e}")
        print(f"Error: {e}")
    finally:
        conn.close()

def delete_task(task_id: int):
    """Delete a task from the database."""
    try:
        conn = sqlite3.connect('tasks.db')
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
        conn.commit()
        if cursor.rowcount == 0:
            logging.warning(f"Task ID {task_id} not found")
            print(f"Task ID {task_id} not found")
        else:
            logging.info(f"Deleted task ID {task_id}")
            print(f"Task ID {task_id} deleted successfully")
    except sqlite3.Error as e:
        logging.error(f"Error deleting task: {e}")
        print(f"Error: {e}")
    finally:
        conn.close()

update_task(1, True)
delete_task(2)
```
::

**Expected Output**:
```plaintext
Task ID 1 updated successfully
Task ID 2 deleted successfully
```

**Log File**:
```plaintext
2025-09-30 23:50:48,127 - INFO - Updated task ID 1 to done=True
2025-09-30 23:50:48,128 - INFO - Deleted task ID 2
```

## Mini-Project: Task Manager with Database
Build a command-line task manager that stores tasks in an SQLite database, supporting CRUD operations.

**Code**:
::Editor
#title
task_manager.py
#default
```python
import sqlite3
import logging
from typing import List, Tuple

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='task_manager_db.log'
)

class TaskManager:
    """A class to manage tasks in an SQLite database."""
    
    def __init__(self, db_name: str):
        """Initialize the task manager with a database."""
        self.db_name = db_name
        self.create_table()

    def create_table(self):
        """Create the tasks table if it doesn't exist."""
        try:
            with sqlite3.connect(self.db_name) as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT NOT NULL,
                        done BOOLEAN DEFAULT 0
                    )
                ''')
                conn.commit()
                logging.info("Created tasks table")
        except sqlite3.Error as e:
            logging.error(f"Error creating table: {e}")

    def add_task(self, title: str) -> None:
        """Add a new task."""
        try:
            with sqlite3.connect(self.db_name) as conn:
                cursor = conn.cursor()
                cursor.execute('INSERT INTO tasks (title, done) VALUES (?, ?)', (title, False))
                conn.commit()
                logging.info(f"Added task: {title}")
                print(f"Task '{title}' added successfully")
        except sqlite3.Error as e:
            logging.error(f"Error adding task: {e}")
            print(f"Error: {e}")

    def get_tasks(self) -> List[Tuple]:
        """Retrieve all tasks."""
        try:
            with sqlite3.connect(self.db_name) as conn:
                cursor = conn.cursor()
                cursor.execute('SELECT id, title, done FROM tasks')
                tasks = cursor.fetchall()
                logging.info("Fetched all tasks")
                return tasks
        except sqlite3.Error as e:
            logging.error(f"Error fetching tasks: {e}")
            print(f"Error: {e}")
            return []

    def update_task(self, task_id: int, done: bool) -> None:
        """Update the done status of a task."""
        try:
            with sqlite3.connect(self.db_name) as conn:
                cursor = conn.cursor()
                cursor.execute('UPDATE tasks SET done = ? WHERE id = ?', (done, task_id))
                conn.commit()
                if cursor.rowcount == 0:
                    logging.warning(f"Task ID {task_id} not found")
                    print(f"Task ID {task_id} not found")
                else:
                    logging.info(f"Updated task ID {task_id} to done={done}")
                    print(f"Task ID {task_id} updated successfully")
        except sqlite3.Error as e:
            logging.error(f"Error updating task: {e}")
            print(f"Error: {e}")

    def delete_task(self, task_id: int) -> None:
        """Delete a task."""
        try:
            with sqlite3.connect(self.db_name) as conn:
                cursor = conn.cursor()
                cursor.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
                conn.commit()
                if cursor.rowcount == 0:
                    logging.warning(f"Task ID {task_id} not found")
                    print(f"Task ID {task_id} not found")
                else:
                    logging.info(f"Deleted task ID {task_id}")
                    print(f"Task ID {task_id} deleted successfully")
        except sqlite3.Error as e:
            logging.error(f"Error deleting task: {e}")
            print(f"Error: {e}")

def main():
    """Main function to run the task manager CLI."""
    manager = TaskManager('tasks.db')
    
    while True:
        print("\n1. Add Task\n2. List Tasks\n3. Mark Task Done\n4. Delete Task\n5. Exit")
        choice = input("Choose an option: ")
        
        if choice == "1":
            title = input("Enter task title: ")
            manager.add_task(title)
        elif choice == "2":
            tasks = manager.get_tasks()
            for task in tasks:
                status = "✓" if task[2] else " "
                print(f"ID: {task[0]}, Title: {task[1]}, Done: [{status}]")
        elif choice == "3":
            task_id = int(input("Enter task ID: "))
            manager.update_task(task_id, True)
        elif choice == "4":
            task_id = int(input("Enter task ID: "))
            manager.delete_task(task_id)
        elif choice == "5":
            logging.info("Exiting task manager")
            print("Exiting...")
            break
        else:
            print("Invalid choice")

if __name__ == "__main__":
    main()
```
::

**Expected Output**:
```plaintext
1. Add Task
2. List Tasks
3. Exit
Choose an option: 1
Enter task title: Finish database project
Task 'Finish database project' added successfully

1. Add Task
2. List Tasks
3. Exit
Choose an option: 2
ID: 1, Title: Finish database project, Done: [ ]

1. Add Task
2. List Tasks
3. Exit
Choose an option: 3
Exiting...
```

**Log File (`task_manager_db.log`)**:
```plaintext
2025-09-30 23:50:49,129 - INFO - Created tasks table
2025-09-30 23:50:50,130 - INFO - Added task: Finish database project
2025-09-30 23:50:51,131 - INFO - Fetched all tasks
2025-09-30 23:50:52,132 - INFO - Exiting task manager
```

## Best Practices
- **Use Parameterized Queries**: Prevent SQL injection with placeholders (`?`).
- **Close Connections**: Always close database connections using `conn.close()` or context managers.
- **Log Operations**: Track database actions for debugging and monitoring.
- **Handle Errors**: Use try-except to manage database errors gracefully.
- **Design Tables Thoughtfully**: Use appropriate data types and constraints (e.g., `NOT NULL`).

## Key Takeaways

| Concept | Description |
|---------|-------------|
| SQLite | Lightweight, serverless database for Python applications. |
| SQL | Language for creating, querying, and managing relational data. |
| CRUD Operations | Create, Read, Update, Delete data using SQL statements. |
| Error Handling | Use try-except and logging for robust database interactions. |
| sqlite3 Module | Python’s built-in module for SQLite database operations. |

## What's Next?
Explore **Testing and Debugging** (Lesson 18) to learn how to write unit tests and debug your database-driven applications.
