const express = require("express");
const app = express();

app.use("/api/sign-in",(req, res, next)=> {
    const signInData = [
      { id:"q2oisjnfos",
        name:"user1",
        email: "email1"
      },
      { id:"kjpsdofmpwe",
        name:"user2",
        email: "email2"
      },
    ];
    res.status(200).json(
      {
        message: "myBlog opened successfully!",
        signInData: signInData
      }
    );
})

module.exports=app;
