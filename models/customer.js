const db = require('../config/db');

const Customer={
    SelectAll:(callback)=>{
         // Construct the SQL query
         const sql = `SELECT * FROM customer_list`;
         console.log(sql)
         db.query(sql, callback);
    }
}
module.exports = Customer;