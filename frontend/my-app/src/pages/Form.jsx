import React, { useState } from 'react';
import './Form.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import { registerUser } from "../controllers/user";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm(values) {
    let data = {};
    data.first_name = values.firstName;
    data.last_name = values.lastName;
    data.email = values.email;
    data.password = values.password;
    data.personaType = "cu";
    registerUser(data).then(res => {
      if(res.status === 200) {
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.href = "/login"
        }, 3000)
      }
    })
  }
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          <img className='form-img'/>
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;
