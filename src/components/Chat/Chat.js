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
//import FileUploadPage from '../FileUploadPage/FileUploadPage'
var testeo = true;

const reducer = (state, action) => {
    if(action.type === "ADD_MESSAGE") {
        const new_message = action.payload;
        state.push(new_message)
        return [...state]        
    }

    if( action.type === "LOAD_MESSAGES" ) {
        const messages = action.payload;
        return [...messages]
    }
}

let tokenId;
let numberId;

const saved = localStorage.getItem("whatsapp_app");
if (saved) {
const configs = JSON.parse(saved);
tokenId = configs.token;
numberId = configs.phoneNumberId
} else {
    alert('ingrese los tokens de config')
}

const Chat = (props) => {

    const userMessages  = useSelector((state) => state.getMessagesFromChannel);
    let auth = useSelector(state => state.customerReducer.auth);
    //let configsTokens = useSelector(state => state.configTokenReducer)
    const disparar = useDispatch();
    const {selectedChat, socket} = props;
    const [messageList, setMessageList] = useState([]);
    const [message, SetMessage] = useState("");
    const messagesEndRef = useRef(null)
    const [messagesList, dispatch] = useReducer(reducer, []);
    const hiddenFileInput = React.useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const [initTemplate, setInitTemplate] = useState();
  
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = async (event) => {

        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0].type)
        const {data} = await httpManager.getPresignedUrl(event.target.files[0].name)
        const pipe = {
            bucket: "myawsbucketwhatsapp",
            ...data.fields,
            'Content-Type':event.target.files[0].type ,
            file: event.target.files[0]
        };

        const formData = new FormData();
		for (const name in pipe) {
			formData.append(name, pipe[name]);
		}
		await httpManager.uploadFileFromBrowser(data.url, formData)
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
   
    //console.log("rendering chat component")
    useEffect(() => {
        // if(!testeo)setMessageList(userMessages);
        // load initial data 
        if(!testeo) dispatch({type: "LOAD_MESSAGES", payload: userMessages})
    }, [userMessages])

    useEffect(() => {
        scrollToBottom()
      }, [messagesList]);
    
    useEffect(() => {
        //console.log('useEFFECT chat js');
        //setMessageList(userMessages);
        if(selectedChat) testeo=false;
        const eventListener = ({ messages }) => {
            //console.log(`${trigger}, ${from}, ${msg}`)
            console.log("new incoming message im in chat js"); 
            disparar(newIncomingMessage(messages))
            if(selectedChat)
            {
                if(selectedChat.phoneNumber === messages.from) {
                    dispatch({ type: "ADD_MESSAGE", payload: messages})
                    //console.log('entro en true')
                    testeo = true;
                }         
            }     
        };

        socket.on('user_answered', eventListener);
        return () => {
            socket.off('user_answered') 
         }
    }, [socket, selectedChat, disparar])

    const handleSubmit = async (e) => {

        e.preventDefault(); 

        if (message === '' && (!selectedFile)) return;

            const channelUsers = [{
                name: selectedChat.name,
                phoneNumber: selectedChat.phoneNumber,
                userId: selectedChat._id            
            },{
                name: auth?.data?.responseData?.lastName,
                phoneNumber: auth?.data?.responseData?.phoneNumberId,
                userId: auth?.data?.responseData?._id,
            }];
            
        const messages = [...messageList];
        let msgReqData;
        // message I want to send to 
        if(selectedFile) {
            let filetype;
           if(selectedFile.type === "image/jpeg") { filetype="image"}
           else if(selectedFile.type === "application/pdf") {filetype="document"}

            msgReqData ={
                name: auth?.data?.responseData?.lastName,
                message: `https://d1d5i0xjsb5dtw.cloudfront.net/${selectedFile.name}`,
                to: selectedChat.phoneNumber,
                type: filetype,
                from: numberId,
                addedOn: new Date().getTime(),
                senderID: 0, 
                isRead: false
            }; 
            setSelectedFile();   
        } else {
            msgReqData ={
                name: auth?.data?.responseData?.lastName,
                message,
                to: selectedChat.phoneNumber,
                type: "text",
                from: numberId,
                addedOn: new Date().getTime(),
                senderID: 0, 
                isRead: false
            }; 
         
        }
        

        if(!saved){ alert('insertar tokens primero'); return }

            await httpManager.sendMessage({
                channelUsers,
                tokenId,
                numberId,
                messages: msgReqData
            })
            messages.push(msgReqData);
            // internal use for message list 
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
                    <IconButton onClick={handleClick}>
                        <AttachFile />
                    </IconButton>
                    <input type="file" 
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            style={{display:'none'}}
                    />
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            {selectedFile ? <img alt='preview' src={`https://d1d5i0xjsb5dtw.cloudfront.net/${selectedFile.name}`} width="400" height="500" /> 
                          :
            <div className='chat__body'>
                <button onClick={deleteALl}> Delete Messages</button>

                {
                    messagesList.map((userDataMessage, index) => (
                        <Messagebox key = {index} userDataMessage = {userDataMessage}/>
                    ))   
                }
                <div ref={messagesEndRef} />
            </div>}

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