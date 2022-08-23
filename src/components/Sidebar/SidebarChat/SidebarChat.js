import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { getMessagesFromChannel } from '../../../redux/GetMessages/Actions'
//import { newIncomingMessage } from '../../../redux/NewMessages/Actions'
import { MessageOutlined } from '@material-ui/icons';
import { httpManager } from '../../../managers/httpManager.js';

const filterMessages = (userMessages, setShowInfo, userData) => {
    let veamos = userData
    var messagesToFilter = userMessages.filter( function(msg) {
        return msg.from === userData.phoneNumber
    });
    var objet = messagesToFilter.pop();
    if(objet) {
    console.log(objet.message)
    veamos.lastMessage = objet.message
    const temporaire = {...veamos}
    setShowInfo(temporaire)
    }
}

const findUnreadMessages = (newMessages, userData, setNotRead) => {
    var messagesToFilter = newMessages.filter( function(msg) {
        return msg.from === userData.phoneNumber
    });
    if(messagesToFilter.length === 0) return;

    var readStatusMessages = messagesToFilter.filter( function(msg) {
        return msg.isRead === false 
    })
    // Object.keys(myArray).length
    const counter = readStatusMessages.length;
    console.log(`render unread messages`)
    setNotRead(counter)
}

const SidebarChat = (props) => {

    const dispatch = useDispatch();
    const userMessages  = useSelector((state) => state.getMessagesFromChannel);
    const newMessages = useSelector((state) => state.newIncomingMessage)
    const { userData, setChat} = props;
    const [ showInfo, setShowInfo ] = useState({})
    const [ notRead, setNotRead ] = useState(0)

    console.log(`rendering SidebarChat ${userData.name}`)

    useEffect( () => {
        dispatch(getMessagesFromChannel(userData._id))
    }, [])

    const setMessageAndChat = async () => {
        await httpManager.checkMsgToRead(userData._id)
        setChat(userData);
        dispatch(getMessagesFromChannel(userData._id))
    }

    useEffect( () => {
        findUnreadMessages(userMessages, userData, setNotRead)
    }, [userMessages])

    useEffect(() => {
        //filterMessages(userMessages, setShowInfo, userData)
        filterMessages(newMessages, setShowInfo, userData)
        
    }, [newMessages, userData])

    return (
        <div className = "sidebarChat" onClick = {setMessageAndChat}>
            <Avatar />
            <div className = "sidebarChat__info">
                <h2>{userData.name}</h2>
                <p> { showInfo.lastMessage } </p>
                {notRead ? <p> <MessageOutlined/> {notRead} </p> : null}
                
            
            </div>
        </div>
    )
}

export default SidebarChat;