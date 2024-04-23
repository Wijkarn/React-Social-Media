import { NavLink } from "react-router-dom";

export default function logInBtn({ username }) {
    return (
        <NavLink to="/login" className="nav-buttons">{username ? "Logout" : "Login"}</NavLink>
    );
}
