import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import Header from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import SignInPage from './pages/SignIn';

function App() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header 
        onNewChat={() => navigate('/chat')} 
        onHome={() => navigate('/')} 
      />
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage onStartChat={() => navigate('/chat')} />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;