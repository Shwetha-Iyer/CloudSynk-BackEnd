require("dotenv").config();
module.exports = {
    PORT: process.env.PORT || 3100,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_CLUSTER: process.env.DB_CLUSTER,
    DB_NAME: process.env.DB_NAME,
    COLLECTION_NAME:process.env.COLLECTION_NAME,
    SESS_SECRET: process.env.SESS_SECRET,
    COOKIE_NAME: process.env.COOKIE_NAME,
    TOKEN:process.env.TOKEN,
    EMAIL: process.env.EMAIL,
    PASS: process.env.PASS,
    SECRETACCESSKEY:process.env.SECRETACCESSKEY,
    ACCESSKEYID:process.env.ACCESSKEYID,
    REGION:process.env.REGION,
    BUCKET:process.env.BUCKET,
    FOLDER:process.env.FOLDER
}