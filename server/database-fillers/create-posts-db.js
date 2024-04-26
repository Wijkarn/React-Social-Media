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
        console.log(username, post);
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
    const date = new Date();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${hours}:${minutes} ${day}-${month}-${year}`;
}

start();
