module.exports = `
CREATE TABLE IF NOT EXISTS cource (
  cource_id INT AUTO_INCREMENT,
  cource_name VARCHAR(255) NOT NULL,
  timestamp_column TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (cource_id)
)
`;