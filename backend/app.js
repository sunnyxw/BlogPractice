const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MyPost = require("./models/myPost");

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
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requesed-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS")
  next();
})

app.post("/api/my-posts",(req, res, next)=>{
  const myPost = new MyPost({
    title: req.body.title,
    subtitle: req.body.subtitle,
    content: req.body.content,
  });
  console.log("post from server:");
  myPost.save();
  res.status(201).json({
    message: "post added succesfully!"
  });
});

app.get("/api/my-posts",(req, res, next)=> {
    MyPost.find()
      .then((documents) =>{
        myPosts = documents
        res.status(200).json(
          {
            message: "my-posts fetched successfully!",
            myPosts: myPosts
          }
        );
      });
})

module.exports=app;
