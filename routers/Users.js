const router = require("express").Router();
const model = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secrets = require("../api/secrets");

router.post("/add-user", (req, res) => {
    const rounds = process.env.HASH_ROUNDS || 14;
    const hash = bcrypt.hashSync(req.body.Code, rounds);
    model.create({...req.body, Password: hash})
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => res.send(err))
})

router.post("/check-auth", (req, res) => {
    model.read(req.body.username)
        .then((response) => {
            if (bcrypt.compareSync(req.body.password, response.Password)) {
                res.status(200).json({auth: true, 
                    token: generateToken(req.params.username)})
            } else {
                res.status(400).json({auth: false})
            }
        })
        .catch((err) => res.send(err));
});

module.exports = router;

function generateToken(username) {
    const payload = {
      username: username
    };
    const secret = secrets.jwtSecret;
    let options = {expiresIn: "5d"}
    return jwt.sign(payload, secret, options);
  }