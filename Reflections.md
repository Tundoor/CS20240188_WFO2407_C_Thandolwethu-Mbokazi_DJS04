# Thoughts and reflections over DJS03

### The rationale behind the refactoring decisions made

I decide to refactor the layout of the code by abstracting certain things and also adding documentaion to the code. 

-- I decide to create an object of all the querySelectors in the code to make it easier to get them by just accessing them in the object. This helped make the code more readable and also more maintainable as you don't have to go through the html to get the required element. 

-- I gave each query a varieble name explaining exactly what that element is for in the HTML. I did this just to make my code more understandable. 

-- I used abstraction which made my code cleaner and simpler to understand. It also made the code seem less overwhelming at first glance. 

### How abstraction has made the code more maintainable and extendable.

Abstraction made the code more expendable by making it easier to be able to change something in one place and having that changed be automatically applied everywhere else rather than you having to go to each part of that code and changing it. Abstraction made the code more maintable because if there is a bug in a section of code that utilises the abstracted code you can go and check for the bug in that one function and resolve it rather than searching everywere for it. 

### Challenges faced during the refactoring process and how they were overcome.

A challenge which I faced was knowing when to apply refactoring and when not to. To overcome this challenge I tried to step back and think about my code as if I were a different person. And if it was too confusing, I figured I over refactored. 

### Reflections on how this exercise has deepened your understanding of JavaScript programming concepts.

This exercise helped me realise that I was not really thinking about what I was doing when coding. It truly helped to really deepen my understanding on how to use functions and objects effectively. 
