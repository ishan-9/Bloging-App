import { validateToken } from "../service/authentication.js";
export function checkForAuthenticationCookie() {
  return (req, res, next) => {
    const tokenCookieValue = req.headers["cookie"];
    const token=tokenCookieValue?.split('=',2)[1]
     if(!tokenCookieValue){
    return   next();
  }

    try {
      const userPayload = validateToken(token);
      req.user = userPayload;
    } catch (error) {}

     return next(); 
  };
}
