/**
 * Daily Diary Task Management Project
 * 
 * Developed by: Dammika Madushan Kumara
 * Description: Professionally structured and humanized React component.
 * Part of the advanced Task Management application utilizing modern React Hooks.
 */

import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { Edit2, Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

const TaskItem = ({ task, onEdit }) => {
  const { dispatch } = useContext(TaskContext);

  const toggleComplete = () => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, completed: !task.completed }
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: task.id });
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : 'pending'} animate-fade-in`}>
      <div style={{ marginRight: '1rem', cursor: 'pointer', color: task.completed ? 'var(--success-color)' : 'var(--text-secondary)' }} onClick={toggleComplete}>
        {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
      </div>
      
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-desc">{task.description}</p>}
        <div className="task-meta">
          <span><Clock size={14} /> {formatDate(task.createdAt)}</span>
        </div>
      </div>
      
      <div className="task-actions">
        <button className="btn btn-ghost" onClick={() => onEdit(task)} title="Edit">
          <Edit2 size={16} />
        </button>
        <button className="btn btn-danger" style={{ padding: '0.5rem', border: 'none' }} onClick={handleDelete} title="Delete">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
