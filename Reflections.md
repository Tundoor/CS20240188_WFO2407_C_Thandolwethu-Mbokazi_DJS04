# Thoughts and reflections over DJS04

## The rationale behind the refactoring decisions made

When creating the web components I decided on using the function which shows book preview and creates the option section for the settings. I chose these because they are used more than once in the code and the user input we get from them will not cause any harm. 

## How the web components work

### Book Preview Component

The web component for the renderbook list uses the css that was already defined. It then creates a div that has information on the book and also a picture of the book. This is created on a shadow dom. It parses an object with the keys, image, author and genre so those can be added to our preview. 

Some challenges I face was understanding how to get the component to link to the css, I overcomed that by doing research. 

To use the component, I've placed it into a function where you can assign the parameters which allows you to get the information you want. 


