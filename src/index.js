const express = require("express");
// we leave it open this way to ensure mongoose runs automatically
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

// this parses the request to json
app.use(express.json());

app.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }
});

app.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(201).send(user);
    } catch (e) {
        res.status(500).send();
    }
});

app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    try {
        const result = await task.save();
        res.status(201).send(result);
    } catch (e) {
        res.status(400).send();
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

app.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
