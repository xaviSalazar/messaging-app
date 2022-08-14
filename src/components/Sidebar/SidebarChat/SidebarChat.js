import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { getMessagesFromChannel } from '../../../redux/GetMessages/Actions'

const SidebarChat = (props) => {

    

    const dispatch = useDispatch();
    const userMessages  = useSelector((state) => state.getMessagesFromChannel);
    const { userData, setChat} = props;
    const [lastMessage, setLastMessage] = useState("")
    const [number, setNumber] = useState(0)
    const [ showInfo, setShowInfo ] = useState({})
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    console.log(`rendering SidebarChat ${userData.name}`)

    const setMessageAndChat = async () => {
        setChat(userData);
        dispatch(getMessagesFromChannel(userData.phoneNumber))
    }

    useEffect(() => {

        console.log(`useEffect sidebarchat js`)
        let veamos = userData

        var messagesToFilter = userMessages.filter( function(msg) {
            return msg.phoneNumber == userData.phoneNumber
        });

        var objet = messagesToFilter.pop();

        if(objet) {
        console.log(objet.message)
        veamos.lastMessage = objet.message
        setShowInfo(veamos)
        forceUpdate()
        }

    }, [userMessages, userData])

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