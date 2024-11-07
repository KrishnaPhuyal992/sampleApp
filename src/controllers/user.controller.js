import express from 'express';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Register a new user
const registerUser = async (req,res)=>{
    try {

        //get all fields from req
        const { name, email, password } = req.body;


        //check if fields are empty
        if (!name || !email || !password) {
            return res.status(400).send("All fields are required.");
        }

        //Check if user already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).send("User already exists.");
        }

        //create new record for database
        const user = new User({ name, email, password });

        //send the record to the database
        await user.save();

        //send the response to the user
        return res.status(201).send(user);
        console.log("User created:", user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

//login a user
const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body

        //validate the inputs
if(!email || !password){
    return res.status(400).send("Email & password are required")
}

//find user by email

const user = await User.findOne({email})



if(!user){
    return res.status(400).send("This user Does not exist")
}



//verify password
const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
    return res.status(403).send("Wrong password")
}
//Generate JWT Token 
const token  = jwt.sign({userId:user._id},"JKHJKHKJSDHUISHIDUSHUID",{expiresIn:'1h'})



//return success response(JWT Token)
res.status(200).json({message:"Login Success",token})
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
//Forgot password
//Generate Password reset token 

//Saves it to the user’s account along with an expiration time.
//Sends an email to the user with a password reset link containing the token.

export {registerUser,loginUser}
