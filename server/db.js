// Database Creation: One common use case is creating 
// a new database when your application starts. By not 
// specifying a database at the initial connection, you 
// can connect to the MySQL server without being tied
//  to any specific database. This allows you to execute SQL 
//  commands to create a new database before selecting it for further operations.
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
};

async function createDatabaseIfNotExists() {
  try {
    const connection = await mysql.createConnection({ ...dbConfig, database: null });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`)
    .then(async ()=>{
      try {
        const connection = await mysql.createConnection({ ...dbConfig, database: dbConfig.database });
        const schemas = require('./model/index'); 
        // Import all schema files from the "models" folder
    
        for (const schema of schemas) {
          await connection.query(schema);
        }
    
        console.log('Tables created successfully.');
        connection.end();
      } catch (error) {
        console.error('Error creating tables:', error);
      }
    });
    connection.end();
    console.log(`Database "${dbConfig.database}" is ready.`);
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

// First, create the database if it doesn't exist
createDatabaseIfNotExists();

const sqlpool = mysql.createPool(dbConfig);

module.exports = sqlpool;


