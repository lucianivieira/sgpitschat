"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollControl(dependencies: any[] = []) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const [userScrolled, setUserScrolled] = useState(false)

  // Handle scroll events
  const handleScroll = () => {
    if (!scrollRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50

    if (isAtBottom) {
      setUserScrolled(false)
      setAutoScroll(true)
    } else if (!userScrolled) {
      setUserScrolled(true)
      setAutoScroll(false)
    }
  }

  // Scroll to bottom if autoScroll is enabled
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      const scrollElement = scrollRef.current
      scrollElement.scrollTop = scrollElement.scrollHeight
    }
  }, [...dependencies, autoScroll])

  // Function to manually scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      setAutoScroll(true)
      setUserScrolled(false)
    }
  }

  return {
    scrollRef,
    autoScroll,
    userScrolled,
    handleScroll,
    scrollToBottom,
    setAutoScroll,
  }
}
