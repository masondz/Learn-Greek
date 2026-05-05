import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearWord } from "./features/wordSlice";
import "./Menu.css";

const Menu = ({ menuLinks }) => {
  const [openOrClosed, setIsOpenOrClosed] = useState("closed");

  const dispatch = useDispatch();

  return (

    <div className={`menu-container-${openOrClosed}`}>
      <div
        className={`menu-button-container-${openOrClosed}`}
        key="verb-menu-button"
      >
        <button
          className="menu-toggle-button"
          onClick={() =>
            openOrClosed === "open"
              ? setIsOpenOrClosed("closed")
              : setIsOpenOrClosed("open")
          }
        >
          {openOrClosed === "open" ? "X" : "="}
        </button>
      </div>

      <div>
        <div key="menu-links" className="menu-links">
          <h3>Links</h3>
          {menuLinks.map((link) => {
            return (
              <div key={link}>
                <Link
                  to={"/" + link}
                  className="menu-link"
                  onClick={() => dispatch(clearWord())}
                >
                  {link === "parsing-verse" ? "Parsing Practice" : link}
                </Link>
                <br></br>
              </div>
            );
          })}
          <Link to={"/"} className="menu-link" key="home-link">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
