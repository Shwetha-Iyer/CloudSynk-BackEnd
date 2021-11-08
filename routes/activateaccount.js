const express = require("express");
const router = express.Router();
const {COLLECTION_NAME} = require("../helpers/environment");
const find_doc = require("../controllers/find_doc");
const modifyfield = require("../controllers/modifyfield");
router.put("/activate/:token",async(req,res)=>{
    try{
        //check if token is present
        let checktoken = await find_doc(COLLECTION_NAME,{signup_token:req.params.token});
        if(checktoken){
            //remove the token in DB
            await modifyfield(COLLECTION_NAME,"del","email",checktoken.email,{signup_token:1});
            //set active as 1
            await modifyfield(COLLECTION_NAME,"add","email",checktoken.email,{active:1});
            res.status(200).send("Account activated!");
        }
        else
        res.status(404).send("Token not found");
    }
    catch(error){
        res.status(500).send("Internal Server error!");
        console.log(error);
    }
});
module.exports = router;