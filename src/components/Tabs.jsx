import { useState } from 'react';
import { Clock, Timer } from 'lucide-react';

/**
 * Tabs Component
 * Navigation tabs for switching between Timer and Stopwatch
 * @param {object} props - Component props
 * @param {string} props.activeTab - Currently active tab
 * @param {function} props.onTabChange - Callback when tab changes
 */
const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'timer',
      label: 'Timer',
      icon: Timer,
      description: 'Countdown with alarm'
    },
    {
      id: 'stopwatch',
      label: 'Stopwatch',
      icon: Clock,
      description: 'Precision timing with laps'
    }
  ];

  return (
    <div className="glass-card p-2 mb-6">
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="font-semibold text-sm">{tab.label}</span>
              <span className="text-xs opacity-70 mt-1">{tab.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
