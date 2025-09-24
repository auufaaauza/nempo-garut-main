"use client";
import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Music, Volume2 } from "lucide-react";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
        // Auto collapse setelah 3 detik jika sedang play
        setTimeout(() => {
          setExpanded(false);
        }, 3000);
      } catch (error) {
        console.error("Gagal memutar audio:", error);
        setPlaying(false);
      }
    }
  };

  const handlePlayerClick = () => {
    setExpanded(!expanded);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
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

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Backdrop untuk mobile ketika expanded */}
      {expanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setExpanded(false)}
        />
      )}
      
      <div className={`
        fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-out
        ${expanded 
          ? 'right-4 md:right-6' 
          : 'right-2 md:right-4'
        }
      `}>
        {/* Mini Player (Collapsed State) */}
        {!expanded && (
          <button
            onClick={handlePlayerClick}
            className="group relative bg-gradient-to-l from-primary to-[#3273BE] shadow-lg rounded-full p-3 md:p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse"
            aria-label="Open Music Player"
          >
            <div className="relative">
              {playing ? (
                <Volume2 size={20} className="text-white animate-bounce" />
              ) : (
                <Music size={20} className="text-white" />
              )}
              
              {/* Ripple effect */}
              {playing && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-ping animation-delay-75" />
                </>
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {playing ? 'Music Playing' : 'Click to Play Music'}
            </div>
          </button>
        )}

        {/* Expanded Player */}
        {expanded && (
          <div className={`
            bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden
            transition-all duration-300 ease-out transform
            ${expanded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
            w-80 md:w-96
          `}>
            {/* Header */}
            <div className="bg-gradient-to-l from-primary to-[#3273BE] px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Music size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm md:text-base">Background Music</h3>
                    <p className="text-white/80 text-xs">Ambient Sounds</p>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setExpanded(false)}
                  className="text-white/80 hover:text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Close Player"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Player Content */}
            <div className="p-6 space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div 
                  className="h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-100 relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform translate-x-1/2" />
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="group relative bg-gradient-to-l from-primary to-[#3273BE] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  aria-label={playing ? "Pause Music" : "Play Music"}
                >
                  {playing ? (
                    <Pause size={24} className="transform group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play size={24} className="transform group-hover:scale-110 transition-transform ml-1" />
                  )}
                  
                  {/* Button ripple effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-100 group-active:scale-110 group-active:opacity-0 transition-all duration-200" />
                </button>
              </div>

              {/* Status */}
              <div className="text-center">
                <div className={`
                  inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                  ${playing 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  <div className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${playing ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}
                  `} />
                  <span>{playing ? 'Now Playing' : 'Paused'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <audio 
          ref={audioRef} 
          src="/Assets/music/musik.mp3" 
          loop 
          preload="auto"
        />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animation-delay-75 {
          animation-delay: 0.075s;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;