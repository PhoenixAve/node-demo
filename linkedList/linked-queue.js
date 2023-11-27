/**
 * 单向链表
 * 01 node + head + null
 * 02 head ---> null
 * 03 size
 * 04 node.next  node.element
 * 05 增加 删除 修改 查询 清空
 */

class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  constructor(head, size) {
    this.head = null;
    this.size = 0;
  }
  _getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("cross the border");
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  add(index, element) {
    if (arguments.length === 1) {
      element = index;
      index = this.size;
    }
    if (index < 0 || index > this.size) {
      throw new Error("cross the border");
    }
    if (index === 0) {
      this.head = new Node(element, this.head);
    } else {
      let prevNode = this._getNode(index - 1);
      prevNode.next = new Node(element, prevNode.next);
    }
    this.size++;
  }
  remove(index) {
    let rmNode = undefined;
    if (index === 0) {
      rmNode = this.head;
      if (!rmNode) return undefined;
      this.head = rmNode.next;
    } else {
      const prevNode = this._getNode(index - 1);
      rmNode = prevNode.next;
      prevNode.next = rmNode.next;
    }
    this.size--;
    return rmNode;
  }
  set(index, element) {
    let node = this._getNode(index);
    node.element = element;
  }
  get(index) {
    return this._getNode(index);
  }
  clear() {
    this.head = null;
    this.size = 0;
  }
}

class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }
  enQueue(data) {
    this.linkedList.add(data);
  }
  deQueue() {
    return this.linkedList.remove(0);
  }
}
const q = new Queue();

q.enQueue("node1");
q.enQueue("node2");

let a = q.deQueue();
a = q.deQueue();
a = q.deQueue();

console.log(q);
console.log(a);
