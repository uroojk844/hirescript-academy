---
title: Object-Oriented Programming
description: Master Python OOP concepts including Classes, Objects, Inheritance, Encapsulation, Polymorphism, and Abstraction with real-world examples.
navigation:
  order: 4
---

# Object-Oriented Programming

Welcome to the Object-Oriented Programming tutorial! In this lesson, you'll master Python's OOP paradigm and learn how to design robust, reusable code.

In this tutorial, you'll learn:

- Classes and Objects fundamentals
- Instance and Class attributes/methods
- The four pillars of OOP (Encapsulation, Inheritance, Polymorphism, Abstraction)
- Special methods (Magic/Dunder methods)
- Property decorators and data hiding
- Class inheritance and method overriding
- Multiple inheritance and Method Resolution Order (MRO)

## 1. Classes and Objects - The Foundation

Classes are blueprints for creating objects. Objects are instances of classes with their own data and behavior.

### Creating Your First Class

```python
# Define a simple class
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"
    
    # Constructor method (initializer)
    def __init__(self, name, age):
        # Instance attributes (unique to each instance)
        self.name = name
        self.age = age
    
    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"
    
    def description(self):
        return f"{self.name} is {self.age} years old"

# Creating objects (instances)
dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

print(dog1.name)            # Access attribute
print(dog1.bark())          # Call method
print(dog1.description())
print(f"Species: {dog1.species}")

print("\n" + dog2.name)
print(dog2.bark())
```

**Output:**
```
Buddy
Buddy says Woof!
Buddy is 3 years old
Species: Canis familiaris

Max
Max says Woof!
```

### Instance vs Class Attributes

```python
class Employee:
    # Class attribute
    company = "TechCorp"
    employee_count = 0
    
    def __init__(self, name, salary):
        # Instance attributes
        self.name = name
        self.salary = salary
        Employee.employee_count += 1
    
    # Instance method
    def display_info(self):
        return f"{self.name} works at {self.company}"
    
    # Class method
    @classmethod
    def get_employee_count(cls):
        return f"Total employees: {cls.employee_count}"
    
    # Static method (doesn't access instance or class)
    @staticmethod
    def is_workday(day):
        return day not in ["Saturday", "Sunday"]

# Create instances
emp1 = Employee("Alice", 75000)
emp2 = Employee("Bob", 85000)

print(emp1.display_info())
print(Employee.get_employee_count())
print(Employee.is_workday("Monday"))
print(Employee.is_workday("Sunday"))
```

**Output:**
```
Alice works at TechCorp
Total employees: 2
True
False
```

## 2. Encapsulation - Data Hiding

Encapsulation restricts direct access to some components and protects object integrity.

### Private and Protected Attributes

```python
class BankAccount:
    def __init__(self, account_holder, balance):
        self.account_holder = account_holder  # Public
        self._account_number = "ACC123456"    # Protected (convention)
        self.__balance = balance              # Private (name mangling)
    
    # Getter method
    def get_balance(self):
        return self.__balance
    
    # Setter method with validation
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return f"Deposited ${amount}. New balance: ${self.__balance}"
        return "Invalid deposit amount"
    
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return f"Withdrawn ${amount}. New balance: ${self.__balance}"
        return "Invalid withdrawal amount"

# Create account
account = BankAccount("John Doe", 1000)

print(account.account_holder)       # Public access
print(account._account_number)      # Protected (but accessible)
# print(account.__balance)          # Error! Private attribute

print(account.get_balance())        # Use getter
print(account.deposit(500))
print(account.withdraw(300))
```

**Output:**
```
John Doe
ACC123456
1000
Deposited $500. New balance: $1500
Withdrawn $300. New balance: $1200
```

### Property Decorators

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    # Getter
    @property
    def celsius(self):
        return self._celsius
    
    # Setter with validation
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    # Computed property
    @property
    def fahrenheit(self):
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

# Usage
temp = Temperature(25)
print(f"Celsius: {temp.celsius}")
print(f"Fahrenheit: {temp.fahrenheit}")

temp.celsius = 30
print(f"Updated Celsius: {temp.celsius}")
print(f"Updated Fahrenheit: {temp.fahrenheit}")

temp.fahrenheit = 32
print(f"Celsius from Fahrenheit: {temp.celsius}")
```

**Output:**
```
Celsius: 25
Fahrenheit: 77.0
Updated Celsius: 30
Updated Fahrenheit: 86.0
Celsius from Fahrenheit: 0.0
```

## 3. Inheritance - Code Reusability

Inheritance allows a class to inherit attributes and methods from another class.

### Single Inheritance

```python
# Parent class (Base class)
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
    
    def make_sound(self):
        return "Some generic sound"
    
    def info(self):
        return f"{self.name} is a {self.species}"

# Child class (Derived class)
class Dog(Animal):
    def __init__(self, name, breed):
        # Call parent constructor
        super().__init__(name, "Dog")
        self.breed = breed
    
    # Override parent method
    def make_sound(self):
        return "Woof! Woof!"
    
    # Add new method
    def fetch(self):
        return f"{self.name} is fetching the ball!"

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name, "Cat")
        self.color = color
    
    def make_sound(self):
        return "Meow!"
    
    def scratch(self):
        return f"{self.name} is scratching the furniture!"

# Create instances
dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers", "Gray")

print(dog.info())
print(dog.make_sound())
print(dog.fetch())
print(f"Breed: {dog.breed}")

print("\n" + cat.info())
print(cat.make_sound())
print(cat.scratch())
```

**Output:**
```
Buddy is a Dog
Woof! Woof!
Buddy is fetching the ball!
Breed: Golden Retriever

Whiskers is a Cat
Meow!
Whiskers is scratching the furniture!
```

### Multi-level Inheritance

```python
class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def start(self):
        return f"{self.brand} {self.model} is starting"

class Car(Vehicle):
    def __init__(self, brand, model, doors):
        super().__init__(brand, model)
        self.doors = doors
    
    def drive(self):
        return f"Driving the {self.brand} {self.model}"

class ElectricCar(Car):
    def __init__(self, brand, model, doors, battery_capacity):
        super().__init__(brand, model, doors)
        self.battery_capacity = battery_capacity
    
    def charge(self):
        return f"Charging {self.battery_capacity}kWh battery"

# Create instance
tesla = ElectricCar("Tesla", "Model 3", 4, 75)
print(tesla.start())
print(tesla.drive())
print(tesla.charge())
print(f"Doors: {tesla.doors}")
```

**Output:**
```
Tesla Model 3 is starting
Driving the Tesla Model 3
Charging 75kWh battery
Doors: 4
```

### Multiple Inheritance

```python
class Flyer:
    def fly(self):
        return "Flying in the sky"

class Swimmer:
    def swim(self):
        return "Swimming in water"

class Duck(Flyer, Swimmer):
    def __init__(self, name):
        self.name = name
    
    def quack(self):
        return f"{self.name} says Quack!"

# Duck can both fly and swim
duck = Duck("Donald")
print(duck.quack())
print(duck.fly())
print(duck.swim())

# Check Method Resolution Order (MRO)
print(f"\nMRO: {Duck.__mro__}")
```

**Output:**
```
Donald says Quack!
Flying in the sky
Swimming in water

MRO: (<class '__main__.Duck'>, <class '__main__.Flyer'>, <class '__main__.Swimmer'>, <class 'object'>)
```

## 4. Polymorphism - Many Forms

Polymorphism allows objects of different classes to be treated as objects of a common parent class.

### Method Overriding

```python
class Shape:
    def __init__(self, name):
        self.name = name
    
    def area(self):
        return "Area calculation not implemented"
    
    def perimeter(self):
        return "Perimeter calculation not implemented"

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        super().__init__("Circle")
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius

class Triangle(Shape):
    def __init__(self, side1, side2, side3):
        super().__init__("Triangle")
        self.side1 = side1
        self.side2 = side2
        self.side3 = side3
    
    def area(self):
        # Heron's formula
        s = (self.side1 + self.side2 + self.side3) / 2
        return (s * (s - self.side1) * (s - self.side2) * (s - self.side3)) ** 0.5
    
    def perimeter(self):
        return self.side1 + self.side2 + self.side3

# Polymorphism in action
shapes = [
    Rectangle(5, 10),
    Circle(7),
    Triangle(3, 4, 5)
]

for shape in shapes:
    print(f"{shape.name}:")
    print(f"  Area: {shape.area():.2f}")
    print(f"  Perimeter: {shape.perimeter():.2f}")
    print()
```

**Output:**
```
Rectangle:
  Area: 50.00
  Perimeter: 30.00

Circle:
  Area: 153.94
  Perimeter: 43.98

Triangle:
  Area: 6.00
  Perimeter: 12.00
```

### Duck Typing

```python
# Duck typing: "If it walks like a duck and quacks like a duck, it's a duck"

class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Duck:
    def speak(self):
        return "Quack!"

class Cow:
    def speak(self):
        return "Moo!"

# Function accepts any object with speak() method
def animal_sound(animal):
    return animal.speak()

# All work because they have speak() method
animals = [Dog(), Cat(), Duck(), Cow()]

for animal in animals:
    print(f"{animal.__class__.__name__}: {animal_sound(animal)}")
```

**Output:**
```
Dog: Woof!
Cat: Meow!
Duck: Quack!
Cow: Moo!
```

## 5. Abstraction - Hiding Complexity

Abstraction hides complex implementation details and shows only essential features.

### Abstract Base Classes

```python
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount):
        """Must be implemented by subclasses"""
        pass
    
    @abstractmethod
    def refund(self, transaction_id):
        """Must be implemented by subclasses"""
        pass
    
    # Concrete method (shared by all subclasses)
    def validate_amount(self, amount):
        return amount > 0

class CreditCardProcessor(PaymentProcessor):
    def process_payment(self, amount):
        if self.validate_amount(amount):
            return f"Processing ${amount} via Credit Card"
        return "Invalid amount"
    
    def refund(self, transaction_id):
        return f"Refunding transaction {transaction_id} to Credit Card"

class PayPalProcessor(PaymentProcessor):
    def process_payment(self, amount):
        if self.validate_amount(amount):
            return f"Processing ${amount} via PayPal"
        return "Invalid amount"
    
    def refund(self, transaction_id):
        return f"Refunding transaction {transaction_id} to PayPal"

class BitcoinProcessor(PaymentProcessor):
    def process_payment(self, amount):
        if self.validate_amount(amount):
            return f"Processing ${amount} via Bitcoin"
        return "Invalid amount"
    
    def refund(self, transaction_id):
        return f"Refunding transaction {transaction_id} to Bitcoin wallet"

# Cannot instantiate abstract class
# processor = PaymentProcessor()  # Error!

# Use concrete implementations
processors = [
    CreditCardProcessor(),
    PayPalProcessor(),
    BitcoinProcessor()
]

for processor in processors:
    print(processor.process_payment(100))
    print(processor.refund("TXN123"))
    print()
```

**Output:**
```
Processing $100 via Credit Card
Refunding transaction TXN123 to Credit Card

Processing $100 via PayPal
Refunding transaction TXN123 to PayPal

Processing $100 via Bitcoin
Refunding transaction TXN123 to Bitcoin wallet
```

## 6. Special Methods (Magic/Dunder Methods)

Special methods allow customization of built-in Python behaviors.

### Common Magic Methods

```python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    
    # String representation for users
    def __str__(self):
        return f"'{self.title}' by {self.author}"
    
    # String representation for developers
    def __repr__(self):
        return f"Book('{self.title}', '{self.author}', {self.pages})"
    
    # Length
    def __len__(self):
        return self.pages
    
    # Comparison operators
    def __eq__(self, other):
        return self.pages == other.pages
    
    def __lt__(self, other):
        return self.pages < other.pages
    
    def __gt__(self, other):
        return self.pages > other.pages
    
    # Addition (combining books)
    def __add__(self, other):
        return self.pages + other.pages

# Create books
book1 = Book("Python Basics", "John Smith", 250)
book2 = Book("Advanced Python", "Jane Doe", 450)
book3 = Book("Python Tips", "Bob Wilson", 250)

print(str(book1))           # Uses __str__
print(repr(book1))          # Uses __repr__
print(f"Pages: {len(book1)}")  # Uses __len__

print(f"\nbook1 == book3: {book1 == book3}")  # Uses __eq__
print(f"book1 < book2: {book1 < book2}")      # Uses __lt__
print(f"book2 > book1: {book2 > book1}")      # Uses __gt__

print(f"\nTotal pages: {book1 + book2}")      # Uses __add__
```

**Output:**
```
'Python Basics' by John Smith
Book('Python Basics', 'John Smith', 250)
Pages: 250

book1 == book3: True
book1 < book2: True
book2 > book1: True

Total pages: 700
```

### Container Magic Methods

```python
class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []
    
    # Add song using []
    def __setitem__(self, index, song):
        self.songs.insert(index, song)
    
    # Get song using []
    def __getitem__(self, index):
        return self.songs[index]
    
    # Delete song using del
    def __delitem__(self, index):
        del self.songs[index]
    
    # Length
    def __len__(self):
        return len(self.songs)
    
    # Check if song exists
    def __contains__(self, song):
        return song in self.songs
    
    # Iteration
    def __iter__(self):
        return iter(self.songs)

# Create playlist
playlist = Playlist("My Favorites")
playlist[0] = "Song A"
playlist[1] = "Song B"
playlist[2] = "Song C"

print(f"Playlist: {playlist.name}")
print(f"Length: {len(playlist)}")
print(f"First song: {playlist[0]}")
print(f"Is 'Song B' in playlist? {'Song B' in playlist}")

print("\nAll songs:")
for song in playlist:
    print(f"  - {song}")

del playlist[1]
print(f"\nAfter deleting index 1: {list(playlist)}")
```

**Output:**
```
Playlist: My Favorites
Length: 3
First song: Song A
Is 'Song B' in playlist? True

All songs:
  - Song A
  - Song B
  - Song C

After deleting index 1: ['Song A', 'Song C']
```

## 7. Real-World Examples

### Example 1: Library Management System

```python
class LibraryItem:
    def __init__(self, title, item_id):
        self.title = title
        self.item_id = item_id
        self.is_checked_out = False
    
    def check_out(self):
        if not self.is_checked_out:
            self.is_checked_out = True
            return f"'{self.title}' checked out successfully"
        return f"'{self.title}' is already checked out"
    
    def return_item(self):
        if self.is_checked_out:
            self.is_checked_out = False
            return f"'{self.title}' returned successfully"
        return f"'{self.title}' was not checked out"

class Book(LibraryItem):
    def __init__(self, title, item_id, author, isbn):
        super().__init__(title, item_id)
        self.author = author
        self.isbn = isbn
    
    def __str__(self):
        status = "Checked Out" if self.is_checked_out else "Available"
        return f"Book: '{self.title}' by {self.author} - {status}"

class DVD(LibraryItem):
    def __init__(self, title, item_id, director, duration):
        super().__init__(title, item_id)
        self.director = director
        self.duration = duration
    
    def __str__(self):
        status = "Checked Out" if self.is_checked_out else "Available"
        return f"DVD: '{self.title}' directed by {self.director} - {status}"

class Library:
    def __init__(self, name):
        self.name = name
        self.items = []
    
    def add_item(self, item):
        self.items.append(item)
        return f"Added '{item.title}' to {self.name}"
    
    def display_items(self):
        print(f"\n{self.name} Collection:")
        for item in self.items:
            print(f"  {item}")

# Create library
library = Library("City Library")

# Add items
book1 = Book("Python Crash Course", "B001", "Eric Matthes", "978-1593279288")
book2 = Book("Clean Code", "B002", "Robert Martin", "978-0132350884")
dvd1 = DVD("Inception", "D001", "Christopher Nolan", 148)

print(library.add_item(book1))
print(library.add_item(book2))
print(library.add_item(dvd1))

library.display_items()

# Check out and return
print(f"\n{book1.check_out()}")
print(book1.check_out())  # Try again

library.display_items()

print(f"\n{book1.return_item()}")
library.display_items()
```

**Output:**
```
Added 'Python Crash Course' to City Library
Added 'Clean Code' to City Library
Added 'Inception' to City Library

City Library Collection:
  Book: 'Python Crash Course' by Eric Matthes - Available
  Book: 'Clean Code' by Robert Martin - Available
  DVD: 'Inception' directed by Christopher Nolan - Available

'Python Crash Course' checked out successfully
'Python Crash Course' is already checked out

City Library Collection:
  Book: 'Python Crash Course' by Eric Matthes - Checked Out
  Book: 'Clean Code' by Robert Martin - Available
  DVD: 'Inception' directed by Christopher Nolan - Available

'Python Crash Course' returned successfully

City Library Collection:
  Book: 'Python Crash Course' by Eric Matthes - Available
  Book: 'Clean Code' by Robert Martin - Available
  DVD: 'Inception' directed by Christopher Nolan - Available
```

### Example 2: E-commerce Shopping Cart

```python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
    
    def __str__(self):
        return f"{self.name} - ${self.price:.2f} ({self.stock} in stock)"

class ShoppingCart:
    def __init__(self):
        self.items = {}  # {product: quantity}
    
    def add_product(self, product, quantity=1):
        if quantity > product.stock:
            return f"Only {product.stock} {product.name}(s) available"
        
        if product in self.items:
            self.items[product] += quantity
        else:
            self.items[product] = quantity
        
        product.stock -= quantity
        return f"Added {quantity} {product.name}(s) to cart"
    
    def remove_product(self, product, quantity=1):
        if product not in self.items:
            return f"{product.name} not in cart"
        
        if quantity >= self.items[product]:
            removed_qty = self.items[product]
            del self.items[product]
        else:
            removed_qty = quantity
            self.items[product] -= quantity
        
        product.stock += removed_qty
        return f"Removed {removed_qty} {product.name}(s) from cart"
    
    def get_total(self):
        return sum(product.price * qty for product, qty in self.items.items())
    
    def display_cart(self):
        if not self.items:
            print("Cart is empty")
            return
        
        print("\nShopping Cart:")
        for product, qty in self.items.items():
            subtotal = product.price * qty
            print(f"  {product.name} x{qty} - ${subtotal:.2f}")
        print(f"Total: ${self.get_total():.2f}")

# Create products
laptop = Product("Laptop", 999.99, 5)
mouse = Product("Mouse", 29.99, 20)
keyboard = Product("Keyboard", 79.99, 15)

# Create cart and add products
cart = ShoppingCart()
print(cart.add_product(laptop, 2))
print(cart.add_product(mouse, 1))
print(cart.add_product(keyboard, 1))

cart.display_cart()

print(f"\n{cart.remove_product(laptop, 1)}")
cart.display_cart()

print(f"\nLaptop stock remaining: {laptop.stock}")
```

**Output:**
```
Added 2 Laptop(s) to cart
Added 1 Mouse(s) to cart
Added 1 Keyboard(s) to cart

Shopping Cart:
  Laptop x2 - $1999.98
  Mouse x1 - $29.99
  Keyboard x1 - $79.99
Total: $2109.96

Removed 1 Laptop(s) from cart

Shopping Cart:
  Laptop x1 - $999.99
  Mouse x1 - $29.99
  Keyboard x1 - $79.99
Total: $1109.97

Laptop stock remaining: 4
```

## 8. Best Practices

### Design Principles

1. **Single Responsibility Principle**: A class should have one reason to change
2. **Open/Closed Principle**: Open for extension, closed for modification
3. **Liskov Substitution Principle**: Derived classes must be substitutable for base classes
4. **Interface Segregation**: Many specific interfaces better than one general
5. **Dependency Inversion**: Depend on abstractions, not concrete implementations

### Coding Best Practices

```python
# Good: Descriptive class names (PascalCase)
class UserAccount:
    pass

# Good: Use properties for controlled access
class Person:
    def __init__(self, name):
        self._name = name
    
    @property
    def name(self):
        return self._name

# Good: Composition over inheritance when appropriate
class Engine:
    def start(self):
        return "Engine starting"

class Car:
    def __init__(self):
        self.engine = Engine()  # Has-a relationship
    
    def start(self):
        return self.engine.start()

# Good: Use abstract base classes for contracts
from abc import ABC, abstractmethod

class DatabaseInterface(ABC):
    @abstractmethod
    def connect(self):
        pass
    
    @abstractmethod
    def disconnect(self):
        pass
```

## Key Takeaways

| Concept | Purpose | Example |
|---------|---------|---------|
| **Encapsulation** | Bundle data and methods, hide internals | Private attributes with getters/setters |
| **Inheritance** | Reuse code, create hierarchies | Dog inherits from Animal |
| **Polymorphism** | Same interface, different implementations | shape.area() works for any shape |
| **Abstraction** | Hide complexity, show essentials | Abstract base classes defining contracts |

## Common Patterns

- **Use `super()`** to call parent class methods
- **Use `@property`** for computed attributes
- **Use `@classmethod`** for alternative constructors
- **Use `@staticmethod`** for utility functions
- **Use `ABC`** for defining interfaces
- **Prefer composition** over deep inheritance hierarchies
- **Keep classes focused** on single responsibility

## What's Next?

You've mastered Object-Oriented Programming in Python! In the next tutorial, we'll explore **File Handling Operations**, where you'll learn to read, write, and manipulate files with various formats including text, CSV, and JSON files.

