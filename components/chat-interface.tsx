'use client'

import React, { useEffect, useRef } from 'react'

import { Send, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChat } from '@ai-sdk/react'
import { MarkdownContent } from '@/components/markdown-content'
import { EditorInstance } from '@/components/editor'
import { markdownFromHTML } from '@/lib/markdown'

interface ChatInterfaceProps {
  caseCategory: string
  onSetDescriptionAction: (description: string) => void
  ref?: React.RefObject<EditorInstance>
}

export function ChatInterface ({
  caseCategory,
  onSetDescriptionAction,
  ref
}: ChatInterfaceProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    status
  } = useChat({
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === 'generate_form') {
        onSetDescriptionAction((toolCall.args as any).description)
      } else if (toolCall.toolName === 'get_current_form') {
        return markdownFromHTML(ref!.current!.getDocHTML())
      }
    }
  })

  useEffect(() => {
    if (messages.length === 0) {
      setInput(`I have a ${caseCategory.replace('-', ' ')} case.`)
      handleSubmit()
    }
  }, [caseCategory, handleSubmit, messages.length, setInput])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'streaming') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, status])

  return (
    <>
      <ScrollArea className="h-[500px] p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user'
              ? 'justify-end'
              : 'justify-start'}`}>
              <div
                className={`flex items-start gap-2.5 max-w-[85%] ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
                    message.role === 'user'
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {message.role === 'user' ? <User className="h-4 w-4"/> : <Bot
                    className="h-4 w-4"/>}
                </div>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-gray-700 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {
                    message.role === 'assistant' ? <MarkdownContent
                      content={message.content}/> : <p>{message.content}</p>}
                  <p className={`text-[10px] mt-1 ${message.role === 'user'
                    ? 'text-gray-300'
                    : 'text-gray-500'}`}>
                    {message.createdAt?.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}/>
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            className="flex-1 border-gray-200 focus-visible:ring-gray-700"
            value={input}
            onChange={handleInputChange}
          />
          <Button size="icon" className="bg-gray-700 hover:bg-gray-800">
            <Send className="h-4 w-4"/>
          </Button>
        </form>
      </div>
    </>
  )
}

