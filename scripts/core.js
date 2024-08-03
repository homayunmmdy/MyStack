export class Stack {
  constructor() {
    this.items = [];
  }

  // Push element to the stack
  push(element) {
    if (this.items.length >= 7) {
      alert("The Stack is full you can't add new item");
    } else {
      this.items.push(element);
    }
  }

  // Pop element from the stack
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }

    return this.items.pop();
  }

  // View the top element of the stack
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get the size of the stack
  size() {
    return this.items.length;
  }

  // Get all elements of the stack
  getElements() {
    return this.items;
  }

  // Remove Everything form  the stack
  clear() {
    this.items = [];
  }

  //Reverse the Stack Order
  reverse() {
    this.items.reverse();
  }

  //Sort the Stack Order
  sort(compareFunction = (a, b) => a - b) {
    this.items.sort(compareFunction);
  }
}
