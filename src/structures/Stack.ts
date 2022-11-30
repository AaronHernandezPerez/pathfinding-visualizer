/**
 * Tried different implementations of the Stack, the results were
 * In chrome:
 * 1. Array implementation: 13558 ops/s, yes 13k, not a typo
 * 2. Object implementation: 1196 ops/s
 * In firefox:
 * 1. Array implementation: 2760 ops/s
 * 2. Object implementation: 1644 ops/s
 */
export default class Stack<T> {
  private readonly elements: T[];

  constructor(elements: T[] = []) {
    this.elements = [...elements];
  }

  push(element: T) {
    this.elements.push(element);
  }

  pop() {
    return this.elements.pop();
  }

  peek() {
    return this.elements[this.length - 1];
  }

  get length() {
    return this.elements.length;
  }

  get isEmpty() {
    return this.length === 0;
  }
}
