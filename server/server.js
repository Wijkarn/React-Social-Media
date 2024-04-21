const express = require("express");
const app = express();
const PORT = 5000;
const { login, setUuid, getUuid, getAllUsers, registerUser, uploadPost } = require("./database.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/test", async (req, res) => {
    console.log(`Display all users request at ${new Date().toLocaleString()}`);

    const users = await getAllUsers();
    if (users) {
        for (const user in users) {
            delete users[user].password;
            delete users[user].uuid;
        }
    }
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.post("/login", async (req, res) => {
    console.log(`Login attempt at ${new Date().toLocaleString()}`);

    try {
        const username = req.body.username;
        const password = req.body.password;

        const loggedIn = await login(username, password);
        if (loggedIn) {
            setUuid(username, loggedIn);
        }
        res.json({ loggedIn });
    }
    catch (e) {
        res.json({ loggedIn: null });
        console.error(e);
    }
});

app.post("/browser-session", async (req, res) => {
    console.log(`Browser Session ${new Date().toLocaleString()}`);

    try {
        const username = req.body.username;
        const uuid = req.body.uuid;

        const isLoggedIn = await getUuid(username, uuid);

        res.json({ isLoggedIn });
    }
    catch (e) {
        res.json({ isLoggedIn: null });
        console.error(e);
    }
});

app.post("/register-user", async (req, res) => {
    console.log(`Register attempt at ${new Date().toLocaleString()}`);

    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        const userData = {
            [username]: {
                firstname,
                lastname,
                password,
                email,
                uuid: null
            }
        }

        const registered = await registerUser(userData);

        res.json({ registered });
    }
    catch (e) {
        res.json({ registered: null });
        console.error(e);
    }
});

app.post("/upload-post", async (req, res) => {
    try {
        const username = req.body.username;
        const title = req.body.title;
        const content = req.body.content;

        const userData = {
            title,
            content
        }

        const success = await uploadPost(username, userData);
        res.json({ success });
    }
    catch (e) {
        console.error(e);
        res.json({ success: null });
    }
});
