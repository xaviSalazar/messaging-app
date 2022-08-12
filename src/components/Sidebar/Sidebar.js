import React, {useState, useEffect} from "react";
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from './SidebarChat/SidebarChat'
import socket from '../../managers/socketioManager'
import { useSelector } from "react-redux";
import { searchOneUser, updateLastMessage } from '../../redux/GetUsers/UsersAction'
import { useDispatch } from 'react-redux';


const sessionID = localStorage.getItem("sessionID")

if(sessionID)  {
    console.log(`inside sessionID: ${sessionID}`)
    socket.auth = { sessionID }
    socket.connect()
} else {
    const username = "DefaultUser";
    socket.auth = { username }
    socket.connect()
}

socket.on("session", ({sessionID, userID}) => {
    // attach the session ID to the next reconnection attemps
    socket.auth = { sessionID };
    console.log(`sessionID ${sessionID}, userID ${userID}`)
    //store it in localStorage
    localStorage.setItem("sessionID", sessionID);
    //save the ID of the user
    socket.userID = userID
  
})


const Sidebar = (props) => {
  
    // 
    const dispatch = useDispatch();
    // const { refreshContactList } = props;
    const [searchString, setSearchString] = useState("");
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    // use selectors
    const contactList  = useSelector((state) => state.getUsers);
    console.log("rendering")

    useEffect(() => {
        const eventListener = ({ trigger, from, msg}) => {
            console.log("dentro de listener");
            dispatch(updateLastMessage(from, msg))
            forceUpdate()
        };
        socket.on('user_answered', eventListener);
        return () => socket.off('user_answered')

    }, [socket, dispatch, contactList])


    const onSearchTextChanged = async (searchText) => {
        setSearchString(searchText);
        //console.log(searchText);
        // to do: implement phone validation
        dispatch(searchOneUser(searchText))
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                 <Avatar src="https://pbs.twimg.com/profile_images/1020939891457241088/fcbu814K_400x400.jpg"/>
               <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input 
                        placeholder="Search or start new chat" 
                        type="text" 
                        value = {searchString}
                        onChange={(e) => onSearchTextChanged(e.target.value)}
                    />
                </div>
            </div>
            <div className="sidebar__chats">
                {
                    contactList.map((userData, index) => (                 
                        <SidebarChat 
                            key={index} 
                            userData = {userData} 
                            setChat = {props.setChat}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar;