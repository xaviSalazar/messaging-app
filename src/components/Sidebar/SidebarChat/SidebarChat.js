import React, { useState, useEffect, useMemo } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { getMessagesFromChannel } from '../../../redux/GetMessages/Actions'
//import { newIncomingMessage } from '../../../redux/NewMessages/Actions'
import { MessageOutlined } from '@material-ui/icons';
import { httpManager } from '../../../managers/httpManager.js';
import { clearMessages } from '../../../redux/NewMessages/Actions'

const filterMessages = (userMessages, userData, setUnreadMsg) => {
    //console.log(`new message im in sidebarchat :${JSON.stringify(userMessages)}`)
    let veamos = userData
    var messagesToFilter = userMessages.filter( function(msg) {
        return msg.from === userData.phoneNumber
    });
    console.log(JSON.stringify(messagesToFilter))
    var size = Object.keys(messagesToFilter).length;
    console.log(size)
    if(size !== 0) {setUnreadMsg(size + userData.count)}
    // var objet = messagesToFilter.pop();
    // if(objet) {
    // veamos.lastMessage = objet.message
    // {objet.type === "text" ? veamos.lastMessage = objet.message : veamos.lastMessage = objet.type}
    // const temporaire = {...veamos}
    // const parametros = objet.message
    // setArray([...array, parametros])
    //console.log(temporaire)
}


// const findUnreadMessages = (newMessages, userData, setNotRead) => {
//     var messagesToFilter = newMessages.filter( function(msg) {
//         return msg.from === userData.phoneNumber
//     });
//     if(messagesToFilter.length === 0) return;

//     var readStatusMessages = messagesToFilter.filter( function(msg) {
//         return msg.isRead === false 
//     })
//     // Object.keys(myArray).length
//     const counter = readStatusMessages.length;
//     //console.log(`render unread messages`)
//     setNotRead(counter)
// }

const SidebarChat = (props) => {

    const dispatch = useDispatch();
    // const userMessages  = useSelector((state) => state.getMessagesFromChannel);
    const newMessages = useSelector((state) => state.newIncomingMessage)
    const memoizedValue = useMemo(()=>newMessages)
    const [array, setArray] = useState([])
    const { userData, setChat} = props;
    const [ showInfo, setShowInfo ] = useState({})
    const [ notRead, setNotRead ] = useState(0)
    const [unreadMsg, setUnreadMsg] = useState(userData.count)

    //console.log(`rendering SidebarChat ${userData.name}`)

    // useEffect( () => {
    //     dispatch(getMessagesFromChannel(userData._id))
    // }, [])

    const setMessageAndChat = async () => {
        console.log(`SETchat`)
        setArray([])
        await httpManager.checkMsgToRead(userData._id)
        setChat(userData);
        setUnreadMsg(0)
        dispatch(getMessagesFromChannel(userData._id))
        dispatch(clearMessages())
    }

    // useEffect( () => {
    //     findUnreadMessages(userMessages, userData, setNotRead)
    // }, [userMessages, userData])

    // useEffect(() => {
    //     filterMessages(newMessages, setShowInfo, userData, setArray, array)
    // }, [newMessages, userData])

    useEffect(() => {
        console.log(`new_msg`)
        filterMessages(newMessages, userData, setUnreadMsg)
    }, [newMessages, userData, dispatch])

    return (
        <div className = "sidebarChat" onClick = {setMessageAndChat}>
            <Avatar />
            <div className = "sidebarChat__info">
                <h2>{userData.name}</h2>
                
                    <p>
                    <MessageOutlined/> {unreadMsg}
                    </p>
                
                {/* <p> { showInfo.lastMessage } {(array.length === 0) || (array.length === 1) ? null : <><MessageOutlined/> {array.length} </>} </p>
                {notRead ? <p> <MessageOutlined/> {notRead} </p> : null} */}
            </div>
        </div>
    )
}

export default SidebarChat;