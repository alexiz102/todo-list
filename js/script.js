import TodoItem from "./todoItem.js"
import TodoList from "./todoList.js"

let todo_list = new TodoList()

const submit = document.getElementById("submit")
const todoList = document.getElementById("todo-list")
const subjectInput = document.getElementById("todo-title")
const noteInput = document.getElementById("todo-description")
const categories = document.getElementById("category")
const themes = categories.getElementsByClassName("category")

function readyState() {
    if(document.readyState === 'complete') {
        checkTask()
        refreshpage()
    }
}

function createItem(sbjt, nts, id, category, done) {
    const listItem = document.createElement("li")
    listItem.className = "todo-item-container"
    const itemTab = document.createElement("div")
    const itemInfo = document.createElement("div")
    const buttonGroup = document.createElement("div")
    buttonGroup.className = "button-group"
    itemInfo.className = "item-info"
    const subject = document.createElement("h3")
    subject.className = "todo-item"
    subject.textContent = sbjt
    const note = document.createElement("p")
    note.className = "todo-notes"
    note.textContent = nts
    const check = document.createElement("input")
    check.type = "checkbox"
    check.className = "check"
    check.name = "check"
    check.id = `check-${id}`
    check.checked = done
    itemTab.className = `item-tabs ${category}`
    itemTab.id = id
    if (check.checked) {
        itemInfo.style.textDecoration = 'line-through';

    } else {
        itemInfo.style.textDecoration = 'none';
    }
    const deleteButton = document.createElement("button")
    deleteButton.className = "delete"
    deleteButton.textContent = "Delete"
    itemInfo.appendChild(subject)
    itemInfo.appendChild(note)
    buttonGroup.appendChild(check)
    buttonGroup.appendChild(deleteButton)
    itemTab.appendChild(itemInfo)
    itemTab.appendChild(buttonGroup)
    listItem.appendChild(itemTab)
    todoList.appendChild(listItem)
}

function renderList() {
    const itemList = todo_list.list
    for(let index = 0; index < itemList.length; index++) {
        const item = itemList[index]
        const subject = item.subject
        const notes = item.notes
        const id = index
        const category = item.category
        const done = item.done
        todo_list.list[index].id = index
        createItem(subject, notes, id, category, done)
        console.log(item)
    }
    console.log('rendering finished')
}

function clearInputs() {
    subjectInput.value = ''
    noteInput.value = ''
    subjectInput.focus()
}

function getInfo() {
    const todoItem = new TodoItem()
    const id = todoList.children.length
    todoItem.setSubject(subjectInput.value)
    todoItem.setNotes(noteInput.value)
    todoItem.setId(id)
    todoItem.setDone(false)
    for (let i = 0; i < themes.length; i++) {
        const cat = themes[i];
        if (cat.type === 'radio' && cat.checked) {
          todoItem.setCategory(cat.value)
          break;
        }
    }
    todo_list.addItem(todoItem)
    storeData()
}

const storeData = () => {
    const data = JSON.stringify(todo_list.getList())
    localStorage.setItem('TodoList', data)
    console.log('data stored')
}

const getData = () => {
    const rawData = localStorage.getItem('TodoList')
    const data = JSON.parse(rawData)
    todo_list.setList(data)
    console.log(data)
}

function clearList() {
    todoList.innerHTML = ''
}

function refreshpage() {
    clearList()
    getData()
    renderList()
    checkTask()
    deleteItem()
    clearInputs()
}

function updateList() {
    const itemList = todo_list.list
    for (let index = 0; index < itemList.length; index++) {
        const check = document.getElementById(`check-${index}`)
        if(check.checked) {
            todo_list.list[index].done = true
            console.log(todo_list.list[index])
        } else {
            todo_list.list[index].done = false
        }
    }
    storeData()
}


function checkTask() {
    const checkboxes = document.querySelectorAll('.check');

    checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', event => {
        const buttonGroup = event.target.parentNode;
        const itemInfo = buttonGroup.previousElementSibling;
        if (event.target.checked) {
            itemInfo.style.textDecoration = 'line-through';

        } else {
            itemInfo.style.textDecoration = 'none';
        }
        updateList()
        });
    });
}

function deleteItem() {
    const deleteBtns = document.querySelectorAll('.delete')
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            const tab = event.target.parentNode.parentNode;
            todo_list.removeItem(tab.id)
            console.log(todo_list)
            tab.parentNode.remove()
            storeData()
        })
    })
}

submit.addEventListener("click", () =>{
    if(subjectInput.value == '') return;
    getInfo()
    refreshpage()
})

readyState()
checkTask()