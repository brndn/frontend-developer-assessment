import './App.css';
import { Container } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { addTodoThunk, getAllTodosThunk, updateTodoThunk } from './redux/reducers';
import DisplayTodoItemsComponent from './components/DisplayTodoItemsComponent';
import AddTodoComponent from './components/AddTodoComponent';
import TaskDescriptionComponent from './components/TaskDescriptionComponent';

const App = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const todos = useSelector((state) => state.todo.todos);
  const error = useSelector((state) => state.todo.error);

  // load any existing todos from the backend once.
  // note this will trigger twice in dev mode due to React.StrictMode see https://github.com/facebook/react/issues/15074
  useEffect(() => {
    dispatch(getAllTodosThunk());
  }, []);

  useEffect(() => {
    // this will present any api errors to the user.
    if (error) {
      toast(error, {
        position: 'bottom-right',
        style: {
          background: '#ff0000',
          color: '#fff'
        },
        duration: 2000
      });
    }
  }, [error]);

  const handleDescriptionChange = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const getItems = useCallback(() => {
    try {
      dispatch(getAllTodosThunk());
    } catch (error) {
      console.error(error);
    }
  });

  const handleAdd = useCallback(() => {
    try {
      dispatch(addTodoThunk({ description, isCompleted: false }));
      handleClear();
    } catch (error) {
      console.error(error);
    }
  }, [description]);

  const handleClear = useCallback(() => {
    setDescription('');
  }, []);

  const handleMarkAsComplete = useCallback((item, isCompleted) => {
    try {
      dispatch(updateTodoThunk({ ...item, isCompleted }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className='App'>
      <Container>
        <TaskDescriptionComponent />
        <AddTodoComponent handleClear={handleClear}
                          description={description}
                          handleDescriptionChange={handleDescriptionChange}
                          handleAdd={handleAdd} />
        <br />
        <DisplayTodoItemsComponent todos={todos}
                                   handleMarkAsComplete={handleMarkAsComplete}
                                   getItems={getItems} />
      </Container>
      <footer className='page-footer font-small teal pt-4'>
        <div className='footer-copyright text-center py-3'>
          © 2021 Copyright:
          <a href='https://clearpoint.digital' target='_blank' rel='noreferrer'>
            clearpoint.digital
          </a>
        </div>
      </footer>
      <div data-testid='TodoToast'>
        <Toaster />
      </div>
    </div>
  );
};

export default App;
