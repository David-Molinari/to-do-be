const authenticate = require("../api/auth-middleware.js");
const router = require("express").Router();
const model = require("../models/Tasks");

router.post("/", authenticate, (req, res) => {
    model.create({Task: req.body.task, UserID: req.body.userId})
    .then((response) => {
        res.status(200).json(response)
    })
    .catch((err) => res.send(err))
})

router.delete("/", authenticate, (req, res) => {
    model.del({task: req.body.task, userId: req.body.userId})
    .then((response) => {
        res.status(200).json(response)
    })
    .catch((err) => res.send(err))
})

module.exports = router;