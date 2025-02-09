"use client"

import { Navigation } from "@/components/nav"
import { FUTCard } from "@/components/fut-card"
import { AttributeKey } from "@/components/attribute-key"
import { BiodataBox } from "@/components/biodata-box"
import { SeptagramGraph } from "@/components/septagram-graph"
import { GrowthTrends } from "@/components/growth-trends"
import { OVRTrends } from "@/components/ovr-trends"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ATTRIBUTE_HEADERS } from "@/types/attributes"

// Helper function to calculate average rating
const calculateAverage = (values: number[]) => {
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

// Helper function to get color based on rating
const getColorForRating = (rating: number) => {
  if (rating >= 90) return "bg-green-700"
  if (rating >= 80) return "bg-green-500"
  if (rating >= 70) return "bg-yellow-200"
  if (rating >= 60) return "bg-orange-400"
  if (rating >= 50) return "bg-red-500"
  return "bg-red-900"
}

export default function InfluencerProfile({ params }: { params: { id: string } }) {
  // Mock data for demonstration
  const influencer = {
    name: "Jane Creator",
    image: "/placeholder.svg?height=300&width=300",
    category: "Lifestyle",
    age: 28,
    followers: "2.5M",
    profession: "Content Creator",
    chargingRate: "$5000 per post",
    yearsActive: 5,
    attributes: ATTRIBUTE_HEADERS.map((header) => ({
      name: header.name,
      value: calculateAverage(header.attributes.map((attr) => attr.rating)),
    })),
  }

  const overallRating = calculateAverage(influencer.attributes.map((attr) => attr.value))

  const attributeAbbreviations = [
    { name: "CON", value: influencer.attributes[0].value },
    { name: "ENG", value: influencer.attributes[1].value },
    { name: "VAL", value: influencer.attributes[2].value },
    { name: "SKILL", value: influencer.attributes[3].value },
    { name: "MKT", value: influencer.attributes[4].value },
    { name: "NET", value: influencer.attributes[5].value },
    { name: "INV", value: influencer.attributes[6].value },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <FUTCard
              name={influencer.name}
              image={influencer.image}
              overall={overallRating}
              category={influencer.category}
              attributes={attributeAbbreviations}
            />
          </div>
          <div className="md:col-span-4">
            <div className="grid gap-4">
              <BiodataBox
                age={influencer.age}
                followers={influencer.followers}
                profession={influencer.profession}
                chargingRate={influencer.chargingRate}
                yearsActive={influencer.yearsActive}
              />
              <AttributeKey />
            </div>
          </div>
          <div className="md:col-span-4">
            <SeptagramGraph attributes={attributeAbbreviations} />
          </div>
          <div className="md:col-span-12">
            <Card>
              <CardHeader>
                <CardTitle>Analytics and Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <GrowthTrends />
                  <OVRTrends />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-12">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {ATTRIBUTE_HEADERS.map((header) => (
                    <div key={header.name} className="space-y-2">
                      <h3 className="font-bold flex items-center justify-between">
                        {header.name}
                        <span className="font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {calculateAverage(header.attributes.map((attr) => attr.rating))}
                        </span>
                      </h3>
                      {header.attributes.map((attr) => (
                        <div key={attr.name} className="flex justify-between items-center">
                          <span>{attr.name}</span>
                          <span className={`px-2 py-1 rounded font-bold ${getColorForRating(attr.rating)}`}>
                            {attr.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

