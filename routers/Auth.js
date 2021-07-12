const authenticate = require("../api/auth-middleware.js");
const router = require("express").Router();
const model = require("../models/Tasks");

router.get("/", authenticate, (req, res) => {
    model.read(req.decodedToken.userId)
    .then((response) => {
        res.status(200).json({
            auth: true,
            UserID: req.decodedToken.userId,
            Username: req.decodedToken.username,
            Tasks: response
        })
    })
    .catch((err) => res.send(err))
})

module.exports = router;