const express = require("express");
const router = express.Router();
const MyPost = require("../models/myPost");

const checkAuth = require("../middleware/check-auth");

//add post to database
//checkAuth middleware
router.post("", checkAuth, (req, res, next)=>{
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

//get all posts from database
//todo: add checkAuth middleware
router.get("", (req, res, next)=> {
    MyPost.find()
      .then(documents =>{
        res.status(200).json(
          {
            message: "my-posts fetched successfully!",
            myPosts: documents
          }
        );
      })
      .catch(()=>{
        res.status(500).json({message: "get my-posts failed!"});
      });

});

//get post by id from database
router.get("/:id", (req, res, next)=>{
  MyPost.findById({_id: req.params.id}).then(post=>{
    if(post){
      res.status(200).json(post)
    }
    else{
      res.status(404).json({ message: "post not found!"})
    }
  })
});


//update post by id from database
//checkAuth middleware
router.patch("/:id", checkAuth, (req, res, next)=>{
  MyPost.updateOne({_id: req.params.id}, req.body).then(result=>{
    res.status(200).json({message: "post edited!"});
  })
  .catch(()=>{
    res.status(500).json({message: "edit post failed!"});
  })
});

//delete post by id from database
//checkAuth middleware
router.delete("/:id", checkAuth, (req, res, next)=>{
  MyPost.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({message: "post deleted!"});
  })
  .catch(()=>{
    res.status(500).json({ message: "delete post failed!"});
  })
});

module.exports = router;
