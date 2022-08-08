const express = require('express');
const mongoose = require('mongoose');
const { sendError } = require('../utilities/errorHelper');
const jwt = require('jsonwebtoken');

exports.postJob = async (req, res) => {
    console.log(req.body);
    res.send('OK')
}