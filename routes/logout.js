const express = require("express");
const router = express.Router();
const {COOKIE_NAME} = require("../helpers/environment");
router.delete("/logout",async(req,res)=>{
    try{
        req.session.destroy((err) => {
            //delete session data from store, using sessionID in cookie
            if (err) throw err;
            res.clearCookie(COOKIE_NAME); // clears cookie containing expired sessionID
            res.status(200).send("Logged out successfully");
          });
    }
    catch(error){
        res.status(500).send("Internal server error!");
        console.log(error);
    }
});
module.exports = router;