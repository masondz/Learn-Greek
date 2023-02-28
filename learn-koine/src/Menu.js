import React from 'react';
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <div>
                <h3>Menu</h3>
            </div>
            <div className="menu-options">
                <button>option 1</button>
                <button>option 2</button>
                <button>option 3</button>
            </div>
            <div className="menu-links">
                <Link to={"vocabulary"}>Vocabulary</Link>
                <Link to={"/"}>Home</Link>
            </div>
        </div>
    )
}

export default Menu