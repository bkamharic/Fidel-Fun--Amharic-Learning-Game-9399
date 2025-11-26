import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAward, FiStar, FiCheck, FiDownload, FiRotateCw } = FiIcons;

const CertificateModal = ({ isOpen, onClose, score, wordsCompleted }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        >
          <motion.div
            initial={{ scale: 0.5, y: 100, rotate: -5 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.5, y: 100 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-white rounded-3xl p-1 max-w-2xl w-full shadow-2xl relative overflow-hidden"
          >
            {/* Confetti Decoration Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 text-4xl text-red-500">★</div>
              <div className="absolute top-20 right-20 text-5xl text-yellow-500">★</div>
              <div className="absolute bottom-10 left-1/3 text-6xl text-green-500">★</div>
            </div>

            {/* Certificate Border */}
            <div className="border-[10px] border-double border-yellow-400 rounded-[20px] p-8 text-center bg-gradient-to-br from-white to-yellow-50 h-full flex flex-col items-center">
              
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} 
                transition={{ delay: 0.3, type: "spring" }}
                className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6 border-4 border-yellow-300 shadow-xl"
              >
                <SafeIcon icon={FiAward} className="text-6xl text-yellow-600" />
              </motion.div>

              <h2 className="text-4xl font-bold text-gray-800 mb-2 font-serif">Certificate of Completion</h2>
              <p className="text-xl text-gray-500 mb-8 italic">This is to certify that</p>
              
              <div className="w-full border-b-2 border-gray-300 mb-8 pb-2">
                <p className="text-3xl font-bold text-green-600 font-handwriting">Super Student</p>
              </div>

              <p className="text-lg text-gray-600 mb-6">
                Has successfully mastered <span className="font-bold text-purple-600">{wordsCompleted} Amharic Words</span>!
              </p>

              <div className="flex gap-4 mb-8">
                <div className="bg-green-100 px-6 py-3 rounded-xl border-2 border-green-200">
                  <p className="text-sm text-green-600 font-bold uppercase">Score</p>
                  <p className="text-3xl font-bold text-green-800">{score}</p>
                </div>
                <div className="bg-blue-100 px-6 py-3 rounded-xl border-2 border-blue-200">
                  <p className="text-sm text-blue-600 font-bold uppercase">Rating</p>
                  <div className="flex text-yellow-500 text-xl mt-1">
                    <SafeIcon icon={FiStar} className="fill-current" />
                    <SafeIcon icon={FiStar} className="fill-current" />
                    <SafeIcon icon={FiStar} className="fill-current" />
                    <SafeIcon icon={FiStar} className="fill-current" />
                    <SafeIcon icon={FiStar} className="fill-current" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={onClose}
                  className="flex-1 bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                >
                  <SafeIcon icon={FiRotateCw} />
                  Play Again
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;