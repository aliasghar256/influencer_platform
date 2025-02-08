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
  return (
    <Link href={`/influencer/${id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{name}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{category}</Badge>
                <span>{age} years</span>
                <span>{followers} followers</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{rating}</div>
              <div className="text-sm text-muted-foreground">Overall</div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm font-medium">{attributeName}</span>
            <Badge variant="default">{attributeValue}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

