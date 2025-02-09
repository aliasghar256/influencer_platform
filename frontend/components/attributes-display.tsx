import type { AttributeHeader } from "@/types/attributes"
import { Progress } from "@/components/ui/progress"

interface AttributesDisplayProps {
  headers: AttributeHeader[]
}

export function AttributesDisplay({ headers }: AttributesDisplayProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {headers.map((header) => (
        <div key={header.name} className="space-y-4">
          <h3 className="font-bold text-lg">{header.name}</h3>
          <div className="space-y-2">
            {header.attributes.map((attr) => (
              <div key={attr.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{attr.name}</span>
                  <span className="font-bold">{attr.rating}</span>
                </div>
                <Progress value={attr.rating} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

