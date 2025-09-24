"use client";
import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (error) {
        console.error("Gagal memutar audio:", error);
        setPlaying(false);
      }
    }
  };

  const handleExpand = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExpanded(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleCollapse = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setExpanded(false);
      setIsAnimating(false);
    }, 600);
  };

  const handleVolumeSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const height = rect.height;

    let percentage = 1 - clickY / height; // dari 0–1
    // 🔒 Pastikan selalu di range 0–1
    percentage = Math.max(0, Math.min(1, percentage));

    setVolume(percentage);
    if (audioRef.current) {
      audioRef.current.volume = percentage;
      setMuted(percentage === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !muted;
      setMuted(newMuted);
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = volume;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const volumePercentage = (muted ? 0 : volume) * 100;

  return (
    <>
      {/* Backdrop untuk focus */}
      {expanded && (
        <div 
          className="fixed inset-0 z-40 transition-all duration-600"
          onClick={handleCollapse}
        />
      )}
      
      <div className="fixed top-1/2 right-8 -translate-y-1/2 z-50">
        
        {/* Main Container dengan Animasi Stretch */}
        <div className={`
          relative bg-gradient-to-b from-white/90 to-gray-50/90 backdrop-blur-xl shadow-2xl overflow-hidden
          transition-all duration-800 ease-out transform-gpu
          ${expanded 
            ? 'w-20 h-80 rounded-full' 
            : 'w-16 h-16 rounded-full'
          }
        `}>
          
          {/* Expanded Content - Volume Controls */}
          <div className={`
            transition-all duration-600 ease-out transform
            ${expanded 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none'
            }
          `}>
            
            {/* Volume Icon Section */}
            <div className="px-4 py-6 flex flex-col items-center space-y-3">
              <button
                onClick={toggleMute}
                className={`
                  w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95
                  ${muted 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-blue-100 text-primary hover:bg-blue-200'
                  }
                `}
              >
                {muted ? (
                  <VolumeX size={18} />
                ) : (
                  <Volume2 size={18} />
                )}
              </button>
              
              {/* Volume Percentage */}
              <span className="text-xs font-bold text-gray-700">
                {Math.round(volumePercentage)}%
              </span>
            </div>

            {/* Play/Stop Button */}
            <div className="px-4 pb-4 flex justify-center">
              <button
                onClick={togglePlay}
                className="group relative w-12 h-12 bg-gradient-to-br from-primary to-[#3273BE] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
              >
                {playing ? (
                  <Pause size={20} className="text-white" />
                ) : (
                  <Play size={20} className="text-white ml-0.5" />
                )}
                
                {/* Glow Effect */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary to-[#3273BE] opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300" />
                
                {/* Ripple saat playing */}
                {playing && (
                  <>
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-ping" />
                    <div className="absolute -inset-1 rounded-2xl border border-white/20 animate-ping animation-delay-200" />
                  </>
                )}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="px-6 pb-6 flex justify-center">
              <div className="relative">
                <div 
                  className="w-3 h-40 bg-gray-200/80 rounded-full cursor-pointer relative overflow-hidden hover:w-4 hover:bg-gray-300/80 transition-all duration-200 shadow-inner"
                  onClick={handleVolumeSliderClick}
                >
                  {/* Volume Fill */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-300 bg-gradient-to-t from-primary via-primary/80 to-[#3273BE]"
                    style={{ height: `${volumePercentage}%` }}
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                  
                  {/* Volume Thumb */}
                  <div 
                    className="absolute w-5 h-5 bg-white rounded-full shadow-lg border-2 border-primary transition-all duration-300 transform -translate-x-1 hover:scale-125"
                    style={{ 
                      bottom: `calc(${volumePercentage}% - 10px)` 
                    }}
                  >
                    {/* Inner dot */}
                    <div className="absolute inset-1 bg-primary rounded-full opacity-60" />
                  </div>

                  {/* Active Ripple */}
                  {!muted && volume > 0 && (
                    <div 
                      className="absolute w-6 h-6 rounded-full border border-primary/40 animate-ping transform -translate-x-1.5"
                      style={{ bottom: `calc(${volumePercentage}% - 12px)` }}
                    />
                  )}
                </div>

                {/* Volume Level Indicators */}
                {/* <div className="absolute -right-6 top-0 bottom-0 flex flex-col justify-between">
                  <div className="w-2 h-0.5 bg-gray-300 rounded" />
                  <div className="w-2 h-0.5 bg-gray-300 rounded" />
                  <div className="w-2 h-0.5 bg-gray-300 rounded" />
                  <div className="w-2 h-0.5 bg-gray-300 rounded" />
                  <div className="w-2 h-0.5 bg-gray-300 rounded" />
                </div> */}
              </div>
            </div>
          </div>

          {/* Bottom Music Icon - Always Visible */}
          <div className={`
            absolute bottom-0 left-0 right-0 flex justify-center z-10
            ${expanded ? 'pb-6' : 'pb-2'}
          `}>
            <button
              onClick={expanded ? handleCollapse : handleExpand}
              className={`
                group relative bg-gradient-to-br from-primary/90 to-[#3273BE]/90 shadow-xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95
                ${expanded ? 'hidden' : 'w-12 h-12'}
              `}
              aria-label={expanded ? "Collapse Player" : "Expand Player"}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
              
              <Music size={20} className="text-white relative z-10" />
              
              {/* Status Indicator */}
              <div className={`
                absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-300 z-20
                ${playing ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}
              `} />
              
              {/* Pulse Rings saat Playing */}
              {playing && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                  <div className="absolute -inset-1 rounded-full border border-white/15 animate-ping animation-delay-300" />
                </>
              )}

              {/* Hover Glow */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary to-[#3273BE] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
            </button>
          </div>

          {/* Floating Waveform Visualization */}
          {playing && expanded && (
            <div className="absolute left-1 top-1/3 flex flex-col space-y-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-primary/30 rounded-full animate-pulse"
                  style={{
                    height: `${Math.sin(Date.now() * 0.005 + i * 0.8) * 8 + 12}px`,
                    animationDelay: `${i * 150}ms`,
                    animationDuration: `${800 + (i * 100)}ms`
                  }}
                />
              ))}
            </div>
          )}

          {/* Right Side Waveform */}
          {playing && expanded && (
            <div className="absolute right-1 top-1/3 flex flex-col space-y-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-primary/30 rounded-full animate-pulse"
                  style={{
                    height: `${Math.cos(Date.now() * 0.005 + i * 0.6) * 8 + 12}px`,
                    animationDelay: `${i * 120}ms`,
                    animationDuration: `${700 + (i * 120)}ms`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <audio 
          ref={audioRef} 
          src="/Assets/music/musik.mp3" 
          loop 
          preload="auto"
        />
      </div>

      <style jsx>{`
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        
        @keyframes morphExpand {
          from {
            width: 64px;
            height: 64px;
            border-radius: 9999px;
          }
          to {
            width: 80px;
            height: 320px;
            border-radius: 9999px;
          }
        }
        
        @keyframes morphCollapse {
          from {
            width: 80px;
            height: 320px;
            border-radius: 9999px;
          }
          to {
            width: 64px;
            height: 64px;
            border-radius: 9999px;
          }
        }
        
        .morph-expand {
          animation: morphExpand 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .morph-collapse {
          animation: morphCollapse 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes volumeFlow {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-4px) scale(1.05); opacity: 1; }
        }
        
        .animate-volume-flow {
          animation: volumeFlow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;