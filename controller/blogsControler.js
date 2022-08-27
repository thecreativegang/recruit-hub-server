const express = require('express');
const mongoose = require('mongoose');
const Blogs = require('../Schemas/blogsSchema');



exports.getAllBlogs = async (req, res) => {
    const AllBlogs = await Blogs.find({});
    res.send(AllBlogs);
}

exports.postAllBlogs = async (req, res) => {
    try {
        const { title, subject } = req.body;

        const data = await Blogs.create({
            title, subject
        });

        if (data) return res.json({ msg: "blogs  added successfully.", updateCount: "1" });
        else return res.json({ msg: "Failed to add blogs to the database" });
    }
    catch (ex) {
        console.log(ex);
    }
}

exports.deleteBlogs = async (req, res) => {

    const result = await Blogs.deleteOne({})

};

exports.updateBlogs = async (req, res) => {
    const { link, subject, topic, _id } = req.body;

    const blogs = await Blogs.updateOne({ _id }, { title, subject })
    res.json({
        blogs
    })

};