import "../css/LoginForm.css";

export default function loginForm({ setUsername }) {

    async function handleLogin(e) {
        e.preventDefault();

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

    return (
        <div id="form-div">
            <h2>Login</h2>
            <form onSubmit={handleLogin} id="login-form">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="form-username" required />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="form-password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}