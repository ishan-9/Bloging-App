import { createHmac, randomBytes} from "crypto";
import { Schema , model} from "mongoose";

const userSchema = new Schema({
    fullName : {
        type : String,
        require : true
    },
    salt : {
        type : String,
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true, 
    },
    profileImageURL :{
        type : String,
        default : "/images/profile.png",
    },
    role :{
        type : String,
        enum : ['USER' , 'ADMIN'],
        default : 'USER',
    }
},
{
    timestamps : true
})

userSchema.pre('save' , function(next){
    const user = this;
    if(!user.isModified('password')) return ;
    
    const salt = randomBytes(16).toString();
    const hashPassword =  createHmac('sha256' , salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashPassword;

    next();
});

userSchema.static('matchPassword' , async function(email , password){
    const user = await this.findOne({email})
    if(!user) throw new Error("User not found !");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedhash = createHmac('sha256' , salt).update(password).digest('hex');

    if(hashedPassword !== userProvidedhash)  throw new Error("Incorrect Password !");

    return user;
})

const User = model('user' , userSchema)

export default User;