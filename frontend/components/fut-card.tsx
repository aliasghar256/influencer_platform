import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Attribute {
  name: string
  value: number
}

interface FUTCardProps {
  name: string
  image: string
  overall: number
  category: string
  attributes: Attribute[]
}

export function FUTCard({ name, image, overall, category, attributes }: FUTCardProps) {
  return (
    <Card className="relative w-[300px] h-[420px] bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-4 rounded-[2rem] overflow-hidden transform transition-transform hover:scale-105">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/fut-card-bg.png')] bg-cover opacity-30 z-0"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <Badge className="bg-yellow-500 text-black">{category}</Badge>
          <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-black italic" style={{ fontSize: "1.3rem" }}>
              {overall}
            </span>
          </div>
        </div>
        <div className="mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-center text-xl font-bold mb-4 text-yellow-500">{name}</h3>
        <div className="grid grid-cols-2 gap-2 mb-2 mt-auto">
          {attributes.slice(0, 6).map((attr, i) => (
            <div key={i} className="flex justify-between items-center bg-yellow-500 rounded p-2">
              <span className="text-sm font-medium text-black">{attr.name}</span>
              <span className="text-sm font-bold text-black">{attr.value}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center bg-yellow-500 rounded p-2 mt-2">
          <span className="text-sm font-medium text-black mr-2">{attributes[6].name}</span>
          <span className="text-sm font-bold text-black">{attributes[6].value}</span>
        </div>
      </div>
    </Card>
  )
}

