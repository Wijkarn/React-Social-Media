const { getAllUsers, uploadPost } = require("../database.js");
const { createDate } = require("../random-functions.js");

const boredApiUrl = "https://www.boredapi.com/api/activity";
const catFactsApiUrl = "https://catfact.ninja/fact";

const untouchedUsers = ["Felix"];

async function start() {
    try {
        const users = await getAllUsers();

        for (const user of untouchedUsers) {
            delete users[user];
        }

        for (const user in users) {
            createPost(user);
        }
    }
    catch (e) {
        console.error(e);
    }
}

async function createPost(username) {
    try {
        const title = await getTitle();
        const content = await getContent();

        const postObj = {
            title,
            content,
            date: createDate()
        }

        const post = await uploadPost(username, postObj);
        console.log(username, post);
    }
    catch (e) {
        console.error(e);
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

start();
