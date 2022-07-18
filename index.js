const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

//routers external file link
const userRouter = require("./Routers/userRouter")

const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())




//routers external file Execute
app.use("/user", userRouter)



//Root api 
app.use((req, res) =>{
    res.send("Recruit Hub server is Running")
})

app.listen(port, ()=>{
console.log('listen to port, ', port);
})