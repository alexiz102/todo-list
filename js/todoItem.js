export default class TodoItem {
    constructor() {
        this.subject = null
        this.notes = null
        this.id = null
        this.category = null
        this.done = null
    }

    getSubject() {
        return this.subject
    }

    setSubject(subject) {
        this.subject = subject
    }

    getNotes() {
        return this.notes
    }

    setNotes(notes) {
        this.notes = notes
    }

    getId() {
        return this.id
    }

    setId(id) {
        this.id = id
    }

    getCategory() {
        return this.category
    }

    setCategory(category) {
        this.category = category
    }

    getDone() {
        return this.done
    }

    setDone(done) {
        this.done = done
    }
} 