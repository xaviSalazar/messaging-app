import React from 'react'
import './Messagebox.css'

const Messagebox = (props) => {

    const { userDataMessage } = props;

    return (
        <p className={(userDataMessage.senderID === 0 ?'chat__message chat__receiver':'chat__message')}>
                    <span className = 'chat__name' >
                        {userDataMessage.name}
                    </span>
                    
                    {userDataMessage.type === "text" ? (
                    <span className= 'chat__paragraph'>
                        {userDataMessage.message}
                    </span>) : <img src={userDataMessage.message} width="200" height="200" /> }
                    <br></br>
                    <span className='chat__timestamp'>
                        {new Date(userDataMessage.addedOn).toUTCString()}
                    </span>
        </p>
    )

}

export default Messagebox;