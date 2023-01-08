import TodoItem from "./todoItem.js"

export default class TodoList {
    constructor() {
        this.list = []
    }

    getList() {
        return this.list
    }

    setList(list) {
        this.list = list
    }

    addItem(item) {
        this.list.push(item)
    }

    removeItem(id) {
        const list = this.list
        for (let index = 0; index < list.length; index++) {
            const item = list[index];
            if(item.id == id) {
                this.list.splice(index, 1)
            }
            
        }
    }

    clearList() {
        this.list = []
    }

}