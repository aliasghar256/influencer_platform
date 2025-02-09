import { Card, CardContent } from "@/components/ui/card"

interface Attribute {
  name: string
  value: number
}

interface SeptagramGraphProps {
  attributes: Attribute[]
}

const getColorForRating = (rating: number) => {
  if (rating >= 90) return "#166534" // Dark Green
  if (rating >= 80) return "#22c55e" // Light Green
  if (rating >= 70) return "#fef08a" // Pale Yellow
  if (rating >= 60) return "#f97316" // Orange
  if (rating >= 50) return "#ef4444" // Red
  return "#7f1d1d" // Maroon
}

const webColors = ["#7f1d1d", "#ef4444", "#f97316", "#fef08a", "#22c55e", "#166534"]

export function SeptagramGraph({ attributes }: SeptagramGraphProps) {
  const maxValue = 99
  const centerX = 150
  const centerY = 150
  const radius = 100

  const points = attributes.map((attr, index) => {
    const angle = (Math.PI * 2 * index) / attributes.length - Math.PI / 2
    const value = attr.value / maxValue
    const x = centerX + radius * value * Math.cos(angle)
    const y = centerY + radius * value * Math.sin(angle)
    return { x, y, name: attr.name, value: attr.value, angle }
  })

  const shapePath =
    points.map((point, index) => (index === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`)).join(" ") + " Z"

  return (
    <Card>
      <CardContent className="p-4">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, index) => (
            <polygon
              key={index}
              points={attributes
                .map((_, i) => {
                  const angle = (Math.PI * 2 * i) / attributes.length - Math.PI / 2
                  const x = centerX + radius * scale * Math.cos(angle)
                  const y = centerY + radius * scale * Math.sin(angle)
                  return `${x},${y}`
                })
                .join(" ")}
              fill={webColors[index]}
              fillOpacity="0.2"
              stroke={webColors[index]}
              strokeWidth="0.5"
            />
          ))}

          {attributes.map((_, index) => {
            const angle = (Math.PI * 2 * index) / attributes.length - Math.PI / 2
            const x = centerX + radius * Math.cos(angle)
            const y = centerY + radius * Math.sin(angle)
            return <line key={index} x1={centerX} y1={centerY} x2={x} y2={y} stroke="gray" strokeWidth="0.5" />
          })}

          <path d={shapePath} fill="transparent" stroke="white" strokeWidth="2" strokeDasharray="4 2" />

          {points.map((point, index) => {
            const labelRadius = radius + 25
            const valueRadius = radius + 10
            const labelX = centerX + labelRadius * Math.cos(point.angle)
            const labelY = centerY + labelRadius * Math.sin(point.angle)
            const valueX = centerX + valueRadius * Math.cos(point.angle)
            const valueY = centerY + valueRadius * Math.sin(point.angle)

            return (
              <g key={index}>
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize="10"
                  fill="currentColor"
                >
                  {point.name}
                </text>
                <text
                  x={valueX}
                  y={valueY}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill={getColorForRating(point.value)}
                >
                  {point.value}
                </text>
                <line
                  x1={point.x}
                  y1={point.y}
                  x2={valueX}
                  y2={valueY}
                  stroke={getColorForRating(point.value)}
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              </g>
            )
          })}
        </svg>
      </CardContent>
    </Card>
  )
}

