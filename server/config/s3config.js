//imports aws
const AWS = require("aws-sdk");

//establishes connection to s3 
//enables use of bucket for upload and calling photos
module.exports = new AWS.S3(
  {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_BUCKET_REGION,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
    },
  },
  {
    app: {
      storageDir: "tmp",
    },
  }
);
