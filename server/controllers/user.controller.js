const User= require('../models/user.model');
const Admin= require('../models/admin.model');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const UserController = {

    register:async (req,res)=>{
        const user = new User(req.body)
        await user.save()
        .then((newUser)=>{
            console.log(newUser)
            console.log("Succesfully Registered!")
            res.json({
                successMessage: "Thank you for registering",
                user: newUser
            })
        })
        .catch((err)=>{
            console.log("Register not succesful!")
            res.status(400).json(err)
        })
    },

    login: (req,res)=>{
        User.findOne({email: req.body.email})
            .then((userRecord)=>{
                if(userRecord === null){
                    res.status(400).json({message: "Invalid login attempt..."})
                }
                else{
                    bcrypt.compare(req.body.pass, userRecord.pass)
                        .then((isPasswordValid)=>{
                            if(isPasswordValid){
                                console.log("Password is valid")
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            fname: userRecord.fname
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000)
                                    }
                                ).json({
                                    message: "Succesfully",
                                    userLoggedIn: userRecord.fname,
                                    userId: userRecord._id,
                                    fname: userRecord.fname
                                });
                            }
                            else{
                                res.status(400).json({message: "Invalid Attempt"})
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json({message: "Invalid Attempt"})
                        })
                }
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json({message: "Invalid Attempt"})
            })
    },
    logout: (req,res)=>{
        console.log("Logging out...")
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out"
        });
    },
    getLoggedInUser: (req,res)=>{
        // const decodedJWT = jwt.decode(req.cookies.usertoken,{
        //     complete:true
        // })

        User.findOne({_id:req.jwtpayload.id})
            .then((user)=>{
                console.log(user)
                res.json(user)
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    //Get All Users
    getAllUsers: async(req, res) => {
        await User.find({})
        .then((users)=>{
            res.status(200).json({users:users})
        })
        .catch((err)=> {
            res.status(500).json({message:"Somthing Went Wrong!",error:err})
        })

    },
    //Delete User
    delete:(req,res)=>{
        User.deleteOne({_id:req.params.id})
        .then((user)=>{
            res.status(200).json({deletedUser:user})
        })
        .catch((err)=>{
            res.status(400).json({message:"something went wrong deleting User", error:err})
        })
    }


}


module.exports = UserController