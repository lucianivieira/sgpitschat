"use client"

import type React from "react"

import { useAssistant } from "@ai-sdk/react"
import { useState, useEffect, useRef } from "react"
import { Send, Mic, Paperclip, MoreVertical, ArrowDown } from "lucide-react"
import { useScrollControl } from "@/hooks/use-scroll-control"
import { formatMessageTime } from "@/utils/format-date"

export default function ChatPage() {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize the assistant
  const { messages, input, handleInputChange, submitMessage, status, error } = useAssistant({ api: "/api/assistant" })

  // Setup scroll control
  const { scrollRef, autoScroll, userScrolled, handleScroll, scrollToBottom } = useScrollControl([messages])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (status !== "awaiting_message" || !input.trim()) return
    submitMessage(e)
    setInputValue("")
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    handleInputChange(e)
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[#f0f2f5]">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-[#008069] text-white">
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img src="/placeholder.svg?height=40&width=40" alt="Assistant" className="w-full h-full object-cover" />
          </div>
          <div className="ml-3">
            <h1 className="font-semibold">PesquisAI SGPITS</h1>
            <div className="flex items-center text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span>
              {status === "in_progress" ? "digitando..." : "online"}
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="text-white">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Chat area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] bg-opacity-30 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => {
            const isUser = message.role === "user"
            const time = new Date()

            return (
              <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 relative ${
                    isUser ? "bg-[#d9fdd3] rounded-tr-none" : "bg-white rounded-tl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <span className="text-[10px] text-gray-500 float-right mt-1 ml-2">
                    {formatMessageTime(time)}
                    {isUser && <span className="ml-1 text-[#53bdeb]">✓✓</span>}
                  </span>
                </div>
              </div>
            )
          })}

          {status === "in_progress" && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-tl-none p-3 max-w-[80%] md:max-w-[70%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll to bottom button */}
        {userScrolled && (
          <button onClick={scrollToBottom} className="fixed bottom-24 right-6 bg-white rounded-full p-2 shadow-lg">
            <ArrowDown size={20} />
          </button>
        )}
      </div>

      {/* Input area */}
      <div className="bg-[#f0f2f5] p-3">
        <form onSubmit={handleSubmit} className="flex items-center max-w-3xl mx-auto">
          <button type="button" className="p-2 text-[#8696a0]">
            <Paperclip size={24} />
          </button>
          <div className="flex-1 bg-white rounded-full px-4 py-2 mx-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Digite uma mensagem"
              disabled={status !== "awaiting_message"}
              className="w-full outline-none text-gray-700"
            />
          </div>
          {input.trim() ? (
            <button
              type="submit"
              className="p-2 text-white bg-[#008069] rounded-full"
              disabled={status !== "awaiting_message"}
            >
              <Send size={20} />
            </button>
          ) : (
            <button type="button" className="p-2 text-[#8696a0]">
              <Mic size={24} />
            </button>
          )}
        </form>
      </div>

      {/* Error message */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg">{error.message}</div>
      )}
    </div>
  )
}
