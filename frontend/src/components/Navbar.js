import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getToken, isAdmin, logout } from "../utils/auth";

export default function Navbar() {
  const navRef = useRef(null);
  const underlineRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (underlineRef.current) {
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [location.pathname]);

  const NavLink = ({ to, label }) => (
    <Link to={to} className={location.pathname === to ? "active" : ""}>
      {label}
      {location.pathname === to && (
        <span className="underline" ref={underlineRef}></span>
      )}
    </Link>
  );

  return (
    <>
      <style>
        {`
          .navbar {
            background: #0f2027;
            padding: 14px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
          }

          .nav-left,
          .nav-right {
            display: flex;
            gap: 20px;
            align-items: center;
          }

          .navbar a {
            color: #ddd;
            text-decoration: none;
            position: relative;
          }

          .navbar a:hover,
          .active {
            color: #00c6ff;
          }

          .underline {
            position: absolute;
            bottom: -6px;
            left: 0;
            height: 2px;
            width: 100%;
            background: #00c6ff;
            transform-origin: left;
          }

          .logout-btn {
            background: transparent;
            border: 1px solid #00c6ff;
            color: #00c6ff;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
          }

          .logout-btn:hover {
            background: #00c6ff;
            color: black;
          }
        `}
      </style>

      <nav className="navbar" ref={navRef}>
        <div className="nav-left">
          <NavLink to="/" label="Home" />
          <NavLink to="/track" label="Track" />
          <NavLink to="/contact" label="Contact" />
        </div>

        <div className="nav-right">
          {!getToken() && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {isAdmin() && (
            <>
              <Link to="/create">Create</Link>
              <Link to="/admin">Admin</Link>
            </>
          )}

          {getToken() && (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
