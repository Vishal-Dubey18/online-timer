import { useEffect, useState } from 'react';

/**
 * ProgressRing Component
 * Circular progress indicator for timers
 * @param {object} props - Component props
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {number} props.size - Size of the ring in pixels
 * @param {number} props.strokeWidth - Width of the stroke
 * @param {string} props.color - Color of the progress ring
 * @param {string} props.bgColor - Background color of the ring
 */
const ProgressRing = ({ 
  progress = 0, 
  size = 200, 
  strokeWidth = 8, 
  color = '#3b82f6', 
  bgColor = 'rgba(255,255,255,0.1)' 
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    // Smooth animation for progress changes
    const animation = requestAnimationFrame(() => {
      setAnimatedProgress(progress);
    });

    return () => cancelAnimationFrame(animation);
  }, [progress]);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      
      {/* Progress percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressRing;
