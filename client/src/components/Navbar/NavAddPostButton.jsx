import { NavLink } from "react-router-dom";

export default function NavAddPostButton({ username }) {
    return (
        <NavLink to={username ? "/upload" : "/login"} className="nav-buttons">
            <img src="/assets/add-icon.svg" alt="Add posts" id="nav-add-icon" className="nav-icons" />
        </NavLink>
    );
}