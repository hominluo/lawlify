"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatInterfaceProps {
  caseCategory: string
  onCaseDetailsUpdate: (details: string) => void
}

export function ChatInterface({ caseCategory, onCaseDetailsUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [caseDetails, setCaseDetails] = useState("")

  // Initial questions based on case category
  useEffect(() => {
    if (caseCategory) {
      const initialQuestions: Record<string, string> = {
        "personal-injury":
          "I see you're dealing with a personal injury case. Could you tell me when and how the injury occurred?",
        "family-law":
          "I understand you need help with a family law matter. Could you share what specific issue you're facing (divorce, custody, etc.)?",
        "real-estate": "For your real estate case, could you describe the property issue you're experiencing?",
        "business-law": "Regarding your business law case, what type of business issue are you facing?",
        "criminal-defense":
          "For your criminal defense case, could you share what charges or legal issues you're facing?",
        "estate-planning": "For estate planning, what specific documents or arrangements are you looking to establish?",
        immigration: "Regarding your immigration case, what specific immigration matter do you need assistance with?",
        "auto-accidents": "I see this is about an auto accident. When did the accident occur and what happened?",
      }

      const initialMessage =
        initialQuestions[caseCategory] ||
        "Thank you for selecting a case category. Could you please describe your legal situation in detail?"

      // Add initial bot message
      setMessages([
        {
          id: "welcome",
          content: "Hello! I'm your legal assistant. I'll help you provide the necessary details about your case.",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: "initial",
          content: initialMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [caseCategory])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Update parent component with accumulated case details
  useEffect(() => {
    if (messages.length > 2) {
      const userMessages = messages
        .filter((msg) => msg.sender === "user")
        .map((msg) => msg.content)
        .join("\n\n")

      setCaseDetails(userMessages)
      onCaseDetailsUpdate(userMessages)
    }
  }, [messages, onCaseDetailsUpdate])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response based on case category and user input
    setTimeout(() => {
      let botResponse = ""
      const userInput = inputValue.toLowerCase()

      // Generate follow-up questions based on case category and conversation context
      if (messages.length === 2) {
        // First user response - ask for more specific details
        if (caseCategory === "personal-injury") {
          botResponse =
            "Thank you for sharing. Were there any witnesses to the incident? Also, have you sought medical attention?"
        } else if (caseCategory === "auto-accidents") {
          botResponse = "I understand. Were there any injuries? Was a police report filed?"
        } else {
          botResponse =
            "Thank you for providing those details. Could you tell me what specific outcome you're hoping to achieve?"
        }
      } else if (messages.length === 4) {
        // Second user response - ask about timeline
        botResponse =
          "When did this issue begin? Are there any upcoming deadlines or court dates we should be aware of?"
      } else if (messages.length === 6) {
        // Third user response - ask about documentation
        botResponse =
          "Do you have any documentation or evidence related to your case? This could include contracts, medical records, photos, etc."
      } else if (messages.length === 8) {
        // Fourth user response - wrap up
        botResponse =
          "Thank you for providing all this information. Is there anything else you'd like to add before we summarize your case?"
      } else if (messages.length >= 10) {
        // Final response - summarize
        botResponse =
          "I've gathered all the necessary information. You can review your case details in the summary below and make any edits if needed."
      } else {
        // Generic follow-up
        botResponse =
          "Thank you for that information. Could you provide any additional details that might be relevant to your case?"
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50 px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
            <Bot className="h-5 w-5 text-gray-700" />
          </div>
          <div>
            <CardTitle className="text-base">Legal Assistant</CardTitle>
            <CardDescription className="text-xs">
              Helping you describe your {caseCategory.replace("-", " ")} case
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <ScrollArea className="h-[380px] p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start gap-2.5 max-w-[85%] ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
                    message.sender === "user" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm ${
                    message.sender === "user"
                      ? "bg-gray-700 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-[10px] mt-1 ${message.sender === "user" ? "text-gray-300" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2.5 max-w-[85%]">
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-gray-700">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-gray-100 text-gray-800">
                  <div className="flex space-x-1.5">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 border-gray-200 focus-visible:ring-gray-700"
          />
          <Button onClick={handleSendMessage} size="icon" className="bg-gray-700 hover:bg-gray-800">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {caseDetails && (
        <CardContent className="pt-4 pb-5 px-4 bg-gray-50 border-t">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Case Summary
          </h4>
          <div className="bg-white border rounded-md p-3 text-sm text-gray-700 whitespace-pre-line">{caseDetails}</div>
        </CardContent>
      )}
    </Card>
  )
}

