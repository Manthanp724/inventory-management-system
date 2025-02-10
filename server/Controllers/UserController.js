const express = require("express");
const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");

const handleSignup = async (req, res) => {
  try {
    const { name, email, phone, password, organization } = req.body;

    if (!name || !email || !phone || !password || !organization) {
      return res.status(400).send("All fields are require");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send("User Already registred");
    }

    const hashPassword = await bcrypt.hash(password , 10);

    const newUser = await User.create({
      name,
      email,
      password : hashPassword,
      phone,
      organization,
    });

    await newUser.save();

    return res.status(200).json({
      message: "User Created Successful",
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({message : "Error while registration"});
  }
}


const handleLogin = async(req, res) => {
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({message : "Password or Email not match"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message : "User not found"});
        }

        const comparePassword = await bcrypt.compare(password , user.password);

        if(!comparePassword){
            return res.status(400).json({message : "Invalid credentials"});
        }

        return res.status(200).json({
            message : "Login Successful",
            user : user
        })
    } catch (error) {
        return res.status(500).json({message : "Login error"});
    }
}
module.exports = {handleSignup , handleLogin};
