const { v4: uuid } = require("uuid");
const { getFetchOptions } = require("./random-functions.js");

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
        const fbUrl = `${getUrl()}users/${username}/uuid.json`;
        const options = getFetchOptions("PUT", uuid);

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

            const options = getFetchOptions("PATCH", userData);

            const registered = await fetch(fbUrl, options);

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

        const options = getFetchOptions("POST", userData);

        const response = await fetch(fbUrl, options);

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

        const options = getFetchOptions("DELETE");

        const response = await fetch(fbUrl, options);

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

        const options = getFetchOptions("POST", comment);

        const response = await fetch(fbUrl, options);

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

        const options = getFetchOptions("DELETE");

        const response = await fetch(fbUrl, options);
        const data = await response.json();

        return data;
    }
    catch (e) {
        console.error(e);
    }
    return null
}

function deleteUser(username) {
    try {
        const fbUrl = `${getUrl()}users/${username}.json`;

        const options = getFetchOptions("DELETE");

        fetch(fbUrl, options);
    }
    catch (e) {
        console.error(e);
    }
}

function deleteUserPosts(username) {
    try {
        const fbUrl = `${getUrl()}posts/${username}.json`;

        const options = getFetchOptions("DELETE");

        fetch(fbUrl, options);
    }
    catch (e) {
        console.error(e);
    }
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
    deleteComment,
    deleteUser,
    deleteUserPosts
}
