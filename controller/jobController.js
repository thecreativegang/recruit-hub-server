const express = require('express');
const mongoose = require('mongoose');
const { sendError } = require('../utilities/errorHelper');
const jwt = require('jsonwebtoken');
const Job = require('../Schemas/postJobSchema');
const { format, add } = require('date-fns');
const { checkUsername } = require('./checkUsernameController');
const userSchema = require('../Schemas/userSchema');
const findUsername = require('../utilities/findUsername');
const { ObjectID } = require('bson');
const { find } = require('../Schemas/postJobSchema');
const User = new mongoose.model("User", userSchema);



exports.postAJob = async (req, res) => {

    //get username
    const usernameFinder = await User.find({ email: req?.decoded?.userData?.email })
    //tags array
    const tagsArray = []
    // const tagsInLowercase = tagsArray.map(singleTag => {
    //     singleTag.toLow
    // })
    //Destructure from req.body
    const { recruitersName, jobTitle, companyName, companySize, vacancies, jobNature, educationalQualification, jobRequirements, tags, deadlineDay, deadlineMonth, deadlineYear, payRange, jobLocation,
    } = req.body;


    // array of those which will be used to find the post 
    const toBeSplited = [recruitersName, jobTitle, companyName, jobNature, educationalQualification, tags]


    //push tags into tagsArray 
    toBeSplited.map(single =>
        //prevent duplicate value inside tagsArray
        !tagsArray.includes(single.trim().split(/\s+/)) &&
        tagsArray.push(...single.toString().toLowerCase().trim().split(/\s+/))

    )

    const publishedDate = (new Date().getTimezoneOffset() === -360)
        ?
        new Date()
        :
        add(new Date(), { hours: 6 })

    //make object to match schema
    const jobData = {
        publishedDate: publishedDate + "",
        publisherUsername: await findUsername(req?.decoded?.userData?.email),
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
    console.log(jobData)
    const postNewJob = new Job(jobData);
    const response = await postNewJob.save(function (err) {
        if (err) {
            res.send(err)
        }
        else {
            res.json({
                message: 'Successfull',
                status: 200,
                response: response
            })
        }
    })
};

exports.getAllJob = async (req, res) => {

    const hiddenJobs = [];
    const allJobsArray = [];
    const jobsToBeSent = []
    const findTheuser = await User.findOne({ email: req?.decoded?.userData?.email })
    findTheuser.hiddenJobs.map(hiddenJob => hiddenJobs.push(hiddenJob))

    const allJobs = await Job.find();
    allJobs.map(singleJob => allJobsArray.push(singleJob._id))
    const jobs = await Job.find({ _id: { $nin: hiddenJobs } })
    // jobs.map(job =>)
    res.json({
        status: 200,
        jobs
    })
};

//Filter job
exports.filter = async (req, res) => {

    let searchData = {}
    const { searchJobNature, searchSearchText, searchCompanySize, searchPayRange, searchShowAllorOnlyMine } = req?.body;
    console.log(searchSearchText)
    const validateNullSearch = async () => {
        if ((searchSearchText.trim(" ").length === 0) &&
            (searchJobNature.length === 0) &&
            (searchCompanySize.length === 0) &&
            (searchShowAllorOnlyMine.length === 0) &&
            (searchPayRange.length === 0)) {
            return res.json({ message: 'No Filter Applied' })
        }
        else {
            async function abc() {
                if (searchSearchText.length !== 0) {
                    searchData = {
                        ...searchData,
                        tags: searchSearchText.toLowerCase()
                    }
                }
                if (searchJobNature.length !== 0) {
                    searchData = {
                        ...searchData,
                        jobNature: searchJobNature.toLowerCase()
                    }
                }
                if (searchCompanySize.length !== 0) {
                    searchData = {
                        ...searchData,
                        companySize: searchCompanySize.toLowerCase()
                    }
                }
                if (searchPayRange.length !== 0) {
                    searchData = {
                        ...searchData,
                        payRange: searchPayRange.toLowerCase(),
                    }
                }
                if (searchShowAllorOnlyMine === 'mine') {
                    searchData = {
                        ...searchData,
                        publisherUsername: await findUsername(req?.decoded?.userData?.email),
                    }
                }

                console.log('Search Data', searchData)
                const matchedJob = await Job.find(searchData)
                return matchedJob;
            }
            const result = await abc()
            // console.log(result)
            res.json({
                result,
                queries: searchData
            })
        }


    }
    validateNullSearch();
};

//Apply to a job
exports.applyJob = async (req, res) => {
    const { id } = req.params;
    console.log('id', id)
    console.log('req.decoded', await req?.decoded)
    // const response = await Job.updateOne({ _id=ObjectID(id) },{$push:{applications:}})
};

//Load bookmarked Jobs
exports.bookmarkedJobs = async (req, res) => {
    const bookmarked = [];
    const loadedBookmarked = await User.find({ email: req?.decoded?.userData?.email })
    console.log(loadedBookmarked?.bookmarkedJobs)
};

//Load hiddenJobs Jobs
exports.hiddenJobs = async (req, res) => {
    const bookmarked = [];
    // find  and push the bookmarked jobs ID
    const loadeduser = await User.findOne({ email: req?.decoded?.userData?.email })
    loadeduser?.hiddenJobs?.map(singleJob => bookmarked.push(singleJob))

    const hiddenJobs = await Job.find({ _id: Object(bookmarked) })
    res.json({
        hiddenJobs
    })
};

