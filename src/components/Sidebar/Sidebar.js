import React, {useState} from "react";
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {  IconButton, Avatar } from '@material-ui/core';
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
                <Avatar >{auth?.data?.responseData?.firstName.charAt(0) + auth?.data?.responseData?.lastName.charAt(0)}</Avatar>
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