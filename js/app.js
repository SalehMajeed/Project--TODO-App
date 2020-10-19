const todo_input = document.querySelector('.todo-input');
const todo_button = document.querySelector('.todo-button');
const todo_list = document.querySelector('.todo-list');
const filter_option = document.querySelector('.filter-todo');

// Event Listners
todo_button.addEventListener('click', add_todo);
todo_list.addEventListener('click', delete_check);
filter_option.addEventListener('click', filter_todo);

function add_todo(event) {
    // Prevent form from submitting
    event.preventDefault();

    //Todo Div
    const todo_div = document.createElement('div');
    todo_div.classList.add('todo');

    //Create li
    const new_todo = document.createElement('li');
    new_todo.innerText = todo_input.value;
    new_todo.classList.add('todo-item');
    todo_div.appendChild(new_todo);

    //Check Mark Button
    const completed_button = document.createElement('button');
    completed_button.innerHTML = '<i class="fas fa-check"></i>';
    completed_button.classList.add('complete-btn');
    todo_div.appendChild(completed_button);

    //Check Trash Button
    const trash_button = document.createElement('button');
    trash_button.innerHTML = '<i class="fas fa-trash"></i>';
    trash_button.classList.add('trash-btn');
    todo_div.appendChild(trash_button);

    //Append To List
    todo_list.appendChild(todo_div);

    //Clear Todo Input Value
    todo_input.value = '';
}

function delete_check(event) {
    const item = event.target;

    //Delete Todo
    if (item.classList[0] == 'trash-btn') {
        const todo = item.parentElement;

        //Animation
        todo.classList.add('fall');
        todo.addEventListener('transitioned', function () {
            todo.remove();
        });
    }

    //Check Mark
    if (item.classList[0] == 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        console.log('innn', todo);
    }
}

function filter_todo(event) {
    const todos = todo_list.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function save_local_todo(todo) {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
