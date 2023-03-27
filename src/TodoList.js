export default localStorage.getItem('todoList')
  ? JSON.parse(localStorage.getItem('todoList'))
  : [];
