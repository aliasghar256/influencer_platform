import { Navigation } from "@/components/nav"
import { AdvancedSearch } from "@/components/advanced-search"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdvancedSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Search</CardTitle>
          </CardHeader>
          <CardContent>
            <AdvancedSearch />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

