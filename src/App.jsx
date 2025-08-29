import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Countdown from './components/Countdown';
import Stopwatch from './components/Stopwatch';
import { useNotifications } from './hooks/useAlarm';

/**
 * Main App Component
 * Combines all components into a complete timer application
 */
function App() {
  const [activeTab, setActiveTab] = useState('timer');
  const { requestPermission } = useNotifications();

  // Request notification permission on app load
  useEffect(() => {
    requestPermission().then(hasPermission => {
      if (hasPermission) {
        console.log('Notification permission granted');
      }
    });
  }, [requestPermission]);

  const renderContent = () => {
    switch (activeTab) {
      case 'timer':
        return <Countdown />;
      case 'stopwatch':
        return <Stopwatch />;
      default:
        return <Countdown />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Header />
        
        {/* Navigation Tabs */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <main>
          {renderContent()}
        </main>
        
        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Built with React.js & Tailwind CSS • Modern Online Timer
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
