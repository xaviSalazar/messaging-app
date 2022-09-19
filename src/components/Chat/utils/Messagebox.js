import React from 'react'
import './Messagebox.css'
import ReactAudioPlayer from 'react-audio-player'

const renderType = (userDataMessage) => {
    switch(userDataMessage.type) {
        case 'button':
          return <span className= 'chat__paragraph'>{userDataMessage.message}</span>;
        case 'text':
          return <span className= 'chat__paragraph'>{userDataMessage.message}</span>;
        case 'image':
          return <a href={userDataMessage.message} target="_blank" rel="noreferrer">
                 <img alt="doc" src={userDataMessage.message} width="200" height="200" 
                   /> 
                 </a>;
        case 'audio':
          return <ReactAudioPlayer src={userDataMessage.message} controls/>;
        case 'document':
          return  <a href={userDataMessage.message} target="_blank" rel="noreferrer">
                  <img alt="document" src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                  width="200" height="200"/>
                  </a>
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
                    <span className='chat__status'>
                        {userDataMessage.status}
                    </span>
        </p>
    )

}

export default Messagebox;