import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import { httpManager } from "../../../managers/httpManager";

const SidebarChat = (props) => {

    const { userData, setChat, setMessagesList } = props;


    const setMessageAndChat = async () => {
        setChat(userData);
        const userMessages = await httpManager.getChannelList(userData.phoneNumber);
        //console.log("userMessages", userMessages);
        //console.log(userMessages.data.responseData[0].messages)
        //console.log("userMessages", userMessages);
        if(userMessages.data.responseData.length !== 0)
            setMessagesList(userMessages.data.responseData[0].messages) 
        else 
            setMessagesList([])
    }

    return (
        <div className = "sidebarChat" onClick = {setMessageAndChat}>
            <Avatar />
            <div className = "sidebarChat__info">
                <h2>{userData.name}</h2>
                <p>{userData.last_text_message}</p>
            </div>
        </div>
    )

}

export default SidebarChat;