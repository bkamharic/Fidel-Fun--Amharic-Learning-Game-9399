import React from 'react';
import {motion} from 'framer-motion';
import KeyboardButton from './KeyboardButton';
import {baseConsonants} from '../data/amharicData';

const MainKeyboard=({onConsonantClick,highlightedConsonant,onSpace})=> {
  return (
    <motion.div
      initial={{y: 20,opacity: 0}}
      animate={{y: 0,opacity: 1}}
      transition={{delay: 0.2}}
      className="bg-white/98 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-[#E63946] border-opacity-20"
    >
      <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 gap-2 sm:gap-3 max-w-5xl mx-auto mb-4">
        {baseConsonants.map((consonant,index)=> (
          <KeyboardButton
            key={index}
            index={index} // Pass index for color cycling
            character={consonant.base}
            onClick={()=> onConsonantClick(consonant)}
            isHighlighted={highlightedConsonant===consonant.base}
            size="normal"
          />
        ))}
      </div>

      {/* Spacebar Row - Enhanced contrast */}
      <div className="max-w-2xl mx-auto mt-2">
        <motion.button
          whileTap={{scale: 0.98,y: 2}}
          onClick={onSpace}
          className="w-full h-14 bg-gradient-to-r from-gray-50 to-gray-100 border-b-4 border-[#E63946] rounded-xl text-gray-800 font-bold text-lg tracking-widest hover:from-gray-100 hover:to-gray-200 active:border-b-0 active:mt-1 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          SPACE
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MainKeyboard;