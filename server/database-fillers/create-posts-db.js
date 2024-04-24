const { getAllUsers, uploadPost } = require("../database.js");
const boredApiUrl = "https://www.boredapi.com/api/activity";
const catFactsApiUrl = "https://catfact.ninja/fact";

async function start() {
    try {
        const users = await getAllUsers();

        for (const user in users) {
            createPost(user);
        }
    }
    catch (e) {
        console.log(e);
    }
}

async function createPost(username) {
    try {
        const title = await getTitle();
        const content = await getContent();

        const postObj = {
            title,
            content,
            date: getRandomDate()
        }

        const post = await uploadPost(username, postObj);
        console.log(username);
        console.log(post);
    }
    catch (e) {
        console.log(e);
    }
}

async function getTitle() {
    const response = await fetch(boredApiUrl);
    const data = await response.json();
    return data.activity;
}

async function getContent() {
    const response = await fetch(catFactsApiUrl);
    const data = await response.json();
    return data.fact;
}

function getRandomDate() {
    // Get timestamps for the first day of 2024 and today's date
    const startTimestamp = new Date('2024-01-01').getTime();
    const endTimestamp = new Date().getTime();

    // Generate a random timestamp between startTimestamp and endTimestamp
    const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp;

    // Convert the random timestamp back to a Date object
    const date = new Date(randomTimestamp);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${hours}:${minutes} ${day}-${month}-${year}`;
}


start();