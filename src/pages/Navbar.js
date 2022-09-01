import React from "react";
import { Link, useLocation } from 'react-router-dom'
import "./Navbar.css"
import { ChatOutlined } from "@material-ui/icons";
import { SettingsOutlined } from "@material-ui/icons";
import { PersonOutlineOutlined } from "@material-ui/icons";
import {useSelector} from 'react-redux'
import Menu from "@material-ui/core/Menu"
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import {doCustomerLogout} from '../redux/Authentification/Actions'
import { useDispatch } from "react-redux";



const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(doCustomerLogout()).then(res => {
      //console.log(res.payload.data.success)
      if(res.payload.data.success) {
        localStorage.removeItem("customerToken");
        alert("logout success")
      }
    })
  }  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

let auth = useSelector(state => state.customerReducer.auth)
   
    const location = useLocation();
    return (
        <>
            <nav className="navbar">
                    <ul>
                        <li><Link className={location.pathname === "/dashboard" ? "active": null} to= "/dashboard" ><ChatOutlined/> </Link></li>
                        <li><Link className={location.pathname === "/settings" ? "active": null} to= "/settings" ><SettingsOutlined/> </Link></li>
                        <li><Link className={location.pathname === "/contacts" ? "active": null} to= "/contacts" ><PersonOutlineOutlined/> </Link></li>
                        <li>{auth?.data?.success?<> <Button 
                                                        onClick={handleClick}>
                                                        Account 
                                                  </Button>
                                                  <Menu
                                                    keepMounted
                                                    anchorEl={anchorEl}
                                                    onClose={handleClose}
                                                    open={Boolean(anchorEl)}
                                                >
                                                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                    </Menu></>
                                                  :null}</li>
                    </ul>
            </nav>
        </>
    );

}

export default Navbar;