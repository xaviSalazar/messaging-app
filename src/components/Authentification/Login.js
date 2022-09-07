import React from "react";
import './Login.css'
import { doLoginCustomer } from "../../redux/Authentification/Actions";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

const Login = () => {
    
    // React States
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uemail, pass } = document.forms[0];


    const data = {
      password: pass.value,
      email: uemail.value
    }

    dispatch(doLoginCustomer(data)).then((res) => {
      //console.log(res.payload)
      if(res.payload.data.success) {
         alert("User log in success")
         //console.log(res.payload.data.responseData.token)
         const token = res.payload.data.responseData.token;
         localStorage.setItem('customerToken', token)

      } else {
        alert("Not created") 
      }
    })

   };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Enter your email:  </label>
          <input type="text" name="uemail" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <br/>
        <Link to= "/register" > Crear nueva cuenta </Link>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );

}

export default Login;

