const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read
};

function create(insert) {
    return db("Users").insert(insert);
}

function read(insert) {
    return db("Users").where("Username", insert);
}