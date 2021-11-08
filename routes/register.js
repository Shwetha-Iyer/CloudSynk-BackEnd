const express = require("express");
const router = express.Router();
const {COLLECTION_NAME,EMAIL} = require("../helpers/environment");
const encrypt_password = require("../services/passwordencrypt");
const find_doc = require("../controllers/find_doc");
const create_token = require("../services/generatetoken");
const create_doc = require("../controllers/createdoc");
const create_email = require("../services/email");
router.post("/register",async(req,res)=>{
    try{
        // check if the user already exists
        let check = await find_doc(COLLECTION_NAME,{email:req.body.email});
        if(check){
            res.status(400).send("A user with this email already exists!");
        }
        else{
            //encrypt the password
            req.body.password = await encrypt_password(req.body.password);
            //create an account activation token
            req.body.signup_token = await create_token(req.body.email);
            req.body.active = 0;
            req.body.files = [];
            //insert into DB
            await create_doc(COLLECTION_NAME,req.body);
            // send account activation email
            let transporter = create_email();
            let info = await transporter.sendMail({
                from: EMAIL, // sender address
                to: req.body.email, // list of receivers
                subject: "Account Activation link", // Subject line
                text: `Hello! Your account with CloudSynk has been successfully created. Please click on the link to activate your account and enter the below credentials.\n Username: ${req.body.email}`
                //${URL+"activateaccount/"+account_activation}`, // plain text body 
              });
              console.log("New user created,",req.body.email);
              console.log("Message sent: %s", info.messageId);
              res.status(200).send("User added successfully!!");

        }
    }
    catch(error){
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});
module.exports = router;