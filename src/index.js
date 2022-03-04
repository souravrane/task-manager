const express = require("express");
// we leave it open this way to ensure mongoose runs automatically
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();
const port = process.env.PORT || 3000;

// this parses the request to json
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

const jwt = require("jsonwebtoken");
const myFunction = async () => {
    // creates a new jwt token
    const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
        expiresIn: "1 seconds",
    });
    console.log(token);

    const data = jwt.verify(token, "thisismynewcourse");
    console.log(data);
};

myFunction();
