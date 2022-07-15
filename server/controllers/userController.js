const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const signup = async (req, res)=>{
    
    try{
        let {name, email, password, cpassword} = req.body;
        name = name.trim()
        email = email.trim()
        password = password.trim()
        cpassword = cpassword.trim()
        const userExist = await User.findOne({email: email})

        if(userExist){
            return res.status(409).json({
                status: "FAILED",
                message: "user already exists"
            })
        }else if(password !== cpassword){
            return res.status(401).json({
                status: "FAILED",
                message: "password doesn\'t match"
            })
        }

        //save user
        const user = new User({name, email, password})
        const userRegister = await user.save();

        token = await userRegister.generateAuthToken()
        res.cookie('jwtToken', token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        })

        return res.status(201).json({status:'SUCCESS', user:{
            userID: userRegister._id,
            name: userRegister.name,
            email: userRegister.email,
            token: token
        }})

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

const login = async (req, res)=>{

    try{
        let token;
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                status: "FAILED",
                message: 'Plz enter valid data.'
            })
        }
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(400).json({
                status: "FAILED",
                message: 'Invailid credintials.'
            })
        }else{

        const pss = await bcrypt.compare(password, userExist.password)
        token = await userExist.generateAuthToken()
        
        if(!pss){
            return res.status(400).json({
                status: "FAILED",
                message: 'Invailid credintials.'
            }) 
        }else{
        const userExist = await User.findOne({email})
            return res.status(201).json({status: 'SUCCESS', user:{
                userID: userExist._id,
                name: userExist.name,
                email: userExist.email,
                token: token
            }})
        }
    }
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

const logout = async (req, res) =>{
    try{
        req.user.tokens = [] 
        await req.user.save();
        return res.status(201).json({status:'SUCCESS', message: 'successfully logged out'})
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

const loggedIn = (req, res)=>{
    try{
        if(req.user){
            return res.status(201).json({status: 'SUCCESS', user:{
                userID: req.user._id,
                name: req.user.name,
                email: req.user.email,
                token: req.user.tokens[0].token
            }})
        }else{
            return res.status(400).json({status: 'FAILED', message:'Invalid Token'})
        }

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}


module.exports = {signup, login, logout, loggedIn} 