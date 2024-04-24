import { NavLink } from "react-router-dom";

export default function NavAddPostButton() {
    return (
        <NavLink to="/upload" className="nav-buttons">
            <img src="/assets/add-icon.svg" alt="Add posts" id="nav-add-icon" className="nav-icons"/>
        </NavLink>
    );
}