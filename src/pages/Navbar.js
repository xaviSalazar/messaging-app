import React from "react";
import { Link, useLocation } from 'react-router-dom'
import "./Navbar.css"


const Navbar = () => {
    
    const location = useLocation();
    return (
        <>
            <nav className="navbar">
                    <ul>
                        <li><Link className={location.pathname === "/" ? "active": null} to="/">Chat app</Link></li>
                        <li><Link className={location.pathname === "/settings" ? "active": null} to="/settings">Settings</Link></li>
                        <li><Link className={location.pathname === "/contacts" ? "active": null} to="/contacts">Contacts</Link></li>
                    </ul>
            </nav>
        </>
    );
}

export default Navbar;