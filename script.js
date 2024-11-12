let todoList = [];

function showMessage(text) {
    const display = document.getElementById('taskDisplay');
    display.innerHTML = `<div class="message">${text}</div>`;
    setTimeout(() => display.innerHTML = '', 3000);
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

function showAddModal() {
    showModal('addModal');
    document.getElementById('newTask').focus();
}

function showDeleteModal() {
    if (todoList.length === 0) {
        showMessage('No tasks to delete!');
        return;
    }
    updateTaskSelects('deleteSelect');
    showModal('deleteModal');
}

function showUpdateModal() {
    if (todoList.length === 0) {
        showMessage('No tasks to update!');
        return;
    }
    updateTaskSelects('updateSelect');
    showModal('updateModal');
}

function updateTaskSelects(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = todoList.map((task, index) => 
        `<option value="${index}">Task ${index + 1}: ${task}</option>`
    ).join('');
}

function addTask() {
    const input = document.getElementById('newTask');
    const task = input.value.trim();
    
    if (task) {
        todoList.push(task);
        showMessage(`Task added successfully`);
        input.value = '';
        closeModal('addModal');
        viewTasks();
    }
}

function deleteTask() {
    const select = document.getElementById('deleteSelect');
    const index = parseInt(select.value);
    const deletedTask = todoList.splice(index, 1)[0];
    showMessage(`Task deleted successfully`);
    closeModal('deleteModal');
    viewTasks();
}

function updateTask() {
    const select = document.getElementById('updateSelect');
    const input = document.getElementById('updatedTask');
    const index = parseInt(select.value);
    const newTask = input.value.trim();
    
    if (newTask) {
        todoList[index] = newTask;
        showMessage(`Task updated successfully`);
        input.value = '';
        closeModal('updateModal');
        viewTasks();
    }
}

function viewTasks() {
    const display = document.getElementById('taskDisplay');
    if (todoList.length === 0) {
        display.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <p>No tasks yet. Add a new task to get started!</p>
            </div>`;
        return;
    }

    const taskList = document.createElement('ul');
    taskList.className = 'task-list';
    
    todoList.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task-content">
                <span class="task-number">#${index + 1}</span>
                <span class="task-text">${task}</span>
            </div>
        `;
        taskList.appendChild(li);
    });
    
    display.innerHTML = '';
    display.appendChild(taskList);
}

// Handle Enter key in input fields
document.getElementById('newTask').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

document.getElementById('updatedTask').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') updateTask();
});

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Show initial empty state
viewTasks();