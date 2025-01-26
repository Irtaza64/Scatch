const express = require("express")
const router = express.Router();
const prodectsModel = require("../models/productmodel")
const isLoggedIn = require("../middlewares/isLoggedIn");
const usermodel = require("../models/usermodel");

router.get("/", (req, res) => {
    let error = req.flash("error",);
    res.render("index", {error, loggedin: false});
});

router.get("/shop", isLoggedIn, async (req, res) => {
    let products = await prodectsModel.find();
    let success = req.flash("success") || [];
    res.render("shop", {products, success});
})

router.get("/cart", isLoggedIn, async (req, res) => {
    let user = await usermodel.findOne({ email: req.user.email }).populate("cart")
    if(user.cart.length < 1 || user.cart == undefined) {
        req.flash("success", "Add something in the cart first.");
        res.redirect("/shop");
    }
    else {
        let total = user.cart[0].price + 20 - user.cart[0].discount;
        
        res.render("cart", {user, total});

    }
    
})

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
    
    let user = await usermodel.findOne({email: req.user.email});
    
    user.cart.push(req.params.id);
    user.save();
    req.flash("success", "Item added successfully.");
    res.redirect("/shop");
});

module.exports = router;