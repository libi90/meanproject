const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require("mongoose");
const Post=require('./models/post');

// mongoose.connect('mongodb://localhost:27017/postDB',{useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
// if(!err)
// console.log('MongoDB connection Succeed');
// else
//  console.log('Error in db connection'+JSON.stringify(err,undefined,2));

// })
mongoose.connect('mongodb+srv://libi:libi90@cluster0.j3w1c.mongodb.net/postdb?retryWrites=true&w=majority',{useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connencted to database!");

})
.catch(()=>{
    console.log("connection failed");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PATCH,DELETE,OPTIONS");
    next();
})

app.post("/api/posts",(req,res,next)=>{
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save().then(createdPost=>{
        res.status(201).json({ message:"Post added successfully",
            postId:createdPost._id
             });
    })
    //console.log(post);
   
});

app.get('/api/posts',(req,res,next)=>{
    Post.find().then(documents=>{
        res.status(200).json({
            message:"Post fetched successfully",
            posts:documents
    })
  
  });
})
  app.delete('/api/posts/:id',(req,res,next)=>{
       Post.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({
            message:"Post deleted successfully",
         })
       })
    
    
});

module.exports=app ;
