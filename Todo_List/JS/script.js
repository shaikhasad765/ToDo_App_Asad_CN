// Get HTML elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const totalTasks = document.getElementById('total-tasks');
const focusTrap = document.getElementById('focus-trap');

// Add event listener to the add button
addButton.addEventListener('click', addTodo);

// Initialize tasks array
let tasks = [];

// Load tasks from local storage
loadTasksFromLocalStorage();

// Function to add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();

    // Check if the input is not empty and not a duplicate task
    if (todoText !== '' && !isDuplicateTask(todoText)) {
        // Create new todo object
        const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
        };

        // Add the todo to the tasks array
        tasks.push(todo);

        // Clear the input field
        todoInput.value = '';

        // Render the updated todo list
        renderTodoList();

        // Save tasks to local storage
        saveTasksToLocalStorage();

        // Apply the wiggle animation to the to-do header
        const toDoHeader = document.querySelector('.to-do-header');
        toDoHeader.classList.add('animate');
        setTimeout(function () {
        toDoHeader.classList.remove('animate');
        }, 3000); // 3 seconds delay
    }
}

// Function to check if a task already exists in the list
function isDuplicateTask(taskText) {
    const isDuplicate = tasks.some((todo) =>
        todo.text.toLowerCase() === taskText.toLowerCase()
    );

    // Display an alert if the task is a duplicate
    if (isDuplicate) {
        alert('Task already exists!');
    }

    return isDuplicate;
}

// Function to save the tasks array to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTodoList();
    }
}

// Function to render the todo list
function renderTodoList() {
    // Clear the todo list
    todoList.innerHTML = '';

    // Render each todo item
    tasks.forEach((todo) => {
        // Create list item
        const li = document.createElement('li');
        li.classList.add('todo-item');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () =>
            toggleTodoCompletion(todo.id)
        );

        // Create task text
        const taskText = document.createElement('span');
        taskText.innerText = todo.text;
        taskText.classList.add('task-text');
        if (todo.completed) {
            taskText.classList.add('completed');
        }

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));

        // Append elements to list item
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        // Append list item to todo list
        todoList.appendChild(li);
    });

    // Update the total tasks count
    totalTasks.innerText = `Total Tasks: ${tasks.length}`;
}

// Function to toggle the completion status of a todo
function toggleTodoCompletion(todoId) {
    tasks = tasks.map((todo) => {
        if (todo.id === todoId) {
        todo.completed = !todo.completed;
        }
        return todo;
    });

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Re-render the todo list
    renderTodoList();
}

// Function to delete a todo
function deleteTodo(todoId) {
    tasks = tasks.filter((todo) => todo.id !== todoId);

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Re-render the todo list
    renderTodoList();
}
