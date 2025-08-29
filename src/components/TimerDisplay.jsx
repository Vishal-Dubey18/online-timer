import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaHourglassHalf } from 'react-icons/fa';
import PropTypes from 'prop-types';

export function TimerDisplay({ timeLeft, duration, isActive, onStart, onToggle, onReset }) {
  // Calculate percentage, preventing division by zero.
  const percentage = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;
  const pauseResumeText = isActive ? 'Pause' : 'Resume';

  return (
    <div className="glass-card flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <FaHourglassHalf size="24" className="text-blue-400" />
        <h1 className="text-3xl">Timer</h1>
      </div>

      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar
          value={percentage}
          text={`${timeLeft}s`}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            pathColor: `rgba(96, 165, 250, ${percentage / 100})`, // blue-400
            textColor: '#ffffff',
            trailColor: '#374151', // gray-700
          })}
        />
      </div>
      <p className="text-gray-300">{Math.round(percentage)}% complete</p>

      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={onStart} className="glass-button" disabled={isActive}>Start</button>
        <button onClick={onToggle} className="glass-button" disabled={!isActive && timeLeft === 0}>{pauseResumeText}</button>
        <button onClick={onReset} className="glass-button">Reset</button>
      </div>
    </div>
  );
}

// Add PropType validation for better component API and error checking
TimerDisplay.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};