const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MyPost = require("./models/myPost");
const myPost = require("./models/myPost");

const dbName = "BlogPractice";
const dbUserName = "blogAdmin";
const password = "6a78CyBm6gxQhAP5";

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
});

//add post to database
app.post("/api/my-posts",(req, res, next)=>{
  const myPost = new MyPost({
    title: req.body.title,
    subtitle: req.body.subtitle,
    content: req.body.content,
  });
  myPost.save().then(createdPost=>{
    res.status(201).json({
    message: "post added succesfully!",
    postId: createdPost._id})
  })
  .catch(()=>{ res.status(500).json({ message: "add post failed!"})})
});

//get posts from database
app.get("/api/my-posts",(req, res, next)=> {
    MyPost.find()
      .then(documents =>{
        myPosts = documents
        res.status(200).json(
          {
            message: "my-posts fetched successfully!",
            myPosts: myPosts
          }
        );
      })
      .catch(()=>{
        res.status(500).json({message: "get my-posts failed!"});
      });

});

//update edited post by id from database
app.patch("/api/my-posts/:id", (req, res, next)=>{
  MyPost.updateOne({_id: req.params.id}, req.body).then(result=>{
    res.status(200).json({message: "post edited!"});
  })
  .catch(()=>{
    res.status(500).json({message: "edit post failed!"});
  })
});

//delete post by id from database
app.delete("/api/my-posts/:id", (req, res, next)=>{
  MyPost.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({message: "post deleted!"});
  })
  .catch(()=>{
    res.status(500).json({ message: "delete post failed!"});
  })
});


module.exports=app;
