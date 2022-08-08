import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'

const SidebarChat = (props) => {

    const { userData, setChat } = props;

    // const otherUser = userData.channelUsers.find(
    //     (userObj) => userObj.name !== userInfo.email
    // );

    return (
        <div className = "sidebarChat" onClick = {() => setChat(userData)}>
            <Avatar />
            <div className = "sidebarChat__info">
                <h2>{userData.name}</h2>
                <p>{userData.last_text_message}</p>
            </div>
        </div>
    )

}

export default SidebarChat;