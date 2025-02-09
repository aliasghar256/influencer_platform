import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TrendingContent() {
  const trendingPosts = [
    { thumbnail: "/placeholder.svg?height=60&width=60", title: "Viral Dance Challenge" },
    { thumbnail: "/placeholder.svg?height=60&width=60", title: "Karachi Food Tour" },
    { thumbnail: "/placeholder.svg?height=60&width=60", title: "Tech Gadget Review" },
    { thumbnail: "/placeholder.svg?height=60&width=60", title: "Eid Fashion Lookbook" },
    { thumbnail: "/placeholder.svg?height=60&width=60", title: "Pakistan Travel Vlog" },
  ]

  return (
    <Card className="bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-black">Top 5 Trending Content Right Now</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {trendingPosts.map((post, index) => (
            <li key={index} className="flex items-center space-x-2 text-black">
              <img src={post.thumbnail || "/placeholder.svg"} alt={post.title} className="w-15 h-15 rounded" />
              <span className="flex-1 min-w-0 truncate">{post.title}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

