// Calling express with MongoDb handlebars............

require("./models/db");

const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const { create }= require("express-handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const bodyParser = require("body-parser");

const studentController = require("./Controller/studentController");

//calling express framework.....

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/", (req,res) => {
    res.send("<h2> Welcome to Student Mongo Database..!</h2><br> <h3> Click here to get access to the <b><a href = '/student/list'> DATABASE </a></b></h3>");
});

app.set("views", path.join(__dirname,"/views/"));

// Update the express-handlebars setup
const hbs = create({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: "hbs",
    defaultLayout: "MainLayout",
    layoutsDir: path.join(__dirname, "/views/layouts/")
});

app.engine("hbs", hbs.engine);

app.set("view engine","hbs");

// Listening port........

app.listen(3000, (req,res) => {
    console.log("Server started at port 3000");
});

app.use("/student", studentController);