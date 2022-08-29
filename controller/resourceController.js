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


// get search result in resource page
// user/search-user?search=${search}
// subject:"React"topic:"Library For react"

exports.getSearchResource = async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                {
                    subject: {
                        $regex: req.query.search,
                        $ne: req?.decoded?.resource?.subject,
                        $options: 'i',
                    },
                },
                {
                    topic: {
                        $regex: req.query.search,
                        $ne: req?.decoded?.userData?.topic,
                        $options: 'i',
                    },
                },
                // { email: { $ne: req?.decoded?.userData?.email } },
            ],
        }
        : {};

    const resource = await Resource.find(keyword);
    res.send(resource);
};

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