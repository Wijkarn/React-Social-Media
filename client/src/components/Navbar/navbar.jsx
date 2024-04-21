import "../../css/Navbar.css";
import NavUserButton from "./NavUserButton";
import NavLoginBtn from "./NavLoginButton";
import { NavLink } from "react-router-dom";
import NavAddPostButton from "./NavAddPostButton";

export default function Navbar({ username }) {

    return (
        <nav id="top-nav">
            <NavLink to="/home" className="nav-buttons">HomePage</NavLink>
            <NavAddPostButton />
            <NavUserButton username={username} />
            <NavLoginBtn username={username} />
        </nav>
    );
}
