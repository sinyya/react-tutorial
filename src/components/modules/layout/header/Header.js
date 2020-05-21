import React from 'react';
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div>
            <ul>
                <li>
                    <NavLink exact to="/" activeStyle={{ background: 'yellow' }}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" activeStyle={{ background: 'yellow' }}>About</NavLink>
                </li>
                <li>
                    <NavLink to="/etc" activeStyle={{ background: 'yellow' }}>Etc</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Header;