import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../components/Chat/Chat';
import { useState } from 'react';



const MessagingPage = () => {

    const [selectedChat, setChat] = useState();
    const [MessagesList, setMessagesList] = useState([]);
  
return (
    <>
    <Sidebar setChat = {setChat} setMessagesList = {setMessagesList}/>
    <Chat selectedChat = {selectedChat} MessagesList = {MessagesList}/>
    </>
)

}

export default MessagingPage;