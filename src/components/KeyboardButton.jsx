import React from 'react';
import { motion } from 'framer-motion';

const KeyboardButton = ({ character, onClick, isHighlighted, size = 'normal', className = '', index = 0 }) => {
  const sizeClasses = {
    small: 'w-10 h-12 text-lg',
    normal: 'w-12 h-14 sm:w-14 sm:h-16 text-xl sm:text-2xl',
    large: 'w-16 h-20 text-3xl'
  };

  // Ethiopian Flag Color Palette Distribution
  // 0: Green, 1: Yellow, 2: Red
  const colorVariant = index % 3;

  const baseStyles = `
    ${sizeClasses[size]}
    rounded-2xl font-bold
    transition-all duration-100
    active:border-b-0 active:translate-y-1
    flex items-center justify-center
    shadow-sm
  `;

  // Dynamic color assignment based on index
  const getColorStyles = () => {
    if (isHighlighted) {
      return 'ring-4 ring-yellow-400 bg-yellow-100 border-b-4 border-yellow-500 text-yellow-900 scale-110 z-10';
    }
    
    switch (colorVariant) {
      case 0: // Green Theme
        return 'bg-green-50 text-green-800 border-b-4 border-green-200 hover:bg-green-100 hover:border-green-300';
      case 1: // Yellow Theme
        return 'bg-yellow-50 text-yellow-800 border-b-4 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300';
      case 2: // Red Theme
        return 'bg-red-50 text-red-800 border-b-4 border-red-200 hover:bg-red-100 hover:border-red-300';
      default:
        return 'bg-white text-gray-700 border-b-4 border-gray-200 hover:bg-gray-50';
    }
  };

  return (
    <motion.button
      onClick={() => onClick(character)}
      className={`${baseStyles} ${getColorStyles()} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {character}
    </motion.button>
  );
};

export default KeyboardButton;