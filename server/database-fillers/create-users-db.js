const { registerUser } = require("../database.js");
const fbiWantedUrl = "https://api.fbi.gov/wanted/v1/list";
const randomUserUrl = "https://randomuser.me/api/";

const userAmount = 20;

async function start() {
    for (let i = 1; i <= userAmount; i++) {
        const data = await getData();

        const username = data.username;
        delete data.username;

        const userData = {
            [username]: data
        }
        
        const created = await registerUser(userData);

        created ? console.log(`Created ${username}`) : console.error(`Error creating ${username}`);
    }
}

async function getData() {
    const response = await fetch(randomUserUrl);
    const data = await response.json();
    const user = data.results[0];

    return {
        username: user.login.username,
        firstname: user.name.first,
        lastname: user.name.last,
        password: user.login.password,
        email: user.email
    }
}

start();