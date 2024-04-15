const express = require("express");
const app = express();
const PORT = 5000;

app.get("/api", async (req, res) => {
    console.log(`Request at ${new Date()}`);
    // const response = await fetch("https://react-social-media-d6626-default-rtdb.europe-west1.firebasedatabase.app/users/.json");
    // const data = await response.json();

    // Temp
    const data = {
        username1: { firstname: 'firstname1', lastname: 'lastname1' },
        username2: { firstname: 'firstname2', lastname: 'lastname2' },
        username3: { firstname: 'firstname3', lastname: 'lastname3' }
    }

    res.json({ "users": data })
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
