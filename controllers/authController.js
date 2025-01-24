const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel")
const prodectsModel = require("../models/productmodel");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken")


module.exports.registerUser = async (req, res) => {
    try {
        let { fullName, email, password } = req.body;
    
        let user = await userModel.findOne({email: email});
        if (user) return  res.status(401).send("User already exists. please log in.")


        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err)
                    return res.send(err.message);
                else {
                    let createdUser = await userModel.create ({
                        fullName,
                        email,
                        password: hash,
                    });
                    
                    let token = generateToken(createdUser);
                    res.cookie("token", token);
                    res.send("User created successully.");
                }
            });
        });

        
    }
    catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async function (req, res) { 
    let { email, password } = req.body;

        let user = await userModel.findOne({ email: email }); 
        if (!user) {
            req.flash("error", "User does not exist, pleasae register first.");
            return res.redirect("/");
        }

        bcrypt.compare(password, user.password, async function(err, result) { 
        if (result) {
            token = generateToken(user);
            res.cookie("token", token);
            let products = await prodectsModel.find();
                res.render("shop", {products});
        }
        else {
            req.flash("error", "Incorrect Email or Password.");
            return res.redirect("/");
        }
        });
};