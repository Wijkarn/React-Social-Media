import { NavLink } from "react-router-dom";

export default function logInBtn() {

    function getUsername() {
        const username = localStorage.getItem("username");
        const uuid = localStorage.getItem("uuid");
        return (uuid && username) ? username : null;
    }

    return (
        <NavLink to={getUsername() ? "/home" : "/login"} className="nav-buttons">{getUsername() ? "Logout" : "Login"}</NavLink>
    );
}
