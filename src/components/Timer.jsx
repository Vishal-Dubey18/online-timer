import React, { useState } from 'react';
import Countdown from './Countdown';
import Stopwatch from './Stopwatch';
import Tabs from './Tabs';
import Header from './Header';

/**
 * Timer main component: Tab switcher for Countdown and Stopwatch
 */
const Timer = () => {
  const [tab, setTab] = useState('timer');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 p-4">
        <Tabs activeTab={tab} onTabChange={setTab} />
        <div className="mt-4">
          {tab === 'timer' ? <Countdown /> : <Stopwatch />}
        </div>
      </div>
    </div>
  );
};

export default Timer;