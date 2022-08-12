import React, {useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import './Chat.css';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import './utils/Messagebox'
import Messagebox from './utils/Messagebox';
import { httpManager } from '../../managers/httpManager';
import { useSelector } from "react-redux";
import socket from '../../managers/socketioManager'


const Chat = (props) => {

    const userMessages  = useSelector((state) => state.getMessagesFromChannel);
    
    const {selectedChat} = props;
    const [messageList, setMessageList] = useState([]);
    const [message, SetMessage] = useState("");
    console.log("rendering chat component")

    useEffect(() => {
        setMessageList(userMessages);
        console.log("menqje")
    })


    const handleSubmit = async (e) => {

        e.preventDefault(); 
        let channelId = "";
        
        if(!messageList || !messageList.length) {
            
            const channelUsers = [{
                name: selectedChat.name,
                phoneNumber: selectedChat.phoneNumber
            },{
                name: "DefaultUser",
                phoneNumber: "593969044674"
            }];
            console.log("=====", channelUsers)
            const channelResponse = await httpManager.createChannel({channelUsers});
            console.log("=====", channelResponse)
            channelId = channelResponse.data.responseData._id;
            console.log("=====", channelId);         
        } else {
            const receiveId = await httpManager.getChannelList(selectedChat.phoneNumber);
            console.log(receiveId);
            channelId = receiveId.data.responseData[0]._id;
        }
    
        const messages = [...messageList];
        const msgReqData ={
            name: "DefaultUser",
            message,
            phoneNumber: selectedChat.phoneNumber,
            addedOn: new Date().getTime(),
            senderID: 0
        };
        console.log("verificar ", channelId)
        
        await httpManager.sendMessage({
            channelId,
            messages: msgReqData
        })

        messages.push(msgReqData);
        setMessageList(messages)
        SetMessage("");
    }

    const onMessageTextChanged = (typedText) => {
        SetMessage(typedText);
    }


    return (
        !selectedChat ? <div></div>:
        <div className='chat'>
            <div className='chat__header'>
                <Avatar />
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
                        type='message'
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