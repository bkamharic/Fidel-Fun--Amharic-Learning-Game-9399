import React from 'react';
import { motion } from 'framer-motion';
import KeyboardButton from './KeyboardButton';
import { ethiopicNumerals } from '../data/amharicData';

const NumeralKeyboard = ({ onNumeralClick, onSpace }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg border border-white/50"
    >
      <div className="grid grid-cols-5 gap-3 max-w-3xl mx-auto mb-6">
        {ethiopicNumerals.map((numeral, index) => (
          <div key={index} className="text-center">
            <KeyboardButton
              character={numeral.symbol}
              index={index} // Pass index for color cycling
              onClick={() => onNumeralClick(numeral.symbol)}
            />
            <p className="text-xs text-gray-500 mt-1 font-medium">{numeral.value}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-4">
        <motion.button
          whileTap={{ scale: 0.98, y: 2 }}
          onClick={onSpace}
          className="w-full h-14 bg-gray-50 border-b-4 border-gray-200 rounded-xl text-gray-400 font-bold text-lg tracking-widest hover:bg-gray-100 hover:border-gray-300 active:border-b-0 active:mt-1 transition-all shadow-sm flex items-center justify-center"
        >
          SPACE
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NumeralKeyboard;