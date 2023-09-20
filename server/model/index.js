const department = require('./department_Table');
const users = require('./user_Table');
const cource = require('./cource')
const cource_dpt = require('./corces-dpt')
// Add other table schema files here

module.exports = [cource, department, users, cource_dpt];
