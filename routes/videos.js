const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('@aws-sdk/client-s3');
const zlib = require('zlib');
const fs = require('fs');
require('dotenv').config();

// Configure AWS credentials
const s3 = new AWS.S3({
  region: 'your-region', // Add your AWS region here
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to validate file type
const validateFileType = (req, res, next) => {
  if (!req.file || !req.file.mimetype.startsWith('video')) {
    return res.status(400).json({ error: 'Only video files are allowed' });
  }
  next();
};

router.post('/upload', validateFileType, upload.single('video'), async (req, res, next) => {
  try {
    const inputFile = req.file.buffer;
    const compressedFilename = `compressed-${req.file.originalname}.gz`;

    const compressedData = zlib.gzipSync(inputFile);

    // Upload compressed video to S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: compressedFilename,
      Body: compressedData,
    };

    try {
      await s3.upload(params).promise();
      return res.status(201).json({ message: 'Video uploaded and compressed successfully' });
    } catch (error) {
      console.error('Error uploading to S3:', error);
      return res.status(500).json({ error: 'Failed to upload compressed video' });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/download/:filename', async (req, res, next) => {
  const filename = req.params.filename;

  const downloadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
  };

  try {
    const response = await s3.getObject(downloadParams).promise();

    res.setHeader('Content-Type', response.ContentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(response.Body);
  } catch (error) {
    console.error('Error fetching from S3:', error);
    res.status(500).json({ error: 'Failed to fetch compressed video' });
  }
});

module.exports = router;
