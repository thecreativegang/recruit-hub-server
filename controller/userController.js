const express = require('express');
const mongoose = require('mongoose');
const { sendError } = require('../utilities/errorHelper');
const userSchema = require('../Schemas/userSchema');
const User = new mongoose.model("User", userSchema);
const jwt = require('jsonwebtoken');

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};
exports.create = async (req, res) => {
  const userData = req.body;
  const accessToken = await generateToken({ userData });

  //check if email is already registered or not
  const ifEmailAlreadyRegistered = await User.find({
    email: userData.email
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
  else {
    res.json({ message: "success", accessToken })
  }
};

// get email by verify email
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

exports.updateUsername = async (req, res) => {
  const userInfo = await User.updateOne({ email: req?.decoded?.userData?.email }, { username: req?.body?.username })
  res.json({
    userInfo
  })
}

// get search result by query {sourav}
exports.getSearchUser = async (req, res) => {
  const keyword = req.query.search ?
    {
      $or: [
        { username: { $regex: req.query.search, $ne: req?.decoded?.userData?.email, $options: "i" } },
        { email: { $regex: req.query.search, $ne: req?.decoded?.userData?.email, $options: "i" } },
        // { email: { $ne: req?.decoded?.userData?.email } },
      ]
    } : {};


  const users = await User.find(keyword);
  res.send(users);
}

// get all user
exports.getAllUsers = async (req, res) => {
  const getAllUSers = await User.find({ email: { $ne: req?.decoded?.userData?.email } });
  res.send(getAllUSers);
};


// get all admin
exports.getAdmin = async (req, res) => {
  const getAllAdmin = await User.find({ isAdmin: true });
  res.send(getAllAdmin);
}

// get all developer
exports.getAllDeveloper = async (req, res) => {
  const AllDeveloper = await User.find({ accountType: "developer" });
  res.send(AllDeveloper);
}
// get search result by query
exports.addToWishList = async (req, res) => {

  // check if id is already available
  const checkIdDuplication = await User.find({
    email: req?.decoded?.userData?.email,
    wishList: req?.body?.id
  })
  const response = await User.updateOne({ email: req?.decoded?.userData?.email, wishList: { "$ne": req?.body?.id } }, { $push: { wishList: req?.body?.id } }).catch(err =>
    console.log(err)
  )
  res.json({
    response
  })
  res.send().status(200)
}


//Remove Item from wishList
exports.removeFromWishList = async (req, res) => {
  const getAllUSers = await User.find({});
  res.send(getAllUSers);
};


//hide job
exports.hideJob = async (req, res) => {
  const response = await User.updateOne({ email: req?.decoded?.userData?.email, hiddenJobs: { "$ne": req?.params?.id } }, { $push: { hiddenJobs: req?.params?.id } })
  res.send(response)
};

//Remove Item from hidden Jobs
exports.removeFromHidden = async (req, res) => {
  const bookmarked = [];
  // find  and push the bookmarked jobs ID
  const loadeduser = await User.findOne({ email: req?.decoded?.userData?.email })
  loadeduser?.hiddenJobs?.map(singleJob => bookmarked.push(singleJob))

  const hiddenJobs = await Job.find({ _id: Object(bookmarked) })
  res.json({
    hiddenJobs
  })
};


