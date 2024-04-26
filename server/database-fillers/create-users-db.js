const { registerUser } = require("../database.js");
const fbiWantedUrl = "https://api.fbi.gov/wanted/v1/list";
const randomUserUrl = "https://randomuser.me/api/";

const userAmount = 20;

async function start() {
    for (let i = 0; i < userAmount; i++) {
        const userData = await getData();

        if (userData) {
            const username = Object.keys(userData)[0];
            const created = await registerUser(userData);
            console.log(created);

            created ? console.log(`Created ${username}`) : console.error(`Error creating ${username}`);
        }
        else {
            console.log("Didn't create user");
        }
    }
}

async function getData() {
    const response = await fetch(randomUserUrl);
    const data = await response.json();
    const user = data.results[0];

    const username = user.login.username;
    const firstname = user.name.first;
    const lastname = user.name.last;
    const password = user.login.password;
    const email = user.email;
    const created = getRandomDate();

    const obj = {
        [username]: {
            firstname,
            lastname,
            password,
            email,
            created
        }
    }

    return isASCII(firstname) && isASCII(lastname) ? obj : null;
}

function isASCII(str) {
    // Create a regular expression to match non-ASCII characters
    const asciiRegex = /^[\x00-\x7F]*$/;
    // Test if the string matches the regular expression
    return asciiRegex.test(str);
}

function getRandomDate() {
    const date = new Date();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${hours}:${minutes} ${day}-${month}-${year}`;
}

start();
