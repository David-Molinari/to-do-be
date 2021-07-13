const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read
};

function create(insert) {
  if (process.env.NODE_ENV == "development") {
    return db("Users").insert(insert);
  } else {
    return db("Users").insert(insert).returning('id');
  }
}

function read(insert) {
    return db("Users").where("Username", insert);
}