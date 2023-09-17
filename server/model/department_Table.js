module.exports = `
CREATE TABLE IF NOT EXISTS department (
    stud_id INT AUTO_INCREMENT ,
    stud_name VARCHAR(255) NOT NULL,
    stud_last_name VARCHAR(255) NOT NULL,
    stud_department VARCHAR(255) NOT NULL,
    stud_cource VARCHAR(255) NOT NULL,
    stud_section VARCHAR(255) NOT NULL,
    PRIMARY KEY (stud_id)
);
`;
