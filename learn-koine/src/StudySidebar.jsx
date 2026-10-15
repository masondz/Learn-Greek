import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearWord } from "./features/wordSlice";
import "./Menu.css";

const pages = [
  { path: "/parsing-verse/", label: "Parsing Practice", id: "parsing-verse" },
  { path: "/verb", label: "Verb Practice", id: "verb" },
  { path: "/vocabulary", label: "Vocabulary", id: "vocabulary" },
];

export default function StudySidebar({ currentPage, children }) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!sidebarRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);

  return (
    <aside
      ref={sidebarRef}
      className={`study-sidebar${open ? " is-open" : ""}`}
      aria-label="Page navigation"
    >
      <button
        type="button"
        className="study-sidebar-toggle"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        {open ? "×" : "☰"}
      </button>
      <div className="study-sidebar-content" aria-hidden={!open}>
        {children}
        <nav className="study-sidebar-links" aria-label="Study pages">
          {pages.filter((page) => page.id !== currentPage).map((page) => (
            <Link
              key={page.id}
              to={page.path}
              className="menu-link"
              onClick={() => dispatch(clearWord())}
              tabIndex={open ? 0 : -1}
            >
              {page.label}
            </Link>
          ))}
          <Link to="/" className="menu-link" tabIndex={open ? 0 : -1}>
            Home
          </Link>
        </nav>
      </div>
    </aside>
  );
}
