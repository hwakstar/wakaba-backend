const Product = require('../models/product');
exports.view = (req, res) => {
    const product_name= req.body.product_name;
    console.log(product_name)
    Product.SelectAll(product_name, (err, results) =>{
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.status(200).json({ message: results});
        }
    })


}
