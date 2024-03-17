 
 var jwt = require('jsonwebtoken');
const { UserModel } = require('./userModel');
 const auth = (req, res, next)=>{
         const token = req.headers.authorization;
         if(token){
            jwt.verify(token, 'sachin', async(err, decoded)=> {
               if(decoded){
                  const{userID} = decoded;
                  const user = await UserModel.findOne({_id:userID});
                  const roles = user.role;
                  req.userID = user._id;
                  req.role = roles
                next();
               } else {
                res.json({msg:"err"})
               }
              });
         } else {
            res.json({msg:"please login"})
         }
 };

 module.exports = {
    auth
 }