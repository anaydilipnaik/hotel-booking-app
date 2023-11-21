import React from 'react';
import './Form.css';
import { Link } from 'react-router-dom';

const FormLogin = ({ submitForm, handleChange }) => {

  return (
    <div className='form-content-right'>
      <form onSubmit={submitForm} className='form'>
        <h1>
          Sign in to your Hotel Rewards Account!
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            required
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            onChange={handleChange}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            required
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            onChange={handleChange}
          />
        </div>
        <button className='form-input-btn' type='submit'>
          Login
        </button>
        <span className='form-input-login'>
          Don't have an account? Signup <Link to="/Signup">here</Link>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;
