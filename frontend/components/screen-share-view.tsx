"use client"

import { Button } from "@/components/ui/button"
import { Monitor, Maximize2, Minimize2, Ban } from "lucide-react"
import { useState } from "react"

interface ScreenShareViewProps {
  isAdminMode?: boolean
  onAdminAction?: (action: string, data?: any) => void
}

export function ScreenShareView({ isAdminMode = false, onAdminAction }: ScreenShareViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleStopScreenShare = () => {
    if (isAdminMode) {
      onAdminAction?.("stop_screen_share")
      alert("Screen sharing stopped by admin")
    }
  }

  return (
    <div className="flex-1 bg-slate-900 p-4">
      <div className="h-full bg-slate-800 rounded-lg relative overflow-hidden">
        {/* Screen Share Content */}
        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
          <div className="text-center">
            <Monitor className="h-16 w-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">Screen Sharing Active</h3>
            <p className="text-slate-400">Sarah Johnson is sharing their screen</p>
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          {isAdminMode && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleStopScreenShare}
              className="bg-red-600 hover:bg-red-700 text-white border-0"
              title="Stop Screen Share (Admin)"
            >
              <Ban className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-black/50 hover:bg-black/70 text-white border-0"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>

        {/* Presenter Info */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Sarah Johnson's Screen</span>
          </div>
        </div>
      </div>
    </div>
  )
}
