import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { getMessagesFromChannel } from '../../../redux/GetMessages/Actions'

const SidebarChat = (props) => {

    const dispatch = useDispatch();
    const { userData, setChat} = props;
    const [lastMessage, setLastMessage] = useState("")

    const setMessageAndChat = async () => {
        setChat(userData);
        dispatch(getMessagesFromChannel(userData.phoneNumber))
       // console.log(userMessages)
    }

    useEffect (()=>{
        setLastMessage(userData.lastMessage)}
        ,[dispatch, userData.lastMessage])

    return (
        <div className = "sidebarChat" onClick = {setMessageAndChat}>
            <Avatar />
            <div className = "sidebarChat__info">
                <h2>{userData.name}</h2>
                <p>{lastMessage}</p>
            </div>
        </div>
    )

}

export default SidebarChat;