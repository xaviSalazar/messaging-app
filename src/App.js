import './App.css';
import Navbar from './pages/Navbar';
import Settings from './pages/Settings'
import MessagingPage from './pages/MessagingPage';
import Login from './components/Authentification/Login'
import Register from './components/Authentification/Register'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import ContactsList from './pages/ContactsList';
import { useState } from 'react';
import Auth from "./Auth"
import {useSelector} from 'react-redux'




function App() {
 
  let auth = useSelector(state => state.customerReducer.auth)
  console.log('rendering app')
  if(auth)
    console.log(auth.data.responseData.lastName)
   
  // set variables to use within whatsapp
  return (
    <>
    <Router basename={process.env.PUBLIC_URL}> 
    <div className="app">
    <div className="app_body"> 
    <Navbar/>
      <Routes>
        <Route path="/"element = {<Auth redirectTo="/"><MessagingPage/></Auth>} />
        <Route path="/login"element = {<Auth redirectTo="/"><Login/></Auth>} />
        <Route path='/settings' element = {<Auth redirectTo="/"><Settings /></Auth>} />
        <Route path='/contacts' element = {<Auth redirectTo="/"><ContactsList/></Auth>} />
          {/* <Route path='/' exact element= {loggedIn? <MessagingPage/> : null} /> 
          <Route path='/login' exact element = {<Login setLoggedIn={setLoggedIn}/>} />
          <Route path='/register' exact element = {<Register />} />       
          <Route path='/settings' exact element = {<Settings />} />
          <Route path='/contacts' exact element = {<ContactsList/>} /> */}
      </Routes>
      </div>
      </div>
    </Router>
    </>
  );
  
}

export default App;
