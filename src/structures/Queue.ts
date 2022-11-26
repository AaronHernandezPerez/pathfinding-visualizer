export default class Queue<T> {
  private elements: { [key: string]: T };
  private head: number;
  private tail: number;

  constructor(elements?: T[]) {
    this.elements = {};
    this.head = 0;
    this.tail = 0;

    if (elements?.length) {
      const flatElements = elements.flat(Infinity) as T[];
      flatElements.forEach((e) => {
        this.enqueue(e);
      });
    }
  }

  enqueue(element: T) {
    this.elements[this.tail] = element;
    this.tail++;
  }

  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }

  peek() {
    return this.elements[this.head];
  }

  get length() {
    return this.tail - this.head;
  }

  get isEmpty() {
    return this.length === 0;
  }
}
