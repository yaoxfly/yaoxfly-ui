/**
 * 队列
 */
export default class {
  constructor() {
    this.data = []
    this.enQueue = (element) => {
      this.data.push(element)
    }
    this.deQueue = () => {
      this.data.shift()
    }
    this.isEmpty = () => {
      return this.data.length === 0
    }
  }
}
