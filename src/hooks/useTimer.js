import { useState, useEffect, useRef } from 'react';

/**
 * A custom hook to manage timer logic.
 * @param {number} initialDuration - The initial duration of the timer in seconds.
 * @returns {object} - { timeLeft, isActive, isFinished, start, toggle, reset }
 */
export function useTimer(initialDuration) {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // This effect handles the countdown interval.
  // It only re-runs when `isActive` changes, making it very efficient.
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev > 0) {
            return prev - 1;
          }
          // Timer reached 0, so stop the interval
          clearInterval(intervalRef.current);
          setIsActive(false);
          return 0;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  // Derived state: the timer is finished if time is 0 and it's not active.
  const isFinished = timeLeft === 0 && !isActive;

  const start = () => {
    if (timeLeft === 0) setTimeLeft(initialDuration);
    setIsActive(true);
  };
  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(initialDuration);
  };

  return { timeLeft, isActive, isFinished, start, toggle, reset };
}

/**
 * useCountdown - Countdown timer hook
 * @param {number} initialSeconds - Initial countdown time in seconds
 * @param {function} onComplete - Callback when timer reaches zero
 */
export function useCountdown(initialSeconds = 0, onComplete) {
  const [time, setTime] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (prev > 1) return prev - 1;
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsPaused(false);
          if (onComplete) onComplete();
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused, time, onComplete]);

  const start = () => {
    if (time > 0) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };
  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);
  const reset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(initialSeconds);
  };
  const setTimeValue = (seconds) => {
    setTime(seconds);
    setIsRunning(false);
    setIsPaused(false);
  };

  return {
    time,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    reset,
    setTime: setTimeValue,
  };
}

/**
 * useStopwatch - Stopwatch timer hook (no laps, just time and controls)
 */
export function useStopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
  };
}