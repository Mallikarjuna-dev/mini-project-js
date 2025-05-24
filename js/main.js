import { debounce } from './debounce.js';
import { throttle } from './throttle.js';
import {
    getTasks,
    addTask,
    deleteTask,
    toggleTask,
    clearAllTasks
} from './taskManager.js';

const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const searchInput = document.getElementById('search-input');
const clearAllBtn = document.getElementById('clear-all-btn');
const backToTopBtn = document.getElementById('back-to-top');

function renderTasks(filter = '') {
    taskList.innerHTML = '';
    getTasks()
        .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
        .forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <input type="checkbox" ${task.completed ? 'checked' : ''} />
          <button data-id="${task.id}">❌</button>
        </div>
      `;
            li.querySelector('input').addEventListener('change', () => {
                toggleTask(task.id);
                renderTasks(searchInput.value);
            });
            li.querySelector('button').addEventListener('click', () => {
                deleteTask(task.id);
                renderTasks(searchInput.value);
            });
            taskList.appendChild(li);
        });
}

addTaskBtn.addEventListener('click', () => {
    const text = newTaskInput.value.trim();
    if (text) {
        addTask(text);
        newTaskInput.value = '';
        renderTasks(searchInput.value);
    }
});

searchInput.addEventListener('input', debounce(() => {
    renderTasks(searchInput.value);
}, 300));

clearAllBtn.addEventListener('click', () => {
    if (confirm('Clear all tasks?')) {
        clearAllTasks();
        renderTasks();
    }
});

window.addEventListener('scroll', throttle(() => {
    backToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
}, 200));

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderTasks();
