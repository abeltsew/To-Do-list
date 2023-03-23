export let todoList = [];

const todos = document.querySelector('.todos');
const clear = document.createElement('li');
clear.classList.add('clear');
clear.innerHTML = 'Clear all completed';
todos.appendChild(clear);

export const removeTask = (currentItem) => {
  todoList = todoList.filter((todo) => todo.index !== Number(currentItem));
  const removeList = document.getElementById(currentItem);
  removeList?.remove();
};

export const add = (item, currentItem) => {
  clear.remove();
  todoList.push({
    description: item,
    completed: false,
    index: todoList.length + 1,
  });
  const li = document.createElement('li');
  li.classList.add('list-field');
  li.id = todoList.length + 1;
  li.innerHTML = `
<div class="list-label">
<input type="checkbox" name="task" />
<input
  type="text"
  name="task"
  class="list-input"
  value="${item}"
/>
</div>
`;
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
  todos.appendChild(clear);
};
