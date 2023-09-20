const db = require("../db");
const all_user = require('../query/get_all_user')
const one_user = require('../query/get_one_user')
/////////////////
const handle_get_all = async (req, res) => {
  try {  
    const [allUserData] = await db.query(all_user);

    // Transform the data to group by users
    const usersData = {};
    for (const userData of allUserData) {
      const { user_name, department_name, cource_name } = userData;
            if (!usersData[user_name]) {
        usersData[user_name] = {
          user_name,
          department_name,
          courses: [],
        };
      }
      usersData[user_name].courses.push(cource_name);
      
    }
    // Convert the object values (user data) to an array
    const responseData = Object.values(usersData);
    // console.log(usersData)
    if (responseData) {
      res.status(200).json(responseData);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
////////////////////
const handle_get_one = async (req, res) => {
  const id = req.params.id;
  try {
    const [allData] = await db.query(
      one_user,
      [id]
    );
    const usersData = {};
    for (const userData of allData) {
      const { user_name, department_name, cource_name } = userData;
            if (!usersData[user_name]) {
        usersData[user_name] = {
          user_name,
          department_name,
          courses: [],
        };
      }
      usersData[user_name].courses.push(cource_name);
      
    }
    // Convert the object values (user data) to an array
    const responseData = Object.values(usersData);
    // console.log(usersData)
    if (responseData) {
      res.status(200).json(responseData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
////////////////
const handle_delete_one = async (req, res) => {
  const id = req.params.id;
  try {
    const [allData] = await db.query(
      "delete from department where stud_id = ?",
      [id]
    );
    if (allData) {
      res.status(200).send(allData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
////////////
const handle_post_user = async (req, res) => {
  const {
    user_name,
    department_id
  } = req.body;
  if (
    !user_name || !department_id
  ) {
    return res.status(400).send("fill all the imputs");
  }
  try {
    // Modify the INSERT statement to specify columns (excluding stud_id)
    const [userdata] = await db.query(
      "INSERT INTO user (user_name, department_id) VALUES (?, ?)",
      [user_name ,department_id]
    );

    if (userdata) {
      res.status(200).send(userdata);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
////////////
const handle_post_department = async (req, res) => {
  const {
    department_name
  } = req.body;
  if (
    !department_name
  ) {
    return res.status(400).send("fill all the imputs");
  }
  try {
    // Modify the INSERT statement to specify columns (excluding stud_id)
    const [departmentData] = await db.query(
      "INSERT INTO department (department_name) VALUES (?)",
      [department_name]
    );

    if (departmentData) {
      res.status(200).send(departmentData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
////////////
const handle_post_assigncource= async (req, res) => {
  const {
    cource_id,
    department_id
  } = req.body;
  if (
    !department_id || !cource_id
  ) {
    return res.status(400).send("fill all the imputs");
  }
  try {
    // Modify the INSERT statement to specify columns (excluding stud_id)
    const [departmentData] = await db.query(
      "INSERT INTO department_course (department_id,cource_id) VALUES (?, ?)",
      [department_id, cource_id]
    );

    if (departmentData) {
      res.status(200).send(departmentData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
//////////
const handle_post_course = async (req, res) => {
  const {
    cource_name
  } = req.body;
  if (
    !cource_name
  ) {
    return res.status(400).send("fill all the imputs");
  }
  try {
    // Modify the INSERT statement to specify columns (excluding stud_id)
    const [courseData] = await db.query(
      "INSERT INTO cource (cource_name) VALUES (?)",
      [cource_name]
    );

    if (courseData) {
      res.status(200).send(courseData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
////////////
const handle_put_one = async (req, res) => {
  const {
    stud_name,
    stud_last_name,
    stud_department,
    stud_cource,
    stud_section,
  } = req.body;
  const id = req.params.id;
  let updateColumns = {}; // Initialize an empty object to store columns to update

  // Check if each field has a value in req.body and add it to updateColumns
  if (stud_name !== undefined) {
    updateColumns.stud_name = stud_name;
  }
  if (stud_last_name !== undefined) {
    updateColumns.stud_last_name = stud_last_name;
  }
  if (stud_department !== undefined) {
    updateColumns.stud_department = stud_department;
  }
  if (stud_cource !== undefined) {
    updateColumns.stud_cource = stud_cource;
  }
  if (stud_section !== undefined) {
    updateColumns.stud_section = stud_section;
  }

  // Check if there are any columns to update
  if (Object.keys(updateColumns).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  try {
    // Build the dynamic UPDATE query based on updateColumns
    const updateQuery =
      "UPDATE department SET " +
      Object.keys(updateColumns)
        .map((key) => `${key} = ?`)
        .join(", ") +
      " WHERE stud_id = ?";

    // Create an array of values for the UPDATE query
    const updateValues = [...Object.values(updateColumns), id];

    // using ...(Object.values(updateColumns)) spreads
    //the values into a new array, which can be helpful
    // when you want to combine these values with additional
    //values, as was the case with appending the id value in the code.

    // Execute the UPDATE query
    const [updateData] = await db.query(updateQuery, updateValues);

    if (updateData) {
      res.status(200).send(updateData);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  handle_get_all,
  handle_get_one,
  handle_delete_one,
  handle_put_one,
  handle_post_user,
  handle_post_department,
  handle_post_course,
  handle_post_assigncource
};
