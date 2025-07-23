"use client"

import { VideoTile } from "@/components/video-tile"

const mockParticipants = [
  { id: "1", name: "You", isLocal: true, isMuted: false, isVideoOff: false },
  { id: "2", name: "Sarah Johnson", isLocal: false, isMuted: false, isVideoOff: false },
  { id: "3", name: "Mike Chen", isLocal: false, isMuted: true, isVideoOff: false },
  { id: "4", name: "Emily Davis", isLocal: false, isMuted: false, isVideoOff: true },
  { id: "5", name: "Alex Rodriguez", isLocal: false, isMuted: false, isVideoOff: false },
  { id: "6", name: "Lisa Wang", isLocal: false, isMuted: true, isVideoOff: false },
]

export function VideoGrid() {
  const getGridCols = (count) => {
    if (count <= 1) return "grid-cols-1"
    if (count <= 2) return "grid-cols-2"
    if (count <= 4) return "grid-cols-2"
    if (count <= 6) return "grid-cols-3"
    return "grid-cols-4"
  }

  return (
    <div className="flex-1 p-4">
      <div className={`grid ${getGridCols(mockParticipants.length)} gap-4 h-full`}>
        {mockParticipants.map((participant) => (
          <VideoTile key={participant.id} participant={participant} />
        ))}
      </div>
    </div>
  )
}
