import todoList from './TodoList.js';
import { add, removeTask } from './addRemove.js';

const todos = document.querySelector('.todos');

const clear = document.createElement('li');
clear.classList.add('clear');
clear.innerHTML = 'Clear all completed';

clear.addEventListener('click', () => {
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
});

let currentItem = '';

let inputDesc = '';

const input = document.getElementById('input');

input.addEventListener('keyup', (e) => {
  inputDesc = e.target.value;
});

const renderList = (list) => {
  const handleRemoveTask = (currentItem) => {
    removeTask(currentItem);
    renderList(todoList);
  };
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
        () => icon.getAttribute('icon') === 'delete'
          && handleRemoveTask(currentItem),
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

const addBtn = document.querySelector('.add-btn');

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  add(inputDesc);
  inputDesc = '';
  input.value = inputDesc;
  renderList(todoList);
});

export default renderList;
