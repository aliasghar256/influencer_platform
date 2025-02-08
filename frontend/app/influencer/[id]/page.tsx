"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/nav";
import { FUTCard } from "@/components/fut-card";
import { AttributesDisplay } from "@/components/attributes-display";
import { ATTRIBUTE_HEADERS } from "@/types/attributes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function InfluencerProfile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [influencer, setInfluencer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInfluencerProfile() {
      try {
        const response = await fetch(`http://localhost:3001/influencer/get_profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            influencerid: params.id, // Pass ID as a header
          },
        });

        const data = await response.json();
        if (response.ok) {
          setInfluencer(data.influencerProfile);
        } else {
          setError(data.message || "Influencer not found");
        }
      } catch (err) {
        setError("Error fetching influencer profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchInfluencerProfile();
  }, [params.id]);

  if (loading) return <p className="text-center mt-10">Loading influencer profile...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  // ✅ Format Growth Data for Chart
  const growthData =
    influencer?.growthTrends?.followers?.map((followers: number, index: number) => ({
      name: `Month ${index + 1}`,
      followers: followers || 0,
      engagement: influencer?.growthTrends?.engagement?.[index] || 0,
    })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-12">
          {/* ✅ Influencer Profile Card */}
          <div className="md:col-span-4">
            <FUTCard
              name={influencer.name}
              image={influencer.profileImage ? `http://localhost:3001/${influencer.profileImage}` : "/placeholder.svg?height=300&width=300"}
              overall={influencer.overallScore || "N/A"}
              category={influencer.category}
              topAttributes={[
                { name: "Creativity", value: influencer?.contentCreation?.creativity || 0 },
                { name: "Authenticity", value: influencer?.brandValue?.authenticity || 0 },
                { name: "Content Innovation", value: influencer?.innovation?.contentInnovation || 0 },
                { name: "Conversion Rate", value: influencer?.marketingImpact?.conversionRate || 0 },
              ]}
            />
          </div>

          {/* ✅ Influencer Attributes & Growth Trends */}
          <div className="md:col-span-8">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                {/* ✅ Pass the actual influencer data */}
                <AttributesDisplay headers={ATTRIBUTE_HEADERS} influencerData={influencer} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="followers" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
