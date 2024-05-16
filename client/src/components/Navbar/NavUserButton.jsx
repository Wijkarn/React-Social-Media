import { NavLink } from "react-router-dom";

export default function NavUserButton({ username }) {
    return (
        <NavLink className="nav-buttons" to={username ? `/profile/${username}` : "/login"}>
            <img src="/assets/falcon512.svg" alt="Profile" id="nav-user-icon" className="nav-icons"/>
            <span id="nav-username">{username ? username : "Profile"}</span>
        </NavLink>
    );
}
