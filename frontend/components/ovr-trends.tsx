import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const mockData = [
  { quarter: "Q1 2023", ovr: 75 },
  { quarter: "Q2 2023", ovr: 78 },
  { quarter: "Q3 2023", ovr: 84 },
  { quarter: "Q4 2023", ovr: 86 },
  { quarter: "Q1 2024", ovr: 88 },
]

export function OVRTrends() {
  return (
    <Card>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis domain={[70, 90]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ovr" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

