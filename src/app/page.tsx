'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AudioUploader from './components/AudioUploader';
import AudioPlayer from './components/AudioPlayer';

export default function Home() {
  const [showUploader, setShowUploader] = useState(false);
  const [audioFiles, setAudioFiles] = useState<Array<{ name: string; url: string }>>([]);

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
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white transition-all duration-500">
      <main className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="text-center mb-12 hover:transform hover:scale-105 transition-all duration-300">
          <h1 className="text-4xl font-bold text-green-900 mb-4">音频分享空间</h1>
          <p className="text-lg text-green-700">分享你的声音，连接世界</p>
        </div>

        {showUploader ? (
          <div className="max-w-2xl mx-auto mb-8">
            <AudioUploader onUpload={handleUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audioFiles.map((audio, index) => (
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
            ))}
            {audioFiles.length === 0 && (
              <div 
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-green-200 cursor-pointer"
                onClick={() => setShowUploader(true)}
              >
                <div className="mb-4">
                  <div className="w-full h-48 bg-green-50 rounded-md flex items-center justify-center">
                    <Image
                      src="/audio-wave.svg"
                      alt="Audio waveform"
                      width={120}
                      height={120}
                      className="opacity-60"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">开始上传</h3>
                <p className="text-gray-600 text-sm">点击此处或右下角按钮上传你的第一个音频</p>
              </div>
            )}
          </div>
        )}

        <div className="fixed bottom-8 right-8">
          <button 
            onClick={() => setShowUploader(!showUploader)}
            className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 transform hover:rotate-180"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
