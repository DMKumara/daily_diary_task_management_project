/**
 * Daily Diary Task Management Project
 * 
 * Developed by: Dammika Madushan Kumara
 * Description: Professionally structured and humanized React component.
 * Part of the advanced Task Management application utilizing modern React Hooks.
 */

import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

const TaskList = ({ onEditTask }) => {
  const { state } = useContext(TaskContext);

  if (state.tasks.length === 0) {
    return (
      <div className="empty-state animate-fade-in">
        <ClipboardList size={48} />
        <h3>No tasks yet</h3>
        <p>Add a task to get started with your daily diary!</p>
      </div>
    );
  }

  // Sort tasks: pending first, then by date (newest first)
  const sortedTasks = [...state.tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="task-list">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEditTask} />
      ))}
    </div>
  );
};

export default TaskList;
