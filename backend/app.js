const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");
const userRoutes = require('./routes/user');

const dbName = "";
const dbUserName = "";
const password = "";

mongoose.connect("mongodb+srv://"+ dbUserName +":"+ password + "@cluster0.isgvp.mongodb.net/"+ dbName +"?retryWrites=true&w=majority")
  .then(()=>{
    console.log("connected to database!")
  })
  .catch(()=>{
    console.log("database connection failed!")
  });

app.use(bodyParser.json());
/*app.use(bodyParser.urlencoded({extended: false}));*/

app.use((req, res, next)=>
{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requesed-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS")
  next();
});

app.use("/api/my-posts", postsRoutes)
app.use("/api/user", userRoutes)

module.exports=app;
