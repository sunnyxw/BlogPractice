const { json } = require("body-parser");
const jwt=require("jsonwebtoken");
//salt same with in "routes/user"
const tokenSalt = "secret_this_should_be_longer";

module.exports= (req, res, next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, tokenSalt);
    req.userData = { name: decodedToken.name, userId: decodedToken.userId};
    next();
  } catch(err){
    res.status(401).json({
      message: "auth failed."
    })
  }
};
