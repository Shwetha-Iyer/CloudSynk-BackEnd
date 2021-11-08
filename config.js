const {SECRETACCESSKEY,ACCESSKEYID,REGION} = require("./helpers/environment");
module.exports = {
    awsConfig:{
        secretAccessKey:SECRETACCESSKEY,
        accessKeyId:ACCESSKEYID,
        region:REGION
    }
}