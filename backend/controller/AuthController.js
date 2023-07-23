const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");


//signUp
exports.SignUp = async(req,res,next)=>{
    try {
        
        const {email,username,password,createdAt} = req.body;

        const exitingUser = await User.findOne({email});

        if(exitingUser){
            return res.json({ message: "User already exists"});
        }

        const user = await User.create({email,username,password,createdAt})
        const token = createSecretToken(user._id);
        res.cookie("token",token,{
            withCredentials:true,
            httpOnly:false
        });
        res.status(201).json({
            message:"User signed in successfully",
            success:true,
            user,
        });
        next();

    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Given data is not right"
        })
    }
}

exports.Login = async(req,res,next)=>{
    try {
        
        const {email,password}= req.body;
        if(!email || !password){
            return res.json({message: "All Fields are required"});
        } 
        const user = await User.findOne({email});
        if(!user){
            return res.json({message: "invalid email or password"})
        }
        const auth = await bcrypt.compare(password,user.password);
        if(!auth){
            return res.json({message: "invalid email or password"})
        }
        const token = createSecretToken(user._id);
        res.cookie("token",token,{
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({
             message: "User logged in successfully",
              success: true });
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            error
        })  
    }
}
