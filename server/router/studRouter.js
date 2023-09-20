const express = require("express");
const studRout = express.Router();
const {
  handle_get_all,
  handle_get_one,
  handle_delete_one,
  handle_put_one,
  handle_post_user,
  handle_post_department,
  handle_post_course,
  handle_post_assigncource
} = require("../controller/studController");

studRout.get("/allstud", handle_get_all);
studRout.get("/allstud/:id", handle_get_one);
studRout.delete("/allstud/delete/:id", handle_delete_one);
studRout.put("/update/:id", handle_put_one);
studRout.post("/adduser", handle_post_user);
studRout.post("/assigncource", handle_post_assigncource);
studRout.post("/adddepartment", handle_post_department);
studRout.post("/addcourse", handle_post_course);


module.exports = studRout;
