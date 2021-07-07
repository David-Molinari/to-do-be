const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read,
  del
};

function create(insert) {
    if (process.env.NODE_ENV == "development") {
        return db("Tasks").insert(insert);
    } else {
        return db("Tasks").insert(insert).returning('id');
    }
}

function read(insert) {
    return db("Tasks").select("*").where("UserID", insert);
}

function del(insert) {
    return db("Tasks").del().where("id", insert.id);
}