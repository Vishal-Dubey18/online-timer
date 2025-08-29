import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for countdown timer functionality
 * @param {number} initialTime - Initial time in seconds
 * @param {function} onComplete - Callback when timer completes
 * @returns {object} Timer state and controls
 */
export const useCountdown = (initialTime = 0, onComplete) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false);
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, time, onComplete]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(initialTime);
  }, [initialTime]);

  const setNewTime = useCallback((newTime) => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(newTime);
  }, []);

  return {
    time,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    reset,
    setTime: setNewTime
  };
};

/**
 * Custom hook for stopwatch functionality
 * @returns {object} Stopwatch state and controls
 */
export const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    let startTime;
    let elapsed = 0;

    if (isRunning) {
      startTime = Date.now() - elapsed;
      interval = setInterval(() => {
        elapsed = Date.now() - startTime;
        setTime(elapsed);
      }, 10); // Update every 10ms for smooth milliseconds display
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (isRunning) {
      setLaps(prevLaps => [...prevLaps, time]);
    }
  };

  return {
    time,
    isRunning,
    laps,
    start,
    pause,
    reset,
    lap
  };
};
