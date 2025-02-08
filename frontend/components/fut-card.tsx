import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FUTCardProps {
  name: string
  image: string
  overall: number
  category: string
  topAttributes: {
    name: string
    value: number
  }[]
}

export function FUTCard({ name, image, overall, category, topAttributes }: FUTCardProps) {
  return (
    <Card className="relative w-[300px] h-[400px] bg-gradient-to-br from-primary/10 to-primary/30 p-4 transform transition-transform hover:scale-105">
      {/* Overall Rating Circle */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-primary flex items-center justify-center">
        <span className="text-2xl font-bold text-primary-foreground">{overall}</span>
      </div>

      {/* Category Badge */}
      <Badge className="absolute top-4 left-4">{category}</Badge>

      {/* Profile Image */}
      <div className="mt-12 mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Name */}
      <h3 className="text-center text-xl font-bold mb-4">{name}</h3>

      {/* Top Attributes */}
      <div className="grid grid-cols-2 gap-2">
        {topAttributes.map((attr, i) => (
          <div key={i} className="flex justify-between items-center bg-background/80 rounded p-2">
            <span className="text-sm font-medium">{attr.name}</span>
            <span className="text-sm font-bold">{attr.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

