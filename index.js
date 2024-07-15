import express from "express";
import path from "path";
import router from './routes/user.js';
import mongoose from "mongoose";

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/blogify").then((req,res)=>{
    console.log("Mongo Connected")
})

app.use(express.urlencoded({extended:false}));

app.set('view engine' , "ejs");
app.set("views" , path.resolve("./views"))

app.use('/user',router);
app.get("/" ,(req, res)=>{
    return res.render('home')
})

app.listen(PORT , ()=>console.log(` server started at ${PORT}`));