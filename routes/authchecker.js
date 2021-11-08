// to check if the user is logged in with a valid session
const express = require("express");
const router = express.Router();
router.get("/authchecker", (req, res) => {
    const sessUser = req.session.user;
    //console.log(req);
    if (sessUser) 
      return res.json({ msg: " Authenticated Successfully", sessUser });
    else 
      return res.status(401).json({ msg: "Unauthorized" });
});
module.exports = router;
