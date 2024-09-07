// Select DOM elements
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addTaskBtn.addEventListener('click', function() {
    if (taskInput.value.trim() !== "") {
        addTask(taskInput.value);
        taskInput.value = ""; // Clear the input field
    }
});

function addTask(taskText) {
    // Create list item
    const li = document.createElement('li');
    li.className = 'task-item';
    li.appendChild(document.createTextNode(taskText));

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.addEventListener('click', deleteTask);
    li.appendChild(deleteBtn);

    // Add task completion toggle
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks(); // Save the current state of tasks
    });

    // Append to the list
    taskList.appendChild(li);

    // Save the updated list to local storage
    saveTasks();
}

function deleteTask(e) {
    e.target.parentElement.remove();
    saveTasks(); // Save the updated list to local storage
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(task => {
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            document.querySelectorAll('.task-item').forEach(item => {
                if (item.firstChild.textContent === task.text) {
                    item.classList.add('completed');
                }
            });
        }
    });
}
