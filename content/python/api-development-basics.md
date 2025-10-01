---
title: API Development Basics
description: Learn to build and deploy RESTful APIs using Flask and FastAPI, enabling data exchange between applications with Python.
navigation:
  order: 16
---

# API Development Basics (Flask/FastAPI)

APIs (Application Programming Interfaces) allow applications to communicate by exposing data and functionality over the web. This lesson introduces **Flask** and **FastAPI**, two popular Python frameworks for building RESTful APIs. You'll learn to create endpoints, handle requests, and deploy a simple API, making it beginner-friendly yet practical for real-world use.

## Learning Objectives
- Understand RESTful API concepts and HTTP methods.
- Build a basic API using Flask and FastAPI.
- Handle GET, POST, and other HTTP requests.
- Validate input data and return JSON responses.
- Develop a real-world API project for task management.

## 1. Introduction to APIs and Frameworks
A RESTful API uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations (Create, Read, Update, Delete). **Flask** is a lightweight, flexible framework, while **FastAPI** is modern, fast, and supports asynchronous programming with automatic documentation.

**Installation**:
```bash
pip install flask fastapi uvicorn
```

## 2. Building a Simple Flask API
Flask is easy to set up and ideal for small APIs. Let’s create a basic API with GET and POST endpoints.

**Example: Flask API**
```python
from flask import Flask, jsonify, request
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='flask_api.log'
)

app = Flask(__name__)

# Sample data
tasks = [
    {"id": 1, "title": "Learn Flask", "done": False},
    {"id": 2, "title": "Build API", "done": False}
]

@app.route('/tasks', methods=['GET'])
def get_tasks():
    """Return all tasks as JSON."""
    logging.info("Fetching all tasks")
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    """Add a new task."""
    try:
        data = request.get_json()
        if not data or 'title' not in data:
            logging.error("Invalid task data")
            return jsonify({"error": "Title is required"}), 400
        new_task = {
            "id": len(tasks) + 1,
            "title": data['title'],
            "done": False
        }
        tasks.append(new_task)
        logging.info(f"Added task: {new_task['title']}")
        return jsonify(new_task), 201
    except Exception as e:
        logging.error(f"Error adding task: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
```

**Running the Flask API**:
```bash
python app.py
```

**Testing the API**:
- GET `http://localhost:5000/tasks`:
  ```json
  [
      {"id": 1, "title": "Learn Flask", "done": false},
      {"id": 2, "title": "Build API", "done": false}
  ]
  ```
- POST `http://localhost:5000/tasks` with body `{"title": "Test API"}`:
  ```json
  {"id": 3, "title": "Test API", "done": false}
  ```

**Log File (`flask_api.log`)**:
```plaintext
2025-09-30 23:45:45,123 - INFO - Fetching all tasks
2025-09-30 23:45:46,124 - INFO - Added task: Test API
```

## 3. Building a Simple FastAPI
FastAPI is faster, supports async/await, and generates automatic OpenAPI documentation (accessible at `/docs`).

**Example: FastAPI**
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='fastapi_api.log'
)

app = FastAPI()

# Data model
class Task(BaseModel):
    id: int
    title: str
    done: bool = False

# Sample data
tasks = [
    Task(id=1, title="Learn FastAPI", done=False),
    Task(id=2, title="Build API", done=False)
]

@app.get("/tasks")
async def get_tasks():
    """Return all tasks."""
    logging.info("Fetching all tasks")
    return tasks

@app.post("/tasks", response_model=Task)
async def add_task(task: Task):
    """Add a new task."""
    try:
        if task.id in [t.id for t in tasks]:
            logging.error(f"Task ID {task.id} already exists")
            raise HTTPException(status_code=400, detail="Task ID already exists")
        tasks.append(task)
        logging.info(f"Added task: {task.title}")
        return task
    except Exception as e:
        logging.error(f"Error adding task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

**Running the FastAPI**:
```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

**Testing the API**:
- GET `http://localhost:8000/tasks`:
  ```json
  [
      {"id": 1, "title": "Learn FastAPI", "done": false},
      {"id": 2, "title": "Build API", "done": false}
  ]
  ```
- POST `http://localhost:8000/tasks` with body `{"id": 3, "title": "Test FastAPI", "done": false}`:
  ```json
  {"id": 3, "title": "Test FastAPI", "done": false}
  ```
- Visit `http://localhost:8000/docs` for interactive API documentation.

**Log File (`fastapi_api.log`)**:
```plaintext
2025-09-30 23:46:45,123 - INFO - Fetching all tasks
2025-09-30 23:46:46,124 - INFO - Added task: Test FastAPI
```

## 4. Handling Input Validation
Both frameworks support input validation. FastAPI uses Pydantic models for automatic validation, while Flask requires manual checks.

**Example: Flask Validation**
```python
# In Flask add_task route
if not data or 'title' not in data or not isinstance(data['title'], str):
    return jsonify({"error": "Valid title is required"}), 400
```

**Example: FastAPI Validation (Automatic via Pydantic)**
```python
# Pydantic model ensures 'title' is a string and 'id' is an integer
class Task(BaseModel):
    id: int
    title: str
    done: bool = False
```

## Mini-Project: Task Manager API
Build a task manager API with endpoints to list, add, update, and delete tasks, using **FastAPI** for its modern features and documentation.

**Code**:
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging
from typing import List

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='task_manager_api.log'
)

app = FastAPI()

# Task model
class Task(BaseModel):
    id: int
    title: str
    done: bool = False

# In-memory storage
tasks: List[Task] = [
    Task(id=1, title="Complete API project", done=False),
    Task(id=2, title="Test endpoints", done=False)
]

@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    """Retrieve all tasks."""
    logging.info("Fetching all tasks")
    return tasks

@app.post("/tasks", response_model=Task)
async def add_task(task: Task):
    """Add a new task."""
    try:
        if any(t.id == task.id for t in tasks):
            logging.error(f"Task ID {task.id} already exists")
            raise HTTPException(status_code=400, detail="Task ID already exists")
        tasks.append(task)
        logging.info(f"Added task: {task.title}")
        return task
    except Exception as e:
        logging.error(f"Error adding task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, task: Task):
    """Update an existing task."""
    try:
        for i, t in enumerate(tasks):
            if t.id == task_id:
                tasks[i] = task
                logging.info(f"Updated task ID {task_id}")
                return task
        logging.error(f"Task ID {task_id} not found")
        raise HTTPException(status_code=404, detail="Task not found")
    except Exception as e:
        logging.error(f"Error updating task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    """Delete a task."""
    try:
        for i, t in enumerate(tasks):
            if t.id == task_id:
                tasks.pop(i)
                logging.info(f"Deleted task ID {task_id}")
                return {"message": f"Task {task_id} deleted"}
        logging.error(f"Task ID {task_id} not found")
        raise HTTPException(status_code=404, detail="Task not found")
    except Exception as e:
        logging.error(f"Error deleting task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

**Running the API**:
```bash
uvicorn task_manager:app --host 0.0.0.0 --port 8000
```

**Testing the API**:
- **GET** `http://localhost:8000/tasks`:
  ```json
  [
      {"id": 1, "title": "Complete API project", "done": false},
      {"id": 2, "title": "Test endpoints", "done": false}
  ]
  ```
- **POST** `http://localhost:8000/tasks` with body `{"id": 3, "title": "Deploy API", "done": false}`:
  ```json
  {"id": 3, "title": "Deploy API", "done": false}
  ```
- **PUT** `http://localhost:8000/tasks/1` with body `{"id": 1, "title": "Finish API project", "done": true}`:
  ```json
  {"id": 1, "title": "Finish API project", "done": true}
  ```
- **DELETE** `http://localhost:8000/tasks/2`:
  ```json
  {"message": "Task 2 deleted"}
  ```

**Log File (`task_manager_api.log`)**:
```plaintext
2025-09-30 23:47:45,123 - INFO - Fetching all tasks
2025-09-30 23:47:46,124 - INFO - Added task: Deploy API
2025-09-30 23:47:47,125 - INFO - Updated task ID 1
2025-09-30 23:47:48,126 - INFO - Deleted task ID 2
```

## Best Practices
- **Use Descriptive Endpoints**: Name routes clearly (e.g., `/tasks` for task-related operations).
- **Validate Inputs**: Use Pydantic (FastAPI) or manual checks (Flask) to ensure valid data.
- **Log Requests**: Track API activity for debugging and monitoring.
- **Handle Errors Gracefully**: Return meaningful error messages and appropriate HTTP status codes.
- **Document APIs**: Leverage FastAPI’s `/docs` or document Flask APIs manually.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| RESTful APIs | Use HTTP methods (GET, POST, PUT, DELETE) for CRUD operations. |
| Flask | Lightweight framework for simple APIs. |
| FastAPI | Modern, async framework with automatic validation and documentation. |
| Input Validation | Ensure data integrity with Pydantic or manual checks. |
| Error Handling | Return clear error messages and status codes. |

## What's Next?
Explore **Database Operations (SQLite & SQL Basics)** (Lesson 17) to learn how to store and query API data persistently.

