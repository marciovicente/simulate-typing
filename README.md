Simple jquery simulate typing plugin
===============

Simulate Typing to input fields

![Alt text](/../master/img/gif_typing.gif?raw=true "Simulate Typing")


### Usage
You can use just one string:

```javascript
  $('.my-input').simulateTyping({
    string: 'First text',
    interval: 200
  });
```

or a list of strings:

```javascript
  $('.my-input').simulateTyping({
    string: ['First text', 'Another text', 'Maybe this!'],
    interval: 200
  });
```

### Speed
You can choose the speed passing time in miliseconds:
```javascript
  ...
  interval: 400 
  ...
```
![Alt text](/../master/img/gif_typing2.gif?raw=true "Simulate Typing 2")


