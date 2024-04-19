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

module.exports = {
    login,
    setUuid,
    getUuid,
    getAllUsers
}
