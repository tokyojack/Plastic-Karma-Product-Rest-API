var router = require("express").Router();

var Product = require('../../models/Product').Product;
var Transaction = require('../../models/Product').Transaction;

module.exports = function () {

    router.post("/", (req, res) => {
        var body = req.body;

        var product = new Product({
            upc: body.upc,
            plastic_score: body.plastic_score,
            action_desc: body.action_desc,
            name: body.name,
            recycling_score: body.recycling_score, // check for 0
            waste_score: body.waste_score,
            transactions: []
        });

        product.save(function (err) {
            if (err) res.send(err);

            res.json({
                message: 'Product created successfully'
            });
        });
    });

    return router;
}