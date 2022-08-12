import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../components/Chat/Chat';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../redux/GetUsers/UsersAction';


const MessagingPage = () => {

    const dispatch = useDispatch();
    useEffect( ()=>{
            dispatch(getUsers("eltia"))
          }, [dispatch])

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