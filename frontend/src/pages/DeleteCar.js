import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../pages/DeleteCar.css';
import { API_URL } from '../util';

const DeleteCar = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState(null); 

  const navigate = useNavigate();

  // Fetch car data when component mounts
  useEffect(() => {
    fetchCarData();
  }, []);

 
  const fetchCarData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/car`);
      console.log('Fetched car data:', response.data); 

      if (Array.isArray(response?.data)) {
        setCars(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setError('Unexpected data format'); 
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
      setError('Error fetching car data'); 
    }
  };

  const handleDelete = async () => {
    if (selectedCar) {
      try {
        await axios.delete(`${API_URL}/api/car/${selectedCar._id}`);
        console.log(`Deleted car with ID: ${selectedCar._id}`); 
        setDeleteSuccess(true);
        setTimeout(() => {
          setDeleteSuccess(false);
          fetchCarData(); 
          navigate('/'); 
        }, 2000); 
      } catch (error) {
        console.error('Error deleting the car:', error);
        setError('Error deleting the car'); 
      }
    }
  };

  return (
    <div className="delete-car-container">
      <h2>Delete Car</h2>
      {error && <div className="error-message">{error}</div>} 

      <div className="car-dropdown">
        <Select
          options={cars.map(each => ({
            value: each._id,
            label: each.carName,
          }))}
          onChange={option => {
            const selected = cars.find(car => car._id === option.value);
            setSelectedCar(selected);
            console.log('Selected car:', selected); 
          }}
          placeholder="Select a car"
        />
      </div>

      {selectedCar && (
        <div className="car-details">
          <h3>Car Details</h3>
          <div className="form-group">
            <label htmlFor="carName">Car Name:</label>
            <div id="carName">{selectedCar.carName}</div>
          </div>
          <div className="form-group">
            <label htmlFor="manufacturingYear">Manufacturing Year:</label>
            <div id="manufacturingYear">{selectedCar.manufacturingYear}</div>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <div id="price">{selectedCar.price}</div>
          </div>
        </div>
      )}

      {selectedCar && (
        <button
          type="button"
          className="delete-car-button"
          onClick={handleDelete}
        >
          Delete Car
        </button>
      )}

      {deleteSuccess && <div className="success-message">Car deleted successfully!</div>}
    </div>
  );
};

export default DeleteCar;
