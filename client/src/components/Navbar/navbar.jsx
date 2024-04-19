import "../../css/Navbar.css";
import NavUserButton from "./NavUserButton";
import NavLoginBtn from "./NavLoginButton";
import { Link } from "react-router-dom";

export default function Navbar({ username }) {

    return (
        <nav id="top-nav">
            <Link to="/home" className="nav-buttons">HomePage</Link>
            <NavUserButton username={username} />
            <NavLoginBtn username={username} />
        </nav>
    );
}
