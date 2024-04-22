import "../css/LoginForm.css";

export default function RegisterPage() {

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const firstname = formData.get("firstname");
      const lastname = formData.get("lastname");
      const username = formData.get("username");
      const password = formData.get("password");
      const email = formData.get("email");

      const cred = {
        firstname,
        lastname,
        username,
        password,
        email
      }

      for (const string in cred) {
        if (!string) {
          failedToCreateUser("Error getting credentials");
          return;
        }
      }

      const response = await fetch("/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cred)
      });

      const data = await response.json();

      data ? window.location.replace("/login") : failedToCreateUser("Error creating user (user most likely already exist)");
    }
    catch (e) {
      console.error(e);
      failedToCreateUser(e);
    }
  }

  function failedToCreateUser(message) {
    alert("Failed to create user! " + message);
  }

  return (
    <div id="form-div">
      <form onSubmit={handleRegister} id="register-form">
        <label htmlFor="form-firstname">Firstname:</label>
        <input type="text" name="firstname" id="form-firstname" required />
        <label htmlFor="form-lastname">Lastname:</label>
        <input type="text" name="lastname" id="form-lastname" required />
        <label htmlFor="form-username">Username:</label>
        <input type="text" name="username" id="form-username" required />
        <label htmlFor="form-email">Email:</label>
        <input type="email" name="email" id="form-email" required />
        <label htmlFor="form-password">Password:</label>
        <input type="password" name="password" id="form-password" required />
        <button type="submit" id="log-in-out-btn">Register</button>
      </form>
    </div>
  );
}
