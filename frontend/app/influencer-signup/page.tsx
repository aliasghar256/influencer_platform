"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ATTRIBUTE_HEADERS } from "@/types/attributes"

export default function InfluencerSignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    category: "",
    profileImage: "",
    socialMediaLinks: {
      instagram: "",
      youtube: "",
      tiktok: "",
    },
    attributes: {} as Record<string, number>,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialMediaLinks: { ...prev.socialMediaLinks, [platform]: value },
    }))
  }

  const handleAttributeChange = (attribute: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [attribute]: Number.parseInt(value) || 0 },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    // Redirect to a success page or dashboard
    router.push("/influencer-dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Influencer Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium">
                  Age
                </label>
                <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Lifestyle", "Tech", "Fashion", "Gaming", "Fitness", "Food", "Travel"].map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="profileImage" className="text-sm font-medium">
                  Profile Image URL
                </label>
                <Input
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Social Media Links</h3>
                <div className="space-y-2">
                  <Input
                    placeholder="Instagram"
                    value={formData.socialMediaLinks.instagram}
                    onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                  />
                  <Input
                    placeholder="YouTube"
                    value={formData.socialMediaLinks.youtube}
                    onChange={(e) => handleSocialMediaChange("youtube", e.target.value)}
                  />
                  <Input
                    placeholder="TikTok"
                    value={formData.socialMediaLinks.tiktok}
                    onChange={(e) => handleSocialMediaChange("tiktok", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Attributes</h3>
                {ATTRIBUTE_HEADERS.map((header) => (
                  <div key={header.name} className="space-y-2">
                    <h4 className="text-xs font-semibold">{header.name}</h4>
                    {header.attributes.map((attr) => (
                      <div key={attr.name} className="flex items-center space-x-2">
                        <label htmlFor={attr.name} className="text-sm flex-1">
                          {attr.name}
                        </label>
                        <Input
                          id={attr.name}
                          type="number"
                          min="0"
                          max="99"
                          className="w-20"
                          value={formData.attributes[attr.name] || ""}
                          onChange={(e) => handleAttributeChange(attr.name, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

