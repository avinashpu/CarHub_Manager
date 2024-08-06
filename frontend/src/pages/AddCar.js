import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../util'; 
import '../pages/AddCar.css';

const AddCar = () => {
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
    axios.post(`${API_URL}/api/car`, values)
      .then(response => {
        console.log('Car added successfully:', response.data);
        resetForm();
      })
      .catch(error => {
        console.error('Error adding car:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
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

            <button type="submit" className="add-car-button" disabled={isSubmitting}>
              Add Car
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCar;
