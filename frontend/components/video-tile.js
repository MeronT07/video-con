"use client"

import { Mic, MicOff, Video, VideoOff, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoTile({ participant }) {
  return (
    <div className="relative bg-slate-800 rounded-lg overflow-hidden group">
      {/* Video/Avatar Area */}
      <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
        {participant.isVideoOff ? (
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xl">
              {participant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Video className="h-8 w-8 text-white/50" />
          </div>
        )}
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
          <Pin className="h-4 w-4" />
        </Button>
      </div>

      {/* Name and Status */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium text-sm truncate">
            {participant.name}
            {participant.isLocal && " (You)"}
          </span>
          <div className="flex items-center space-x-1">
            {participant.isMuted ? (
              <MicOff className="h-4 w-4 text-red-400" />
            ) : (
              <Mic className="h-4 w-4 text-green-400" />
            )}
            {participant.isVideoOff && <VideoOff className="h-4 w-4 text-red-400" />}
          </div>
        </div>
      </div>

      {/* Speaking Indicator */}
      {!participant.isMuted && (
        <div className="absolute top-2 left-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      )}
    </div>
  )
}
