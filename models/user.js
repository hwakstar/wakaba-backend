//user-related database operations

const db = require('../config/db');
// user sign up 
const User = {
  // user sign up 
  signup: (userData, callback) => {
        const { email,PasswordHash } = userData;
        const sql = 'INSERT INTO users (email, password_hash) VALUES ( ?, ?)';
        const values = [email,PasswordHash];
        db.query(sql, values, callback);
  },

  //user password login 
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM Users WHERE Email = ?';
    db.query(sql, [email], callback);
  },

  //update profile
  update: (createdata,callback)=>{
    const {email,store_name,type,name,katakana_name,phone_number,birthday,sex,prefectures,city,address_detail,document,guarantor,verified_at} = createdata;
    const sql = 'UPDATE users SET store_name = ?, type = ?, name = ?, katakana_name = ?, phone_number = ?, birthday = ?, sex = ?, prefectures = ?, city = ?, address_detail = ?, document = ?, guarantor = ? , verified_at = ? WHERE email = ?';
    const values = [store_name,type,name,katakana_name,phone_number,birthday,sex,prefectures,city,address_detail,document,guarantor,verified_at,email];
     db.query(sql, values, callback);
  },
  //delete user profile
    delete: (email, callback) => {
    const sql = 'DELETE FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  }


};

module.exports = User;