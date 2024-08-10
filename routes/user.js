import express from "express";
import User from "../model/user.js";

const router = express.Router();

router.get('/signin', (req, res) => {
    return res.render("signin");
});

router.get('/logout' ,(req,res)=>{
    const tokenCookieValue = req.headers["cookie"];
    res.clearCookie(tokenCookieValue).redirect('/')
});

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log({ fullName, email, password }); 
    try {
        const user = await User.create({
            fullName,
            email,
            password
        });
        console.log("User created:", user);
        return res.redirect("/user/signin");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Error creating user");
    }
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordCreateToken(email, password);
        console.log('Token', token);
        return res.cookie("Token",token).redirect("/");
    } catch (error) {
       res.render("signin",{
         error : "Incorrect Email or Password"
    })
    }
});

export default router;
