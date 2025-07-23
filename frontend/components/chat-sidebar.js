"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Paperclip, Smile } from "lucide-react"

export function ChatSidebar({ currentUser, onClose }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Sarah Johnson",
      content: "Welcome everyone! Thanks for joining the meeting.",
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: "2",
      sender: "You",
      content: "Thanks for having me!",
      timestamp: new Date(Date.now() - 240000),
      isOwn: true,
    },
    {
      id: "3",
      sender: "Mike Chen",
      content: "Can everyone see the presentation clearly?",
      timestamp: new Date(Date.now() - 180000),
      isOwn: false,
    },
    {
      id: "4",
      sender: "Emily Davis",
      content: "Yes, looks great on my end.",
      timestamp: new Date(Date.now() - 120000),
      isOwn: false,
    },
  ])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: "You",
        content: message.trim(),
        timestamp: new Date(),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <h3 className="text-white font-semibold">Chat</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isOwn ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  msg.isOwn ? "bg-blue-600 text-white" : "bg-slate-700 text-white"
                }`}
              >
                {!msg.isOwn && <div className="text-xs text-slate-300 mb-1 font-medium">{msg.sender}</div>}
                <div className="text-sm">{msg.content}</div>
              </div>
              <div className="text-xs text-slate-400 mt-1">{formatTime(msg.timestamp)}</div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-white">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-white">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700" disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
