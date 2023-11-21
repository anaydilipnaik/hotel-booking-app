import React, { useState } from 'react';
import './Form.css';
import FormLogin from './FormLogin';
import { loginUser } from "../controllers/user";

const Form1 = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function submitForm(e, values) {
    e.preventDefault();
    let data = {};
    data.email = email;
    data.password = password;
    data.personaType = "cu";
    loginUser(data).then(res => {
      if(res.status === 200) {
        sessionStorage.setItem("userId", res.data.id);
        sessionStorage.setItem("userEmail", res.data.email);
        window.location.href = "/"
      }
    })
  }

  const handleChange = (e) => {
    e.preventDefault();
    if(e.target.name === "email") setEmail(e.target.value);
    if(e.target.name === "password") setPassword(e.target.value);
  }

  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          <img className='form-img'/>
        </div>
          <FormLogin submitForm={submitForm} handleChange={handleChange} />
      </div>
    </>
  );
};

export default Form1;
