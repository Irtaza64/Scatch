const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const flash = require("connect-flash");
const expressSession = require("express-session");
const multer = require("multer");

require("dotenv").config();

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRoutes = require("./routes/index");



const db = require("./config/mongoose-connection")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs')

app.use ("/", indexRoutes);
app.use("/owner", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000);