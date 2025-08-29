import { useState, useEffect } from 'react';
import { useCountdown } from '../hooks/useTimer';
import { formatTime, calculatePercentage } from '../utils/time';
import TimeInput from './TimeInput';
import ProgressRing from './ProgressRing';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Settings } from 'lucide-react';
import { useAlarm } from '../hooks/useAlarm.js';

const PRESETS = [
  { label: '1 min', value: 60 },
  { label: '5 min', value: 300 },
  { label: '10 min', value: 600 },
  { label: '15 min', value: 900 },
  { label: '30 min', value: 1800 },
  { label: '1 hour', value: 3600 },
];

const RECENTS_KEY = 'timer_recents';

const ALARM_LABEL = "Timer Complete!";

/**
 * Countdown Component
 * Full-featured countdown timer with alarm and progress visualization
 */
const Countdown = () => {
  const [initialTime, setInitialTime] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [recents, setRecents] = useState([]);

  // Use alarm hook
  const {
    isMuted,
    playAlarm,
    stopAlarm,
    toggleMute,
    showNotification,
    requestNotificationPermission,
    preloadAlarm,
  } = useAlarm();

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

  // Load recents from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENTS_KEY);
    if (stored) setRecents(JSON.parse(stored));
  }, []);

  // Save recents to localStorage
  useEffect(() => {
    if (initialTime > 0 && !recents.includes(initialTime)) {
      const updated = [initialTime, ...recents].slice(0, 5);
      setRecents(updated);
      localStorage.setItem(RECENTS_KEY, JSON.stringify(updated));
    }
    // eslint-disable-next-line
  }, [initialTime]);

  // Preload alarm sound and request notification permission on mount
  useEffect(() => {
    preloadAlarm();
    requestNotificationPermission();
    // eslint-disable-next-line
  }, []);

  function handleTimerComplete() {
    playAlarm();
    setShowAlert(true);
    showNotification(ALARM_LABEL, {
      body: 'Your countdown timer has finished.',
      icon: '/favicon.ico'
    });
  }

  // Stop alarm when reset or alert closed
  useEffect(() => {
    if (!showAlert) stopAlarm();
  }, [showAlert, stopAlarm]);

  const handleTimeSet = (seconds) => {
    setInitialTime(seconds);
    setTime(seconds);
  };

  const handlePreset = (seconds) => {
    setInitialTime(seconds);
    setTime(seconds);
  };

  const handleRecent = (seconds) => {
    setInitialTime(seconds);
    setTime(seconds);
  };

  const handleReset = () => {
    reset();
    setInitialTime(0);
    setShowAlert(false);
    stopAlarm();
  };

  const getTimerState = () => {
    if (time === 0 && initialTime > 0) return 'complete';
    if (isRunning) return 'running';
    if (isPaused) return 'paused';
    return 'idle';
  };

  const timerState = getTimerState();

  return (
    <div className="glass-card max-w-md mx-auto fade-in" aria-label="Countdown Timer">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">Countdown Timer</span>
        <button
          className="glass-button p-2"
          aria-label="Settings"
          onClick={() => setShowSettings(true)}
        >
          <Settings size={20} />
        </button>
      </div>
      <div className="time-big mt-2 mb-2" aria-live="polite">{formatTime(time)}</div>
      <div className="flex justify-center mb-4">
        <ProgressRing
          progress={progress}
          size={200}
          strokeWidth={10}
          color={timerState === 'complete' ? '#ef4444' : '#3b82f6'}
        />
      </div>
      {/* Preset Buttons */}
      {timerState === 'idle' && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {PRESETS.map(p => (
            <button
              key={p.value}
              className="preset-btn"
              onClick={() => handlePreset(p.value)}
              aria-label={`Set timer to ${p.label}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
      {/* Recent Timers */}
      {timerState === 'idle' && recents.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {recents.map((sec, i) => (
            <button
              key={i}
              className="preset-btn"
              onClick={() => handleRecent(sec)}
              aria-label={`Set timer to ${formatTime(sec)}`}
            >
              {formatTime(sec)}
            </button>
          ))}
        </div>
      )}
      {/* Time Input */}
      {timerState === 'idle' && (
        <div className="mb-6">
          <TimeInput onTimeSet={handleTimeSet} />
        </div>
      )}
      {/* Controls */}
      <div className="controls">
        {timerState === 'idle' && initialTime > 0 && (
          <button onClick={start} className="btn primary" aria-label="Start timer">
            <Play size={18} /> Start
          </button>
        )}
        {timerState === 'running' && (
          <button onClick={pause} className="btn warn" aria-label="Pause timer">
            <Pause size={18} /> Pause
          </button>
        )}
        {timerState === 'paused' && (
          <button onClick={resume} className="btn success" aria-label="Resume timer">
            <Play size={18} /> Resume
          </button>
        )}
        {(timerState === 'running' || timerState === 'paused' || timerState === 'complete') && (
          <button onClick={handleReset} className="btn danger" aria-label="Reset timer">
            <RotateCcw size={18} /> Reset
          </button>
        )}
        <button
          onClick={toggleMute}
          className="btn"
          title={isMuted ? 'Unmute alarm' : 'Mute alarm'}
          aria-label={isMuted ? 'Unmute alarm' : 'Mute alarm'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
      {/* Status */}
      <div className="text-center text-xs text-gray-400 mt-2 mb-2" aria-live="polite">
        {timerState === 'complete'
          ? 'Timer Complete!'
          : timerState === 'running'
          ? 'Running...'
          : timerState === 'paused'
          ? 'Paused'
          : 'Ready'}
      </div>
      {/* Fade-in Alert Modal */}
      {showAlert && (
        <div className="modal-bg" aria-modal="true" role="alertdialog">
          <div className="modal-card">
            <div className="text-3xl mb-2 text-red-400 font-bold">⏰</div>
            <div className="text-xl font-semibold mb-2 text-white">Time's Up!</div>
            <div className="text-gray-300 mb-4">Your countdown timer has finished.</div>
            <button
              className="btn primary w-full"
              onClick={() => setShowAlert(false)}
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-bg" aria-modal="true" role="dialog">
          <div className="modal-card">
            <div className="text-xl font-semibold mb-2 text-white">Settings</div>
            <div className="flex flex-col gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!isMuted}
                  onChange={toggleMute}
                  aria-checked={!isMuted}
                />
                <span>Enable alarm sound</span>
              </label>
              {/* Add more settings here (e.g., theme toggle) */}
            </div>
            <button className="btn primary w-full" onClick={() => setShowSettings(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
