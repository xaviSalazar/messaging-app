import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../components/Chat/Chat';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../redux/GetUsers/UsersAction';
import socket from '../managers/socketioManager'

// retrieve sessionID: should be the phoneNumber
const sessionID = localStorage.getItem("sessionID")

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
    localStorage.setItem("sessionID", sessionID);
    //save the ID of the user
    socket.userID = userID
  
})


const MessagingPage = () => {

    const dispatch = useDispatch();
    useEffect( ()=>{
            console.log("useeffect Messaging js")
            dispatch(getUsers("eltia"))
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