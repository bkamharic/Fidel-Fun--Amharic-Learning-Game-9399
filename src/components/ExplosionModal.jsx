import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardButton from './KeyboardButton';
import { orderNames } from '../data/amharicData';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX } = FiIcons;

const ExplosionModal = ({ isOpen, onClose, consonantFamily, onCharacterSelect, highlightedIndex }) => {
  if (!consonantFamily) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-4xl border-b-8 border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-4xl font-bold text-green-700 shadow-inner">
                  {consonantFamily.base}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Family of {consonantFamily.base}
                  </h3>
                  <p className="text-gray-500 text-sm">Select a form</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-xl transition-colors"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 justify-center sm:justify-between items-center overflow-x-auto py-2">
              {consonantFamily.family.map((char, index) => (
                <div key={index} className="flex flex-col items-center min-w-[80px]">
                  <motion.button
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onCharacterSelect(char)}
                    className={`
                      w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-2
                      border-b-4 transition-all
                      ${highlightedIndex === index 
                        ? 'bg-yellow-100 border-yellow-400 text-yellow-900 ring-2 ring-yellow-300' 
                        : 'bg-white border-gray-200 text-gray-800 hover:border-green-400 hover:bg-green-50'}
                      shadow-lg
                    `}
                  >
                    <span className="text-3xl font-bold">{char}</span>
                    <span className="text-[10px] font-medium opacity-60 uppercase tracking-wider">
                      {orderNames[index].split(' ')[0]}
                    </span>
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExplosionModal;