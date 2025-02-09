const express = require("express");
const mongoose = require("mongoose");
const InfluencerProfileModel = require("../models/influencerProfileModel");
const influencerIDCounterModel = require("../models/influencerIDCounter");
const multer = require("multer");
const path = require("path");

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// Multer Upload Middleware
const upload = multer({ storage: storage }).single("profileImage");

// ✅ Add Influencer Profile (Create & Update)
const addInfluencerProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "File upload error: " + err.message });
        }

        try {
            // Parse contentCreation if it exists in the request
            const contentCreation = req.body.contentCreation ? JSON.parse(req.body.contentCreation) : {};
            
            const {
                name,
                email,
                category,
                overallScore,
                audienceEngagement,
                brandValue,
                technicalSkills,
                marketingImpact,
                networking,
                innovation,
                growthTrends,
            } = req.body;

            const profileImage = req.file ? `uploads/${req.file.filename}` : null; // Store image path

            // Check if influencer already exists
            let existingInfluencer = await InfluencerProfileModel.findOne({ email });

            if (existingInfluencer) {
                // Update influencer profile
                existingInfluencer.name = name || existingInfluencer.name;
                existingInfluencer.category = category || existingInfluencer.category;
                existingInfluencer.overallScore = overallScore || existingInfluencer.overallScore;

                if (profileImage) existingInfluencer.profileImage = profileImage; // Update image if provided

                // Ensure proper merging
                existingInfluencer.contentCreation = { 
                    ...existingInfluencer.contentCreation, 
                    ...contentCreation 
                };

                existingInfluencer.audienceEngagement = { 
                    ...existingInfluencer.audienceEngagement, 
                    ...audienceEngagement 
                };
                existingInfluencer.brandValue = { 
                    ...existingInfluencer.brandValue, 
                    ...brandValue 
                };
                existingInfluencer.technicalSkills = { 
                    ...existingInfluencer.technicalSkills, 
                    ...technicalSkills 
                };
                existingInfluencer.marketingImpact = { 
                    ...existingInfluencer.marketingImpact, 
                    ...marketingImpact 
                };
                existingInfluencer.networking = { 
                    ...existingInfluencer.networking, 
                    ...networking 
                };
                existingInfluencer.innovation = { 
                    ...existingInfluencer.innovation, 
                    ...innovation 
                };

                if (growthTrends?.followers) {
                    existingInfluencer.growthTrends.followers = growthTrends.followers;
                }
                if (growthTrends?.engagement) {
                    existingInfluencer.growthTrends.engagement = growthTrends.engagement;
                }

                await existingInfluencer.save();
                return res.status(200).json({ message: "Influencer profile updated", influencer: existingInfluencer });
            }

            // Generate new influencerID
            let counter = await influencerIDCounterModel.findOneAndUpdate(
                { name: "influencerID" },
                { $inc: { sequenceValue: 1 } },
                { new: true, upsert: true }
            );

            const influencerID = counter.sequenceValue;

            // Create new influencer profile
            const newInfluencer = await InfluencerProfileModel.create({
                name,
                email,
                influencerID,
                category,
                overallScore,
                profileImage,
                contentCreation, // Now correctly parsed
                audienceEngagement,
                brandValue,
                technicalSkills,
                marketingImpact,
                networking,
                innovation,
                growthTrends,
            });

            return res.status(201).json({ message: "Influencer profile created", influencer: newInfluencer });

        } catch (error) {
            return res.status(500).json({ message: "Error! " + error.message });
        }
    });
};



//Removing a favorite (CRUD 2)
const deleteInfluencerProfile = async (req, res) => {
    const influencerID = req.headers.influencerID
    try {
        const influencerProfileInstance = await InfluencerProfileModel.findOneAndDelete({influencerID: influencerID });
        //const influencerProfileInstance = await favoritesModel.findOneAndDelete({ userID: req.userId, _id: favoriteID })
        if (influencerProfileInstance) return res.status(200).json({ Message: "Favorite Deleted", favorite: influencerProfileInstance })
        else return res.status(404).json({ Message: "Error! Favorite not found" })
    } catch (error) {
        return res.status(500).json({ message: "Error! " + error.message })
    }
}

//Viewing all favorites (CRUD 3)
const viewInfluencerProfile = async (req, res) => {
    const influencerID = req.headers["influencerid"] || req.headers["InfluencerID"];
    try {
        const influencerProfile = await InfluencerProfileModel.findOne({ influencerID:influencerID })
        if (influencerProfile) return res.status(200).json({ Message: "influencerProfile", influencerProfile: influencerProfile })
        else return res.status(404).json({ Message: "Error! No Profile Found" })
    } catch (error) {
        return res.status(500).json({ message: "Error! " + error.message })
    }
}

const viewAllInfluencers = async (req, res) => {
    try {
        const influencers = await InfluencerProfileModel.find({});

        if (!influencers || influencers.length === 0) {
            return res.status(404).json({ message: "No influencers found." });
        }

        return res.status(200).json({ message: "Influencers retrieved successfully", influencers });
    } catch (error) {
        return res.status(500).json({ message: "Error! " + error.message });
    }
};


module.exports = { addInfluencerProfile, deleteInfluencerProfile, viewInfluencerProfile,viewAllInfluencers }