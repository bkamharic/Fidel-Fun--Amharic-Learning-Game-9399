import React from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import *as FiIcons from 'react-icons/fi';

const {FiAward,FiStar,FiCheck,FiDownload,FiRotateCw}=FiIcons;

const CertificateModal=({isOpen,onClose,score,wordsCompleted})=> {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        >
          <motion.div
            initial={{scale: 0.5,y: 100,rotate: -5}}
            animate={{scale: 1,y: 0,rotate: 0}}
            exit={{scale: 0.5,y: 100}}
            transition={{type: "spring",bounce: 0.5}}
            className="bg-white rounded-3xl p-1 max-w-2xl w-full shadow-2xl relative overflow-hidden border-4 border-[#E63946]"
          >
            {/* Confetti Decoration Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-10 left-10 text-5xl text-[#E63946]">★</div>
              <div className="absolute top-20 right-20 text-6xl text-[#2A9D8F]">★</div>
              <div className="absolute bottom-10 left-1/3 text-7xl text-[#FFD60A]">★</div>
            </div>

            {/* Certificate Border - Enhanced contrast */}
            <div className="border-[12px] border-double border-[#E63946] rounded-[20px] p-8 text-center bg-gradient-to-br from-white to-gray-50 h-full flex flex-col items-center">
              <motion.div
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{delay: 0.3,type: "spring"}}
                className="w-24 h-24 bg-gradient-to-r from-[#E63946] to-[#D62839] rounded-full flex items-center justify-center mb-6 border-4 border-[#E63946] shadow-2xl"
              >
                <SafeIcon icon={FiAward} className="text-6xl text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2 font-serif">Certificate of Completion</h2>
              <p className="text-xl text-gray-800 mb-8 italic font-medium">This is to certify that</p>
              <div className="w-full border-b-4 border-[#E63946] border-opacity-40 mb-8 pb-2">
                <p className="text-3xl font-bold text-[#E63946] font-handwriting">Super Student</p>
              </div>
              <p className="text-lg text-gray-900 font-medium mb-6">
                Has successfully mastered <span className="font-bold text-[#E63946]">{wordsCompleted} Amharic Words</span>!
              </p>
              <div className="flex gap-4 mb-8">
                <div className="bg-gradient-to-r from-[#2A9D8F] to-[#1E7A6F] px-6 py-3 rounded-xl shadow-lg">
                  <p className="text-sm text-white font-bold uppercase">Score</p>
                  <p className="text-3xl font-bold text-white">{score}</p>
                </div>
                <div className="bg-gradient-to-r from-[#FFD60A] to-[#FFC300] px-6 py-3 rounded-xl shadow-lg">
                  <p className="text-sm text-gray-900 font-bold uppercase">Rating</p>
                  <div className="flex text-[#E63946] text-xl mt-1">
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
                  className="flex-1 bg-gradient-to-r from-[#E63946] to-[#D62839] text-white font-bold py-4 rounded-xl shadow-lg hover:from-[#D62839] hover:to-[#B71C1C] transition-all flex items-center justify-center gap-2"
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