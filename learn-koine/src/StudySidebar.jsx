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
  const [triggerHidden, setTriggerHidden] = useState(false);
  const sidebarRef = useRef(null);
  const scrollPosition = useRef(0);
  const scrollDelta = useRef(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const scrollTarget = sidebarRef.current?.closest(".verse-component") || window;
    const getScrollPosition = () =>
      scrollTarget === window ? window.scrollY : scrollTarget.scrollTop;

    scrollPosition.current = getScrollPosition();
    const onScroll = () => {
      const nextPosition = getScrollPosition();
      const delta = nextPosition - scrollPosition.current;
      scrollPosition.current = nextPosition;

      if (open || Math.abs(delta) < 1) return;
      if (delta > 0) {
        scrollDelta.current = Math.max(0, scrollDelta.current) + delta;
        if (scrollDelta.current >= 24) {
          setTriggerHidden(true);
          scrollDelta.current = 0;
        }
      } else {
        scrollDelta.current = Math.min(0, scrollDelta.current) + delta;
        if (scrollDelta.current <= -120) {
          setTriggerHidden(false);
          scrollDelta.current = 0;
        }
      }
    };

    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollTarget.removeEventListener("scroll", onScroll);
  }, [open]);

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
      className={`floating-sidebar${open ? " is-open" : ""}${triggerHidden && !open ? " trigger-hidden" : ""}`}
      aria-label="Page navigation"
    >
      <button
        type="button"
        className="floating-sidebar-trigger"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <span className="floating-sidebar-brand">DidaKey</span>
        <span className="floating-sidebar-icon" aria-hidden="true">
          {open ? "×" : "☰"}
        </span>
      </button>
      <div className="floating-sidebar-content" aria-hidden={!open}>
        {children}
        <nav className="floating-sidebar-links" aria-label="Study pages">
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
