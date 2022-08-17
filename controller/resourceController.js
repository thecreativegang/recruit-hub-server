const express = require('express');
const mongoose = require('mongoose');
const Resource = require('../Schemas/ResourceSchema');


const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};


exports.getAllResource = async (req, res) => {
    const AllResource = await Resource.find({});
    res.send(AllResource);
}

exports.postAllResource = async (req, res) => {
    try {
        const { link, subject, topic } = req.body;
        console.log(link, subject, topic);

        const data = await Resource.create({
            link, subject, topic,
        });

        if (data) return res.json({ msg: "rating  added successfully." });
        else return res.json({ msg: "Failed to add rating to the database" });
    }
    catch (ex) {
        console.log(ex);
    }
}

