import { useEffect, useState } from "react";

export default function DisplayUsers() {

    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        fetch("/api")
            .then(response => response.json())
            .then(data => {
                setUsers(data.users);
            });

    }, []);

    return (
        <ol>
            {(typeof users === "undefined") ? (
                <li>Loading...</li>
            ) : (
                Object.keys(users).map(username => (
                    <li key={username}>{users[username].firstname} {users[username].lastname}</li>
                ))
            )}
        </ol>
    );
}