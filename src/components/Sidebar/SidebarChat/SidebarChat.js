import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { getMessagesFromChannel } from '../../../redux/GetMessages/Actions'
//import { newIncomingMessage } from '../../../redux/NewMessages/Actions'

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

const SidebarChat = (props) => {

    const dispatch = useDispatch();
    //const userMessages  = useSelector((state) => state.getMessagesFromChannel);
    const newMessages = useSelector((state) => state.newIncomingMessage)
    const { userData, setChat} = props;
    const [ showInfo, setShowInfo ] = useState({})

    console.log(`rendering SidebarChat ${userData.name}`)

    const setMessageAndChat = async () => {
        setChat(userData);
        // console.log(userData)
        dispatch(getMessagesFromChannel(userData.phoneNumber))
    }

    useEffect(() => {
        //filterMessages(userMessages, setShowInfo, userData)
        filterMessages(newMessages, setShowInfo, userData)
    }, [newMessages, userData])

    return (
        <div className = "sidebarChat" onClick = {setMessageAndChat}>
            <Avatar />
            <div className = "sidebarChat__info">
                <h2>{userData.name}</h2>
                <p>{ showInfo.lastMessage }</p>
            </div>
        </div>
    )

}

export default SidebarChat;