/**
 * Daily Diary Task Management Project
 * 
 * Developed by: Dammika Madushan Kumara
 * Description: Professionally structured and humanized React component.
 * Part of the advanced Task Management application utilizing modern React Hooks.
 */

import React, { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { Plus, Save, X } from 'lucide-react';

const TaskForm = ({ currentTask, clearEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { dispatch } = useContext(TaskContext);

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (currentTask) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { ...currentTask, title, description }
      });
      clearEdit();
    } else {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          id: Date.now().toString(),
          title,
          description,
          completed: false,
          createdAt: new Date().toISOString()
        }
      });
      setTitle('');
      setDescription('');
    }
  };

  const handleCancel = () => {
    clearEdit();
    setTitle('');
    setDescription('');
  };

  return (
    <div className="task-form-card">
      <h2 className="task-form-title">
        {currentTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Task Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description (Optional)</label>
          <textarea
            className="form-input"
            placeholder="Add details about this task..."
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: 'vertical' }}
          ></textarea>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {currentTask ? (
              <><Save size={18} /> Update Task</>
            ) : (
              <><Plus size={18} /> Add Task</>
            )}
          </button>
          {currentTask && (
            <button type="button" className="btn btn-ghost" onClick={handleCancel}>
              <X size={18} /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
