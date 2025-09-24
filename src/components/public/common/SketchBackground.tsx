import React from 'react';

const SketchBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full object-cover object-bottom" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice">
        {/* Clouds */}
        <path fill="hsl(var(--primary) / 0.15)" d="M100,150 Q150,120 200,150 T300,150 L280,160 Q200,170 120,160 Z" />
        <path fill="hsl(var(--primary) / 0.2)" d="M650,100 Q700,70 750,100 T850,100 L830,110 Q750,120 670,110 Z" />
        <path fill="hsl(var(--primary) / 0.1)" d="M400,200 Q450,170 500,200 T600,200 L580,210 Q500,220 420,210 Z" />

        {/* Birds */}
        <path fill="hsl(var(--primary) / 0.8)" d="M800 150 C 805 145, 815 145, 820 150 L 810 155 Z" />
        <path fill="hsl(var(--primary) / 0.7)" d="M830 170 C 835 165, 845 165, 850 170 L 840 175 Z" />
        <path fill="hsl(var(--primary) / 0.6)" d="M200 220 C 205 215, 215 215, 220 220 L 210 225 Z" />
        <path fill="hsl(var(--primary) / 0.8)" d="M240 190 C 245 185, 255 185, 260 190 L 250 195 Z" />
        <path fill="hsl(var(--primary) / 0.7)" d="M180 180 C 185 175, 195 175, 200 180 L 190 185 Z" />
        
        {/* Mountains */}
        <path fill="hsl(var(--primary) / 0.3)" d="M0,450 Q250,350 500,400 T1000,380 L1000,600 L0,600 Z" />
        <path fill="hsl(var(--primary) / 0.2)" d="M0,455 Q255,355 505,405 T1005,385 L1005,600 L0,600 Z" />
        
        <path fill="hsl(var(--primary) / 0.4)" d="M0,500 Q200,400 400,450 T800,420 Q900,400 1000,450 L1000,600 L0,600 Z" />
        <path fill="hsl(var(--primary) / 0.3)" d="M-5,505 Q195,405 395,455 T795,425 Q895,405 995,455 L995,600 L-5,600 Z" />

        <path fill="hsl(var(--primary) / 0.5)" d="M0,550 Q150,480 300,520 T700,500 Q850,450 1000,550 L1000,600 L0,600 Z" />
        <path fill="hsl(var(--primary) / 0.4)" d="M5,555 Q155,485 305,525 T705,505 Q855,455 1005,555 L1005,600 L5,600 Z" />
      </svg>
    </div>
  );
};

export default SketchBackground;