const { registerUser } = require("./database.js");
const userAmount = 20;

async function start() {
    for (let i = 1; i <= userAmount; i++) {
        const userData = {
            [`username${i}`]: {
                firstname: `firstname${i}`,
                lastname: `lastname${i}`,
                password: `password${i}`,
                email: `email${i}@email.com`,
                uuid: null
            }
        }
        const created = await registerUser(userData);

        created ? console.log(`Created username${i}`) : console.error(`Error creating username${i}`);
    }
}

start();