const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

// registering a new user
router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

// user login
router.post("/users/login", async (req, res) => {
    try {
        // user defined functions on models
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// user logout
router.get("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            (token) => token.token !== req.token
        );
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// logout all the user sessions
router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

// adding a middleware to a specific route
router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
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

router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdate = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((property) =>
        allowedUpdate.includes(property)
    );
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    } else {
        try {
            const user = await User.findById(req.params.id);
            updates.forEach((update) => (user[update] = req.body[update]));
            await user.save();

            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        } catch (e) {
            res.status(400).send();
        }
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
