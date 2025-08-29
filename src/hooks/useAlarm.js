import { useState, useRef, useCallback } from 'react';

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
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+Trs2McBjiP1/LMeSwFJHfH8N+SPAoZYLzp6adVFA5LoeDtt2ceBzWK0/LQfTAFJHfH8N+SPAoZYLzp6adVFA5LoeDtt2ceBzWK0/LQfTA=');
      audioRef.current.volume = 0.7;
      audioRef.current.preload = 'auto';
    }
  }, []);

  const playAlarm = useCallback(() => {
    if (!isMuted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.warn('Audio play failed:', error);
      });
    }
  }, [isMuted]);

  const stopAlarm = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
        console.warn('Notification permission request failed:', error);
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
    preloadAlarm
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
