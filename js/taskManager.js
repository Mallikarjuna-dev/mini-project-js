import { saveTasks, loadTasks } from './storage.js';

let tasks = loadTasks();

export function getTasks() {
    return tasks;
}

export function addTask(text) {
    const newTask = { id: Date.now(), text, completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

export function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}

export function toggleTask(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks(tasks);
}

export function clearAllTasks() {
    tasks = [];
    saveTasks(tasks);
}
