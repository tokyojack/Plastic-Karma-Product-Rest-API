var router = require("express").Router();

var Product = require('../../models/Product').Product;
module.exports = function () {

    router.get("/", (req, res) => {
        Product.find({})
            .populate('transactions', '-_id')
            .exec(function (err, product) {
                res.json(product);
            });
    });

    return router;
}