import { NavLink } from "react-router-dom";
import "../css/LoginForm.css";

export default function loginForm({ setUsername }) {

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const username = formData.get("username");
            const password = formData.get("password");

            const cred = {
                username,
                password
            }

            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cred)
            });

            const data = await response.json();

            if (data.loggedIn) {
                localStorage.setItem("uuid", data.loggedIn);
                localStorage.setItem("username", username);
                setUsername(username);
                window.location.replace("/home");
            }
            else {
                localStorage.clear();
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <div id="form-div">
            <h1>Login</h1>
            <form onSubmit={handleLogin} id="login-form">
                <label htmlFor="form-username">Username:</label>
                <input type="text" name="username" id="form-username" required autoComplete="username" />
                <label htmlFor="form-password">Password:</label>
                <input type="password" name="password" id="form-password" required autoComplete="off" />
                <button type="submit" id="log-in-out-btn">Login</button>
                <NavLink id="login-register-btn" to="/register" >Don't have an account? Click here to register!</NavLink>
            </form>
        </div>
    );
}