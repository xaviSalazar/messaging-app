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
import {useSelector, useDispatch} from 'react-redux'
import {socket} from './managers/socketioManager'
import {setWithExpiry} from'./managers/socketioManager'
import  {getWithExpiry} from'./managers/socketioManager'
import { HashRouter } from 'react-router-dom'
import {loadDbSavedTokens} from './redux/ConfigToken/Actions'
import * as crypto from 'crypto-js';
import Products from './pages/Products'

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
  const dispatch = useDispatch()
  //console.log('rendering app')

  useEffect(() => {
    //console.log(`useEffect for app load db toekn`)
    var firstToken = auth?.data?.responseData?.secretToken
    var secondToken = auth?.data?.responseData?.phoneNumberId
    var thirdToken = auth?.data?.responseData?.businessId

    if(!firstToken || !secondToken || !thirdToken) {return}
    // decrypt token
    var token_bytes = crypto.AES.decrypt(firstToken, 'anykeyhere');
    let tokenId = token_bytes.toString(crypto.enc.Utf8);

    // decrypt phoneId
    var phone_id_bytes = crypto.AES.decrypt(secondToken, 'anykeyhere');
    let numberId = phone_id_bytes.toString(crypto.enc.Utf8);

    // uncrypt businessId
    var business_id_bytes = crypto.AES.decrypt(thirdToken, 'anykeyhere');
    let businessId = business_id_bytes.toString(crypto.enc.Utf8);

    const config = {
      phoneNumber : auth?.data?.responseData?.phoneNumber,
      token : tokenId,
      phoneNumberId : numberId,
      businessId: businessId,
      userId: auth?.data?.responseData?._id
    }

    dispatch(loadDbSavedTokens(config))
  },[auth])


  useEffect( () => {
    const sessionID = getWithExpiry("sessionID")
    if(sessionID)  {
        console.log(`inside sessionID: ${sessionID}`)
        socket.auth = { sessionID }
        socket.connect()
    } else {
        const tokens = localStorage.getItem("whatsapp_app")
        //console.log(tokens)
        if(tokens) {
            const item = JSON.parse(tokens);
            const username = item.phoneNumberId
            const userDatabaseId = item.userId
            //console.log(username)
            socket.auth = { username, userDatabaseId}
            socket.connect()
        }
    }

}, [configsTokens])

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
        <Route path = '/products' element = {<Auth authRoute = {true} redirectTo="/login"> {auth?.data?.success?<Products/>:<Login/>}</Auth>} />
        <Route path = "/register" element = {<Auth redirectTo="/"> <Register/> </Auth>} />
      </Routes>
      </div>
      </div>
    </HashRouter>
    </>
  );
  
}

export default App;
