import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface InfluencerMiniCardProps {
  id: string
  name: string
  image: string
  category: string
  age: number
  followers: string
  rating: number
  attributeName: string
  attributeValue: number
}

const getColorForRating = (rating: number) => {
  if (rating >= 90) return "text-green-700"
  if (rating >= 80) return "text-green-500"
  if (rating >= 70) return "text-yellow-400"
  if (rating >= 60) return "text-orange-400"
  if (rating >= 50) return "text-red-500"
  return "text-red-700"
}

export function InfluencerMiniCard({
  id,
  name,
  image,
  category,
  age,
  followers,
  rating,
  attributeName,
  attributeValue,
}: InfluencerMiniCardProps) {

  console.log("Name:", name);
  console.log("Image:", image);
  console.log("Category:", category);
  console.log("Age:", age);

  return (
    <Link href={`/influencer/${id}`}>
      <Card className="hover:shadow-lg transition-shadow bg-white">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-black">{name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Badge variant="secondary">{category}</Badge>
                <span>{age} years</span>
                <span>{followers} followers</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${getColorForRating(rating)}`}>{rating}</div>
              <div className="text-sm text-gray-600">Overall</div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">{attributeName}</span>
            <Badge variant="default">{attributeValue}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

