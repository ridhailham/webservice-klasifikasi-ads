
const Product = require("../models/ProductsModel.js")

exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).json({
            massage: 'title must be required'
        })
        return
    }

    const product = {
        user_id: req.userId,
        ...req.body
    }

    console.log(product);
    Product.create(product)
        .then((result) => {
            res.status(201).json({
                data: result,
                massage: 'product created successfully'
            })
        }).catch((err) => {
            res.status(500).json({
                massage: "error controller product"
            })
        })
}