import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import Header from './components/Header';


function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'chat'>('home');

  return (
    <div className="h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header 
        onNewChat={() => setCurrentPage('chat')} 
        onHome={() => setCurrentPage('home')} 
      />
      <main className="flex-1 overflow-hidden">
        {currentPage === 'home' ? (
          <HomePage onStartChat={() => setCurrentPage('chat')} />
        ) : (
          <ChatPage />
        )}
      </main>
    </div>
  );
}

export default App;