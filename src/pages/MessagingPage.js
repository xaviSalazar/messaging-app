import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../components/Chat/Chat';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../redux/GetUsers/UsersAction';
import socket from '../managers/socketioManager'

import { useSelector } from "react-redux";



// function to store a key with a time
const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    // item contains original value 
    const item = {
        value: value,
        expiry: now.getTime() + ttl, 
    }    
    localStorage.setItem(key, JSON.stringify(item))
}

const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key)
    if(!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date()
    // compare expire time with current time
    if(now.getTime() > item.expiry) {
        // delete item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}

//
const sessionID = getWithExpiry("sessionID")
// retrieve sessionID: should be the phoneNumber
//const sessionID = localStorage.getItem("sessionID")
// 

if(sessionID)  {
    console.log(`inside sessionID: ${sessionID}`)
    socket.auth = { sessionID }
    socket.connect()
} else {
    const username = "15550900270";
    socket.auth = { username }
    socket.connect()
}

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


const MessagingPage = () => {

    let auth = useSelector(state => state.customerReducer.auth)

    const dispatch = useDispatch();
    useEffect( ()=>{
            console.log("useeffect Messaging js")
            dispatch(getUsers(auth?.data?.responseData?._id))
          }, [dispatch])

    const [selectedChat, setChat] = useState();
  
return (
    <>
    <Sidebar setChat = {setChat} socket = {socket} />
    <Chat selectedChat = {selectedChat} socket = {socket}/>
    </>
)

}

export default MessagingPage;