import { Link } from "react-router-dom";
import "../css/ErrorPage.css";

export default function NotFoundPage() {
    return (
        <div id="not-found-page-div">
            <h1>404 Not Found</h1>
            <Link to="/home">Go to Home Page</Link>
        </div>
    );
}