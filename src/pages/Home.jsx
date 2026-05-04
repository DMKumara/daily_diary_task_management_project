/**
 * Daily Diary Task Management Project
 * 
 * Developed by: Dammika Madushan Kumara
 * Description: Professionally structured and humanized React component.
 * Part of the advanced Task Management application utilizing modern React Hooks.
 */

import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';

const Home = () => {
  const { state } = useContext(TaskContext);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const clearEdit = () => {
    setEditingTask(null);
  };

  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(t => t.completed).length;

  return (
    <div className="dashboard-layout container animate-fade-in">
      <div className="dashboard-header">
        <h1 className="greeting">Good day, <span>{state.user?.name || 'User'}</span>!</h1>
        <p className="dashboard-subtitle">
          You have {totalTasks - completedTasks} pending {totalTasks - completedTasks === 1 ? 'task' : 'tasks'} today.
        </p>
      </div>

      <div className="task-grid">
        <div className="sidebar">
          <TaskForm currentTask={editingTask} clearEdit={clearEdit} />
        </div>
        <div className="main-content">
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Your Tasks</h2>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {completedTasks} of {totalTasks} completed
            </div>
          </div>
          <TaskList onEditTask={handleEditTask} />
        </div>
      </div>
    </div>
  );
};

export default Home;
