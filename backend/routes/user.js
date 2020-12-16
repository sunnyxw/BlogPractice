const express = require("express");
const router = express.Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//salt same with in "middleware/check-auth"
const tokenSalt = "secret_this_should_be_longer";


//signup check email or username, if none, add new user with bcrypt password.
//return jwt token with userName and user._id.
router.post("/sign-up", (req, res, next)=>{
  User.findOne({$or: [
      {name: req.body.name},
      {email: req.body.email}
    ]})
    .then(fetchedUser=>{
      if(!fetchedUser){
        bcrypt.hash(req.body.password, 10)
          .then(hash =>{
              const user = new User({
                name : req.body.name,
                password : hash,
                email: req.body.email
              });
        user.save()
          .then(result=>{
            const token = jwt.sign(
              {name: result.name, userId: result._id},
              tokenSalt,
              { expiresIn: "1h"});
            res.status(200).json({
              token: token,
              expiresIn: 3600
            })
          })
          .catch(err=>{
            res.status(500).json({
              error: err
            });
          });
        });
      }
      else{
          res.status(409).json({
            message:"User already exist! Please login."
        })
      }
    })
});

//login check user and bcrypted password
//return jwt token with userName and user._id
router.post("/sign-in", (req, res, next)=>{
  let fetchedUser;
  User.findOne({name: req.body.name})
  .then(user=>{
    if(!user){
      return false;
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result=>{
    if(!result){
      return res.status(401).json({
        message:"Login failed."
      });
    }
    else{
      const token = jwt.sign(
        { name: fetchedUser.name, userId: fetchedUser._id},
        tokenSalt,
        { expiresIn: "1h"});
      return res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    }
  })
  .catch(err=>{
    return res.status(401).json({
      message:"Login failed."
    });
  })
});

module.exports = router;
