import React, { useState, useRef } from 'react';
import { Stethoscope, Send, Mic, Upload, X, FileText } from 'lucide-react';


interface Message {
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && attachments.length === 0) return;

    const newMessage: Message = {
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
      attachments: attachments.map(file => ({
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type
      }))
    };

    // Simulate AI response
    const aiResponse: Message = {
      content: attachments.length > 0
        ? `I've received your documents${inputValue ? ' and question' : ''}. Let me analyze them and provide assistance with your medical studies.`
        : "I understand your medical query. As an AI assistant, I'm here to help medical students with their studies and clinical knowledge. What specific topic would you like to explore?",
      type: 'assistant',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage, aiResponse]);
    setInputValue('');
    setAttachments([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 mt-20">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-4">Start a conversation by asking a medical question...</p>
              <p className="text-sm">You can also upload documents for analysis</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 mb-4 p-4 ${
                message.type === 'assistant' ? 'bg-gray-800 rounded-lg' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'assistant' ? 'bg-blue-500' : 'bg-gray-600'
              }`}>
                {message.type === 'assistant' ? (
                  <Stethoscope size={16} />
                ) : (
                  <div className="w-4 h-4 bg-gray-300 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-300">{message.content}</p>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.attachments.map((file, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800 p-2 rounded">
                        <FileText size={16} />
                        <span>{file.name}</span>
                        <span className="text-gray-500">({file.size})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="border-t border-gray-800 p-2">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-800 p-2 rounded text-sm">
                <FileText size={14} className="text-blue-400" />
                <span className="text-gray-300">{file.name}</span>
                <span className="text-gray-500">({formatFileSize(file.size)})</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.txt"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200"
            >
              <Upload size={20} />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200"
            >
              <Mic size={20} />
            </button>
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