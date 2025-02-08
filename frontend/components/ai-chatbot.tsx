"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Send } from "lucide-react"

export function AIChatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I help you find the perfect influencer for your campaign?" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      // Here you would typically send the input to your AI backend and get a response
      // For now, we'll just simulate a response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "I understand you're looking for an influencer. Can you tell me more about your campaign goals and target audience?",
          },
        ])
      }, 1000)
      setInput("")
    }
  }

  return (
    <Card className="h-[400px] flex flex-col">
      <CardContent className="flex-1 overflow-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-2`}>
            <div
              className={`p-2 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              {message.role === "bot" && <Bot className="inline mr-2" size={16} />}
              {message.content}
            </div>
          </div>
        ))}
      </CardContent>
      <div className="p-4 border-t flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about finding influencers..."
          className="flex-1 mr-2"
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send size={16} />
        </Button>
      </div>
    </Card>
  )
}

