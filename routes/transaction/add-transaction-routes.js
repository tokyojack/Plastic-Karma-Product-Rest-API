var router = require("express").Router();

var Product = require('../../models/Product').Product;
var Transaction = require('../../models/Product').Transaction;

module.exports = function () {

    router.post("/", (req, res) => {
        var body = req.body;

        Product.findOne({
                upc: body.upc
            })
            .populate('transactions')
            .exec(function (err, product) {
                var contains = false;

                for (var i = 0; i < product.transactions.length; i++) {
                    var transaction = product.transactions[i];

                    if (transaction.user_email == body.user_email) {
                        contains = true;

                        var newScore = parseInt(transaction.amount) + 1;

                        Transaction.findOneAndUpdate({
                                _id: transaction._id,
                                user_email: body.user_email
                            }, {
                                amount: newScore
                            },
                            function (err, updatedTransaction) {
                                if (err)
                                    res.send(err);


                                res.json({
                                    message: 'Transaction added successfully',
                                    score: newScore
                                });
                            });
                    }
                }

                if (!contains) {
                    var newTransaction = new Transaction({
                        _id: product._id,
                        user_email: body.user_email
                    });

                    product.transactions.push(newTransaction)

                    product.save(function (err) {
                        if (err) res.send(err);

                        newTransaction.save(function (err) {
                            res.json({
                                message: 'Transaction added successfully1',
                                score: 1
                            });
                        });
                    });
                }
            });
    });

    return router;
}