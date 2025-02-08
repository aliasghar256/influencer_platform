const express = require('express');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFSBucket } = require('mongodb');


// Use the existing connection
const conn = mongoose.connection;

// Initialize GridFS
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('templates'); // Collection where files are stored
});

// Fetch all templates
const fetchAllTemplates = async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No templates found' });
    }
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const downloadTemplateByID = async (req, res) => {
  try {
    // Ensure the database connection is open
    if (!mongoose.connection.readyState) {
      await mongoose.connect('mongodb://localhost:27017/YourDBName', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, {
      bucketName: 'templates', // Ensure this matches your GridFS bucket name
    });

    const fileId = new mongoose.Types.ObjectId(req.params.id);

    // Find the file by its ID
    const filesCollection = db.collection('templates.files');
    const file = await filesCollection.findOne({ _id: fileId });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set the response headers
    res.set({
      'Content-Type': file.contentType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.filename}"`,
    });

    // Create a download stream and pipe it to the response
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on('error', (err) => {
      console.error('Download stream error:', err);
      res.status(500).json({ error: 'An error occurred while downloading the file.' });
    });

    downloadStream.on('end', () => {
      res.end();
    });
  } catch (err) {
    console.error('Error in downloadTemplateByID:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchAllTemplates, downloadTemplateByID };
