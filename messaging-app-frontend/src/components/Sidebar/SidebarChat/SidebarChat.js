import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'

const SidebarChat = (props) => {

    const { userData } = props;

    // const[seed, setSeed] = useState("");

    // useEffect( ()=> {
    //     setSeed(Math.floor(Math.random()*5000))
    // }, [])

    return (
        <div className = "sidebarChat">
            <Avatar />
            <div className = "sidebarChat__info">
                <h2>{userData.name}</h2>
                <p>{userData.last_text_message}</p>
            </div>
        </div>
    )

}

export default SidebarChat;