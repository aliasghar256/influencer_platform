"use client"
import { useEffect, useState } from "react";
import { Navigation } from "@/components/nav";
import { InfluencerMiniCard } from "@/components/influencer-mini-card";
import { AIChatbot } from "@/components/ai-chatbot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ATTRIBUTE_HEADERS } from "@/types/attributes";
import { TopFiveList } from "@/components/top-five-list";
import { TrendingContent } from "@/components/trending-content";
import { OVRRisers } from "@/components/ovr-risers";

// Define TypeScript Interface for Influencers
interface Influencer {
  name: string;
  category: string;
  profile_picture: string;
  overall_score: number;
  age: number;
  followers: string; // Keeping it string as it's formatted like "2.5M"
  profession: string;
  rate_per_post: string;
  years_active: number;
}

// Main Dashboard Component
export default function Dashboard() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]); // Ensures the type is always an array of influencers

  useEffect(() => {
    fetch("/influencers_data.json")
      .then((res) => res.json())
      .then((data) => setInfluencers(data))
      .catch((error) => console.error("Error fetching influencer data:", error));
  }, []);

  console.log("Influencers:",influencers);

  console.log("ATTRIBUTE_HEADERS:", ATTRIBUTE_HEADERS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="text-3xl font-bold mb-6 text-white">Top Influencers</h1>
            <div className="grid gap-6">
            {ATTRIBUTE_HEADERS.map((header) => (
  <Card key={header.name} className="bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg">
    <CardHeader>
      <CardTitle className="text-black">{header.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {influencers
          .filter((inf) => inf.profession.trim().toLowerCase() === header.name.trim().toLowerCase())
          .slice(0, 3)
          .map((inf) => (
            <InfluencerMiniCard
              key={inf.name}
              id={inf.name.toLowerCase().replace(/\s+/g, "-")}
              name={inf.name}
              image={inf.profile_picture}
              category={inf.category}
              age={inf.age}
              followers={inf.followers}
              rating={inf.overall_score}
              attributeName="Overall Score"
              attributeValue={inf.overall_score}
            />
          ))}
      </div>
    </CardContent>
  </Card>
))}


            </div>
          </div>
          <div className="md:col-span-4">
            <Card className="bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-black">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <AIChatbot />
              </CardContent>
            </Card>
            <OVRRisers />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-4 mt-8">
          <TopFiveList
            title="Top 5 Categories"
            items={["Fashion", "Tech", "Lifestyle", "Food", "Travel"]}
          />
          <TopFiveList
            title="Top 5 Most Followed Influencers"
            items={influencers
              .sort((a, b) => {
                const getNumericFollowers = (followers: string) => {
                  // Convert "2.5M" -> 2500000 and "120K" -> 120000
                  return followers.includes("M")
                    ? parseFloat(followers) * 1_000_000
                    : parseFloat(followers) * 1_000;
                };
                return getNumericFollowers(b.followers) - getNumericFollowers(a.followers);
              })
              .slice(0, 5)
              .map((inf) => ({ name: inf.name, followers: inf.followers }))} // Now followers remain formatted as "2.5M"
          />
          <TopFiveList
            title="Top 5 Cities by Reach"
            items={["Karachi", "Lahore", "Islamabad", "Peshawar", "Faisalabad"]}
          />
          <TrendingContent />
        </div>
      </div>
    </div>
  );
}
