const { v4: uuid } = require("uuid");

function getUrl() {
    return "https://react-social-media-d6626-default-rtdb.europe-west1.firebasedatabase.app/";
}

async function login(username, password) {
    try {
        const fbUrl = `${getUrl()}users/${username}.json`;
        const response = await fetch(fbUrl);
        const data = await response.json();

        if (data) {
            return password === data.password ? uuid() : null;
        }
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

function setUuid(username, uuid) {
    try {
        const fbUrl = `${getUrl()}users/${username}.json`;
        const options = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ uuid })
        }

        fetch(fbUrl, options);
    }
    catch (e) {
        console.error(e);
    }
}

async function getUuid(username, uuid) {
    try {
        const fbUrl = `${getUrl()}users/${username}.json`;
        const response = await fetch(fbUrl);
        const data = await response.json();

        if (data) {
            return data.uuid === uuid;
        }
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

async function getAllUsers() {
    try {
        const response = await fetch(`${getUrl()}users.json`);
        const users = await response.json();

        return users;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

async function registerUser(userData) {
    try {
        const userExists = await getUser(Object.keys(userData)[0]);
        if (!userExists) {
            const fbUrl = `${getUrl()}users.json`;

            const registered = await fetch(fbUrl, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(userData)
            });

            const data = await registered.json();

            return data ? true : null;
        }
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

async function getUser(username) {
    try {
        const fbUrl = `${getUrl()}users/${username}.json`;
        const response = await fetch(fbUrl);
        const data = await response.json();

        return data;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

async function uploadPost(username, userData) {
    try {
        const fbUrl = `${getUrl()}posts/${username}.json`;
        const response = await fetch(fbUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        return data;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

async function getAllPostsFromUser(username) {
    try {
        const fbUrl = `${getUrl()}posts/${username}.json`;
        const response = await fetch(fbUrl);
        const data = await response.json();

        return data;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

async function getAPost(username, postId) {
    try {
        const fbUrl = `${getUrl()}posts/${username}/${postId}.json`;
        const response = await fetch(fbUrl);
        const data = await response.json();

        return data;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

async function deletePost(username, postId) {
    try {
        const fbUrl = `${getUrl()}posts/${username}/${postId}.json`;
        const response = await fetch(fbUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });

        const data = await response.json();

        return data;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

async function postComment(postId, postUser, user, content, date) {
    try {
        const fbUrl = `${getUrl()}posts/${postUser}/${postId}/comments/.json`;

        const comment = {
            user,
            content,
            date
        }

        const response = await fetch(fbUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(comment)
        });

        const data = await response.json();

        return data;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

async function deleteComment(postUser, postId, commentId) {
    try {
        const fbUrl = `${getUrl()}posts/${postUser}/${postId}/comments/${commentId}.json`;
        
        const response = await fetch(fbUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        const data = await response.json();

        return data;
    }
    catch (e) {
        console.error(e);
    }
    return null
}

module.exports = {
    login,
    setUuid,
    getUuid,
    getAllUsers,
    registerUser,
    uploadPost,
    getAllPostsFromUser,
    getAPost,
    deletePost,
    postComment,
    deleteComment
}
