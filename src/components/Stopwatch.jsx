import { useState } from 'react';
import { useStopwatch } from '../hooks/useTimer';
import { formatTimeWithMs } from '../utils/time';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

/**
 * Stopwatch Component
 * Full-featured stopwatch with lap timing
 */
const Stopwatch = () => {
  const {
    time,
    isRunning,
    laps,
    start,
    pause,
    reset,
    lap
  } = useStopwatch();

  const [showLaps, setShowLaps] = useState(false);

  const handleStartPause = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  const handleReset = () => {
    reset();
    setShowLaps(false);
  };

  const handleLap = () => {
    if (isRunning) {
      lap();
      setShowLaps(true);
    }
  };

  return (
    <div className="glass-card p-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Stopwatch</h2>
        <p className="text-gray-300">Track time with precision</p>
      </div>

      {/* Time Display */}
      <div className="text-center mb-6">
        <div className="text-5xl font-mono font-bold text-white mb-2 no-select">
          {formatTimeWithMs(time)}
        </div>
        <div className="text-sm text-gray-400">
          {laps.length} lap{laps.length !== 1 ? 's' : ''} recorded
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={handleStartPause}
          className={`glass-button flex items-center gap-2 ${
            isRunning 
              ? 'bg-yellow-500 hover:bg-yellow-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isRunning ? (
            <>
              <Pause size={16} />
              Pause
            </>
          ) : (
            <>
              <Play size={16} />
              Start
            </>
          )}
        </button>

        <button
          onClick={handleLap}
          disabled={!isRunning}
          className="glass-button flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Flag size={16} />
          Lap
        </button>

        <button
          onClick={handleReset}
          className="glass-button flex items-center gap-2 bg-gray-600 hover:bg-gray-700"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Laps Section */}
      {laps.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">Lap Times</h3>
            <button
              onClick={() => setShowLaps(!showLaps)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {showLaps ? 'Hide' : 'Show'}
            </button>
          </div>

          {showLaps && (
            <div className="max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {laps.map((lapTime, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <span className="text-gray-300">Lap {index + 1}</span>
                    <span className="font-mono text-white">
                      {formatTimeWithMs(lapTime)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="text-center">
        <div className="text-xs text-gray-400">
          {isRunning ? 'Running...' : 'Ready to start'}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
