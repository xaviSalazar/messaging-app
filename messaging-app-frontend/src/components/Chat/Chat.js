import React, {useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import './Chat.css';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import './utils/Messagebox'
import Messagebox from './utils/Messagebox';
//import { messagesList } from '../Sidebar/Mockdata/Mockdata'
// import Picker from "emoji-picker-react";

const Chat = (props) => {

    const { selectedChat } = props;
    const [messageList, setMessageList] = useState([]);
    const [message, SetMessage] = useState("");

    const [seed, setSeed] = useState("");

    const handleSubmit = (e) => {
        console.log("handle submite")
        SetMessage("");
        e.preventDefault(); 
    }

    const onMessageTextChanged = (typedText) => {
        SetMessage(typedText);
        console.log(typedText);
    }

    useEffect(() => { 
        setSeed(Math.floor(Math.random()*5000))
    }, [])

    return (
        !selectedChat ? <div></div>:
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src = {`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
                <div className='chat__headerInfo'>
                    <h3>{selectedChat.name}</h3>
                    <p>Last seen at...</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>

                {
                    messageList.map((userDataMessage, index) => (
                        <Messagebox key = {index} userDataMessage = {userDataMessage}/>
                    ))
                }
    
            </div>
            <div className='chat__footer'>
                <InsertEmoticon />
                {/* <Picker onEmojiClick={onEmojiClick} /> */}
                <form onSubmit={handleSubmit}>
                    <input  
                        placeholder='Type a message'
                        type='text'
                        value = {message}
                        onChange={(e) => onMessageTextChanged(e.target.value)}
                    />
                    <button type="submit">Send Message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
            
    )
}

export default Chat;