import { createHmac, randomBytes } from "crypto";
import { Schema, model } from "mongoose";
import { createTokenforUser } from "../service/authentication.js";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "/images/profile.png",
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    }
}, {
    timestamps: true
});


userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    
    const salt = randomBytes(16).toString();
    const hashPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashPassword;

    next();
});

userSchema.static('matchPasswordCreateToken', async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect Password!");

    const token = createTokenforUser(user);
    return token;
});

const User = model('user', userSchema); 

export default User;
