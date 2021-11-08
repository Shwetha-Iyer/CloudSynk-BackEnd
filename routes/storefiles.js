const express = require("express");
const router = express.Router();
const {COLLECTION_NAME} = require("../helpers/environment");
const find_doc = require("../controllers/find_doc");
const modifyfield = require("../controllers/modifyfield");
const {objectId} = require("../helpers/connection");
router.put("/storefiles/:id", async(req,res)=>{
    try{
        console.log("inside")
        let checkuser = await find_doc(COLLECTION_NAME,{_id:objectId(req.params.id)});
        if(checkuser){
            //name size type downloadurl
            if(checkuser.files){
                console.log("inside already files");
                await modifyfield(COLLECTION_NAME,"update","_id",req.params.id,{files:req.body});
                res.status(200).send("Added");
            }
            
            
            else{
                console.log("inside new files")
                await modifyfield(COLLECTION_NAME,"add","_id",req.params.id,{files:[req.body]});
                res.status(200).send("Added");
            }
            


        }
        else{
            res.status(404).send("User not found!");
        }
    }
    catch(error){
        res.status(500).send("Internal server error");
        console.log(error);
    }
});
module.exports = router;