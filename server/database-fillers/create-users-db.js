const { registerUser } = require("../database.js");
const fbiWantedUrl = "https://api.fbi.gov/wanted/v1/list";
const randomUserUrl = "https://randomuser.me/api/";

const userAmount = 20;

async function start() {
    for (let i = 1; i <= userAmount; i++) {
        const userData = await getData();

        if (userData) {
            const username = Object.keys(userData)[0];
            const created = await registerUser(userData);
            console.log(created);

            created ? console.log(`Created ${username}`) : console.error(`Error creating ${username}`);
        }
    }
}

async function getData() {
    const response = await fetch(randomUserUrl);
    const data = await response.json();
    const user = data.results[0];

    const firstname = user.name.first;
    const lastname = user.name.last;

    const obj = {
        [user.login.username]: {
            firstname,
            lastname,
            password: user.login.password,
            email: user.email
        }
    }

    return isASCII(firstname) || isASCII(lastname) ? obj : null;
}

function isASCII(str) {
    // Create a regular expression to match non-ASCII characters
    const asciiRegex = /^[\x00-\x7F]*$/;
    // Test if the string matches the regular expression
    return asciiRegex.test(str);
}

start();
