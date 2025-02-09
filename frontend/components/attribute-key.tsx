import { Card, CardContent } from "@/components/ui/card"

const attributeExplanations = [
  { short: "CON", full: "Content Creation" },
  { short: "ENG", full: "Audience Engagement" },
  { short: "VAL", full: "Brand Value" },
  { short: "SKILL", full: "Technical Skills" },
  { short: "MKT", full: "Marketing Impact" },
  { short: "NET", full: "Networking" },
  { short: "INV", full: "Innovation" },
]

export function AttributeKey() {
  return (
    <Card className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2 text-center">Attribute Key</h3>
        <ul className="grid grid-cols-1 gap-1 text-sm">
          {attributeExplanations.map((attr) => (
            <li key={attr.short} className="flex justify-between">
              <span className="font-semibold">{attr.short}:</span>
              <span>{attr.full}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

