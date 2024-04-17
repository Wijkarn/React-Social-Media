import "../css/LoginForm.css";

export default function loginForm() {

    async function handleClick(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");

        console.log(username, password);

        const cred = { username, password }

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cred)
        });

        const data = await response.json();
        console.log(data);

        if (data.loggedIn) {
            localStorage.setItem("uuid", data.loggedIn);
            localStorage.setItem("username", username);
        }
        else {
            localStorage.clear();
        }
    }

    return (
        <div id="form-div">
            <h2>Login</h2>
            <form onSubmit={handleClick} id="login-form">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="form-username" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="form-password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}