var router = require("express").Router();

module.exports = function() {

    router.get("/", (req, res) => {
        res.json({ 
            routes: [
                "/find/<sku>",
                "/products",
                "/add"
            ]
        });     
    });

    return router;
}