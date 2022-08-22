import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../components/Chat/Chat';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/GetUsers/UsersAction';





const MessagingPage = ({socket}) => {

    let auth = useSelector(state => state.customerReducer.auth)

    const [selectedChat, setChat] = useState();
    const dispatch = useDispatch();   

    useEffect( ()=>{
        console.log("useeffect Messaging js")
        dispatch(getUsers(auth?.data?.responseData?._id))
        }, [dispatch])      
  
return (
    <>
    <Sidebar setChat = {setChat} socket = {socket} />
    <Chat selectedChat = {selectedChat} socket = {socket}/>
    </>
)

}

export default MessagingPage;