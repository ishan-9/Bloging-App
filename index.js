import express from "express";
import path from "path";
import Userrouter from './routes/user.js';
import Blogrouter from './routes/blog.js';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookie } from "./middleware/auth.js";
import Blog from "./model/blog.js";

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/blogify").then((req,res)=>{
    console.log("Mongo Connected 😒")
})

app.set('view engine' , "ejs");
app.set("views" , path.resolve("./views"))

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')));

app.get("/",async(req, res) => {
    const allBogs= await Blog.find({});
    return res.render('home', {
      user: req.user,
      blogs : allBogs
    });
  });

app.use('/user',Userrouter);
app.use('/blog',Blogrouter);

app.listen(PORT , ()=>console.log(`server started at ${PORT}`));