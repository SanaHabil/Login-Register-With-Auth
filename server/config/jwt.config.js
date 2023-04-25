const jwt = require("jsonwebtoken");
const secret = "supersecretkey"
const User = require('../models/user.model')
const Admin = require('../models/admin.model')

module.exports = {
    authenticate(req, res, next){
        jwt.verify(req.cookies.usertoken,
            process.env.JWT_SECRET,
            (err, payload)=>{
                if(err){
                    console.log(err)
                    res.status(401).json({verified: false})
                }
                else{
                    console.log(payload);
                    req.jwtpayload = payload
                    next()
                }
            }
            )
    },
    isLoggedIn:(req, res) => {
        jwt.verify(req.cookies.usertoken,process.env.JWT_SECRET,(err, payload) => {
        if (err) { 
            res.status(401).json({verified: false});
        } else {
            const user = User.findOne({_id:payload.id})
            const {_id,firstName} = user
            return res.json({user:{id:_id,name:firstName}})
        }
        })
        },
}
