const express = require("express");
const router = express.Router();
const {objectId} = require("../helpers/connection");
const find_doc = require("../controllers/find_doc");
const {COLLECTION_NAME} = require("../helpers/environment");
router.get("/getfiles/:id",async(req, res)=>{
    try{
        let checkuser = await find_doc(COLLECTION_NAME,{_id:objectId(req.params.id)});
        if(checkuser){
            res.status(200).json(checkuser.files);
        }
        else{
            res.status(404).send("Details not found!");
        }
    }
    catch(error){
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});
module.exports = router;