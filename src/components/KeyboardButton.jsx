import React from 'react';
import {motion} from 'framer-motion';

const KeyboardButton=({character,onClick,isHighlighted,size='normal',className='',index=0})=> {
  const sizeClasses={
    small: 'w-10 h-12 text-lg',
    normal: 'w-12 h-14 sm:w-14 sm:h-16 text-xl sm:text-2xl',
    large: 'w-16 h-20 text-3xl'
  };

  // Enhanced color palette with higher contrast
  // 0: Bright Red, 1: Sunshine Yellow, 2: Forest Green, 3: Sunrise Orange
  const colorVariant=index % 4;
  
  const baseStyles=`
    ${sizeClasses[size]} rounded-2xl font-bold transition-all duration-100 active:border-b-0 active:translate-y-1 flex items-center justify-center shadow-xl
  `;

  const getColorStyles=()=> {
    if (isHighlighted) {
      return 'ring-4 ring-[#E63946] bg-[#E63946]/30 border-b-4 border-[#E63946] text-gray-900 scale-110 z-10 shadow-2xl';
    }
    switch (colorVariant) {
      case 0: // Bright Red - Enhanced contrast
        return 'bg-[#E63946]/30 text-[#E63946] border-b-4 border-[#E63946] hover:bg-[#E63946]/40 hover:border-[#D62839] hover:scale-105';
      case 1: // Sunshine Yellow - Enhanced contrast
        return 'bg-[#FFD60A]/40 text-[#B8860B] border-b-4 border-[#FFC300] hover:bg-[#FFD60A]/50 hover:border-[#B8860B] hover:scale-105';
      case 2: // Forest Green - Enhanced contrast
        return 'bg-[#2A9D8F]/30 text-[#1E7A6F] border-b-4 border-[#1E7A6F] hover:bg-[#2A9D8F]/40 hover:border-[#1E7A6F] hover:scale-105';
      case 3: // Sunrise Orange - Enhanced contrast
        return 'bg-[#FF7043]/30 text-[#D84315] border-b-4 border-[#FF7043] hover:bg-[#FF7043]/40 hover:border-[#D84315] hover:scale-105';
      default:
        return 'bg-white text-gray-800 border-b-4 border-gray-400 hover:bg-gray-100';
    }
  };

  return (
    <motion.button
      onClick={()=> onClick(character)}
      className={`${baseStyles} ${getColorStyles()} ${className}`}
      whileHover={{y: -3}}
      whileTap={{scale: 0.95}}
    >
      {character}
    </motion.button>
  );
};

export default KeyboardButton;