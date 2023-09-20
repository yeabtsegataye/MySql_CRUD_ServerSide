module.exports = `SELECT
u.user_name,
d.department_name,
c.cource_name
FROM
user u
JOIN
department d ON u.department_id = d.department_id
LEFT JOIN
department_course dc ON d.department_id = dc.department_id
LEFT JOIN
cource c ON dc.cource_id = c.cource_id
where u.user_id = ?
ORDER BY
u.user_name, d.department_name, c.cource_name;

`;
