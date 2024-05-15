# Falcon: My React/Node.js social media app.

## Requirements

[Node.js](https://nodejs.org/en/download), Internet connection, ~400mb

## To start

Don't forget to install node modules inside both client and server
```bash
npm i
```

Start server in terminal
```bash
cd server
npm run dev
```

Open a new terminal in project and start the client
```bash
cd client
npm start
```

To fill database
```bash
cd server
npm run create-users
npm run create-posts
```

create-users uses the [random users api](https://randomuser.me/) to get the user info.

create-posts uses the [bored api](https://www.boredapi.com/) to get the titles and [catfact api](https://catfact.ninja/) to get the post content.

[Falcon Icon](https://www.flaticon.com/free-icon/millennium-falcon_86572)

[Add Icon](https://www.flaticon.com/free-icon/more_3161837)

## To stop double render

Disable (comment out) React Strict Mode in index.js