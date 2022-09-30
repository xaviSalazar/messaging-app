import React, { useState, useEffect, useMemo } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
//import { newIncomingMessage } from '../../../redux/NewMessages/Actions'
import { MessageOutlined } from '@material-ui/icons';
import { httpManager } from '../../../managers/httpManager.js';

const filterMessages = (userMessages, userData, setUnreadMsg) => {
    //console.log(`new message im in sidebarchat :${JSON.stringify(userMessages)}`)
    let veamos = userData
    var messagesToFilter = userMessages.filter( function(msg) {
        return msg.from === userData.phoneNumber
    });
    // console.log(JSON.stringify(messagesToFilter))
    var size = Object.keys(messagesToFilter).length;
    // console.log(size)
    if(size !== 0) {setUnreadMsg(size + userData.count)}
}


const SidebarChat = (props) => {

    const dispatch = useDispatch();
    // const userMessages  = useSelector((state) => state.getMessagesFromChannel);
    const newMessages = useSelector((state) => state.newIncomingMessage)
    const { userData, setChat, idColumn, setSelectedActive, selectedActive} = props;
    const [unreadMsg, setUnreadMsg] = useState(userData.count)
    //console.log(`rendering SidebarChat ${userData.name}`)

    // useEffect( () => {
    //     dispatch(getMessagesFromChannel(userData._id))
    // }, [])

    const setMessageAndChat = async () => {

        const table = []
        table[idColumn] = true;
        setSelectedActive(table)
        console.log(`SETchat`)
        await httpManager.checkMsgToRead(userData._id)
        setChat(userData);
        setUnreadMsg(0)
       // dispatch(getMessagesFromChannel(userData._id))
        //dispatch(clearMessages())
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
        
        <div className =  {selectedActive[idColumn] === true ? "sidebarChat__active":"sidebarChat"}  onClick = {setMessageAndChat}>
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