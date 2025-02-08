const mongoose = require('mongoose');
const {Schema} = mongoose;

// Define the schema for notifications
const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: { createdAt: true, updatedAt: false } });

// Create the Notification model
const notificationsModel = mongoose.model('notifications', notificationSchema);

module.exports = notificationsModel;
