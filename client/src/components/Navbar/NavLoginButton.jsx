import { Link } from "react-router-dom";

export default function logInBtn() {

    async function handleClick() {
        const cred = { username: "username1", password: "password1" }

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cred)
        });
        const data = await response.json();
        console.log(data);
    }

    return <Link to="/" onClick={handleClick}>Login</Link>;
}
