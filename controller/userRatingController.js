const express = require('express');
const mongoose = require('mongoose');
const Reviews = require("../Schemas/UserRatingSchema");



exports.getUserReview = async (req, res) => {
    const UserRating = await Reviews.find({});
    res.send(UserRating);
}

exports.postUserReview = async (req, res) => {
    try {
        const { message, rating } = req.body;
        const data = await Reviews.create({
            message, rating
        });

        if (data) return res.json({ msg: "rating  added successfully." });
        else return res.json({ msg: "Failed to add rating to the database" });
    } catch (ex) {
        console.log(ex);
    }
}
