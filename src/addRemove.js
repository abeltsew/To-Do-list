import todoList from './TodoList.js';
import { renderList } from './index.js';

const todos = document.querySelector('.todos');
const clear = document.createElement('li');
clear.classList.add('clear');
clear.innerHTML = 'Clear all completed';
clear.addEventListener('click', () => clearCompleted());

export const removeTask = (currentItem) => {
  todoList.splice(
    0,
    todoList.length,
    ...todoList.filter((todo) => todo.index !== Number(currentItem))
  );
  if (todoList) {
    todoList.splice(
      0,
      todoList.length,
      ...todoList.sort((a, b) => a.index - b.index)
    );
    todoList.forEach((td, i) => {
      td.index = i + 1;
    });
  }
  localStorage.setItem('todoList', JSON.stringify(todoList));
  renderList(todoList);
};

export const add = (item, currentItem) => {
  todoList.push({
    description: item,
    completed: false,
    index: todoList.length + 1,
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
  renderList(todoList);
};

export const clearCompleted = () => {
  const removeCompleted = todoList.filter((todo) => todo.completed === true);
  removeCompleted.forEach((todo) => {
    const removeTodo = document.getElementById(todo.index);
    removeTodo?.remove();
  });
  const update = todoList
    .filter((todo) => todo.completed !== true)
    .sort((a, b) => a.index - b.index);

  update.forEach((td, i) => {
    td.index = i + 1;
  });

  todoList.splice(0, todoList.length, ...update);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  renderList(todoList);
};
