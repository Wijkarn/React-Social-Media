import { Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function NotFoundPage() {
    return <>
        <Navbar />
        <div>404 Not Found
            <Link to="/">Home from Link</Link>
        </div>
    </>;
}