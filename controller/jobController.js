const express = require('express');
const mongoose = require('mongoose');
const { sendError } = require('../utilities/errorHelper');
const jwt = require('jsonwebtoken');
const PostJob = require('../Schemas/postJobSchema');
const { format } = require('date-fns');
const { checkUsername } = require('./checkUsernameController');
const userSchema = require('../Schemas/userSchema');
const User = new mongoose.model("User", userSchema);


exports.postAJob = async (req, res) => {

    //get username
    const usernameFinder = await User.find({ email: req?.decoded?.userData?.email })

    //tags array
    const tagsArray = []
    //Destructure from req.body
    const { recruitersName, jobTitle, companyName, companySize, vacancies, jobNature, educationalQualification, jobRequirements, tags, deadlineDay, deadlineMonth, deadlineYear
    } = req.body;


    // array of those which will be used to find the post 
    const toBeSplited = [recruitersName, jobTitle, companyName, jobNature, educationalQualification, tags]


    //push tags into tagsArray 
    toBeSplited.map(single =>
        //prevent duplicate value inside tagsArray
        !tagsArray.includes(single.trim().split(/\s+/)) &&
        tagsArray.push(...single.trim().split(/\s+/))

    )


    //make object to match schema
    const jobData = {
        publishedDate: format(new Date(), 'P'),
        publishedTime: format(new Date(), 'p'),
        publisherUsername: usernameFinder[0]?.username,
        jobTitle,
        companyName,
        companySize,
        vacancies,
        jobNature,
        educationalQualification,
        jobRequirements,
        tags: tagsArray,
        applicationDeadline: {
            deadlineDay,
            deadlineMonth,
            deadlineYear
        },
        recruitersName,
    }

    const postNewJob = new PostJob(jobData);
    const response = await postNewJob.save(function (err) {
        if (err) {
            res.send(err)
        }
        else {
            res.json({
                message: 'successfull',
                status: 200,
                response: response
            })

        }
    })
}