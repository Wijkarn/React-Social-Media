import NavUserButton from "./NavUserButton";
import NavLoginBtn from "./NavLoginButton";
import "../../css/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ username }) {
    return (
        <nav>
            <Link to="/">HomePage</Link>
            <NavLoginBtn></NavLoginBtn>
            <NavUserButton username={username}></NavUserButton>
        </nav>
    );
}
