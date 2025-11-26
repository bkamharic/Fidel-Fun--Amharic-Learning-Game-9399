import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiVolume2, FiDelete, FiCopy } = FiIcons;

const TextDisplay = ({ text, onClear, onSpeak, onCopy }) => {
  return (
    <div className="relative mb-8 group">
      {/* Paper/Board Background */}
      <div className="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
        
        {/* Top Bar */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex gap-2">
            <button
               onClick={onSpeak}
               className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
               title="Read Aloud"
             >
               <SafeIcon icon={FiVolume2} />
             </button>
             <button
               onClick={onCopy}
               className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
               title="Copy"
             >
               <SafeIcon icon={FiCopy} />
             </button>
             <button
               onClick={onClear}
               className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
               title="Clear"
             >
               <SafeIcon icon={FiDelete} />
             </button>
          </div>
        </div>

        {/* Text Area */}
        <div 
          className="min-h-[160px] p-6 text-5xl leading-relaxed text-gray-800 break-words"
          style={{ 
            fontFamily: 'Noto Sans Ethiopic, serif',
            background: 'linear-gradient(to bottom, transparent 39px, #f0f4f8 40px)',
            backgroundSize: '100% 40px'
          }}
        >
          {text ? (
            <span className="animate-in fade-in duration-300">{text}</span>
          ) : (
            <span className="text-gray-300 text-3xl font-sans select-none opacity-50">
              Type something...
            </span>
          )}
          <span className="inline-block w-1 h-10 bg-green-500 ml-1 animate-pulse align-middle rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default TextDisplay;