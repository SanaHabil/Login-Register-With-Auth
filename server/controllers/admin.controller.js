const Admin= require('../models/admin.model');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const AdminController = {
        register:async (req, res) => {
        const { username, pass } = req.body;
    
        try {
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
    
        const hashedPassword = await bcrypt.hash(pass, 10);
        admin = await Admin.create({ username, pass: hashedPassword });
    
        const { _id, ...other } = admin.toObject(); // Get admin properties as an object
        const token = jwt.sign({ id: _id }, process.env.JWT_KEY);
        res.cookie("admintoken", token, { httpOnly: true });
    
        return res.status(201).json({ admin: { id: _id, username } });
        } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
        }
    },       
    login: (req,res)=>{
        Admin.findOne({email: req.body.email})
            .then((adminRecord)=>{
                if(adminRecord === null){
                    res.status(400).json({message: "Invalid login attempt..."})
                }
                else{
                    bcrypt.compare(req.body.pass, adminRecord.pass)
                        .then((isPasswordValid)=>{
                            if(isPasswordValid){
                                console.log("Password is valid")
                                res.cookie(
                                    "admintoken",
                                    jwt.sign(
                                        {
                                            id: adminRecord._id,
                                            email: adminRecord.email,
                                            fname: adminRecord.fname
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000)
                                    }
                                ).json({
                                    message: "Succesfully",
                                    adminLoggedIn: adminRecord.fname,
                                    adminId: adminRecord._id,
                                    fname: adminRecord.fname
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
        res.clearCookie("admintoken");
        res.json({
            message: "You have successfully logged out"
        });
    },
    getLoggedInAdmin: (req,res)=>{
        // const decodedJWT = jwt.decode(req.cookies.admintoken,{
        //     complete:true
        // })

        Admin.findOne({_id:req.jwtpayload.id})
            .then((admin)=>{
                console.log(admin)
                res.json(Admin)
            })
            .catch((err)=>{
                console.log(err)
            })
    }


}


module.exports = AdminController