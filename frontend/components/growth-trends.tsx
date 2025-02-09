import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const mockData = [
  { name: "Jan", followers: 4000, engagement: 2400 },
  { name: "Feb", followers: 3000, engagement: 1398 },
  { name: "Mar", followers: 2000, engagement: 9800 },
  { name: "Apr", followers: 2780, engagement: 3908 },
  { name: "May", followers: 1890, engagement: 4800 },
  { name: "Jun", followers: 2390, engagement: 3800 },
]

export function GrowthTrends() {
  return (
    <Card>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="followers" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

