const express = require("express");
const app = express();
const logger = require("morgan");
const PORT = 5000;
const { login, setUuid, getUuid, getAllUsers, registerUser, uploadPost, getAllPostsFromUser, getAPost, deletePost, postComment, deleteComment } = require("./database.js");
const { createDate } = require("./random-functions.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

app.get("/test", async (req, res) => {
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
    try {
        const { username, password } = req.body;

        const loggedIn = await login(username, password);
        console.log(loggedIn);
        if (loggedIn) {
            setUuid(username, loggedIn);
        }
        res.json(loggedIn);
    }
    catch (e) {
        res.json(null);
        console.error(e);
    }
});

app.post("/browser-session", async (req, res) => {
    try {
        const { username, uuid } = req.body;

        const isLoggedIn = await getUuid(username, uuid);

        res.json(isLoggedIn);
    }
    catch (e) {
        res.json(null);
        console.error(e);
    }
});

app.post("/register-user", async (req, res) => {
    try {
        const { firstname, lastname, username, password, email } = req.body;

        const userData = {
            [username]: {
                firstname,
                lastname,
                password,
                email,
                uuid: null,
                created: createDate()
            }
        }

        const registered = await registerUser(userData);

        res.json(registered);
    }
    catch (e) {
        res.json(null);
        console.error(e);
    }
});

app.post("/upload-post", async (req, res) => {
    try {
        const { username, title, content } = req.body;

        const userData = {
            title,
            content,
            date: createDate()
        }

        const success = await uploadPost(username, userData);
        res.json(success);
    }
    catch (e) {
        console.error(e);
        res.json(null);
    }
});

app.post("/get-posts-from-user", async (req, res) => {
    try {
        const { username } = req.body;
        const posts = await getAllPostsFromUser(username);
        res.json(posts);
    }
    catch (e) {
        console.error(e);
        res.json(null);
    }
});

app.post("/get-a-post", async (req, res) => {
    try {
        const { username, postId } = req.body;
        const post = await getAPost(username, postId);
        res.json(post);
    }
    catch (e) {
        console.error(e);
        res.json(null);
    }
});

app.delete("/delete-post", async (req, res) => {
    try {
        const { username, postId } = req.body;

        const isDeleted = await deletePost(username, postId);

        res.json(isDeleted);
    }
    catch (e) {
        console.error(e);
        res.json(null);
    }
});

app.post("/upload-comment", async (req, res) => {
    try {
        const { postId, postUser, commentUser, commentContent } = req.body;

        const comment = await postComment(postId, postUser, commentUser, commentContent, createDate());

        res.json(comment);
    }
    catch (e) {
        console.log(e);
        res.json(null);
    }
});

app.delete("/delete-comment", async (req, res) => {
    try {
        const { postId, postUser, commentId } = req.body;

        const success = await deleteComment(postUser, postId, commentId);
        res.json(success);
    }
    catch (e) {
        console.log(e);
        res.json(null);
    }
}); 
