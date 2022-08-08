const express = require('express');
const mongoose = require('mongoose');
const { sendError } = require('../utilities/errorHelper');
const jwt = require('jsonwebtoken');
const PostJob = require('../Schemas/postJobSchema')

exports.postAJob = async (req, res) => {

    //tags array
    const tagsArray = []
    //Destructure from req.body
    const { recruitersName, jobTitle, companyName, companySize, vacancies, jobNature, educationalQualification, jobRequirements, tags, deadlineDay, deadlineMonth, deadlineYear } = req.body;


    // array of those which will be used to find the post 
    const toBeSplited = [recruitersName, jobTitle, companyName, jobNature, educationalQualification, tags]

    toBeSplited.map(single => tagsArray.push(...single.trim().split(/\s+/)))


    //make object to match schema
    const jobData = {
        jobTitle, companyName, companySize, vacancies, jobNature, educationalQualification, jobRequirements,
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
                response
            })

        }
    })
}