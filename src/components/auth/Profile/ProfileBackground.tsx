import React from 'react';

const ProfileBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-70" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* --- Gelombang lembut --- */}
        <path
          d="M0,500 Q250,450 500,520 T1000,500 L1000,600 L0,600 Z"
          fill="hsl(var(--primary) / 0.08)"
        />
        <path
          d="M0,540 Q200,480 450,540 T1000,530 L1000,600 L0,600 Z"
          fill="hsl(var(--primary) / 0.12)"
        />

        {/* --- Blob abstrak --- */}
        <circle cx="200" cy="150" r="120" fill="hsl(var(--primary) / 0.1)" />
        <circle cx="820" cy="200" r="160" fill="hsl(var(--primary) / 0.08)" />
        <circle cx="700" cy="450" r="100" fill="hsl(var(--primary) / 0.06)" />

        {/* --- Garis aksen diagonal --- */}
        <line x1="100" y1="50" x2="200" y2="150" stroke="hsl(var(--primary) / 0.4)" strokeWidth="2" />
        <line x1="850" y1="80" x2="950" y2="180" stroke="hsl(var(--primary) / 0.3)" strokeWidth="2" />
        <line x1="400" y1="400" x2="500" y2="500" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1.5" />

        {/* --- Pola grid titik --- */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={100 + col * 80}
              cy={300 + row * 50}
              r="2"
              fill="hsl(var(--primary) / 0.25)"
            />
          ))
        )}

        {/* --- Aksen bintang kecil --- */}
        <path
          d="M 600 100 L 605 110 L 615 110 L 607 117 L 610 127 L 600 122 L 590 127 L 593 117 L 585 110 L 595 110 Z"
          fill="hsl(var(--primary) / 0.35)"
        />
        <circle cx="920" cy="480" r="6" fill="hsl(var(--primary) / 0.25)" />
        <circle cx="100" cy="420" r="4" fill="hsl(var(--primary) / 0.2)" />
      </svg>
    </div>
  );
};

export default ProfileBackground;
