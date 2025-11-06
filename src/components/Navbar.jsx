import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo (2).png";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const burgerRef = useRef(null);

  // Close menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => sidebarRef.current?.querySelector("a,button")?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      burgerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header>
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-container">
          <Link to="/" className="logo" aria-label="Home - Hour Metric">
            <img src={logo} alt="Hour Metric Logo" className="logo-img" />
            <span className="logo-text">Hour Metric</span>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links desktop-only" role="menu">
            <Link to="/" className={isActive("/") ? "active" : ""} role="menuitem">
              Home
            </Link>
            <Link to="/products" className={isActive("/products") ? "active" : ""} role="menuitem">
              Products
            </Link>
            <Link to="/about" className={isActive("/about") ? "active" : ""} role="menuitem">
              About
            </Link>
            <Link to="/contact" className={isActive("/contact") ? "active" : ""} role="menuitem">
              Contact
            </Link>
            <Link to="/admin" className={isActive("/admin") ? "active admin-link" : "admin-link"} role="menuitem">
              Admin
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="mobile-controls">
            <button
              ref={burgerRef}
              className={`burger ${open ? "open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-sidebar"
              onClick={() => setOpen((s) => !s)}
            >
              <span className="burger-bar" />
              <span className="burger-bar" />
              <span className="burger-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Mobile Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`mobile-sidebar ${open ? "open" : ""}`}
        ref={sidebarRef}
        aria-hidden={!open}
        aria-label="Mobile menu"
      >
        <div className="sidebar-header">
          <Link to="/" className="logo sidebar-logo" onClick={() => setOpen(false)}>
            <img src={logo} alt="Hour Metric Logo" className="logo-img" />
            <span className="logo-text">Hour Metric</span>
          </Link>
          <button className="close-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav" role="menu">
          <Link to="/" className={isActive("/") ? "active" : ""} onClick={() => setOpen(false)} role="menuitem">
            Home
          </Link>
          <Link to="/products" className={isActive("/products") ? "active" : ""} onClick={() => setOpen(false)} role="menuitem">
            Products
          </Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""} onClick={() => setOpen(false)} role="menuitem">
            About
          </Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""} onClick={() => setOpen(false)} role="menuitem">
            Contact
          </Link>
          <Link to="/admin" className={isActive("/admin") ? "active admin-link" : "admin-link"} onClick={() => setOpen(false)} role="menuitem">
            Admin
          </Link>
        </nav>

        <div className="sidebar-footer">
          <a
            className="whatsapp-cta"
            href="https://wa.me/923012119368"
            target="_blank"
            rel="noreferrer"
          >
            Contact via WhatsApp
          </a>
        </div>
      </aside>
    </header>
  );
}

