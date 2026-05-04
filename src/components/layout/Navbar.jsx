/**
 * Daily Diary Task Management Project
 * 
 * Developed by: Dammika Madushan Kumara
 * Description: The top navigation bar of the application. It displays the project branding,
 * the currently logged-in user's name, and provides a secure logout mechanism.
 */

import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, LogOut } from 'lucide-react';

const Navbar = () => {
  const { state, dispatch } = useContext(TaskContext);
  const navigate = useNavigate();

  /**
   * handleLogout function
   * Dispatches the LOGOUT action to clear user state and redirects back to the login screen.
   */
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        {/* Brand Section - Personalized by Dammika Madushan Kumara */}
        <div className="nav-brand">
          <BookOpen size={24} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Daily Diary</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 'normal', marginTop: '-4px' }}>
              by Dammika Madushan Kumara
            </span>
          </div>
        </div>
        
        {/* User Info & Actions */}
        <div className="user-info">
          <span>Hello, {state.user?.name || 'User'}</span>
          <button onClick={handleLogout} className="btn btn-ghost" title="Secure Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
