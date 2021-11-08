const { v4: uuidv4 } = require('uuid');
var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
const {awsConfig} = require("./config");
const {BUCKET,REGION,FOLDER}= require("./helpers/environment");

aws.config.update(awsConfig)
var s3 = new aws.S3();
var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: `${BUCKET}/myFolder`,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
          console.log(file,typeof file);
          var format = file.mimetype;
          if(format.includes("image")||format.includes("pdf")){
            let ind = format.indexOf("/");
            var fformat=format.slice(ind+1,format.length);
            req.s3Key=req.s3Key+"."+fformat;
          }
          else {
            let index=file.originalname.lastIndexOf(".");
            var form= file.originalname.slice(index,file.originalname.length);
            req.s3Key=req.s3Key+form;
          }
          
        cb(null, `${req.s3Key}`)
      }
    })
})

const singleFileUpload = upload.single('image');

function uploadToS3(req,res){
    req.s3Key = uuidv4();
    //let downloadUrl = 
    return new Promise((resolve,reject)=>{
        return singleFileUpload(req,res,err =>{
            if(err) return reject(err);
            console.log(`https://${BUCKET}.s3.${REGION}.amazonaws.com/${FOLDER}/${req.s3Key}`)
            return resolve(`https://${BUCKET}.s3.${REGION}.amazonaws.com/${FOLDER}/${req.s3Key}`)
        })
    })
}
module.exports = {
    uploadImageToS3: (req,res)=>{
        // const obj = new aws.S3().putObject({
        //     Key:`MyFolder/`,
        //     Bucket:`sample-bucket-mern`
        // });
        uploadToS3(req,res).then(downloadUrl=>{
            console.log(downloadUrl);
            return  res.status(200).send({downloadUrl})
        }).catch(e=>{
            console.log(e);
        })
    }
}