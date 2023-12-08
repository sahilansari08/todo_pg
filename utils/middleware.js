const jwt = require("jsonwebtoken")
const authmiddleware = (req,res,next)=>{
    if (!req.cookies.token){
        return res.send({status:false,message:"token not found"})
    }try{
        jwt.verify(req.cookies.token,"12345678")
        next()
    }catch (err){
        console.log(err);
        res.send({
            "status":false,
            "message":"invalid token"
        })
    }
}

module.exports = {authmiddleware}