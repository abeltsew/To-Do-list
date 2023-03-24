import todoList from './TodoList.js';

export const removeTask = (currentItem) => {
  todoList.splice(
    0,
    todoList.length,
    ...todoList.filter((todo) => todo.index !== Number(currentItem)),
  );
  if (todoList) {
    todoList.splice(
      0,
      todoList.length,
      ...todoList.sort((a, b) => a.index - b.index),
    );
    todoList.forEach((td, i) => {
      td.index = i + 1;
    });
  }
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

export const add = (item) => {
  todoList.push({
    description: item,
    completed: false,
    index: todoList.length + 1,
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
};
