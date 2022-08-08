const express = require('express');
const mongoose = require('mongoose');
const { sendError } = require('../utilities/errorHelper');
const jwt = require('jsonwebtoken');
const postJobSchema = require('../Schemas/postJobSchema')
const PostJob = new mongoose.model("Job", postJobSchema);

exports.postAJob = async (req, res) => {
    const jobData = req.body;
    // console.log(...req.body)

    const postNewJob = new PostJob(jobData);
    const response = await postNewJob.save((err => {
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
    }))



}