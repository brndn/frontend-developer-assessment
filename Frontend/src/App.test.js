import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';

import store from './redux/store';
import * as Api from './api';
import { getAllTodos } from './api';

jest.mock('./api');

describe('App tests', () => {
  it('Redux should populate UI elements on load and on add todo', async () => {
    const spyGetAllTodos = jest.spyOn(Api, 'getAllTodos').mockResolvedValue([{
      id: '1',
      description: 'Desciption 1 ',
      isCompleted: false
    }]);
    const spyAddTodo = jest.spyOn(Api, 'addTodo').mockResolvedValue([{
      id: '2',
      description: 'Description 2 ',
      isCompleted: false
    }]);
    const app = render(<Provider store={store}><App /></Provider>);

    await waitFor(() => {
      expect(app.getByTestId('TodoComponentList').children).toHaveLength(1);
    });
    act(() => {
      app.getByTestId('AddTodoButton').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await waitFor(() => {
      expect(app.getByTestId('TodoComponentList').children).toHaveLength(2);
    });

    spyGetAllTodos.mockClear();
    spyAddTodo.mockClear();
  });

  it('Toast message is visible on api error', async () => {
    const spyGetAllTodos = jest.spyOn(Api, 'getAllTodos').mockRejectedValue(new Error('you have an error'));

    const app = render(<Provider store={store}><App /></Provider>);

    await waitFor(async () => {
      const result = await app.findByText('you have an error');
      expect(result).toBeDefined();
    });

    spyGetAllTodos.mockClear();
  });
});