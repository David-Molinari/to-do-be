const db = require("../database/dbConfig.js");

module.exports = {
  create,
  readByID
};

function create(insert) {
    return db("Users").insert(insert);
}

function readByID(insert) {
    return db("Users").where("id", insert);
}