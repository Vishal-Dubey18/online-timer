/**
 * Utility functions for time calculations and formatting
 */

/**
 * Format time in seconds to HH:MM:SS format
 * @param {number} seconds - Total seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format time in milliseconds to HH:MM:SS:MS format
 * @param {number} milliseconds - Total milliseconds
 * @returns {string} Formatted time string with milliseconds
 */
export const formatTimeWithMs = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10); // Show 2-digit milliseconds

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
};

/**
 * Parse time string (HH:MM:SS or MM:SS) to seconds
 * @param {string} timeString - Time string to parse
 * @returns {number} Total seconds
 */
export const parseTimeToSeconds = (timeString) => {
  const parts = timeString.split(':').map(part => parseInt(part, 10) || 0);
  
  if (parts.length === 3) {
    // HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    // SS
    return parts[0];
  }
  return 0;
};

/**
 * Calculate percentage of time elapsed
 * @param {number} current - Current time in seconds
 * @param {number} total - Total time in seconds
 * @returns {number} Percentage (0-100)
 */
export const calculatePercentage = (current, total) => {
  if (total === 0) return 0;
  return Math.min(100, Math.max(0, (current / total) * 100));
};

/**
 * Validate time input (HH:MM:SS or MM:SS format)
 * @param {string} timeString - Time string to validate
 * @returns {boolean} True if valid
 */
export const isValidTimeFormat = (timeString) => {
  const timeRegex = /^(\d{1,2}:)?(\d{1,2}:)?\d{1,2}$/;
  return timeRegex.test(timeString);
};

/**
 * Get current timestamp in seconds
 * @returns {number} Current timestamp in seconds
 */
export const getCurrentTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};
