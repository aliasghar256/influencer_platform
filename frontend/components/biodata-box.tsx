import { Card, CardContent } from "@/components/ui/card"

interface BiodataBoxProps {
  age: number
  followers: string
  profession: string
  chargingRate: string
  yearsActive: number
}

export function BiodataBox({ age, followers, profession, chargingRate, yearsActive }: BiodataBoxProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2 text-center">Influencer Biodata</h3>
        <ul className="space-y-1 text-sm">
          <li className="flex justify-between">
            <span className="font-semibold">Age:</span>
            <span>{age}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Followers:</span>
            <span>{followers}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Profession:</span>
            <span>{profession}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Rate:</span>
            <span>{chargingRate}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">Years Active:</span>
            <span>{yearsActive}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

