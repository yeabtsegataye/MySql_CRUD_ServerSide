module.exports = `
CREATE TABLE IF NOT EXISTS department_course (
    department_id INT,
    cource_id INT,
    PRIMARY KEY (department_id, cource_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id),
    FOREIGN KEY (cource_id) REFERENCES cource(cource_id)
  )  
`;