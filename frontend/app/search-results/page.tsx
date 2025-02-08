"use client"

import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/nav"
import { InfluencerMiniCard } from "@/components/influencer-mini-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for demonstration
const mockInfluencers = [
  {
    id: "1",
    name: "Alice Johnson",
    image: "/placeholder.svg?height=64&width=64",
    category: "Lifestyle",
    age: 28,
    followers: "2.5M",
    rating: 92,
    attributeName: "Content Creation",
    attributeValue: 95,
  },
  {
    id: "2",
    name: "Bob Smith",
    image: "/placeholder.svg?height=64&width=64",
    category: "Tech",
    age: 32,
    followers: "1.8M",
    rating: 88,
    attributeName: "Innovation",
    attributeValue: 93,
  },
  {
    id: "3",
    name: "Carol Williams",
    image: "/placeholder.svg?height=64&width=64",
    category: "Fashion",
    age: 26,
    followers: "3.2M",
    rating: 90,
    attributeName: "Brand Value",
    attributeValue: 94,
  },
  {
    id: "4",
    name: "David Brown",
    image: "/placeholder.svg?height=64&width=64",
    category: "Gaming",
    age: 24,
    followers: "4.1M",
    rating: 91,
    attributeName: "Audience Engagement",
    attributeValue: 96,
  },
  {
    id: "5",
    name: "Eva Martinez",
    image: "/placeholder.svg?height=64&width=64",
    category: "Fitness",
    age: 29,
    followers: "1.5M",
    rating: 87,
    attributeName: "Marketing Impact",
    attributeValue: 92,
  },
  {
    id: "6",
    name: "Frank Lee",
    image: "/placeholder.svg?height=64&width=64",
    category: "Food",
    age: 35,
    followers: "2.2M",
    rating: 89,
    attributeName: "Creativity",
    attributeValue: 91,
  },
  {
    id: "7",
    name: "Grace Kim",
    image: "/placeholder.svg?height=64&width=64",
    category: "Travel",
    age: 31,
    followers: "1.9M",
    rating: 86,
    attributeName: "Authenticity",
    attributeValue: 94,
  },
  {
    id: "8",
    name: "Henry Chen",
    image: "/placeholder.svg?height=64&width=64",
    category: "Tech",
    age: 27,
    followers: "3.5M",
    rating: 93,
    attributeName: "Technical Skills",
    attributeValue: 97,
  },
  {
    id: "9",
    name: "Isabelle Dubois",
    image: "/placeholder.svg?height=64&width=64",
    category: "Fashion",
    age: 30,
    followers: "2.8M",
    rating: 91,
    attributeName: "Visual Style",
    attributeValue: 95,
  },
  {
    id: "10",
    name: "Jack Wilson",
    image: "/placeholder.svg?height=64&width=64",
    category: "Gaming",
    age: 23,
    followers: "3.9M",
    rating: 88,
    attributeName: "Community Management",
    attributeValue: 93,
  },
]

export default function SearchResults() {
  const searchParams = useSearchParams()

  // In a real application, you would use these params to fetch data from your backend
  const name = searchParams.get("name")
  const ageMin = searchParams.get("ageMin")
  const ageMax = searchParams.get("ageMax")
  const ratingMin = searchParams.get("ratingMin")
  const ratingMax = searchParams.get("ratingMax")
  const categories = searchParams.get("categories")?.split(",")

  // For demonstration, we're not actually filtering the results
  // In a real application, you would use the search params to filter the data
  const filteredInfluencers = mockInfluencers

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredInfluencers.map((influencer) => (
                <InfluencerMiniCard
                  key={influencer.id}
                  id={influencer.id}
                  name={influencer.name}
                  image={influencer.image}
                  category={influencer.category}
                  age={influencer.age}
                  followers={influencer.followers}
                  rating={influencer.rating}
                  attributeName={influencer.attributeName}
                  attributeValue={influencer.attributeValue}
                />
              ))}
            </div>
            {filteredInfluencers.length === 0 && (
              <p className="text-center text-muted-foreground mt-8">No results found. Try adjusting your filters.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

