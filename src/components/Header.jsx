import { useState, useEffect } from 'react';
import { Sun, Moon, Clock } from 'lucide-react';

/**
 * Header Component
 * App header with theme toggle and navigation
 */
const Header = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme === 'light' ? 'light' : savedTheme === 'dark' ? 'dark' : systemPrefersDark ? 'dark' : 'light';
    setIsDark(theme === 'dark');
    // Toggle dark class on <html>
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    // Toggle dark class on <html>
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <header className="glass-card p-6 mb-8">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Online Timer</h1>
            <p className="text-gray-400 text-sm">React Timer & Stopwatch</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="glass-button p-2"
          title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
