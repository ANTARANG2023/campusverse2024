const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
let port=8080;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,path.join("views")));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

let posts=[
    {
        id:uuidv4(),
        username:"joy",
        content:"hello"
    },
    {
        id:uuidv4(),
        username:"aman",
        content:"hello"
    },
    {
        id:uuidv4(),
        username:"shradha",
        content:"hello"
    }
];
app.get("/",(req,res)=>{
    res.send("root path");
});
app.get("/posts",(req,res)=>{
    let {id}=req.params;
    res.render("index.ejs",{posts,id});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    posts.push({username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id === p.id);
   console.log(post);
    res.render("detail.ejs",{post});
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newcontent;
    res.redirect("/posts");
})
app.listen(port,()=>console.log("server is running"));