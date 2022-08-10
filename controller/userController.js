const express = require('express');
const mongoose = require('mongoose');
const { sendError } = require('../utilities/errorHelper');
const userSchema = require('../Schemas/userSchema');
const User = new mongoose.model("User", userSchema);
const jwt = require('jsonwebtoken');
const { get } = require('../routes/user');

const generateToken = (userData) => {
  console.log(userData);
  return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};


exports.create = async (req, res) => {
  const userData = req.body;

  const accessToken = await generateToken({ userData });

  // console.log(userData)
  const newUser = new User(userData);
  await newUser.save((err) => {
    if (err) {
      res.json({
        error: err.message,
        code: err.code,
        accessToken
      })
    }
    else {
      console.log(res.data.status)
      res.status(200).json({
        message: "User created successfully", accessToken
      })
    }
  })

};


exports.get = async (req, res) => {
  const userInfo = await User.find({ email: req?.decoded?.userData?.email })
  res.json({
    message: 'successfull',
    status: 200,
    userInfo
  })

}

// get single email by email
exports.getSingleEmail = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const user = await User.findOne(query);
  res.send(user);
}
// get email by verify email
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

// get search result by query
exports.getSearchUser = async (req, res) => {
  const keyword = req.query.search ?
    {
      $or: [
        { username: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ]
    } : {};

  const users = await User.find(keyword);
  res.send(users);
}

exports.getAllUsers = async (req, res) => {
  const getAllUSers = await User.find({});
  res.send(getAllUSers);
}



// Code of Hasibul Alam
// const { email, userName, isAdmin, accountType } = req.body;

//   const oldUser = await User.findOne({ email });
//   if (oldUser) return sendError(res, 'The email is already in use!');

//   const newUser = new User({ email, userName, isAdmin, accountType });
//   await newUser.save();

//   res.status(201).json({
//     user: {
//       id: newUser._id,
//       userName: newUser.userName,
//       email: newUser.email,
//       isAdmin: newUser.isAdmin,
//     },
//   });
