import './App.css';
import Navbar from './pages/Navbar';
import Settings from './pages/Settings'
import MessagingPage from './pages/MessagingPage';
import Login from './components/Authentification/Login'
import Register from './components/Authentification/Register'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ContactsList from './pages/ContactsList';
import { useEffect } from 'react';
import Auth from "./Auth"
import {useSelector} from 'react-redux'
import {socket} from './managers/socketioManager'
import {setWithExpiry} from'./managers/socketioManager'
import  {getWithExpiry} from'./managers/socketioManager'
import { HashRouter } from 'react-router-dom'

socket.on("session", ({sessionID, userID}) => {
  // attach the session ID to the next reconnection attemps
  socket.auth = { sessionID };
  console.log(`sessionID ${sessionID}, userID ${userID}`)
  //store it in localStorage
  setWithExpiry("sessionID", sessionID, 900000);
  //localStorage.setItem("sessionID", sessionID);
  //save the ID of the user
  socket.userID = userID
  })


function App() {
 
  let auth = useSelector(state => state.customerReducer.auth)
  let configsTokens = useSelector(state => state.configTokenReducer)
  //console.log('rendering app')


  useEffect( () => {
    const sessionID = getWithExpiry("sessionID")
    if(sessionID)  {
        console.log(`inside sessionID: ${sessionID}`)
        //console.log(sessionID)
        socket.auth = { sessionID }
        socket.connect()
    } else {
        const tokens = localStorage.getItem("whatsapp_app")
        //console.log(tokens)
        if(tokens) {
            const item = JSON.parse(tokens);
            const username = item.phoneNumberId
            //console.log(username)
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
    <HashRouter> 
    <div className="app">
    <div className="app_body"> 
    <Navbar/>
      <Routes>
        <Route path = "/" element = {<Auth authRoute = {true} redirectTo="/login"><div>Home</div></Auth>} />
        <Route path = "/login" element = {<Auth redirectTo="/"><Login/></Auth>} />
        <Route path = "/dashboard"element = {<Auth authRoute = {true} redirectTo="/login"> {auth?.data?.success?<MessagingPage socket ={ socket }/>:<Login/>} </Auth>} />
        <Route path = '/settings' element = {<Auth authRoute = {true} redirectTo="/login"> {auth?.data?.success?<Settings />:<Login/>}</Auth>} />
        <Route path = '/contacts' element = {<Auth authRoute = {true} redirectTo="/login"> {auth?.data?.success?<ContactsList/>:<Login/>}</Auth>} />
        <Route path = "/register" element = {<Auth redirectTo="/"> <Register/> </Auth>} />
      </Routes>
      </div>
      </div>
    </HashRouter>
    </>
  );
  
}

export default App;
