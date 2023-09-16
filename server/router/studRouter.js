const express = require("express");
const studRout = express.Router();
const {
  handle_get_all,
  handle_get_one,
  handle_delete_one,
  handle_post_record,
  handle_put_one,
} = require("../controller/studController");

studRout.get("/allstud", handle_get_all);
studRout.get("/allstud/:id", handle_get_one);
studRout.delete("/allstud/delete/:id", handle_delete_one);
studRout.post("/addStud", handle_post_record);
studRout.put("/update/:id", handle_put_one);

module.exports = studRout;
