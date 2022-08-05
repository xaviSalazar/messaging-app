import React, {useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import './Chat.css';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import './utils/Messagebox'
import Messagebox from './utils/Messagebox';

const Chat = () => {
    const [seed, setSeed] = useState("");

    useEffect(() => { 
        setSeed(Math.floor(Math.random()*5000))
    }, [])

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src = {`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
                <div className='chat__headerInfo'>
                    <h3>Room name</h3>
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
                < Messagebox />
                < Messagebox />
                < Messagebox />
            </div>
            <div className='chat__footer'>
                <InsertEmoticon />
                <form>
                    <input  
                        placeholder='Type a message'
                        type='text'
                    />
                    <button type="submit">Send Message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat;