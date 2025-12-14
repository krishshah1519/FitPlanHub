const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req,res) =>{
    try{
        const {name,email,password,role} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'User already exists'});
        }

        const encryption = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,encryption);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role:role || 'user'
        })
        
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id)            
        });       
    } catch(error){
        res.status(500).json({message: error.message});
    }};

exports.loginUser = async (req,res) => {
    try{
        const{email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        res.json({
            _id: user.id,
            name:user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id)
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }};


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d',
    });
};