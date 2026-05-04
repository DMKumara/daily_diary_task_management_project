/**
 * Daily Diary Task Management Project
 * 
 * Developed by: Dammika Madushan Kumara
 * Description: Main Application Component. This file serves as the root of our component tree.
 * It handles the configuration of React Router for seamless navigation and wraps the
 * application in our custom TaskProvider to manage global state professionally.
 */

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskContext, TaskProvider } from './context/TaskContext';

// --- Page Components ---
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// --- UI Components ---
import Navbar from './components/layout/Navbar';

/**
 * ProtectedRoute Component
 * Acts as a professional security layer. It checks if a user is logged in.
 * If not, it gracefully redirects them to the login page, protecting our private routes.
 */
const ProtectedRoute = ({ children }) => {
  const { state } = useContext(TaskContext);
  
  // If no user is found in our global state, redirect to login
  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the requested children (e.g., the Home Dashboard)
  return children;
};

/**
 * AppContent Component
 * Contains the actual routing logic and conditional rendering of the Navbar.
 * Separated from the main App component to allow access to the TaskContext.
 */
const AppContent = () => {
  const { state } = useContext(TaskContext);
  
  return (
    <Router>
      {/* Intelligently display the Navbar only when the user is authenticated */}
      {state.user && <Navbar />}
      
      <Routes>
        {/* Public Routes: If user is already logged in, seamlessly redirect them to the dashboard */}
        <Route path="/login" element={!state.user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!state.user ? <SignUp /> : <Navigate to="/" replace />} />
        
        {/* Private Routes: Wrapped in our security layer */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback Route: Catch-all for undefined URLs, directing users safely back home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

/**
 * Root App Component
 * Wraps the entire application structure inside the TaskProvider,
 * empowering all child components with access to global state and dispatch actions.
 */
const App = () => {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
};

export default App;
