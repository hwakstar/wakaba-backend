const db = require('../config/db');

const Product={
    SelectAll:(productname,callback)=>{
        console.log(productname)
         // Construct the SQL query
         const sql = `SELECT * FROM \`${productname}\``;
         console.log(sql)
         db.query(sql, callback);
    }
}
module.exports = Product;