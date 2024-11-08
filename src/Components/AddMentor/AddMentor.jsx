import React, { useState } from 'react';
import axios from '../../axiosConfig.js';
import './AddMentor.css';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const AddMentor = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [password, setPassword] = useState('');  // New state for password

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mentorData = {
      mentorId,
      name,
      phoneNumber,
      emailId,
      password  // Include password in the data sent to the backend
    };

    const result = await Swal.fire({
      title: 'Please confirm the details',
      html: `<pre>${JSON.stringify({ name, phoneNumber, emailId, mentorId, password }, null, 2)}</pre>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    });

    if (result.isConfirmed) {
      try {
        console.log(mentorData)
        const response = await axios.post('/api/admin/addMentor', mentorData);
        if (response.data.success) {
          Swal.fire('Success!', response.data.message, 'success');
          setName('');
          setPhoneNumber('');
          setEmailId('');
          setMentorId('');
          setPassword('');  // Clear password after submission
        } else {
          Swal.fire('Error!', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <>
      <h1 className="addMentor-heading">Add Mentor</h1>
      <div className="addMentor-container">
        <form onSubmit={handleSubmit} className="add-mentor-form">
          <h3 className="add_mentor_heading">Mentor Details</h3>

          <div className="form-group">
            <label className="label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-field"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Email ID:</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Mentor ID:</label>
            <input
              type="text"
              value={mentorId}
              onChange={(e) => setMentorId(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Password:</label>  {/* New password field */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Add Mentor
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMentor;
