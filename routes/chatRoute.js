const express = require('express');
const User = require('../Schemas/userSchema');



const router = express.Router();


router.get('/', async (req, res) => {
    const users = await User.find({});
    res.send({
        users,
    });
});

// router.post('/', async (req, res) => {
//     console.log('hit');

// });

// router.post('/group', async (req, res) => {
//     console.log('hit');

// });

// router.put('/rename', async (req, res) => {
//     console.log('hit');

// });

// router.put('/groupremove', async (req, res) => {
//     console.log('hit');

// });


module.exports = router;
