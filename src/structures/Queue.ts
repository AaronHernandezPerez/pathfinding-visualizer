/**
 * Tried different implementations of the Queue, the results were
 * In chrome:
 * 1. Array implementation: 1564 ops/s
 * 2. Object implementation: 1174 ops/s
 * 3. Map implementation: 1150 ops/s
 * In firefox:
 * 1. Array implementation: 2126 ops/s
 * 2. Object implementation: 1674 ops/s
 * 3. Map implementation: 709 ops/s
 */
export default class Queue<T> {
  private readonly elements: T[];

  constructor(elements: T[] = []) {
    this.elements = [...elements];
  }

  enqueue(element: T) {
    this.elements.push(element);
  }

  dequeue() {
    return this.elements.shift();
  }

  peek() {
    return this.elements[0];
  }

  get length() {
    return this.elements.length;
  }

  get isEmpty() {
    return this.length === 0;
  }
}
