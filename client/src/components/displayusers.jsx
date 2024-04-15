import { useEffect, useState } from "react";
export default function DisplayUsers() {

    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("/api")
            .then(response => response.json())
            .then(data => {
                setBackendData(data.users);
            });

    }, []);

    return (
        <ol>
            {(typeof backendData === "undefined") ? (
                <li>Loading...</li>
            ) : (
                Object.keys(backendData).map(username => (
                    <li key={username}>{backendData[username].firstname} {backendData[username].lastname}</li>
                ))

            )}
        </ol>
    );
}