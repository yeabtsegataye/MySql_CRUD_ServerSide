module.exports = `
CREATE TABLE IF NOT EXISTS user (
  user_id INT AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  department_id int,
  timestamp_column TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
)
`;
