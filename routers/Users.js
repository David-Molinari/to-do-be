const router = require("express").Router();
const model = require("../models/Users");
const model1 = require("../models/Tasks");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secrets = require("../api/secrets");

router.post("/add-user", (req, res) => {
    const rounds = process.env.HASH_ROUNDS || 14;
    const hash = bcrypt.hashSync(req.body.password, rounds);
    model.create({Username: req.body.username, Password: hash})
    .then((response) => {
        let rId
        if (process.env.NODE_ENV == 'development') {
            rId = response[0]
        } else {
            rId = response
        }
        model1.read(rId)
        .then((response1)=> {
            res.status(200).json({
                auth: true,
                token: generateToken(req.body.username, rId),
                tasks: response1,
                username: req.body.username,
                userId: rId
            })
        })
        .catch((err)=> res.send(err))
    })
    .catch((err) => res.send(err))
})

router.post("/check-auth", (req, res) => {
    model.read(req.body.username)
    .then(([response]) => {
        if (bcrypt.compareSync(req.body.password, response.Password)) {
            model1.read(response.id)
            .then((response1)=> {
                res.status(200).json({
                    auth: true, 
                    token: generateToken(response.Username, response.id),
                    tasks: response1,
                    username: response.Username,
                    userId: response.id
                })
            })
            .catch((err)=> res.send(err))
        } else {
            res.status(400).json({auth: false})
        }
    })
    .catch((err) => res.send(err));
});

module.exports = router;

function generateToken(username, userId) {
    const payload = {
      username: username,
      userId: userId
    };
    const secret = secrets.jwtSecret;
    let options = {expiresIn: "5d"}
    return jwt.sign(payload, secret, options);
  }