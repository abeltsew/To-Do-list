/**
 * @jest-environment jsdom
 */

import { add } from './addRemove.js';
import './__mocks__/mockHtml.js';

import renderList, {
  handleClear,
  toggleCompleted,
  handleUpdate,
} from './renderList.js';

describe('Check Edit function', () => {
  it('should edit content', () => {
    add('Task 1');
    add('Task 2');
    add('Task 3');
    add('Task 4');

    renderList(JSON.parse(localStorage.getItem('todoList')));
    handleUpdate(JSON.parse(localStorage.getItem('todoList')), 1, {
      target: { value: 'Task 1 Edited' },
    });

    renderList(JSON.parse(localStorage.getItem('todoList')));

    expect(
      document.getElementById('1').querySelector('.list-input').value,
    ).toBe('Task 1 Edited');
  });

  it('should toogle Completed content', () => {
    toggleCompleted(JSON.parse(localStorage.getItem('todoList')), 1, true);
    expect(JSON.parse(localStorage.getItem('todoList'))[0].completed).toBe(
      true,
    );
  });

  it('should remove Completed content', () => {
    const local = JSON.parse(localStorage.getItem('todoList'));
    local[0].completed = true;
    local[3].completed = true;

    localStorage.setItem('todoList', JSON.stringify(local));

    handleClear(JSON.parse(localStorage.getItem('todoList')));

    expect(JSON.parse(localStorage.getItem('todoList')).length).toBe(2);
  });
});
