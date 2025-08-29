import { useState } from 'react';
import { parseTimeToSeconds, isValidTimeFormat } from '../utils/time';

/**
 * TimeInput Component
 * Allows users to input time in HH:MM:SS or MM:SS format
 * @param {object} props - Component props
 * @param {function} props.onTimeSet - Callback when time is set
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.className - Additional CSS classes
 */
const TimeInput = ({ onTimeSet, placeholder = 'MM:SS or HH:MM:SS', className = '' }) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === '' || isValidTimeFormat(value)) setIsValid(true);
    else setIsValid(false);
  };

  const handleSetTime = () => {
    if (isValid && inputValue) {
      const seconds = parseTimeToSeconds(inputValue);
      onTimeSet(seconds);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSetTime();
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`glass-input flex-1 ${
            !isValid && inputValue ? 'border-red-400 focus:ring-red-400' : ''
          }`}
        />
        <button
          onClick={handleSetTime}
          disabled={!isValid || !inputValue}
          className="glass-button px-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Set
        </button>
      </div>
      {!isValid && inputValue && (
        <p className="text-red-400 text-sm">
          Please enter time in HH:MM:SS or MM:SS format
        </p>
      )}
      <div className="text-xs text-gray-400">
        Examples: 1:30 (1 min 30 sec), 2:05:00 (2 hours 5 min)
      </div>
    </div>
  );
};

export default TimeInput;
