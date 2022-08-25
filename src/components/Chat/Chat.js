import React, {useEffect, useState, useReducer, useRef } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import './Chat.css';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import './utils/Messagebox'
import Messagebox from './utils/Messagebox';
import { httpManager } from '../../managers/httpManager';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { newIncomingMessage } from '../../redux/NewMessages/Actions'
var testeo = true;

const reducer = (state, action) => {

    if(action.type === "ADD_MESSAGE") {
        const new_message = action.payload;
        console.log(new_message)
        state.push(new_message)
        return [...state]        
    }

    if( action.type === "LOAD_MESSAGES" ) {
        const messages = action.payload;
        return [...messages]
    }

}

const Chat = (props) => {

    const userMessages  = useSelector((state) => state.getMessagesFromChannel);
    let auth = useSelector(state => state.customerReducer.auth);
    let configsTokens = useSelector(state => state.configTokenReducer)
    console.log(configsTokens)
    const disparar = useDispatch();
    const {selectedChat, socket} = props;
    const [messageList, setMessageList] = useState([]);
    const [message, SetMessage] = useState("");
    const messagesEndRef = useRef(null)
    const [messagesList, dispatch] = useReducer(reducer, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
   
    console.log("rendering chat component")
    useEffect(() => {
        // if(!testeo)setMessageList(userMessages);
        // load initial data 
        if(!testeo) dispatch({type: "LOAD_MESSAGES", payload: userMessages})
    }, [userMessages])

    useEffect(() => {
        scrollToBottom()
      }, [messagesList]);
    
    useEffect(() => {
        console.log('useEFFECT chat js');
        //setMessageList(userMessages);
        if(selectedChat) testeo=false;

        const eventListener = ({ messages }) => {
            //console.log(`${trigger}, ${from}, ${msg}`)
            console.log("dentro de listener cote chat");
            //dispatch(getMessagesFromChannel(from))   
            disparar(newIncomingMessage(messages))
            if(selectedChat)
            {
                if(selectedChat.phoneNumber === messages.from) {
                    dispatch({ type: "ADD_MESSAGE", payload: messages})
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
    }, [socket, selectedChat, disparar])

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (message === '') return;
        let channelId = "";
        // creates new conversation channel between two persons
        if(!messageList || !messageList.length) {
            
            const channelUsers = [{
                name: selectedChat.name,
                phoneNumber: selectedChat.phoneNumber,
                userId: selectedChat._id            
            },{
                name: auth?.data?.responseData?.lastName,
                phoneNumber: "15550900270",
                userId: auth?.data?.responseData?._id,
            }];
            console.log("=====", channelUsers)
            const channelResponse = await httpManager.createChannel({channelUsers});
            console.log("=====", channelResponse)
            channelId = channelResponse.data.responseData._id;
            console.log("=====", channelId);         
        } else {
            console.log(selectedChat._id)
            const receiveId = await httpManager.getChannelList(selectedChat._id);
            console.log(receiveId);
            channelId = receiveId.data.responseData[0]._id;
        }
    
        const messages = [...messageList];
        // message I want to send to 
        const msgReqData ={
            name: auth?.data?.responseData?.lastName,
            message,
            to: selectedChat.phoneNumber,
            from: "15550900270",
            addedOn: new Date().getTime(),
            senderID: 0, 
            isRead: false
        };
        console.log("verificar ", channelId)

        
        const saved = localStorage.getItem("whatsapp_app");
        if(!saved){ alert('insertar tokens primero'); return}
        const configs = JSON.parse(saved);
        const tokenId = configs.token;
        const numberId = configs.phoneId

            await httpManager.sendMessage({
                tokenId,
                numberId,
                channelId,
                messages: msgReqData
            })

            messages.push(msgReqData);
            dispatch({ type: "ADD_MESSAGE", payload: msgReqData})
            SetMessage("");
    }

    const onMessageTextChanged = (typedText) => {
        SetMessage(typedText);
    }

    const deleteALl = async () => {
            setMessageList([]);
            let channelId;
            const receiveId = await httpManager.getChannelList(selectedChat._id);
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
                    messagesList.map((userDataMessage, index) => (
                        <Messagebox key = {index} userDataMessage = {userDataMessage}/>
                    ))   
                }
                <div ref={messagesEndRef} />
    
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