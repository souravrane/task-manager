const express = require("express");
// we leave it open this way to ensure mongoose runs automatically
require("./db/mongoose");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

// this parses the request to json
app.use(express.json());

app.post("/users", (req, res) => {
    const user = new User(req.body);
    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            // status setting must be done before send
            res.status(400).send(error);
        });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
