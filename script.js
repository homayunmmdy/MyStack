class Stack {
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
    if (this.items.length === 0) {
      alert("There is no item to pop");
    }

    return this.items.pop();
  }

  // View the top element of the stack
  peek() {
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

// Create a new Stack instance
const stack = new Stack();

// DOM elements
const stackList = document.getElementById("stack-list");
const stackInput = document.getElementById("stack-input");
const pushBtn = document.getElementById("push-btn");
const popBtn = document.getElementById("pop-btn");
const peekBtn = document.getElementById("peek-btn");
const isEmptyBtn = document.getElementById("isEmpty-btn");
const sizeBtn = document.getElementById("size-btn");
const clearBtn = document.getElementById("clear-btn");
const reverseBtn = document.getElementById("reverse-btn");
const sortBtn = document.getElementById("sort-btn");

// Render stack elements
function renderStack() {
  stackList.innerHTML = "";
  const elements = stack.getElements();
  elements.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element;
    stackList.appendChild(li);
  });
}

// Push button event listener
pushBtn.addEventListener("click", () => {
  const value = stackInput.value;
  if (value) {
    stack.push(value);
    stackInput.value = "";
    renderStack();
  }
});

// Pop button event listener
popBtn.addEventListener("click", () => {
  stack.pop();
  renderStack();
});

peekBtn.addEventListener("click", () => {
  const peekedValue = stack.peek();
  alert(peekedValue);
});

// IsEmpty button event listener
isEmptyBtn.addEventListener("click", () => {
  const isEmpty = stack.isEmpty();
  alert(isEmpty);
});

// Size button event listener
sizeBtn.addEventListener("click", () => {
  const size = stack.size();
  alert(size);
});

// Clear button event listener
clearBtn.addEventListener("click", () => {
  stack.clear();
  renderStack();
});

// Reverse button event listener
reverseBtn.addEventListener("click", () => {
  stack.reverse();
  renderStack();
});

// Sort button event listener
sortBtn.addEventListener("click", () => {
  stack.sort();
  renderStack();
});

// Initial render
renderStack();
