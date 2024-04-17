const express = require("express");
const app = express();
const PORT = 5000;
const login = require("./login.js");
const getdbUrl = require("./getLoginUrl.js");
const setUuid = require("./setUuid.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api", async (req, res) => {
    console.log(`Request at ${new Date().toLocaleString()}`);
    const response = await fetch(`${getdbUrl()}/users.json`);
    const users = await response.json();

    res.json({ users });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    console.log(`Login attempt at ${new Date().toLocaleString()} by: ${username}`);

    const loggedIn = await login(username, password);
    setUuid(username, loggedIn);
    res.json({ loggedIn });
});
