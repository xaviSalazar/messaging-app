import React, {useState} from "react";
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from './SidebarChat/SidebarChat'
import { contactList } from './Mockdata/Mockdata'
import { httpManager } from "../../managers/httpManager";

const Sidebar = (props) => {
    const [searchString, setSearchString] = useState("");

    const onSearchTextChanged = async (searchText) => {
        setSearchString(searchText);
        console.log(searchText);
        // to do: implement phone validation
        const userData = await httpManager.searchUser(searchText);
        console.log("userData: ", userData.data.responseData)
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
                        <SidebarChat key={index} userData = {userData} setChat = {props.setChat}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar;