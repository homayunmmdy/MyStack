import { it, expect, describe, beforeEach } from "vitest";
import { Stack } from "../scripts/core";

describe("Stack", () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  });
  it("push should add item to Stack", () => {
    stack.push(1);

    expect(stack.size()).toBe(1);
  });
  it("poped should remove and return the top item from the stack", () => {
    stack.push(1);
    stack.push(2);

    const popedItem = stack.pop();

    expect(popedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });
  it("pop should throw an error if stack is empty", () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });

  it("peek should retrn the top item from the stack whitout removing it", () => {
    stack.push(1);
    stack.push(2);

    const peekedItem = stack.peek();

    expect(peekedItem).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it("peek should throw an error if stack is empty", () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });

  it("isEmpty should return true if stack is empty", () => {
    expect(stack.isEmpty()).toBeTruthy();
  });

  it("isEmpty should return false if stack is not empty", () => {
    stack.push(1);
    expect(stack.isEmpty()).toBeFalsy();
  });

  it("size should return the number of items in the stack", () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size()).toBe(2);
  });

  it("clear should remove all items from the stack", () => {
    stack.push(1);
    stack.push(2);

    stack.clear();
    expect(stack.size()).toBe(0);
  });

//     stack.push(3);
//     stack.push(2);
//     stack.push(1);

//     // stack.reverse();
//     const peekedItem = stack.peek();
//     expect(peekedItem).toBe(1);
//     expect(peekedItem - 1).toBe(2);
//     expect(peekedItem - 2).toBe(3);
//   });
});
