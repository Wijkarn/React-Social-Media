import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <div id="not-found-page-div">404 Not Found
                <Link to="/home">Go to Home Page</Link>
            </div>
        </>
    );
}