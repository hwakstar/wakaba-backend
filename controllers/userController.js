const User = require('../models/user');
const bcrypt = require('bcryptjs');



//===user profile======
exports.createPofile = (req, res) => {
    const { email, password, store_name, type, name, katakana_name, phone_number, birthday, sex, prefectures, city, address_detail, document, guarantor, verified_at } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Prepare profile data
    const ProfileData = {
        email,
        PasswordHash: bcrypt.hashSync(password, 8), // Hash the password
        store_name,
        type,
        name,
        katakana_name,
        phone_number,
        birthday,
        sex,
        prefectures,
        city,
        address_detail,
        document,
        guarantor,
        verified_at
    };
    // Check if the user already exists
    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            // update the profile
            User.update(ProfileData, (err, result) => {
                if (err) return res.status(500).send(err);
                res.status(200).json({ message: 'User profile updated successfully' });
            });
        } 
    });
};
//===delete user======
exports.deleteUser = (req, res) => {
    User.delete(email,(err, results)=>{
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.status(200).json({ message: 'User deleted successfully' });

        }
    
    }
    )
};



