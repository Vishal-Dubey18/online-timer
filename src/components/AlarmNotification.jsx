import React from 'react';
import { FaBell } from 'react-icons/fa';

export function AlarmNotification({ onMute }) {
  return (
    <div className="glass-card mt-6 flex items-center justify-between animate-pulse-slow">
      <div className="flex items-center gap-3">
        <FaBell className="text-yellow-400" />
        <p className="font-semibold">Timer Complete!</p>
      </div>
      <button onClick={onMute} className="glass-button">Mute</button>
    </div>
  );
}