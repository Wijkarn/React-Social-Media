const getDbUrl = require("./getLoginUrl");
const { v4: uuid } = require("uuid");

module.exports = async function login(username, password) {
    const fbUrl = `${getDbUrl()}users/${username}.json`;
    const response = await fetch(fbUrl);
    const data = await response.json();

    if (data) {
        return password === data.password ? uuid() : null;
    }

    return null;
}
