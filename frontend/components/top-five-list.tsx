import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TopFiveListProps {
  title: string
  items: string[] | { name: string; followers: string }[]
}

export function TopFiveList({ title, items }: TopFiveListProps) {
  return (
    <Card className="bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-black">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-black">
              <span>{typeof item === "string" ? item : item.name}</span>
              {typeof item !== "string" && <span className="text-sm opacity-75">{item.followers}</span>}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

