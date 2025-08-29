import React from 'react';
import Timer from './components/Timer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <main className="max-w-md mx-auto">
          <Timer />
        </main>
      </div>
    </div>
  );
}

export default App;