"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ATTRIBUTE_HEADERS } from "@/types/attributes"

export function AdvancedSearch() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [ageRange, setAgeRange] = useState([18, 65])
  const [overallRating, setOverallRating] = useState([0, 99])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [attributeRanges, setAttributeRanges] = useState<{ [key: string]: [number, number] }>({})

  const handleRangeChange = (key: string, value: [number, number]) => {
    if (key === "age") {
      setAgeRange(value)
    } else if (key === "overallRating") {
      setOverallRating(value)
    } else {
      setAttributeRanges((prev) => ({ ...prev, [key]: value }))
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams({
      name,
      ageMin: ageRange[0].toString(),
      ageMax: ageRange[1].toString(),
      ratingMin: overallRating[0].toString(),
      ratingMax: overallRating[1].toString(),
      categories: selectedCategories.join(","),
      ...Object.entries(attributeRanges).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`${key}-min`]: value[0].toString(),
          [`${key}-max`]: value[1].toString(),
        }),
        {},
      ),
    })
    router.push(`/search-results?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Name</h3>
        <Input placeholder="Search by name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Age Range</h3>
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            value={ageRange[0]}
            onChange={(e) => handleRangeChange("age", [Number(e.target.value), ageRange[1]])}
            className="w-20"
          />
          <Slider
            min={18}
            max={65}
            step={1}
            value={ageRange}
            onValueChange={(value) => handleRangeChange("age", value as [number, number])}
            className="flex-1"
          />
          <Input
            type="number"
            value={ageRange[1]}
            onChange={(e) => handleRangeChange("age", [ageRange[0], Number(e.target.value)])}
            className="w-20"
          />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Overall Rating</h3>
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            value={overallRating[0]}
            onChange={(e) => handleRangeChange("overallRating", [Number(e.target.value), overallRating[1]])}
            className="w-20"
          />
          <Slider
            min={0}
            max={99}
            step={1}
            value={overallRating}
            onValueChange={(value) => handleRangeChange("overallRating", value as [number, number])}
            className="flex-1"
          />
          <Input
            type="number"
            value={overallRating[1]}
            onChange={(e) => handleRangeChange("overallRating", [overallRating[0], Number(e.target.value)])}
            className="w-20"
          />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Attributes</h3>
        {ATTRIBUTE_HEADERS.map((header) => (
          <div key={header.name} className="mb-4">
            <h4 className="text-sm font-medium mb-2">{header.name}</h4>
            {header.attributes.map((attr) => (
              <div key={attr.name} className="mb-2">
                <h5 className="text-xs font-medium mb-1">{attr.name}</h5>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={attributeRanges[`${header.name}-${attr.name}`]?.[0] ?? 0}
                    onChange={(e) =>
                      handleRangeChange(`${header.name}-${attr.name}`, [
                        Number(e.target.value),
                        attributeRanges[`${header.name}-${attr.name}`]?.[1] ?? 99,
                      ])
                    }
                    className="w-20"
                  />
                  <Slider
                    min={0}
                    max={99}
                    step={1}
                    value={attributeRanges[`${header.name}-${attr.name}`] ?? [0, 99]}
                    onValueChange={(value) =>
                      handleRangeChange(`${header.name}-${attr.name}`, value as [number, number])
                    }
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={attributeRanges[`${header.name}-${attr.name}`]?.[1] ?? 99}
                    onChange={(e) =>
                      handleRangeChange(`${header.name}-${attr.name}`, [
                        attributeRanges[`${header.name}-${attr.name}`]?.[0] ?? 0,
                        Number(e.target.value),
                      ])
                    }
                    className="w-20"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          {["Lifestyle", "Tech", "Fashion", "Gaming", "Fitness", "Food", "Travel"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category.toLowerCase()}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category.toLowerCase()}>{category}</label>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </form>
  )
}

