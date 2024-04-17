const getDbUrl = require("./getLoginUrl");

async function setUuid(username, uuid) {
    const fbUrl = `${getDbUrl()}users/${username}.json`;

    const options = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({uuid})
    }

    fetch(fbUrl, options);
}

module.exports = setUuid;