const mongoose = require('mongoose');
const config = require("config")
// const dbgr = require("debug")("development:mongoose");

// console.log(process.env.DEBUG);

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;