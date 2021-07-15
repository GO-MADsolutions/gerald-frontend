const testModules = require('./test-module');
require('../css/app.css');
require('../scss/style.scss');

/********** Paste your code here! ************/

console.log('Paste your code here!');
console.log(testModules.hello);


window.todoList = [];

window.SelectedFilter = "ALL";

function addItem(e) {
    if (e.keyCode === 13) {
        const todoObject = {
            completed: false,
            item: e.target.value
        }
        window.todoList.push(todoObject);
        e.target.value = '';
        renderList();
    }
}

function renderList() {
    const listContainer = document.getElementById('todos');
    listContainer.innerHTML = ""
    const filteredTodoList = window.todoList.filter((listItem) => {
      if(window.SelectedFilter === 'ACTIVE') {
        return listItem.completed === false
      }
      else if(window.SelectedFilter === 'COMPLETED'){
        return listItem.completed !== false
      }
      return listItem;
    })
    filteredTodoList.forEach((listItem, index) => {
        const listElement = document.createElement('li');
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('list');
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.setAttribute('data-index', index);
        checkbox.checked = listItem.completed;
        checkbox.onclick = markAsCompleted
        const todo = document.createElement(listItem.completed ? 'strike' : 'p');
        todo.innerText = listItem.item;
        contentContainer.appendChild(checkbox);
        contentContainer.appendChild(todo);
        todoContainer.appendChild(contentContainer);
        const action = document.createElement('i');
        action.innerText = "X"
        action.setAttribute('data-index', index);
        action.onclick = removeFromTodo;
        todoContainer.appendChild(action);
        listElement.appendChild(todoContainer);
        listContainer.appendChild(listElement);

        const status = document.getElementsByClassName('status')[0];
        status.innerHTML = ""
        const countElement = document.createElement('div');
        countElement.innerText = `${window.todoList.length} items left`
        status.appendChild(countElement);
        countElement.classList.add('items-count')
        if (window.todoList.length > 0) {
            const filterContainer = document.createElement('div');
            const allFilter = document.createElement('span');
            allFilter.innerText="ALL"
            allFilter.setAttribute('data-action', 'ALL');
            allFilter.classList.add('action')
            allFilter.classList.add(window.SelectedFilter === 'ALL' ? 'active-filter': 'dummy')
            allFilter.onclick = filter
            const activeFilter = document.createElement('span');
            activeFilter.setAttribute('data-action', 'ACTIVE');
            activeFilter.innerText="ACTIVE"
            activeFilter.classList.add('action');
            activeFilter.classList.add(window.SelectedFilter === 'ACTIVE' ? 'active-filter': 'dummy')
            activeFilter.onclick = filter
            const completedFilter = document.createElement('span');
            completedFilter.setAttribute('data-action', 'COMPLETED');
            completedFilter.innerText="COMPLETED"
            completedFilter.classList.add(window.SelectedFilter === 'COMPLETED' ? 'active-filter': 'dummy')
            completedFilter.classList.add('action')
            completedFilter.onclick = filter
            filterContainer.appendChild(allFilter);
            filterContainer.appendChild(activeFilter);
            filterContainer.appendChild(completedFilter);
            status.appendChild(filterContainer);
        }
    });


}

function removeFromTodo(event) {
    window.todoList.splice(event.target.dataset.index, 1);
    renderList();
}

function markAsCompleted(event) {
    window.todoList.forEach((item, index) => {
        if (index === +event.target.dataset.index) {
            item.completed = event.target.checked;
        }
    });
    renderList();
}

function filter(event) {
  console.log(event.target.dataset.action);
  window.SelectedFilter = event.target.dataset.action;
  renderList();
}