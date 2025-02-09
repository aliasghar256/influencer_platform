"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockData = [
  { name: "Asim Azhar", age: 26, followers: "3.2M", oldOVR: 75, newOVR: 84 },
  { name: "Hania Aamir", age: 25, followers: "5.1M", oldOVR: 82, newOVR: 89 },
  { name: "Shahveer Jafry", age: 28, followers: "3.8M", oldOVR: 78, newOVR: 85 },
  { name: "Aiman Khan", age: 24, followers: "8.9M", oldOVR: 86, newOVR: 92 },
  { name: "Bilal Saeed", age: 33, followers: "2.5M", oldOVR: 73, newOVR: 79 },
]

export function OVRRisers() {
  const [timeFrame, setTimeFrame] = useState("week")

  return (
    <Card className="bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-black">Top 5 OVR Risers</CardTitle>
          <Select onValueChange={setTimeFrame} defaultValue={timeFrame}>
            <SelectTrigger className="w-[120px] bg-white text-black">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockData.map((influencer, index) => (
            <li key={index} className="flex items-center space-x-4 text-black">
              <img src="/placeholder.svg?height=40&width=40" alt={influencer.name} className="w-10 h-10 rounded-full" />
              <div className="flex-grow">
                <div className="font-semibold">{influencer.name}</div>
                <div className="text-sm opacity-75">
                  {influencer.age} years, {influencer.followers} followers
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-600">{influencer.oldOVR}</span>
                <span>→</span>
                <span className="text-green-600">{influencer.newOVR}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

