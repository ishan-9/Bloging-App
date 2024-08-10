import JWT from 'jsonwebtoken';

 const secret = "$uperMan@ish@n";

export function createTokenforUser (user){
    const payload ={
        _id : user._id,
        email : user.email,
        profileImageURL : user.profileImageURL,
        role : user.role
    }
    const token = JWT.sign(payload,secret);
    return token; 
 }

export function validateToken (token){
    const payload = JWT.verify(token , secret);
    return payload;
}

