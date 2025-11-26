import React from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiVolume2,FiDelete,FiCopy}=FiIcons;

const TextDisplay=({text,onClear,onSpeak,onCopy})=> {
  return (
    <div className="relative mb-8 group">
      {/* Paper/Board Background - Enhanced contrast */}
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-[#2A9D8F] border-opacity-30 overflow-hidden">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b-2 border-[#E63946] border-opacity-30 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E63946] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFD60A] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#2A9D8F] shadow-sm"></div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onSpeak} 
              className="p-2 bg-[#2A9D8F] text-white rounded-lg hover:bg-[#1E7A6F] transition-colors shadow-md" 
              title="Read Aloud"
            >
              <SafeIcon icon={FiVolume2} />
            </button>
            <button 
              onClick={onCopy} 
              className="p-2 bg-[#FFD60A] text-gray-900 rounded-lg hover:bg-[#FFC300] transition-colors shadow-md" 
              title="Copy"
            >
              <SafeIcon icon={FiCopy} />
            </button>
            <button 
              onClick={onClear} 
              className="p-2 bg-[#E63946] text-white rounded-lg hover:bg-[#D62839] transition-colors shadow-md" 
              title="Clear"
            >
              <SafeIcon icon={FiDelete} />
            </button>
          </div>
        </div>

        {/* Text Area - Enhanced contrast */}
        <div 
          className="min-h-[160px] p-6 text-5xl leading-relaxed text-gray-900 break-words"
          style={{
            fontFamily: 'Noto Sans Ethiopic,serif',
            background: 'linear-gradient(to bottom,white 39px,#F8F9FA 40px)',
            backgroundSize: '100% 40px'
          }}
        >
          {text ? (
            <span className="animate-in fade-in duration-300">{text}</span>
          ) : (
            <span className="text-gray-500 text-3xl font-sans select-none">
              Type something...
            </span>
          )}
          <span className="inline-block w-1 h-10 bg-[#E63946] ml-1 animate-pulse align-middle rounded-full shadow-sm"></span>
        </div>
      </div>
    </div>
  );
};

export default TextDisplay;