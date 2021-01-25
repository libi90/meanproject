const express=require('express');
const app=express();
app.use("/api/posts",(req,res,next)=>{
    const posts=[
        {
            id:"abc111",
            title:"First server-side post",
            content:"This is coming from the server"
        },
        {
            id:"abc222",
            title:"Second server-side post",
            content:"This is coming from  server side"
        }
];
  res.status(200).json({
      message:"Post fetched successfully"
      posts:posts
  });
});

module.exports=app;