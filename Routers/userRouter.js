const express = require('express')
const router = express.Router()



router.get("/info", (req, res) =>{
    res.send("this is user info router")
})




module.exports = router