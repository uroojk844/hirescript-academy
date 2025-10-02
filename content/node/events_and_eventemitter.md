---
title: Events and EventEmitter
description: Learn how to use the Node.js events module and EventEmitter class to handle asynchronous events and create event-driven applications.
navigation:
  order: 8
---

# Events and EventEmitter

Welcome to the Events and EventEmitter lesson in our Node.js tutorial series! In this tutorial, you’ll learn about Node.js’s event-driven architecture and how to use the `events` module and `EventEmitter` class to handle asynchronous events. This is a core concept in Node.js, enabling applications to respond to actions like user inputs, file operations, or network requests efficiently.

In this tutorial, you’ll learn:

- Understanding Node.js’s event-driven model
- Using the `events` module and `EventEmitter` class
- Creating and emitting custom events
- Handling one-time and recurring events
- Integrating events with other Node.js modules
- Best practices for event-driven programming

## What is Event-Driven Programming in Node.js?

Node.js is built on an **event-driven architecture**, where actions (events) trigger specific responses. The `events` module provides the `EventEmitter` class, which allows you to create, emit, and listen for custom events, making it ideal for handling asynchronous operations like HTTP requests, file I/O, or timers.

**Key Concepts**:
- **Event**: A named action (e.g., `click`, `dataReceived`).
- **EventEmitter**: A class to manage events and their listeners.
- **Listener**: A function executed when an event is emitted.
- **Emit**: Triggering an event to invoke its listeners.

**Importing events**:
```javascript
const EventEmitter = require('events');
```

## Setting Up the Project

Ensure your project is set up (from previous lessons):

```
my-node-project/
├── node_modules/
├── utils/
├── .env
├── .gitignore
├── package.json
├── index.js
```

**Update package.json**:

::Editor
#title
package.json

#default

```json
{
  "name": "my-node-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

::

## Creating and Using EventEmitter

### Basic EventEmitter Example

Create an `EventEmitter` instance and define event listeners.

::Editor
#title
index.js

#default

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Define a listener for the 'greet' event
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the 'greet' event
myEmitter.emit('greet', 'Alice');
myEmitter.emit('greet', 'Bob');
```

::

**Run**:
```bash
node index.js
```

**Expected Output**:
```
Hello, Alice!
Hello, Bob!
```

**Explanation**:
- `new EventEmitter()`: Creates an event emitter instance.
- `myEmitter.on(eventName, listener)`: Adds a listener for the specified event.
- `myEmitter.emit(eventName, ...args)`: Triggers the event, passing arguments to listeners.

### Multiple Listeners

An event can have multiple listeners.

::Editor
#title
index.js

#default

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('event', () => {
  console.log('First listener triggered');
});

myEmitter.on('event', () => {
  console.log('Second listener triggered');
});

myEmitter.emit('event');
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
First listener triggered
Second listener triggered
```

## One-Time Events

Use `once` for events that should trigger only once.

::Editor
#title
index.js

#default

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.once('start', () => {
  console.log('This runs only once!');
});

myEmitter.emit('start');
myEmitter.emit('start'); // Ignored
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
This runs only once!
```

## Passing Data with Events

Pass multiple arguments to listeners.

::Editor
#title
index.js

#default

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('userRegistered', (user, timestamp) => {
  console.log(`User ${user.name} registered at ${timestamp}`);
});

myEmitter.emit('userRegistered', { name: 'Alice' }, new Date().toISOString());
```

::

**Run**:
```bash
node index.js
```

**Output** (example):
```
User Alice registered at 2025-10-02T11:56:00.123Z
```

## Creating a Custom EventEmitter Class

Extend `EventEmitter` for custom functionality.

::Editor
#title
utils/logger.js

#default

```javascript
const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message, level = 'info') {
    console.log(`[${level.toUpperCase()}] ${message}`);
    this.emit('log', { message, level, timestamp: new Date().toISOString() });
  }
}

module.exports = Logger;
```

::

::Editor
#title
index.js

#default

```javascript
const Logger = require('./utils/logger');

const logger = new Logger();

logger.on('log', (data) => {
  console.log('Log event:', data);
});

logger.log('Server started', 'info');
logger.log('Error occurred', 'error');
```

::

**Run**:
```bash
node index.js
```

**Output** (example):
```
[INFO] Server started
Log event: { message: 'Server started', level: 'info', timestamp: '2025-10-02T11:56:00.123Z' }
[ERROR] Error occurred
Log event: { message: 'Error occurred', level: 'error', timestamp: '2025-10-02T11:56:00.124Z' }
```

## Integrating with HTTP Server

Combine `EventEmitter` with the `http` module.

::Editor
#title
utils/server.js

#default

```javascript
const http = require('http');
const EventEmitter = require('events');

class AppServer extends EventEmitter {
  constructor() {
    super();
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  handleRequest(req, res) {
    if (req.url === '/api' && req.method === 'GET') {
      this.emit('request', { url: req.url, method: req.method });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'API response' }));
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404: Not Found\n');
    }
  }

  listen(port) {
    this.server.listen(port, () => {
      this.emit('listening', port);
    });
  }
}

module.exports = AppServer;
```

::

::Editor
#title
index.js

#default

```javascript
const AppServer = require('./utils/server');

const server = new AppServer();

server.on('listening', (port) => {
  console.log(`Server running on http://localhost:${port}`);
});

server.on('request', (data) => {
  console.log(`Request received: ${data.method} ${data.url}`);
});

server.listen(3000);
```

::

**Run**:
```bash
node index.js
```

**Test URL**: `http://localhost:3000/api`

**Output**:
```
Server running on http://localhost:3000
Request received: GET /api
```

**Response**: `{"message":"API response"}`

## Error Handling with Events

Handle errors using the `error` event.

::Editor
#title
index.js

#default

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('error', (err) => {
  console.error('Error occurred:', err.message);
});

myEmitter.emit('error', new Error('Something went wrong'));
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Error occurred: Something went wrong
```

**Note**: Unhandled `error` events crash the application, so always define an `error` listener.

## Best Practices

### Event Naming
- Use clear, descriptive event names (e.g., `userRegistered`, `dataSaved`).
- Follow a consistent naming convention (e.g., camelCase).

### Listener Management
- Remove listeners with `removeListener` or `removeAllListeners` when no longer needed.
- Use `once` for one-time events to avoid memory leaks.

### Modularity
- Encapsulate event logic in custom classes or modules.
- Combine `EventEmitter` with other modules (e.g., `http`, `fs`).

### Error Handling
- Always handle the `error` event.
- Validate event data before processing.

## Common Patterns

### Event Logger
Log all events:

```javascript
myEmitter.on('newListener', (eventName) => {
  console.log(`New listener added for ${eventName}`);
});
```

### Chained Events
Trigger events based on other events:

```javascript
myEmitter.on('start', () => {
  myEmitter.emit('nextStep');
});
```

## What's Next?

You’ve mastered events and `EventEmitter` in Node.js! In the next tutorial, **Streams and Buffers**, you’ll learn how to handle streaming data and binary buffers for efficient data processing.

### Key Takeaways:
- Node.js is event-driven, using `EventEmitter` for asynchronous events
- Use `on` for recurring events and `once` for one-time events
- Create custom `EventEmitter` classes for modularity
- Integrate events with HTTP servers or other modules
- Handle `error` events to prevent crashes
- Follow best practices for clean event-driven code

## Practice Exercise
1. Create a custom `EventEmitter` class for a task manager with events like `taskAdded`, `taskCompleted`.
2. Add listeners to log task events with timestamps.
3. Integrate with an HTTP server to emit events on requests.
4. Handle errors using the `error` event.
5. Test emitting multiple events with different arguments.