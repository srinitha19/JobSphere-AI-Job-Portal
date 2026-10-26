import {useState} from "react";
import {NavLink} from "react-router-dom";
import "./Navbar.css";

function Navbar(){

    const [darkMode, setDarkMode]=useState(false);

    const toggleTheme=()=>{
        setDarkMode(!darkMode);

        document.body.style.background=
            darkMode?"#000000" : "#ffffff";
    };

    const logout=()=>{
        localStorage.removeItem("isLoggedIn");
        window.location.href="/login";
    };

    const savedCount=
        JSON.parse(localStorage.getItem("savedJobs"))?.length || 0;

    return(
        <nav className="navbar">
            <div className="logo">
                JobSphere
            </div>

            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>

                <li>
                    <NavLink to="/jobs">Jobs</NavLink>
                </li>

                <li>
                    <NavLink to="/saved">Saved Jobs ({savedCount})</NavLink>
                </li>

                <li>
                    <NavLink to="/profile">👤Profile</NavLink>
                </li>

                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/companies">Companies</NavLink>
                </li>
                <li>
                    <NavLink to="/contact"></NavLink>
                </li>
                <li>
                    <button className="theme-btn" onClick={toggleTheme}>🌙</button>
                </li>
                <li>
                    <button className="logout-btn" onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;