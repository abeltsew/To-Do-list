import './style.css';

let todoList = [
  { description: 'Get Milk', completed: true, index: 1 },
  { description: 'Wash car', completed: false, index: 2 },
  { description: 'Finish Project', completed: true, index: 3 },
];

let currentItem = '';

const handleDelete = () => {
  todoList = todoList.filter((todo) => todo.index !== Number(currentItem));
  const removeList = document.getElementById(currentItem);
  removeList.remove();
};

const todos = document.querySelector('.todos');

todoList.forEach((todo) => {
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
    () => icon.getAttribute('icon') === 'delete' && handleDelete(),
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
});

const clear = document.createElement('li');
clear.classList.add('clear');
clear.innerHTML = 'Clear all completed';
todos.appendChild(clear);
