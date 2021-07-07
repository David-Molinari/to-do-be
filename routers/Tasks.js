const authenticate = require("../api/auth-middleware.js");
const router = require("express").Router();
const model = require("../models/Tasks");

router.post("/", authenticate, (req, res) => {
    model.create(req.body.form)
    .then((response0) => {
        res.status(200).json({id: response0})
    })
    .catch((err) => res.send(err))
})

router.get("/:Company", authenticate, (req, res) => {
    model.read(req.params.Company)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => res.send(err));
});

router.delete("/:mediaID", authenticate, (req, res) => {
    model.del({id: req.params.taskID})
    .then((response0) => {
        res.status(200).json(response0)
    })
    .catch((err) => res.send(err))
})

module.exports = router;