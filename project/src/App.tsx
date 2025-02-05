import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Brain, Upload, Mic, Volume2, BookOpen } from 'lucide-react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (transcript) {
      setQuestion(transcript);
    }
  }, [transcript]);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulated API call - replace with actual implementation
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({
          question,
          model: selectedModel,
          files: files.map(f => f.name)
        })
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error:', error);
      setAnswer('Sorry, there was an error processing your request.');
    }
    setIsLoading(false);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-emerald-600 mr-2" />
            <h1 className="text-4xl font-bold text-emerald-800">RxP</h1>
          </div>
          <p className="text-emerald-600">Your Medical Knowledge Assistant</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Documents
              </h2>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-emerald-500 bg-emerald-50' : ''}`}
              >
                <input {...getInputProps()} />
                <p className="text-emerald-600">
                  {isDragActive
                    ? 'Drop the files here...'
                    : 'Drag & drop files here, or click to select'}
                </p>
              </div>
              {files.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-emerald-800 mb-2">Uploaded Files:</h3>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-emerald-600" />
                        <span className="text-sm text-emerald-700">{file.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-emerald-800 mb-4">Model Selection</h2>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="llama">Llama-3.1-PersianQA</option>
                <option value="deepseek">DeepSeek</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-emerald-800 mb-4">Ask a Question</h2>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => SpeechRecognition.startListening()}
                  className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
                >
                  <Mic className={`w-5 h-5 ${listening ? 'text-red-500' : 'text-emerald-600'}`} />
                </button>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows={3}
                  placeholder="Type your medical question here..."
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Get Answer'}
              </button>
            </div>

            {answer && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-emerald-800">Answer:</h3>
                  <button
                    onClick={() => speak(answer)}
                    disabled={isSpeaking}
                    className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
                  >
                    <Volume2 className="w-5 h-5 text-emerald-600" />
                  </button>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-800 whitespace-pre-wrap">{answer}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;