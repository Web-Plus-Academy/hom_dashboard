import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig.js';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import './AddRemoveMentees.css'; // Add appropriate CSS for styling

const AddRemoveMentee = () => {
  const [mentorDetails, setMentorDetails] = useState([]);
  const [menteeId, setMenteeId] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null); // Track the selected mentor for adding mentee

  // Fetch all mentor details on mount
  useEffect(() => {
    getAllMentorDetails();
  }, []);

  const getAllMentorDetails = async () => {
    try {
      const response = await axios.get('api/admin/mentors');

      if (response.data.success) {
        setMentorDetails(response.data.mentors);
      } else {
        Swal.fire('Error!', 'Unable to fetch mentor details.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
      console.error('Error fetching mentor details:', error);
    }
  };

  const addMentee = async (mentorId) => {
    if (!menteeId) {
      Swal.fire('Error!', 'Please enter a valid Mentee ID', 'error');
      return;
    }

    try {
      const response = await axios.post(`/api/admin/${mentorId}/addMentee`, { menteeId });

      if (response.data.success) {
        Swal.fire('Success!', 'Mentee added successfully!', 'success');
        setMenteeId(''); // Reset menteeId field
        setSelectedMentor(null); // Reset selected mentor
        getAllMentorDetails(); // Refresh mentor list
      } else {
        Swal.fire('Error!', response.data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    }
  };

  const removeMentee = async (mentorId, menteeIdToRemove) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will remove the mentee from the mentor’s list.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!',
      });

      if (result.isConfirmed) {
        const response = await axios.post(`/api/admin/${mentorId}/removeMentee`, { menteeId: menteeIdToRemove });

        if (response.data.success) {
          Swal.fire('Removed!', 'The mentee has been removed.', 'success');
          getAllMentorDetails(); // Refresh mentor list
        } else {
          Swal.fire('Error!', response.data.message, 'error');
        }
      }
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    }
  };

  return (
    <div className="mentor-container">
      <h1 className="mentor-heading">Mentor Details</h1>

      <div className="mentor-grid">
        {mentorDetails.length > 0 ? (
          mentorDetails.map((mentor) => (
            <div key={mentor.mentorId} className="mentor-card">
              <p><strong>Mentor ID:</strong> {mentor.mentorId}</p>
              <p><strong>Name:</strong> {mentor.name}</p>
              <p><strong>Phone Number:</strong> {mentor.phoneNumber}</p>
              <p><strong>Email ID:</strong> {mentor.emailId}</p>

              {/* Show "Add Mentee" button for mentor */}
              <button
                onClick={() => setSelectedMentor(mentor.mentorId)} // Set mentorId to show input field
                className="add-mentee-btn"
              >
                Add Mentee
              </button>

              {/* Show input box to add mentee ID only for the selected mentor */}
              {selectedMentor === mentor.mentorId && (
                <div className="mentee-input-group">
                  <label className="mentee-label">Mentee ID:</label>
                  <input
                    type="text"
                    value={menteeId}
                    onChange={(e) => setMenteeId(e.target.value)}
                    className="mentee-input-field"
                    placeholder="Enter Mentee ID"
                    required
                  />
                  <button onClick={() => addMentee(mentor.mentorId)} className="add-mentee-btn">Add Mentee</button>
                </div>
              )}

              {/* Display mentee list if present */}
              {mentor.mentees && mentor.mentees.length > 0 && (
                <div className="mentee-list-container">
                  <h3>Mentee List:</h3>
                  <ul>
                    {mentor.mentees.map((mentee) => (
                      <li key={mentee} className="mentee-item">
                        {mentee}
                        <button onClick={() => removeMentee(mentor.mentorId, mentee)} className="remove-mentee-btn">
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>Loading mentors...</div>
        )}
      </div>
    </div>
  );
};

export default AddRemoveMentee;
