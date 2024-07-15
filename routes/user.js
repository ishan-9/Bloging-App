import express from "express";
import User from "../model/user.js";

const router = express.Router();

router.get('/signin', (req, res)=>{
    return res.render("signin")
});

router.get('/signup', (req, res)=>{
    return res.render("signup")
});

router.post('/signup', async (req, res)=>{
    const { fullName , email , password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/")
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.matchPassword(email, password);
        console.log('User', user);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

export default router;


