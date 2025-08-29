import { useState, useEffect } from 'react';
import { useCountdown } from '../hooks/useTimer';
import { useAlarm } from '../hooks/useAlarm';
import { formatTime, calculatePercentage } from '../utils/time';
import TimeInput from './TimeInput';
import ProgressRing from './ProgressRing';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

/**
 * Countdown Component
 * Full-featured countdown timer with alarm and progress visualization
 */
const Countdown = () => {
  const [initialTime, setInitialTime] = useState(0);
  const { playAlarm, toggleMute, isMuted, preloadAlarm } = useAlarm();
  
  const {
    time,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    reset,
    setTime
  } = useCountdown(initialTime, handleTimerComplete);

  const progress = calculatePercentage(time, initialTime);

  // Preload alarm sound on component mount
  useEffect(() => {
    preloadAlarm();
  }, [preloadAlarm]);

  function handleTimerComplete() {
    playAlarm();
    
    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Timer Complete!', {
        body: 'Your countdown timer has finished.',
        icon: '/favicon.ico'
      });
    }
  }

  const handleTimeSet = (seconds) => {
    setInitialTime(seconds);
    setTime(seconds);
  };

  const handleReset = () => {
    reset();
    setInitialTime(0);
  };

  const getTimerState = () => {
    if (time === 0 && initialTime > 0) return 'complete';
    if (isRunning) return 'running';
    if (isPaused) return 'paused';
    return 'idle';
  };

  const timerState = getTimerState();

  return (
    <div className="glass-card p-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Countdown Timer</h2>
        <p className="text-gray-300">Set your timer and track progress</p>
      </div>

      {/* Progress Ring and Time Display */}
      <div className="flex justify-center mb-6">
        <ProgressRing 
          progress={progress} 
          size={200}
          strokeWidth={10}
          color={timerState === 'complete' ? '#ef4444' : '#3b82f6'}
        />
      </div>

      {/* Time Display */}
      <div className="text-center mb-6">
        <div className={`text-5xl font-mono font-bold mb-2 no-select ${
          timerState === 'complete' ? 'text-red-400 animate-pulse' : 'text-white'
        }`}>
          {formatTime(time)}
        </div>
        {initialTime > 0 && (
          <div className="text-sm text-gray-400">
            {Math.round(progress)}% complete
          </div>
        )}
      </div>

      {/* Time Input */}
      {timerState === 'idle' && (
        <div className="mb-6">
          <TimeInput onTimeSet={handleTimeSet} />
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-4">
        {timerState === 'idle' && initialTime > 0 && (
          <button
            onClick={start}
            className="glass-button flex items-center gap-2 bg-green-500 hover:bg-green-600"
          >
            <Play size={16} />
            Start
          </button>
        )}
        
        {timerState === 'running' && (
          <button
            onClick={pause}
            className="glass-button flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600"
          >
            <Pause size={16} />
            Pause
          </button>
        )}
        
        {timerState === 'paused' && (
          <button
            onClick={resume}
            className="glass-button flex items-center gap-2 bg-green-500 hover:bg-green-600"
          >
            <Play size={16} />
            Resume
          </button>
        )}
        
        {(timerState === 'running' || timerState === 'paused' || timerState === 'complete') && (
          <button
            onClick={handleReset}
            className="glass-button flex items-center gap-2 bg-gray-600 hover:bg-gray-700"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        )}
      </div>

      {/* Mute Toggle */}
      <div className="flex justify-center">
        <button
          onClick={toggleMute}
          className="glass-button flex items-center gap-2"
          title={isMuted ? 'Unmute alarm' : 'Mute alarm'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>

      {/* Status Message */}
      {timerState === 'complete' && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
          <p className="text-red-200 font-semibold">Timer Complete!</p>
        </div>
      )}
    </div>
  );
};

export default Countdown;
