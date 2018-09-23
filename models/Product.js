// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
    upc: {
        type: String,
        required: true,
        unique: true
    },
    plastic_score: {
        type: Number,
        required: true
    },
    action_desc: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    recycling_score: {
        type: Number,
        required: true
    },
    waste_score: {
        type: Number,
        required: true
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
}, {
    versionKey: false
});

var transactionSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    user_email: {
        type: String,
        unique: false
    },
    amount: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var Transaction = mongoose.model('Transaction', transactionSchema);
var Product = mongoose.model('Product', productSchema);

module.exports = {
    Product: Product,
    Transaction: Transaction
}