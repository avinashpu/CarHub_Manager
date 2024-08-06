import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../util'; 
import '../pages/CarList.css'; 

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
                
               
                console.log('Sample car object:', response.data[0]);

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
        <div className="main-content">
            <h2>Welcome to the Car Management System</h2>

            {loading && <p className="loading">Loading cars...</p>}
            {error && <p className="error">Error: {error}</p>}

            {!loading && !error && cars.length > 0 ? (
                <main className="car-list">
                    <h3>Available Cars</h3>
                    <ul>
                        {cars.map((car) => (
                            <li key={car._id}>
                                <div className="car-details">
                                    <h4>{car.carName || 'No Name'}</h4> 
                                    <p><strong>Year:</strong> {car.manufacturingYear || 'No Year'}</p> 
                                    <p><strong>Price:</strong> ${car.price || 'No Price'}</p> 
                                </div>
                            </li>
                        ))}
                    </ul>
                </main>
            ) : (
                !loading && !error && <p>No cars found.</p>
            )}
        </div>
    );
};

export default CarList;
