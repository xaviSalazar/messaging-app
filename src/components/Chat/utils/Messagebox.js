import React from 'react'
import './Messagebox.css'
import ReactAudioPlayer from 'react-audio-player'

const renderType = (userDataMessage) => {

    switch(userDataMessage.type) {
        case 'text':
          return <span className= 'chat__paragraph'>{userDataMessage.message}</span>;
        case 'image':
          return <img src={userDataMessage.message} width="200" height="200" /> ;
        case 'audio':
          return <ReactAudioPlayer src={userDataMessage.message} controls/>
        default:
            return null;
    }
}

const Messagebox = (props) => {

    const { userDataMessage } = props;

    return (
        <p className={(userDataMessage.senderID === 0 ?'chat__message chat__receiver':'chat__message')}>
                    <span className = 'chat__name' >
                        {userDataMessage.name}
                    </span>
                    {renderType(userDataMessage)}
                    <br></br>
                    <span className='chat__timestamp'>
                        {new Date(userDataMessage.addedOn).toUTCString()}
                    </span>
        </p>
    )

}

export default Messagebox;