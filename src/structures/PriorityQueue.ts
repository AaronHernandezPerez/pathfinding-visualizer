export default class PriorityQueue<T> {
  private readonly elements: T[];
  private readonly priorityFn: (a: T, b: T) => number;

  constructor(priorityFn: (a: T, b: T) => number, elements: T[] = []) {
    this.elements = [...elements];
    this.priorityFn = priorityFn;
  }

  private sortElementsByPriority() {
    this.elements.sort(this.priorityFn);
  }

  enqueue(element: T) {
    this.elements.push(element);
  }

  dequeue() {
    this.sortElementsByPriority();
    return this.elements.shift();
  }

  peek() {
    this.sortElementsByPriority();
    return this.elements[0];
  }

  get length() {
    return this.elements.length;
  }

  get isEmpty() {
    return this.length === 0;
  }
}
