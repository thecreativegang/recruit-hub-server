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

        const data = await Resource.create({
            link, subject, topic,
        });

        if (data) return res.json({ msg: "resource  added successfully.", updateCount: "1" });
        else return res.json({ msg: "Failed to add resource to the database" });
    }
    catch (ex) {
        console.log(ex);
    }
}

exports.deleteResource = async (req, res) => {

    const result = await Resource.deleteOne({})

};

exports.updateResource = async (req, res) => {
    const { link, subject, topic, _id } = req.body;

    const resource = await Resource.updateOne({ _id }, { link, subject, topic })
    res.json({
        resource
    })

};