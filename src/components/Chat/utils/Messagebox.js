import React from 'react'
import './Messagebox.css'

const Messagebox = (props) => {

    const { userDataMessage } = props;

    return (
        <p className={(userDataMessage.senderID === 1 ?'chat__message chat__receiver':'chat__message')}>
                    <span className = 'chat__name' >
                        {userDataMessage.name}
                    </span>
                        {userDataMessage.message}
                    <span className='chat__timestamp'>
                        {new Date().toUTCString()}
                    </span>
        </p>
    )

}

export default Messagebox;