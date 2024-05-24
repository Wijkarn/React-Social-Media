import { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

export default function DisplayUsers() {
    const [loadingText, setLoadingText] = useState("Loading users.");
    const loadingUsers = useMemo(() => ({
        loadingUser: {
            firstname: loadingText
        }
    }), [loadingText]);
    const [users, setUsers] = useState(loadingUsers);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch("test");
                const data = await response.json();

                setUsers(data);
            }
            catch (e) {
                console.error(e);
                setUsers(null);
            }
        }
        getUsers();
    }, []);

    useEffect(() => {
        if (users && Object.keys(users)[0] === "loadingUser") {
            const intervalId = setInterval(() => {
                setLoadingText(prevText => prevText.split('.').length > 3 ? "Loading users." : prevText + ".");
                setUsers(loadingUsers);
            }, 250);

            return () => clearInterval(intervalId);
        }
    }, [users, loadingUsers]);

    return (
        <ol>
            {users ? (
                Object.keys(users).map(username => (
                    <li key={username}><NavLink to={`/profile/${username}`}>{users[username].firstname} {users[username].lastname}</NavLink></li>
                ))
            ) : (
                <li>Error getting users!</li>
            )}
        </ol>
    );
}
