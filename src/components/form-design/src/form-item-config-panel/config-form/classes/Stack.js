/**
 * 栈
 */
export default class Stack {
  constructor() {
    this.data = []
  }
  push(element) {
    this.data.push(element)
  }
  pop() {
    return this.data.pop()
  }
  isEmpty() {
    return this.data.length === 0
  }
  clear() {
    while (!this.isEmpty()) {
      this.pop()
    }
  }
}
