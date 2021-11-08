// send user details 
const express = require("express");
const router = express.Router();
const find_doc = require("../controllers/find_doc");
const {COLLECTION_NAME} = require("../helpers/environment");
router.post("/dashboard",async(req,res)=>{
    try{
        let checkuser = await find_doc(COLLECTION_NAME,{email:req.body.email});
        if(checkuser){
            res.status(200).json(checkuser);
        }
        else{
            res.status(404).send("User not found");
        }
    }
    catch(error){
        res.status(500).send("Internal server error");
        console.log(error);
    }
});
module.exports = router;