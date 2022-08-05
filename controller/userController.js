const express = require('express');
const mongoose = require('mongoose');
const { sendError } = require('../utilities/errorHelper');
const userSchema = require('../Schemas/userSchema');
const User = new mongoose.model("User", userSchema);
const jwt = require('jsonwebtoken');
const { get } = require('../routes/user');

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};
exports.create = async (req, res) => {
  const userData = req.body;
  const accessToken = await generateToken({ userData });


  //check if email is already registered or not
  const ifEmailAlreadyRegistered = await User.find({
    email: userData?.email
  });

  //get the user info if registered
  if (ifEmailAlreadyRegistered.length === 0) {
    const newUser = new User(userData);
    const insertedUser = await newUser.save((err) => {
      if (err) {
        res.json({
          error: err.message,
          code: err.code,
          accessToken,
        })
      }
      else {
        res.status(200).json({
          insertedUser,
          accessToken,
          message: "User created successfully",
        })
      }
    })
  }
};
exports.get = async (req, res) => {
  const userInfo = await User.find({ email: req?.decoded?.userData?.email })
  res.json({
    message: 'successfull',
    status: 200,
    userInfo
  })
}
exports.updateUsername = async (req, res) => {
  const userInfo = await User.updateOne({ email: req?.decoded?.userData?.email }, { username: req?.body?.username })
  res.json({
    userInfo
  })
}

exports.getAllUsers = async (req, res) => {
  const getAllUSers = await User.find({});
  res.send(getAllUSers);
}

