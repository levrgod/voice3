'use client';

import { useState, useRef } from 'react';

interface AudioUploaderProps {
  onUpload: (file: File) => void;
}

export default function AudioUploader({ onUpload }: AudioUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        onUpload(file);
      } else {
        alert('请上传音频文件');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        onUpload(file);
      } else {
        alert('请上传音频文件');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 hover-scale ${isDragging ? 'border-green-500 bg-green-50 animate-pulse' : 'border-gray-300 hover:border-green-400'} animate-fadeIn`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="audio/*"
        onChange={handleFileSelect}
      />
      <div className="text-center">
        <svg
          className={`mx-auto h-12 w-12 transition-all duration-300 ${isDragging ? 'text-green-500 scale-110' : 'text-gray-400'}`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M24 14v20m-10-10h20"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-600">
          {selectedFile ? selectedFile.name : '点击或拖拽音频文件到此处上传'}
        </p>
        <p className="mt-1 text-xs text-gray-500">支持 MP3, WAV 等格式</p>
      </div>
    </div>
  );
}