import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import '../styles/OrdersList.css';

const OrdersList = ({ refreshTrigger }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  const statuses = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

  useEffect(() => {
    fetchOrders();
  }, [refreshTrigger]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await orderAPI.getAllOrders();
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    if (!filterValue.trim()) {
      fetchOrders();
      return;
    }

    try {
      setLoading(true);
      setError('');
      let response;

      if (filterType === 'status') {
        response = await orderAPI.getOrdersByStatus(filterValue);
      } else if (filterType === 'customer') {
        response = await orderAPI.searchByCustomerName(filterValue);
      } else if (filterType === 'phone') {
        response = await orderAPI.searchByPhoneNumber(filterValue);
      } else if (filterType === 'garment') {
        response = await orderAPI.searchByGarmentType(filterValue);
      }

      setOrders(response.data);
    } catch (err) {
      setError('Failed to filter orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    if (!selectedStatus[orderId]) {
      setError('Please select a status');
      return;
    }

    try {
      setUpdatingOrderId(orderId);
      await orderAPI.updateOrderStatus(orderId, { status: selectedStatus[orderId] });

      // Update the order in the list
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: selectedStatus[orderId] }
            : order
        )
      );

      setSelectedStatus((prev) => {
        const newStatus = { ...prev };
        delete newStatus[orderId];
        return newStatus;
      });
    } catch (err) {
      setError('Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const clearFilter = () => {
    setFilterValue('');
    setFilterType('all');
    fetchOrders();
  };

  if (loading && orders.length === 0) {
    return <div className="orders-list">Loading...</div>;
  }

  return (
    <div className="orders-list">
      <h2>Orders Management</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="filterType">Filter by:</label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="status">Status</option>
            <option value="customer">Customer Name</option>
            <option value="phone">Phone Number</option>
            <option value="garment">Garment Type</option>
          </select>
        </div>

        {filterType !== 'all' && (
          <div className="filter-group">
            <input
              type="text"
              placeholder={
                filterType === 'status'
                  ? 'e.g., RECEIVED'
                  : filterType === 'customer'
                  ? 'Customer name'
                  : filterType === 'phone'
                  ? 'Phone number'
                  : 'e.g., Shirt, Pants, Saree'
              }
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleFilter}>
              Search
            </button>
          </div>
        )}

        {filterValue && (
          <button className="btn btn-secondary" onClick={clearFilter}>
            Clear Filter
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">No orders found</div>
      ) : (
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Created At</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.phoneNumber}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>₹{parseFloat(order.totalAmount).toFixed(2)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <ul className="items-list">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.garmentType} x{item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <div className="status-update">
                      <select
                        value={selectedStatus[order.id] || ''}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={updatingOrderId === order.id}
                      >
                        <option value="">Select Status</option>
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn btn-sm btn-update"
                        onClick={() => handleUpdateStatus(order.id)}
                        disabled={!selectedStatus[order.id] || updatingOrderId === order.id}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
