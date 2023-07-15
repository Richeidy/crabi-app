export class PriorityQueue {
  private queue: { element: string; priority: number; }[];

  constructor() {
      this.queue = [];
  }

  enqueue(element: string, priority: number) {
      const newItem = { element, priority };
      const queue = [...this.queue, newItem].sort((a, b) => a.priority - b.priority);
      this.queue = queue;
  }

  dequeue(){
    if (this.isEmpty()) {
      return null;
    }
    return this.queue.shift();
  };

  isEmpty(): boolean {
    return this.queue.length === 0;
  };
}