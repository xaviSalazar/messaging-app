import React, {useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import './Chat.css';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import './utils/Messagebox'
import Messagebox from './utils/Messagebox';
import { httpManager } from '../../managers/httpManager';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getMessagesFromChannel } from '../../redux/GetMessages/Actions'

var testeo = true;

const Chat = (props) => {

    const userMessages  = useSelector((state) => state.getMessagesFromChannel);
    const dispatch = useDispatch();
    const {selectedChat, socket} = props;
    const [messageList, setMessageList] = useState([]);
    const [message, SetMessage] = useState("");
   

    console.log("rendering chat component")
    useEffect(() => {
        if(!testeo)setMessageList(userMessages);
    }, [userMessages])
    
    useEffect(() => {
        console.log('useEFFECT chat js');
        //setMessageList(userMessages);
        if(selectedChat) testeo=false;

        const eventListener = ({ trigger, from, msg}) => {
            console.log(`${trigger}, ${from}, ${msg}`)
            console.log("dentro de listener cote chat");
            dispatch(getMessagesFromChannel(from))   
            if(selectedChat)
            {
            if(selectedChat.phoneNumber !== from) {
                console.log('entro en true')
                testeo = true;
            } 
            }
            // console.log(userMessages)       
        };

        socket.on('user_answered', eventListener);
        return () => {
            socket.off('user_answered')
            console.log('desabonnement')  
    }
    }, [socket, selectedChat, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (message === '') return;
        let channelId = "";
        
        if(!messageList || !messageList.length) {
            
            const channelUsers = [{
                name: selectedChat.name,
                phoneNumber: selectedChat.phoneNumber
            },{
                name: "DefaultUser",
                phoneNumber: "15550900270"
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
            to: selectedChat.phoneNumber,
            from: "15550900270",
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

    const deleteALl = async () => {
            setMessageList([]);
            let channelId;
            const receiveId = await httpManager.getChannelList(selectedChat.phoneNumber);
            console.log(receiveId);
            channelId = receiveId.data.responseData[0]._id;
            await httpManager.deleteALlMsg(channelId);
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
                <button onClick={deleteALl}> Delete Messages</button>

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
                        onChange={(e) => onMessageTextChanged(e.target.value) }
                    />
                    <button type="submit">Send Message</button>
                </form>
                <MicIcon/>
            </div>
        </div>     
    )
}

export default Chat;