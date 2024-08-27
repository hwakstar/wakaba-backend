const Customer = require('../models/customer');


exports.view = (req, res) => {
    Customer.SelectAll((err, results) =>{
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.status(200).json({ message: results});
        }
    })


}
