'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AudioUploader from './components/AudioUploader';
import AudioPlayer from './components/AudioPlayer';

export default function Home() {
  const [showUploader, setShowUploader] = useState(false);
  const [audioFiles, setAudioFiles] = useState<Array<{ name: string; url: string }>>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const savedFiles = localStorage.getItem('audioFiles');
    if (savedFiles) {
      setAudioFiles(JSON.parse(savedFiles));
    }
  }, []);

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    const newFiles = [...audioFiles, { name: file.name, url }];
    setAudioFiles(newFiles);
    localStorage.setItem('audioFiles', JSON.stringify(newFiles));
    setShowUploader(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 transition-all duration-500">
      <main className="container mx-auto px-4 sm:px-6 py-12 animate-fadeIn">
        <div 
          className="text-center mb-16 hover:transform hover:scale-105 transition-all duration-300 group relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-pulse tracking-tight">
            音频分享空间
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </h1>
          <p className={`text-2xl ${isHovered ? 'text-green-400' : 'text-gray-400'} transition-colors duration-300 group-hover:text-green-400 font-light tracking-wide`}>
            分享你的声音，连接世界
          </p>
        </div>

        {showUploader ? (
          <div className="max-w-2xl mx-auto mb-8">
            <AudioUploader onUpload={handleUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slideIn">
            {audioFiles.map((audio, index) => (
              <div className="relative rounded-2xl bg-gray-800/50 backdrop-blur-md p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-700/50 hover:border-green-400/30 group overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-all duration-500"></div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button className="p-2 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                      <line x1="4" y1="22" x2="4" y2="15"></line>
                    </svg>
                  </button>
                </div>
                <AudioPlayer
                key={index}
                src={audio.url}
                title={audio.name}
                onDelete={() => {
                  const newFiles = audioFiles.filter((_, i) => i !== index);
                  setAudioFiles(newFiles);
                  localStorage.setItem('audioFiles', JSON.stringify(newFiles));
                  URL.revokeObjectURL(audio.url);
                }}
              />
            </div>
            ))}
            {audioFiles.length === 0 && (
              <div 
                className="bg-gray-800/50 backdrop-blur-md shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-700/50 hover:border-green-400/30 cursor-pointer group"
                onClick={() => setShowUploader(true)}
              >
                <div className="mb-4">
                  <div className="w-full h-48 bg-gray-700/30 rounded-2xl flex items-center justify-center group-hover:bg-gray-700/50 transition-colors duration-300">
                    <Image
                      src="/audio-wave.svg"
                      alt="Audio waveform"
                      width={120}
                      height={120}
                      className="opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">开始上传</h3>
                <p className="text-gray-400 text-sm">点击此处或右下角按钮上传你的第一个音频</p>
              </div>
            )}
          </div>
        )}

        <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={() => setShowUploader(!showUploader)}
            className="relative bg-gradient-to-br from-green-400 to-blue-500 text-white rounded-full p-5 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 transform hover:rotate-180 group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-blue-500 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
