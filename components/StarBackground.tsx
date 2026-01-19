import React, { useMemo } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDelay: string;
  opacity: number;
}

interface StarBackgroundProps {
  primaryColor?: string;
}

const StarBackground: React.FC<StarBackgroundProps> = ({ primaryColor = '#ffffff' }) => {
  const stars = useMemo(() => {
    const starCount = 80;
    const newStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }
    return newStars;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.animationDelay,
            opacity: star.opacity,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-10" />
    </div>
  );
};

export default StarBackground;