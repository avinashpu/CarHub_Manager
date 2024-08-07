import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../util';
import './Homepage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginSchema = Yup.object().shape({
    mobile: Yup.string().required('Mobile number is required'),
    password: Yup.string().required('Password is required'),
  });

  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string().required('Mobile number is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLoginSubmit = (values, { setSubmitting, resetForm }) => {
    axios.post(`${API_URL}/auth/login`, values, { withCredentials: true })
      .then(response => {
        console.log('Login successful:', response.data);
        setSuccessMessage('Login successful');
        resetForm();
      })
      .catch(error => {
        console.error('Error during login:', error);
        setErrorMessage('Login failed');
      })
      .finally(() => {
        setSubmitting(false);
        setTimeout(() => setSuccessMessage(''), 3000);
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  const handleRegisterSubmit = (values, { setSubmitting, resetForm }) => {
    axios.post(`${API_URL}/auth/register`, values, { withCredentials: true })
      .then(response => {
        console.log('Registration successful:', response.data);
        setSuccessMessage('Registration successful');
        resetForm();
      })
      .catch(error => {
        console.error('Error during registration:', error);
        setErrorMessage('Registration failed');
      })
      .finally(() => {
        setSubmitting(false);
        setTimeout(() => setSuccessMessage(''), 3000);
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-toggle">
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Register</button>
      </div>
      {isLogin ? (
        <Formik
          initialValues={{ mobile: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <h2>Login</h2>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <Field name="mobile" type="text" />
                <ErrorMessage name="mobile" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>Login</button>
              {successMessage && <p className="success-message">{successMessage}</p>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ name: '', mobile: '', password: '' }}
          validationSchema={registerSchema}
          onSubmit={handleRegisterSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <h2>Register</h2>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field name="name" type="text" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <Field name="mobile" type="text" />
                <ErrorMessage name="mobile" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>Register</button>
              {successMessage && <p className="success-message">{successMessage}</p>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AuthPage;
