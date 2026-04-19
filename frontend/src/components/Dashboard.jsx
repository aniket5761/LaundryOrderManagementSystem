import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = ({ refreshTrigger }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, [refreshTrigger]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await orderAPI.getDashboardStats();
      setDashboardData(response.data);
    } catch (err) {
      setError('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard alert alert-error">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="dashboard">No data available</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{dashboardData.totalOrders}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">₹{parseFloat(dashboardData.totalRevenue).toFixed(2)}</div>
        </div>
      </div>

      <div className="status-breakdown">
        <h3>Orders by Status</h3>
        <div className="status-cards">
          {dashboardData.ordersByStatus &&
            Object.entries(dashboardData.ordersByStatus).map(([status, count]) => (
              <div key={status} className={`status-card status-${status.toLowerCase()}`}>
                <div className="status-name">{status}</div>
                <div className="status-count">{count}</div>
              </div>
            ))}
        </div>
      </div>

      <button className="btn btn-primary" onClick={fetchDashboardStats}>
        Refresh Stats
      </button>
    </div>
  );
};

export default Dashboard;
