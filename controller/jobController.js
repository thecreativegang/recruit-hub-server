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
    const jobs = await Job.find({})
    console.log(format(add(new Date(), { hours: 6 }), 'PPpp'))
    res.status(200)
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

