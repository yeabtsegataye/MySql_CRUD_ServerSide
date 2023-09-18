module.exports = `
CREATE TABLE IF NOT EXISTS department (
    department_id INT AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    cource_id INT,
    timestamp_column TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (department_id),
    FOREIGN KEY (cource_id) REFERENCES cource(cource_id)
)
`;
