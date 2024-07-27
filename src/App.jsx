import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Components/Dashboard/Dashboard';
import POD from './Components/POD/POD';
import Login from './Components/Login/Login';
import TaskSubmit from './Components/TaskSubmit/TaskSubmit';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminDetails, setAdminDetails] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated');
    const adminDetails = localStorage.getItem('adminDetails');
    if (authState) {
      setIsAuthenticated(JSON.parse(authState));
      setAdminDetails(JSON.parse(adminDetails));
    }
  }, []);

  const handleLogin = (authState) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(authState));
    const adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    setIsAuthenticated(authState);
    setAdminDetails(adminDetails);
  };

  const handleLogout = async () => {
    try{
      
      const response = await axios.get('/api/admin/logoutAdmin' );
      
      if(response.data.success){
        toast.success(response.data.message);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('adminDetails');
        setIsAuthenticated(false);
        setAdminDetails(null);
        // navigate('/');
      }
      else{
        toast.error(response.data.message);
      }
  }catch(err){
    console.log(err);
  }

}
    
  return (
    <Router>
      <ToastContainer />
      {isAuthenticated ? (
        <div className='application'>
          <Navbar onLogout={handleLogout} />
          <div className="app-container">
            <Sidebar adminDetails={adminDetails}  />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Navigate to="/pod" />} />
                <Route path="/pod" element={<POD />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<TaskSubmit />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
