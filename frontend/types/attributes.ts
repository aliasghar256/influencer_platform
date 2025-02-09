export type AttributeHeader = {
  name: string
  attributes: {
    name: string
    rating: number
  }[]
}

export const ATTRIBUTE_HEADERS: AttributeHeader[] = [
  {
    name: "Content Creator",
    attributes: [
      { name: "Creativity", rating: 85 },
      { name: "Production Quality", rating: 88 },
      { name: "Consistency", rating: 82 },
      { name: "Storytelling", rating: 90 },
      { name: "Visual Style", rating: 87 },
    ],
  },
  {
    name: "Audience Engagement",
    attributes: [
      { name: "Community Management", rating: 92 },
      { name: "Response Time", rating: 85 },
      { name: "Audience Retention", rating: 88 },
      { name: "Call-to-Action", rating: 86 },
      { name: "Audience Growth", rating: 89 },
    ],
  },
  {
    name: "Brand Value",
    attributes: [
      { name: "Authenticity", rating: 91 },
      { name: "Brand Integration", rating: 87 },
      { name: "Professionalism", rating: 88 },
      { name: "Brand Safety", rating: 93 },
      { name: "Versatility", rating: 84 },
    ],
  },
  {
    name: "Technical Skills",
    attributes: [
      { name: "Platform Expertise", rating: 89 },
      { name: "SEO Understanding", rating: 82 },
      { name: "Analytics Usage", rating: 85 },
      { name: "Tech Adaptability", rating: 87 },
      { name: "Cross-Platform Skills", rating: 86 },
    ],
  },
  {
    name: "Marketing Impact",
    attributes: [
      { name: "Conversion Rate", rating: 88 },
      { name: "Target Accuracy", rating: 86 },
      { name: "Campaign Innovation", rating: 89 },
      { name: "Market Awareness", rating: 85 },
      { name: "Trend Leverage", rating: 90 },
    ],
  },
  {
    name: "Networking",
    attributes: [
      { name: "Collaboration Quality", rating: 87 },
      { name: "Industry Connections", rating: 89 },
      { name: "Event Presence", rating: 84 },
      { name: "Partnership Value", rating: 88 },
      { name: "Community Standing", rating: 91 },
    ],
  },
  {
    name: "Innovation",
    attributes: [
      { name: "Content Innovation", rating: 92 },
      { name: "Platform Pioneering", rating: 88 },
      { name: "Format Evolution", rating: 86 },
      { name: "Tech Integration", rating: 85 },
      { name: "Trend Setting", rating: 89 },
    ],
  },
]

