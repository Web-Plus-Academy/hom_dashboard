import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { toast } from 'react-toastify';

const Dashboard = ({ adminDetails }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var response = await axios.post('http://localhost:5000/api/admin/newUser', {
        name,
        username: username.toUpperCase(), // Assuming you want to convert username to uppercase
        password,
      }, {
        withCredentials: true, // Ensure cookies are sent
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setUsername('');
        setPassword('');
      } else {
        console.log(response.data);
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(response.data.message);
      console.error('Error:', error.message);
    }
  };


  return (
    <>
      <div className="dashboard-container">
        <h4 className="dashboard-welcome">Welcome,</h4>
        <h1 className="dashboard-name">{adminDetails.name}</h1>
        <p className="dashboard-id">ID: {adminDetails.ID}</p>
      </div>
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
      {message && <p className="message">{message}</p>}
    </>
  );
};

export default Dashboard;
