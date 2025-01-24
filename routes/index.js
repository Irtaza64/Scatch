const express = require("express")
const router = express.Router();
const prodectsModel = require("../models/productmodel")
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", {error});
});

router.get("/shop", isLoggedIn, async (req, res) => {
    let products = await prodectsModel.find();
    res.render("shop", {products});
})

module.exports = router;