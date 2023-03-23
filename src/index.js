import './style.css';

const todoList = [
  { description: 'Get Milk', completed: true, index: 1 },
  { description: 'Wash car', completed: false, index: 2 },
  { description: 'Finish Project', completed: true, index: 3 },
];

const todos = document.querySelector('.todos');

todoList.forEach((todo) => {
  const li = document.createElement('li');
  li.classList.add('list-field');
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
<svg
  width="20px"
  height="20px"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
  fill="#808080"
  class="bi bi-three-dots-vertical"
>
  <path
    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
  />
</svg>
  `;
  todos.appendChild(li);
});

const clear = document.createElement('li');
clear.classList.add('clear');
clear.innerHTML = 'Clear all completed';
