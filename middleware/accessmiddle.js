
const access = (...parameter)=>{
     return (req, res, next) => {
       if(parameter.includes(req.role)){
        next();
       } else {
        res.json({msg:"not access"})
       }
     }
};

module.exports = {
    access
}