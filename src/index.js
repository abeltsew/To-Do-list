import './style.css';
import { add, removeTask, todoList } from './addRemove.js';

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

todoList
  .sort((a, b) => a.index - b.index)
  .forEach((todo) => {
    clear.remove();
    const li = document.createElement('li');
    li.classList.add('list-field');
    li.id = todo.index;
    li.innerHTML = `
<div class="list-label">
  <input type="checkbox" name="task" ${todo.completed ? 'checked' : ''} />
    <input
      type="text"
      name="task"
      class="list-input"
      value="${todo.description}"
    />
</div>
  `;
    const icon = document.createElement('span');
    icon.innerHTML = "<i class='fa-solid fa-ellipsis-vertical'></i>";
    li.appendChild(icon);

    icon.addEventListener(
      'click',
      () => icon.getAttribute('icon') === 'delete' && removeTask(currentItem),
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
  });
