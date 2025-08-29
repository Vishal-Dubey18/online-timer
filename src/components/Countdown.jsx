import { useState, useEffect, useRef } from 'react';
import { useCountdown } from '../hooks/useTimer';
import { formatTime, calculatePercentage } from '../utils/time';
import TimeInput from './TimeInput';
import ProgressRing from './ProgressRing';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

const ALARM_SRC = '/alarm.mp3'; // Place a short mp3 in public/alarm.mp3

/**
 * Countdown Component
 * Full-featured countdown timer with alarm and progress visualization
 */
const Countdown = () => {
  const [initialTime, setInitialTime] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const fadeTimer = useRef(null);

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

  // Preload alarm sound
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new window.Audio(ALARM_SRC);
      audioRef.current.volume = 0;
      audioRef.current.preload = 'auto';
    }
  }, []);

  // Fade-in alarm sound
  function playAlarm() {
    if (isMuted || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.volume = 0;
    audioRef.current.play().catch(() => {});
    let v = 0;
    clearInterval(fadeTimer.current);
    fadeTimer.current = setInterval(() => {
      v += 0.07;
      if (audioRef.current) audioRef.current.volume = Math.min(1, v);
      if (v >= 1) clearInterval(fadeTimer.current);
    }, 60);
  }

  function stopAlarm() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0;
    }
    clearInterval(fadeTimer.current);
  }

  function handleTimerComplete() {
    playAlarm();
    setShowAlert(true);
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Timer Complete!', {
        body: 'Your countdown timer has finished.',
        icon: '/favicon.ico'
      });
    }
  }

  // Stop alarm when reset or alert closed
  useEffect(() => {
    if (!showAlert) stopAlarm();
  }, [showAlert]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleTimeSet = (seconds) => {
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
    <div className="glass-card max-w-md mx-auto fade-in">
      {/* Digital Clock Display */}
      <div className="time-big mt-4 mb-2">{formatTime(time)}</div>
      <div className="flex justify-center mb-4">
        <ProgressRing
          progress={progress}
          size={200}
          strokeWidth={10}
          color={timerState === 'complete' ? '#ef4444' : '#3b82f6'}
        />
      </div>
      {/* Time Input */}
      {timerState === 'idle' && (
        <div className="mb-6">
          <TimeInput onTimeSet={handleTimeSet} />
        </div>
      )}
      {/* Controls */}
      <div className="controls">
        {timerState === 'idle' && initialTime > 0 && (
          <button onClick={start} className="btn primary">
            <Play size={18} /> Start
          </button>
        )}
        {timerState === 'running' && (
          <button onClick={pause} className="btn warn">
            <Pause size={18} /> Pause
          </button>
        )}
        {timerState === 'paused' && (
          <button onClick={resume} className="btn success">
            <Play size={18} /> Resume
          </button>
        )}
        {(timerState === 'running' || timerState === 'paused' || timerState === 'complete') && (
          <button onClick={handleReset} className="btn danger">
            <RotateCcw size={18} /> Reset
          </button>
        )}
        <button
          onClick={() => setIsMuted((m) => !m)}
          className="btn"
          title={isMuted ? 'Unmute alarm' : 'Mute alarm'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
      {/* Status */}
      <div className="text-center text-xs text-gray-400 mt-2 mb-2">
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          aria-modal="true"
          role="alertdialog"
        >
          <div className="glass-card p-8 fade-in max-w-xs text-center">
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
      {/* Hidden audio element */}
      <audio ref={audioRef} src={ALARM_SRC} preload="auto" style={{ display: 'none' }} />
    </div>
  );
};

export default Countdown;
