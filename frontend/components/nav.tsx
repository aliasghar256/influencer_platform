import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navigation() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-primary">
              InfluSphere
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/" className="text-sm font-medium">
                Home
              </Link>
              <Link href="/advanced-search" className="text-sm font-medium">
                Advanced Search
              </Link>
              <Link href="/categories" className="text-sm font-medium">
                Categories
              </Link>
              <Link href="/for-brands" className="text-sm font-medium">
                For Brands
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Quick search..." className="pl-8" />
            </div>
            <Button>Sign in</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

