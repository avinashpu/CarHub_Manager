import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { API_URL } from '../util';
import CarList from './CarList'; 

const Dashboard = () => {
  const [totalCars, setTotalCars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/car`);
        if (Array.isArray(response?.data)) {
          setTotalCars(response.data.length);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Failed to fetch car data');
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
        setError('Error fetching car data');
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h3>Total Number of Cars</h3>
        <p>{totalCars}</p>
      </div>
      <CarList /> 
    </div>
  );
};

export default Dashboard;
