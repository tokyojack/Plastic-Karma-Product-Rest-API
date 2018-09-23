var router = require("express").Router();

var Product = require('../../models/Product').Product;
module.exports = function () {

    router.get("/:upc", (req, res) => {
        Product.findOne({
                upc: req.params.upc
            })
            .populate('transactions', '-_id')
            .exec(function (err, product) {
                res.json(product);
            });        
    });

    return router;
}