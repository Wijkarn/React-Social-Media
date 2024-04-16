import { NavLink } from "react-router-dom";

export default function NavUserButton({ username }) {
    return (
        <NavLink className="nav-buttons" to={username ? `/profile/${username}` : "/profile"}>
            <img src="../assets/falcon512.png" alt="Profile" id="nav-user-icon" />
            <span>Profile</span>
        </NavLink>
    );
}
