import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../pages/UpdateCar.css';
import { API_URL } from '../util';

const validationSchema = Yup.object({
  carName: Yup.string().required('Car name is required'),
  manufacturingYear: Yup.number()
    .required('Manufacturing year is required')
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  price: Yup.number()
    .required('Price is required')
    .min(1, 'Price must be greater than 0'),
});

const UpdateCar = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCarData();
  }, []);

 
  const fetchCarData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/car`);
      if (Array.isArray(response.data)) {
        setCars(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
      setCars([]); 
    }
  };

  const formik = useFormik({
    initialValues: {
      carName: '',
      manufacturingYear: '',
      price: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (selectedCar) {
          await axios.put(`${API_URL}/api/car/${selectedCar._id}`, values);
          setUpdateSuccess(true);
          setTimeout(() => {
            setUpdateSuccess(false);
            fetchCarData(); 
            navigate('/');
          }, 2000); 
        }
      } catch (error) {
        console.error("Error updating the car:", error);
      }
    },
  });

  return (
    <div className="update-car-container">
      <h2>Update Car</h2>
      <div className="car-dropdown">
        <Select
          options={cars && cars.map(each => ({
            value: each._id,
            label: each.carName,
          }))}
          onChange={option => {
            const selected = cars.find(car => car._id === option.value);
            setSelectedCar(selected);
            formik.setValues({
              carName: selected.carName || '',
              manufacturingYear: selected.manufacturingYear || '',
              price: selected.price || '',
            });
          }}
          placeholder="Select a car"
        />
      </div>

      <form onSubmit={formik.handleSubmit} className="car-form">
        <div className="form-group">
          <label htmlFor="carName">Car Name</label>
          <input
            id="carName"
            name="carName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.carName}
          />
          {formik.touched.carName && formik.errors.carName ? (
            <div className="error">{formik.errors.carName}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="manufacturingYear">Manufacturing Year</label>
          <input
            id="manufacturingYear"
            name="manufacturingYear"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.manufacturingYear}
          />
          {formik.touched.manufacturingYear && formik.errors.manufacturingYear ? (
            <div className="error">{formik.errors.manufacturingYear}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="error">{formik.errors.price}</div>
          ) : null}
        </div>

        {selectedCar?.carName && (
          <button type="submit" className="update-car-button">
            Update Car
          </button>
        )}
      </form>

      {updateSuccess && <div className="success-message">Car updated successfully!</div>}
    </div>
  );
};

export default UpdateCar;
