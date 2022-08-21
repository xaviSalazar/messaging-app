import React, { useState } from "react";
import './Register.css'

import { useDispatch } from 'react-redux';
import { doRegisterCustomer } from "../../redux/Authentification/Actions";


const Register =  () => {

  const dispatch = useDispatch()
    
    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, ulastname, pass, uemail } = document.forms[0];

    const data = {
      firstName: uname.value,
      lastName: ulastname.value,
      password: pass.value,
      email: uemail.value
    }

    dispatch(doRegisterCustomer(data)).then((res) => {
      if(res.payload.data.success) {
         alert("User created succesfully")
      } else {
        alert("Not created") 
      }
    })

   };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>First Name </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Last name </label>
          <input type="text" name="ulastname" required />
          {renderErrorMessage("ulastname")}
        </div>
        <div className="input-container">
          <label>Email</label>
          <input type="text" name="uemail" required />
          {renderErrorMessage("uemail")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Register Form</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );



}

export default Register;

