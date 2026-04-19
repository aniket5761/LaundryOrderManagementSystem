import React, { useState, useEffect } from 'react';
import CreateOrderForm from './components/CreateOrderForm';
import OrdersList from './components/OrdersList';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
    
    setLoading(false);
  }, []);

  const handleOrderCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setCurrentPage('orders');
  };

  const handleLoginSuccess = (userInfo) => {
    setIsAuthenticated(true);
    setUsername(userInfo);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
    setCurrentPage('dashboard');
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧺 Laundry Order Management System</h1>
        <nav className="app-nav">
          <button
            className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-btn ${currentPage === 'create' ? 'active' : ''}`}
            onClick={() => setCurrentPage('create')}
          >
            Create Order
          </button>
          <button
            className={`nav-btn ${currentPage === 'orders' ? 'active' : ''}`}
            onClick={() => setCurrentPage('orders')}
          >
            Orders
          </button>
          <div className="user-section">
            <span className="username">👤 {username}</span>
            <button
              className="nav-btn logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="app-main">
        {currentPage === 'dashboard' && <Dashboard refreshTrigger={refreshTrigger} />}
        {currentPage === 'create' && <CreateOrderForm onOrderCreated={handleOrderCreated} />}
        {currentPage === 'orders' && <OrdersList refreshTrigger={refreshTrigger} />}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Laundry Order Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
