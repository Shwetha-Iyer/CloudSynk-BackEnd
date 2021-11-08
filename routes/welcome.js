const express = require("express");
const router = express.Router();
router.get("/welcome",(req,res)=>{
    res.status(200).send("This page works!");
});
module.exports = router;