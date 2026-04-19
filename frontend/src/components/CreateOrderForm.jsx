import React, { useState } from 'react';
import { orderAPI } from '../services/api';
import '../styles/CreateOrderForm.css';

const CreateOrderForm = ({ onOrderCreated }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    items: [{ garmentType: '', quantity: '', pricePerItem: '' }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { garmentType: '', quantity: '', pricePerItem: '' }],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate phone number
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setError('Phone number must be 10 digits');
      return;
    }

    // Validate items
    if (formData.items.some((item) => !item.garmentType || !item.quantity || !item.pricePerItem)) {
      setError('Please fill all item fields');
      return;
    }

    try {
      setLoading(true);
      const response = await orderAPI.createOrder({
        ...formData,
        items: formData.items.map((item) => ({
          ...item,
          quantity: parseInt(item.quantity),
          pricePerItem: parseFloat(item.pricePerItem),
        })),
      });

      setSuccess(`Order created successfully! Order ID: ${response.data.orderId}`);
      setFormData({
        customerName: '',
        phoneNumber: '',
        items: [{ garmentType: '', quantity: '', pricePerItem: '' }],
      });

      if (onOrderCreated) {
        onOrderCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-order-form">
      <h2>Create New Order</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            placeholder="Enter customer name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter 10-digit phone number"
            maxLength="10"
            required
          />
        </div>

        <div className="items-section">
          <h3>Order Items</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="item-form">
              <div className="form-group">
                <label htmlFor={`garmentType-${index}`}>Garment Type</label>
                <input
                  id={`garmentType-${index}`}
                  type="text"
                  value={item.garmentType}
                  onChange={(e) => handleItemChange(index, 'garmentType', e.target.value)}
                  placeholder="e.g., Shirt, Pants, Saree"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`quantity-${index}`}>Quantity</label>
                <input
                  id={`quantity-${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  placeholder="Quantity"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`pricePerItem-${index}`}>Price per Item</label>
                <input
                  id={`pricePerItem-${index}`}
                  type="number"
                  value={item.pricePerItem}
                  onChange={(e) => handleItemChange(index, 'pricePerItem', e.target.value)}
                  placeholder="Price"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {formData.items.length > 1 && (
                <button
                  type="button"
                  className="btn btn-remove"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn btn-add-item"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Order'}
        </button>
      </form>
    </div>
  );
};

export default CreateOrderForm;
