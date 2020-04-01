One good question that comes in developer interviews is the explanation of SOLID. If a developer can apply these principles (and not just demonstrate knowledge of them) then they can hopefully craft maintainable software. After all, who wants to inherit software which is difficult to build new features on and to change?

If this entire system is a monolith, it might be prudent to look into strangling functionality and breaking the system up into small services (maybe micro-services, maybe not). Either way, following these principles can help developers build better, more maintainable code modules. 

Note: all code written here is pseudocode, and possibly won't compile.

S: Single Responsibility Principle (SRP)
---

The SRP dictates that a class (or even a body of code) should have a single responsibility, that is, it does one thing, and it does it well. 

I believe Robert C. Martin succinctly expresses this, "A class should have only one reason to change" (Martin, 2002, Agile Software Development, Principles, Patterns, and Practices). In other words, the responsibility is encapsulated and does one thing. But why is this important?  

Let's have a look at an example of a Book, in the context of a library:
```java
class Book {
    public Author author() {}
    public String title() {}
    public ISBN isbn() {}
    public void borrow(Person person){}
}
```

This class has a few methods which deal with the identity of the book, but it also has another function which is obviously unlike the rest, `borrow()`. This function presumably allows an instance of the `Book` to be borrowed.

So, `Book`, by this method, has some sort of exposure to a different service, maybe a `BorrowBookService` in order to verify that the book can be borrowed, then perform the necessary procedures to enact that. 

What if one wanted to change how the book is borrowed? Would a change here make this class incompatible with the rest of the system? How about if part of borrowing including writing to a database?

O: Open / Close Principle
---

Summarised in the quote, 
"software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification" (Bertrand Meyer), this principles describes that the behaviour of something can be extended without changing its underlying source code. That is, we shouldn't have to change change code as requirements evolve. 

Any developer might consider the fact that inheritance in an OOP world resolves this, right? Yes, that's true. If you need to significantly change the behaviour of a class, which is already being used, you can extend the class. 

Let's look at an example of calculating the area of few shapes. 

```java
class Rectangle {
    public int height();
    public int width();
}

class Circle {
    public float radius();
}
```

To calculate the area, we might have an `AreaCalculator`:

```java
class AreaCalculator {
    public int calculate(object shape) {
            if (shape instanceOf Rectangle) {
                return shape.height() * shape.width();
            }
            
            if (shape instanceOf Circle) {
                return circle.radius() * circle.radius() * pi;
            }
    }
}
```

For every shape that we wanted to add, we'd need to add another `if` clause to the calculator. Of course, we could create a new AreaCalculator that can deal with the different shapes, but that doesn't scream out 'maintability' to be (more like 'paintainability', which my editor tried to when writing. 

Assuming that the area of the shape is the requirement to be calculated, one could use inheritance to resolve this:
```java
interface Shape {
    public Double area(); 
}

class Rectangle implements Shape {
    private Int width;
    private Int height;
    
    public Rectangle(Int width, Int height) {
        width = width;
        height = height;
    }
    
    public Double area() {
        return this.width * this.height;
    }
}

class Circle implements Shape {
    private Double radius;
    
    public Circle(Double radius) {
        radius = radius;
    }
    
    public Double area() {
        return this.radius * this.radius * pi
    }
}
```
This removes the requirement of having an `AreaCalculator` and the `Shape` is responsible for knowing how to calculate its area.

Of course, if a `Square` comes along, we can extend `Rectangle` given that they are related; and now, we have brought in polymorphism into our toolkit. 

L: Liskov's Substitution Principle (LSP)
---

Barbara Liskov and Jeanette Wing noted in their 1994 paper that "Subtype Requirement: Let ϕ(x) be a property provable about objects x of type T. Then ϕ(y) should be true for objects 
y of type S where S is a subtype of T." 

Understand that? Most developers likely don't. Translated into plain English it means to us that if S is a subtype of T, then objects of type T may be replaced with objects of type S. 

Let's look at an example:

```java
interface Animal {
    public void eat() {}
}

class Cat implements Animal {
    public void eat() {}
}

class Rabbit implements Animal {
    public void eat() {}	
}
```	
	
I: Interface Segregation Principle (ISP)
---
Clients should only depend on methods that it cares about, and so, interfaces are small and rather specific:

```java
interface CoffeeMachine {
    void addCoffee()
}

class EspressoCoffeeMachine extends CoffeeMachine {
    void brewEspresso()
}

class FilteredCoffeeMachine extends CoffeeMachine  {
    void brewFilteredCoffee()
}
```

D: Dependency Inversion (DI)
---

Nearly everyone mistakes this for dependency-injection. Whilst related, they aren't the same thing.

Dependency inversion relates to the principle that a module or class is decoupled from its dependencies:

```java
class Car {
    constructor(Engine engine)
    drive() => this.engine.motor.crank()
}
```    

That is to say, high level components (i.e `Engine`) is independent of lower level components (`Car`).
