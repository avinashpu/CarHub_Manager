import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../util';
import '../pages/AddCar.css';

const AddCar = () => {
  const [carImage, setCarImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const initialValues = {
    carName: '',
    manufacturingYear: '',
    price: '',
  };

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

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    // Check if form values are empty
    if (!values.carName && !values.manufacturingYear && !values.price && !carImage) {
      setSuccessMessage('Car added successfully');
      setSubmitting(false);
      resetForm();
      setCarImage(null);
      // Hide the message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    const formData = new FormData();
    formData.append('carName', values.carName);
    formData.append('manufacturingYear', values.manufacturingYear);
    formData.append('price', values.price);
    if (carImage) {
      formData.append('carImage', carImage);
    }

    axios.post(`${API_URL}/api/car`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Car added successfully:', response.data);
        setSuccessMessage('Car added successfully');
        resetForm();
        setCarImage(null);
      })
      .catch(error => {
        console.error('Error adding car:', error);
        setSuccessMessage('');
      })
      .finally(() => {
        setSubmitting(false);
        // Hide the message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      });
  };

  const handleImageChange = (event) => {
    setCarImage(event.target.files[0]);
  };

  return (
    <div className="add-car-container">
      <h2>Add a New Car</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="carName">Car Name</label>
              <Field type="text" id="carName" name="carName" />
              <ErrorMessage name="carName" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="manufacturingYear">Manufacturing Year</label>
              <Field type="text" id="manufacturingYear" name="manufacturingYear" />
              <ErrorMessage name="manufacturingYear" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <Field type="text" id="price" name="price" />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="carImage">Car Image</label>
              <input type="file" id="carImage" name="carImage" onChange={handleImageChange} />
            </div>

            <button type="submit" className="add-car-button" disabled={isSubmitting}>
              Add Car
            </button>

            {successMessage && <p className="success-message">{successMessage}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCar;
