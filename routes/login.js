const express = require("express");
const router = express.Router();
const find_doc = require("../controllers/find_doc");
const {COLLECTION_NAME} = require("../helpers/environment");
const bcrypt = require("bcrypt");
router.post("/login",async(req,res)=>{
    try{
        //check if the user exists 
        let checkuser = await find_doc(COLLECTION_NAME,{email:req.body.email});
        if(checkuser){
            //check the status of account 
            if(checkuser.active===0){
                res.status(406).send("Your account is not activated! Please activate your account.");
            }
            else{
                //verify the password
                let checkpassword = await bcrypt.compare(req.body.password,checkuser.password);
                if(checkpassword){
                    const sessUser = { id: checkuser._id, email: checkuser.email,firstname:checkuser.firstname };
                    req.session.user = sessUser;
                    res.status(200).json({ msg: " Logged In Successfully", sessUser });
                }
                else{
                    res.status(401).send("Invalid password");
                }
            }
        }
        else{
            res.status(404).send("User does not exist");
        }
    }
    catch(error){
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});
module.exports = router;