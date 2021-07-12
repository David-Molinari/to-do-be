const db = require("../database/dbConfig.js");

module.exports = {
  create,
  read,
  del
};

function create(insert) {
    return db("Tasks").insert(insert);
}

function read(insert) {
    return db("Tasks").select("Task").where("UserID", insert);
}

function del(insert) {
    return db("Tasks").del().where("Task", insert.task)
        .andWhere("UserID", insert.userId);
}