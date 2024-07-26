import React, { useState } from 'react';
import axios from '../../axiosConfig';
import Swal from 'sweetalert2';
import './POD.css'; // Import the CSS file

const POD = () => {
  const [loading, setLoading] = useState(false);

  // Function to call the API and reset POD submission status
  const handleResetPODSubmissionStatus = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reset the POD submission status?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await axios.post('api/admin/reset-pod-submission-status'); 
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'POD submission status reset successfully!',
        });
        console.log(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error resetting POD submission status',
        });
        console.error('Error resetting POD submission status:', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="pod-container">
      <h2 className="pod-title">POD</h2>
      <p className="pod-content">POD content goes here.</p>
      <button className="pod-button" onClick={handleResetPODSubmissionStatus} disabled={loading}>
        {loading ? 'Resetting...' : 'Reset POD Submission Status'}
      </button>
    </div>
  );
};

export default POD;
