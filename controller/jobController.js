const express = require('express');
const mongoose = require('mongoose');
const { sendError } = require('../utilities/errorHelper');
const jwt = require('jsonwebtoken');
const Job = require('../Schemas/postJobSchema');
const { format, add } = require('date-fns');
const { checkUsername } = require('./checkUsernameController');
const userSchema = require('../Schemas/userSchema');
const User = new mongoose.model("User", userSchema);


exports.postAJob = async (req, res) => {

    //get username
    const usernameFinder = await User.find({ email: req?.decoded?.userData?.email })

    //tags array
    const tagsArray = []
    //Destructure from req.body
    const { recruitersName, jobTitle, companyName, companySize, vacancies, jobNature, educationalQualification, jobRequirements, tags, deadlineDay, deadlineMonth, deadlineYear, payRange, jobLocation
    } = req.body;


    // array of those which will be used to find the post 
    const toBeSplited = [recruitersName, jobTitle, companyName, jobNature, educationalQualification, tags]


    //push tags into tagsArray 
    toBeSplited.map(single =>
        //prevent duplicate value inside tagsArray
        !tagsArray.includes(single.trim().split(/\s+/)) &&
        tagsArray.push(...single.trim().split(/\s+/))

    )
    const [publishedDate, setPublishedDate] = useState("");
    if (new Date().getTimezoneOffset() === -360) {
        setPublishedDate(new Date());
        console.log("no hours added")
    }
    else if (new Date().getTimezoneOffset() === 0) {
        setPublishedDate(add(new Date(), { hours: 6 }));
        console.log("6 hours added")
    }
    //make object to match schema
    const jobData = {
        publishedDate: publishedDate,
        publisherUsername: usernameFinder[0]?.username,
        jobTitle,
        companyName,
        companySize,
        vacancies,
        jobNature,
        educationalQualification,
        jobRequirements,
        tags: tagsArray,
        jobLocation,
        applicationDeadline: {
            deadlineDay,
            deadlineMonth,
            deadlineYear
        },
        recruitersName,
        payRange
    }
    const postNewJob = new Job(jobData);
    const response = await postNewJob.save(function (err) {
        if (err) {
            setPublishedDate("")
            res.send(err)
        }
        else {
            setPublishedDate("")
            res.json({
                message: 'successfull',
                status: 200,
                response: response
            })

        }
    })
};

exports.getAllJob = async (req, res) => {
    const jobs = await Job.find({})
    console.log(format(add(new Date(), { hours: 6 }), 'PPpp'))
    res.status(200)
    res.json({
        status: 200,
        jobs
    })
};

