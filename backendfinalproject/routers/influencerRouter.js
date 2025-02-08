const express = require('express');
const influencerRouter = express.Router();
const { addInfluencerProfile, deleteInfluencerProfile, viewInfluencerProfile,viewAllInfluencers } = require('../controllers/influencerController');

influencerRouter.post('/create_profile', addInfluencerProfile);
influencerRouter.get('/get_profile', viewInfluencerProfile);
influencerRouter.get('/get_all_profiles', viewAllInfluencers);
influencerRouter.delete('/delete_profile', deleteInfluencerProfile);

module.exports = influencerRouter;
