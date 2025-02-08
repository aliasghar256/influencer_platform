const express = require('express');
const mainRouter = require('./routers/mainRouter');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const port = 3001;
const app = express();

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/InfluencerDB")
    .then(() => console.log('✅ DB Connected successfully.'))
    .catch((err) => console.error('❌ Error in DB Connection:', err));

// ✅ Ensure `uploads` directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('📁 `uploads` directory was missing and has been created.');
}

// ✅ Middleware: JSON Parsing & CORS
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow frontend requests
    credentials: true
}));

// ✅ Serve Static Files (Images)
app.use('/uploads', express.static(uploadDir));

// ✅ Logging Middleware (Includes Timestamp & Client IP)
app.use((req, res, next) => {
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').replace(/\..+/, '');
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log(`[${formattedDate}] ${req.method} ${req.url} - ${clientIP}`);
    next();
});

// ✅ Main Router
app.use('/', mainRouter);

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
