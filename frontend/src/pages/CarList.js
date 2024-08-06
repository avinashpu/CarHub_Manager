import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../util'; 

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching cars from API...');
      const response = await axios.get(`${API_URL}/api/car`); 
      console.log('Response received:', response);

      if (Array.isArray(response.data)) {
        console.log('Cars data:', response.data);
        setCars(response.data);
      } else {
        console.error('Unexpected response structure:', response.data);
        setError('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError(`Error fetching cars: ${error.response ? error.response.data : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="car-list-container">
      {loading && <p className="loading">Loading cars...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && cars.length > 0 ? (
        <div className="car-list">
          
          {cars.map((car) => (
            <div key={car._id} className="car-item">
              <div className="car-details">
                <h4>{car.carName || 'No Name'}</h4>
                <p><strong>Year:</strong> {car.manufacturingYear || 'No Year'}</p>
                <p><strong>Price:</strong> ${car.price || 'No Price'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No cars found.</p>
      )}
    </div>
  );
};

export default CarList;
