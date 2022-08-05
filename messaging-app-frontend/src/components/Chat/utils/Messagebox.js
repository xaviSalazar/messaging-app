import React from 'react'
import './Messagebox.css'

const Messagebox = (props) => {

    // const { userData } = props;

    return (
        <p className='chat__message'>
                    <span className='chat__name'>victor</span>
                    This is a message
                    <span className='chat__timestamp'>
                        {new Date().toUTCString()}
                    </span>
        </p>
    )

}

export default Messagebox;