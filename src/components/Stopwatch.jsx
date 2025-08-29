import { useState, useRef } from 'react';
import { useStopwatch } from '../hooks/useTimer';
import { formatTimeWithMs } from '../utils/time';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

/**
 * Stopwatch Component
 * Full-featured stopwatch with lap timing and modern UI
 */
const Stopwatch = () => {
  const {
    time,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch();

  // Lap logic: store lap intervals and total times
  const [laps, setLaps] = useState([]);
  const lastLapTimeRef = useRef(0);

  const handleStartPause = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  const handleReset = () => {
    reset();
    setLaps([]);
    lastLapTimeRef.current = 0;
  };

  const handleLap = () => {
    if (!isRunning) return;
    const lapTime = time - lastLapTimeRef.current;
    setLaps(prev => [
      {
        lap: prev.length + 1,
        lapTime,
        totalTime: time,
      },
      ...prev,
    ]);
    lastLapTimeRef.current = time;
  };

  return (
    <div className="glass-card max-w-md mx-auto fade-in">
      {/* Time Display */}
      <div className="time-big mt-4 mb-2">
        {formatTimeWithMs(time)}
      </div>

      {/* Controls */}
      <div className="controls mb-2">
        <button
          onClick={handleStartPause}
          className={`btn ${isRunning ? 'warn' : 'success'}`}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleLap}
          disabled={!isRunning}
          className="btn"
        >
          <Flag size={18} /> Lap
        </button>
        <button
          onClick={handleReset}
          className="btn danger"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>

      {/* Status Text */}
      <div className="text-center text-xs text-gray-400 mt-2 mb-2">
        {isRunning ? 'Running...' : 'Ready'}
      </div>

      {/* Laps List */}
      {laps.length > 0 && (
        <ul className="laps" aria-label="Lap times">
          {laps.map((lap, idx) => (
            <li key={laps.length - idx}>
              <span>Lap {lap.lap}</span>
              <span className="pill">{formatTimeWithMs(lap.lapTime)}</span>
              <span className="pill">Total {formatTimeWithMs(lap.totalTime)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Stopwatch;
