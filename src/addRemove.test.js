/**
 * @jest-environment jsdom
 */

import { removeTask, add } from './addRemove.js';

import './__mocks__/mockHtml.js';

import renderList from './renderList.js';

describe('Test add feature ', () => {
  it('should add an item to local storage', () => {
    add('Task 1');
    add('Task 2');
    add('Task 3');
    add('Task 4');

    expect(JSON.parse(localStorage.getItem('todoList'))).toEqual([
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
      { description: 'Task 4', completed: false, index: 4 },
    ]);
  });

  it('should add exactly one li ', () => {
    renderList(JSON.parse(localStorage.getItem('todoList')));
    const initialLength = document.getElementsByTagName('li').length;
    add('Task 5');
    renderList(JSON.parse(localStorage.getItem('todoList')));
    expect(document.getElementsByTagName('li').length).toBe(initialLength + 1);
  });
});

describe('Test remove feature ', () => {
  it('should remove an item from the local storage and re-index ', () => {
    removeTask(2);

    expect(JSON.parse(localStorage.getItem('todoList'))).toEqual([
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 3', completed: false, index: 2 },
      { description: 'Task 4', completed: false, index: 3 },
      { description: 'Task 5', completed: false, index: 4 },
    ]);
  });

  it('should Remove  exactly one li', () => {
    renderList(JSON.parse(localStorage.getItem('todoList')));
    const initialLength = document.getElementsByTagName('li').length;
    removeTask(4);
    renderList(JSON.parse(localStorage.getItem('todoList')));
    expect(document.getElementsByTagName('li').length).toBe(initialLength - 1);
  });
});
