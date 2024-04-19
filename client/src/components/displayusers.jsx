import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function DisplayUsers() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        fetch("/api")
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setUsers(data.users);
                }
            });
    }, []);

    return (
        <ol>
            {users ? (
                Object.keys(users).map(username => (
                    <li key={username}><NavLink to={username}>{users[username].firstname} {users[username].lastname}</NavLink></li>
                ))
            ) : (
                <li>Loading...</li>
            )}
        </ol>
    );
}
