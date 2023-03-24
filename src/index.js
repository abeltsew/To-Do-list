import './style.css';
import { add, removeTask, clearCompleted } from './addRemove.js';
import todoList from './TodoList.js';

let currentItem = '';

let inputDesc = '';

const addBtn = document.querySelector('.add-btn');

const input = document.getElementById('input');

const clear = document.createElement('li');
clear.classList.add('clear');
clear.innerHTML = 'Clear all completed';

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  add(inputDesc, currentItem);
  inputDesc = '';
  input.value = inputDesc;
});

input.addEventListener('keyup', (e) => {
  inputDesc = e.target.value;
});

const todos = document.querySelector('.todos');

export const renderList = (list) => {
  const oldList = document.querySelectorAll('.task-item');
  oldList.forEach((ti) => ti.remove());
  list
    .sort((a, b) => a.index - b.index)
    .forEach((todo) => {
      clear.remove();
      const li = document.createElement('li');
      li.classList.add('list-field');
      li.classList.add('task-item');
      li.id = todo.index;
      const div = document.createElement('div');
      div.classList.add('list-label');
      const inputCheck = document.createElement('input');
      inputCheck.type = 'checkbox';
      inputCheck.checked = !!todo.completed;
      inputCheck.addEventListener('change', () => {
        const update = todoList.map((todo) => {
          if (todo.index === Number(li.id)) {
            todo.completed = inputCheck.checked;
            return todo;
          }
          return todo;
        });
        todoList.splice(0, todoList.length, ...update);
        localStorage.setItem('todoList', JSON.stringify(todoList));
      });

      const inputField = document.createElement('input');
      inputField.classList.add('list-input');
      inputField.value = todo.description;

      div.appendChild(inputCheck);
      div.appendChild(inputField);
      li.appendChild(div);
      const icon = document.createElement('span');
      icon.innerHTML = "<i class='fa-solid fa-ellipsis-vertical'></i>";
      li.appendChild(icon);

      icon.addEventListener(
        'click',
        () => icon.getAttribute('icon') === 'delete' && removeTask(currentItem)
      );

      li.addEventListener('click', () => {
        currentItem = li.id;
        const allInput = document.querySelectorAll('span');
        allInput.forEach((i) => {
          i.innerHTML = "<i class='fa-solid fa-ellipsis-vertical'></i>";
          i.setAttribute('icon', 'move');
          i.style.color = 'black';
        });
        icon.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
        icon.setAttribute('icon', 'delete');
        icon.style.color = 'red';
      });
      todos.appendChild(li);
      todos.append(clear);
      li.addEventListener('keyup', (e) => {
        const update = todoList.map((todo) => {
          if (todo.index === Number(li.id)) {
            todo.description = e.target.value;
            return todo;
          }
          return todo;
        });
        todoList.splice(0, todoList.length, ...update);
        localStorage.setItem('todoList', JSON.stringify(todoList));
      });
    });
};

renderList(todoList);

clear.addEventListener('click', () => clearCompleted());
