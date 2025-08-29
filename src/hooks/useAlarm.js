import { useState, useRef, useCallback } from 'react';

const ALARM_SRC = '/alarm.mp3'; // Place your alarm.mp3 in public/

/**
 * Custom hook for alarm sound functionality
 * @returns {object} Alarm state and controls
 */
export const useAlarm = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Preload alarm sound
  const preloadAlarm = useCallback(() => {
    if (!audioRef.current) {
      const audio = new window.Audio(ALARM_SRC);
      audio.volume = 0.8;
      audio.preload = 'auto';
      audioRef.current = audio;
      // Try to play and pause to unlock on some browsers
      audio.play().then(() => audio.pause()).catch(() => {});
    }
  }, []);

  const playAlarm = useCallback(() => {
    if (isMuted) return;
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.8;
        audioRef.current.play().catch(() => {});
      } catch (e) {}
    }
  }, [isMuted]);

  const stopAlarm = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (e) {}
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const showNotification = useCallback((title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (error) {
        return false;
      }
    }
    return false;
  }, []);

  return {
    isMuted,
    playAlarm,
    stopAlarm,
    toggleMute,
    showNotification,
    requestNotificationPermission,
    preloadAlarm,
  };
};

/**
 * Custom hook for browser notifications
 * @returns {object} Notification controls
 */
export const useNotifications = () => {
  const showNotification = useCallback((title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.warn('Notification permission request failed:', error);
        return false;
      }
    }
    return false;
  }, []);

  return {
    showNotification,
    requestPermission
  };
};
