import React, {useState} from "react";
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from './SidebarChat/SidebarChat'

import { useSelector } from "react-redux";
import { searchOneUser } from '../../redux/GetUsers/UsersAction'
import { useDispatch } from 'react-redux';


const Sidebar = (props) => {
  
    // 
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState("");
    // use selectors
    const contactList  = useSelector((state) => state.getUsers);
    let auth = useSelector(state => state.customerReducer.auth)
    console.log("rendering")

    const onSearchTextChanged = async (searchText) => {
        setSearchString(searchText);
        //console.log(searchText);
        // to do: implement phone validation
        dispatch(searchOneUser(searchText))
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <h1> {auth?.data?.responseData?.lastName }</h1>
                <h1> {auth?.data?.responseData?.firstName} </h1>
                <h1> {auth?.data?.responseData?.email} </h1>
                 {/* <Avatar src="https://pbs.twimg.com/profile_images/1020939891457241088/fcbu814K_400x400.jpg">
                </Avatar> */}
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