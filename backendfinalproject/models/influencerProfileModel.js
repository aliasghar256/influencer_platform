const mongoose = require("mongoose");

const InfluencerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    influencerID: { type: Number, required: true, unique: true },
    category: { type: String, default: "General" },
    overallScore: { type: Number, default: 0 },
    profileImage: { type: String, default: null }, // ✅ Added profile image URL
    yearsExperience: { type: Number, default: 0 }, // ✅ Added experience in years

    socialMedia: {  // ✅ Added social media links
        instagram: { type: String, default: null },
        twitter: { type: String, default: null },
        youtube: { type: String, default: null },
        linkedin: { type: String, default: null },
        tiktok: { type: String, default: null }
    },

    contentCreation: {
        creativity: { type: Number, default: 0 },
        productionQuality: { type: Number, default: 0 },
        consistency: { type: Number, default: 0 },
        storytelling: { type: Number, default: 0 },
        visualStyle: { type: Number, default: 0 }
    },

    audienceEngagement: {
        communityManagement: { type: Number, default: 0 },
        responseTime: { type: Number, default: 0 },
        audienceRetention: { type: Number, default: 0 },
        callToAction: { type: Number, default: 0 },
        audienceGrowth: { type: Number, default: 0 }
    },

    brandValue: {
        authenticity: { type: Number, default: 0 },
        brandIntegration: { type: Number, default: 0 },
        professionalism: { type: Number, default: 0 },
        brandSafety: { type: Number, default: 0 },
        versatility: { type: Number, default: 0 }
    },

    technicalSkills: {
        platformExpertise: { type: Number, default: 0 },
        seoUnderstanding: { type: Number, default: 0 },
        analyticsUsage: { type: Number, default: 0 },
        techAdaptability: { type: Number, default: 0 },
        crossPlatformSkills: { type: Number, default: 0 }
    },

    marketingImpact: {
        conversionRate: { type: Number, default: 0 },
        targetAccuracy: { type: Number, default: 0 },
        campaignInnovation: { type: Number, default: 0 },
        marketAwareness: { type: Number, default: 0 },
        trendLeverage: { type: Number, default: 0 }
    },

    networking: {
        collaborationQuality: { type: Number, default: 0 },
        industryConnections: { type: Number, default: 0 },
        eventPresence: { type: Number, default: 0 },
        partnershipValue: { type: Number, default: 0 },
        communityStanding: { type: Number, default: 0 }
    },

    innovation: {
        contentInnovation: { type: Number, default: 0 },
        platformPioneering: { type: Number, default: 0 },
        formatEvolution: { type: Number, default: 0 },
        techIntegration: { type: Number, default: 0 },
        trendSetting: { type: Number, default: 0 }
    },

    growthTrends: {
        followers: { type: [Number], default: [] },
        engagement: { type: [Number], default: [] }
    },

    createdAt: { type: Date, default: Date.now }
});

const InfluencerProfileModel = mongoose.model("InfluencerProfile", InfluencerSchema);
module.exports = InfluencerProfileModel;
