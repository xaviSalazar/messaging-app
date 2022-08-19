import React from "react";
import { Link, useLocation } from 'react-router-dom'
import "./Navbar.css"
import { ChatOutlined } from "@material-ui/icons";
import { SettingsOutlined } from "@material-ui/icons";
import { PersonOutlineOutlined } from "@material-ui/icons";

const Navbar = () => {
    
    const location = useLocation();
    return (
        <>
            <nav className="navbar">
                    <ul>
                        <li><Link className={location.pathname === "/" ? "active": null} to="/"><ChatOutlined/></Link></li>
                        <li><Link className={location.pathname === "/settings" ? "active": null} to="/settings"><SettingsOutlined/></Link></li>
                        <li><Link className={location.pathname === "/contacts" ? "active": null} to="/contacts"><PersonOutlineOutlined/></Link></li>
                    </ul>
            </nav>
        </>
    );
}

export default Navbar;