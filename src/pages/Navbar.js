import React from "react";
import { Link } from 'react-router-dom'
import "./Navbar.css"


const Navbar = () => {

    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">

                <ul>
                <li>
                    <Link to="/">Chat app</Link>
                    </li>
                    <li>
                    <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                    <Link to="/others">Others</Link>
                    </li>
                 </ul>

            </div>
        
        </nav>   
        </>
    );
}

export default Navbar;