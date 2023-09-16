const db = require("../db");
const handle_get_all = async (req, res) => {
  try {
    const [allData] = await db.query("select * from department");
    if (allData) {
      res.status(200).send(allData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
////////////////////
const handle_get_one = async (req, res) => {
  const id = req.params.id;
  try {
    const [allData] = await db.query(
      "select * from department where stud_id = ?",
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
///////////////
const handle_post_record = async (req, res) => {
  const {
    stud_name,
    stud_last_name,
    stud_department,
    stud_cource,
    stud_section,
  } = req.body;
  if (
    !stud_name ||
    !stud_last_name ||
    !stud_department ||
    !stud_cource ||
    !stud_section
  ) {
    return res.status(400).send("fill all the imputs");
  }
  try {
    // Modify the INSERT statement to specify columns (excluding stud_id)
    const [posteData] = await db.query(
      "INSERT INTO department (stud_name, stud_last_name, stud_department, stud_cource, stud_section) VALUES (?, ?, ?, ?, ?)",
      [stud_name, stud_last_name, stud_department, stud_cource, stud_section]
    );

    if (posteData) {
      res.status(200).send(posteData);
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
  handle_post_record,
  handle_put_one,
};
