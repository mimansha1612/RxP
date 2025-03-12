import React, { useState, useEffect } from 'react';
import { Stethoscope, Send } from 'lucide-react';
import { getGroqChatCompletion } from '../groqService';

interface Message {
  role: 'user' | 'assistant'; // Updated to match Groq API's expected role format
  content: string;
  timestamp: Date;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Cleanup chats when the user leaves the site
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear chat messages or perform cleanup
      setMessages([]);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add the user's message to the chat history
    const newUserMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    // Update the chat history with the user's message
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue('');

    try {
      // Prepare the chat history for the Groq API
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Add the user's new message to the chat history
      chatHistory.push({ role: 'user', content: inputValue });

      // Send the entire chat history to the Groq API
      const aiResponseContent = await getGroqChatCompletion(chatHistory);

      // Add the AI's response to the chat history
      const aiResponse: Message = {
        role: 'assistant',
        content: aiResponseContent,
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorResponse: Message = {
        role: 'assistant',
        content: 'Error: Unable to connect to the AI model.',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 mt-20">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-4">Start a conversation by asking a medical question...</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 mb-4 p-4 ${
                message.role === 'assistant' ? 'bg-gray-800 rounded-lg' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'assistant' ? 'bg-blue-500' : 'bg-gray-600'
              }`}>
                {message.role === 'assistant' ? (
                  <Stethoscope size={16} />
                ) : (
                  <div className="w-4 h-4 bg-gray-300 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-300">{message.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about medical topics, cases, or study strategies..."
            className="w-full p-4 pr-32 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <button
              type="submit"
              className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;