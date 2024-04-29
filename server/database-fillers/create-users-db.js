const { registerUser } = require("../database.js");
const { createDate, isASCII } = require("../random-functions.js");

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
    const created = createDate();

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

start();
