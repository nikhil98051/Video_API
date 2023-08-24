
# Video Compressor API

This is a robust RESTful API that allows users to upload video files, compress their size, and download the compressed videos. The API is built using Node.js and Express.js, 
integrated with Amazon Web Services (AWS) services such as Amazon S3 for storage and Amazon EC2 for hosting.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Video Compression](#video-compression)
- [Amazon S3 Integration](#amazon-s3-integration)
- [Amazon EC2 Integration](#amazon-ec2-integration)
- [Validation and Error Handling](#validation-and-error-handling)
- [Usage](#usage)


## Requirements

- Node.js
- Express.js
- AWS SDK for JavaScript (v3)
- Video compression library (e.g., zlib)
- Amazon Web Services (AWS) account with S3 bucket and EC2 instance
- Multer (for handling file uploads)

## Install dependencies:

npm install

##  Create a .env file in the root directory with the following content:

* AWS_ACCESS_KEY_ID=your-access-key-id

* AWS_SECRET_ACCESS_KEY=your-secret-access-key

* S3_BUCKET_NAME=your-bucket-name



## Start the Server 

node app.js

## API Endpoints

POST /videos/upload: Upload video files for compression.
GET /videos/download/:filename: Download compressed video file by providing the filename in the URL


## Video Compression
Video compression is done using the chosen video compression library (e.g., zlib) to reduce the size while maintaining acceptable video quality.

## Amazon S3 Integration
Amazon S3 is used for storing both the uploaded video files and the compressed video files. AWS SDK for JavaScript (v3) is used to interact with S3.

## Amazon EC2 Integration
The Node.js application can be deployed on an Amazon EC2 instance. Detailed deployment steps are not covered here, but you can refer to the AWS documentation for guidance.

## Validation and Error Handling
Uploaded files are validated to ensure only video files are accepted for compression.
Meaningful error messages and appropriate HTTP status codes are provided to handle errors gracefully.

## Usage
1. Use a tool like Postman to test the API endpoints.
2. Use the /videos/upload endpoint to upload a video for compression.
3. Use the /videos/download/:filename endpoint to download the compressed video file.


## Replace placeholders such as `yourusername`, `your-access-key-id`, `your-secret-access-key`, and `your-bucket-name` with your actual information.

## Make sure to provide clear and accurate information in the documentation to guide users in setting up and using your API.




