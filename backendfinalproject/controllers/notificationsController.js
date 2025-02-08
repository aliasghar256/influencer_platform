const notificationsModel = require('../models/notificationsModel');

const fetchAllNotifications = async (req, res) => {
    try {
        // Fetch all notifications from the database
        const notifications = await notificationsModel.find().sort({ date: -1 }); // Sort by date in descending order
        res.status(200).json(notifications);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ message: "Failed to fetch notifications", error: error.message });
    }
};

module.exports = {fetchAllNotifications};
