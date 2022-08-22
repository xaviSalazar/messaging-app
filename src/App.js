import './App.css';
import Navbar from './pages/Navbar';
import Settings from './pages/Settings'
import MessagingPage from './pages/MessagingPage';
import Login from './components/Authentification/Login'
import Register from './components/Authentification/Register'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import ContactsList from './pages/ContactsList';
import { useState, useEffect } from 'react';
import Auth from "./Auth"
import {useSelector} from 'react-redux'
import {socket} from './managers/socketioManager'
import {setWithExpiry} from'./managers/socketioManager'
import  {getWithExpiry} from'./managers/socketioManager'

socket.on("session", ({sessionID, userID}) => {
  // attach the session ID to the next reconnection attemps
  socket.auth = { sessionID };
  console.log(`sessionID ${sessionID}, userID ${userID}`)
  //store it in localStorage
  const appi = setWithExpiry("sessionID", sessionID, 900000);
  //localStorage.setItem("sessionID", sessionID);
  //save the ID of the user
  socket.userID = userID
  })


function App() {
 
  let auth = useSelector(state => state.customerReducer.auth)
  let configsTokens = useSelector(state => state.configTokenReducer)
  console.log('rendering app')


  useEffect( () => {
    const sessionID = getWithExpiry("sessionID")
    if(sessionID)  {
        console.log(`inside sessionID: ${sessionID}`)
        console.log(sessionID)
        socket.auth = { sessionID }
        socket.connect()
    } else {
        console.log('when not session id')
        const tokens = localStorage.getItem("whatsapp_app")
        console.log(tokens)
        if(tokens) {
            const item = JSON.parse(tokens);
            const username = item.phoneNumber
            console.log(username)
            socket.auth = { username }
            socket.connect()
        }
    }

}, [configsTokens])

  // if(auth)
  //   console.log(auth?.data?.responseData?.lastName)
   
  // set variables to use within whatsapp
  return (
    <>
    <Router basename={process.env.PUBLIC_URL}> 
    <div className="app">
    <div className="app_body"> 
    <Navbar/>
      <Routes>
        <Route path="/"element = {<Auth redirectTo="/login"> {auth?.data?.success?<MessagingPage socket ={ socket }/>:null} </Auth>} />
        <Route path="/login"element = {<Auth redirectTo="/"><Login/></Auth>} />
        <Route path='/settings' element = {<Auth redirectTo="/login"><Settings /></Auth>} />
        <Route path='/contacts' element = {<Auth redirectTo="/login"><ContactsList/></Auth>} />
      </Routes>
      </div>
      </div>
    </Router>
    </>
  );
  
}

export default App;
