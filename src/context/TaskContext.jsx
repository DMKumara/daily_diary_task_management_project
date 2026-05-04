/**
 * Daily Diary Task Management Project
 * 
 * Developed by: Dammika Madushan Kumara
 * Description: Professionally structured and humanized React component.
 * Part of the advanced Task Management application utilizing modern React Hooks.
 */

import React, { createContext, useReducer, useEffect } from 'react';

export const TaskContext = createContext();

const initialState = {
  tasks: [],
  user: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load from local storage on initial render
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedUser) {
      dispatch({ type: 'LOGIN', payload: savedUser });
    }
    if (savedTasks) {
      dispatch({ type: 'SET_TASKS', payload: savedTasks });
    }
  }, []);

  // Save to local storage when state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.user, state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
