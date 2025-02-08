"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/nav";
import { InfluencerMiniCard } from "@/components/influencer-mini-card";
import { AIChatbot } from "@/components/ai-chatbot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ATTRIBUTE_HEADERS } from "@/types/attributes";

export default function Dashboard() {
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await fetch("http://localhost:3001/influencer/get_all_profiles");
        const data = await response.json();

        if (response.ok) {
          setInfluencers(data.influencers || []);
        } else {
          setError(data.message || "Failed to fetch influencers");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-9">
            <h1 className="text-3xl font-bold mb-6">Influencer Dashboard</h1>

            {loading && <p className="text-center">Loading influencers...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* ✅ ALL INFLUENCERS GRID */}
            {!loading && !error && influencers.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-4">All Influencers</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {influencers.map((influencer) => (
                    <InfluencerMiniCard
                    key={influencer.influencerID}
                    id={influencer.influencerID}
                    name={influencer.name}
                    image={influencer.profileImage ? `http://localhost:3001/${influencer.profileImage}` : "/placeholder.svg?height=64&width=64"}
                    category={influencer.category}
                    age={influencer.yearsExperience || "N/A"}
                    followers={`${influencer.growthTrends.followers?.[influencer.growthTrends.followers.length - 1] || "N/A"} Followers`}
                    rating={influencer.overallScore || "N/A"}
                    attributeName="Overall Score"
                    attributeValue={influencer.overallScore || 0}
                  />                  
                  ))}
                </div>
              </>
            )}

            {/* ✅ TOP INFLUENCERS BY CATEGORY */}
            {!loading && !error && (
              <div className="grid gap-6 mt-8">
                {ATTRIBUTE_HEADERS.map((header) => {
                  // Filter influencers by category
                  const categoryInfluencers = influencers.filter(
                    (inf) => inf.category.toLowerCase() === header.name.toLowerCase()
                  );

                  return (
                    <Card key={header.name}>
                      <CardHeader>
                        <CardTitle>Top Influencers by {header.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {categoryInfluencers.length > 0 ? (
                            categoryInfluencers.slice(0, 3).map((influencer) => (
                              <InfluencerMiniCard
                                key={influencer.influencerID}
                                id={influencer.influencerID}
                                name={influencer.name}
                                image={influencer.profileImage || "/placeholder.svg?height=64&width=64"}
                                category={influencer.category}
                                age={influencer.yearsExperience || "N/A"}
                                followers={`${influencer.growthTrends.followers?.[influencer.growthTrends.followers.length - 1] || "N/A"} Followers`}
                                rating={influencer.overallScore || "N/A"}
                                attributeName={header.attributes[0]?.name || "N/A"}
                                attributeValue={influencer[header.attributes[0]?.name.toLowerCase()] || 0}
                              />
                            ))
                          ) : (
                            <p className="text-gray-500">No influencers found in this category.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* ✅ AI Assistant Section */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <AIChatbot />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
