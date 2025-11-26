import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiCheckCircle, FiMousePointer, FiVolume2 } = FiIcons;

const InstructionsModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#009A44] p-6 text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">እንዴት ይጠቀሙ (How to Use)</h2>
              <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                <SafeIcon icon={FiX} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                  <SafeIcon icon={FiMousePointer} className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">1. Tap a Base Letter</h3>
                  <p className="text-gray-500">Choose a main letter (like ሀ) from the keyboard.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <SafeIcon icon={FiCheckCircle} className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">2. Select the Sound</h3>
                  <p className="text-gray-500">Pick the specific vowel sound (like ሁ or ሂ) from the pop-up.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-full text-red-600">
                  <SafeIcon icon={FiVolume2} className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">3. Listen & Learn</h3>
                  <p className="text-gray-500">Tap "Read Aloud" to hear your word spoken!</p>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg mt-4 hover:scale-[1.02] transition-transform"
              >
                Start Learning / ጀምር
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstructionsModal;