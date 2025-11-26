import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vocabularyWords, baseConsonants } from '../data/amharicData';
import KeyboardButton from './KeyboardButton';
import CertificateModal from './CertificateModal';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiRefreshCw, FiStar, FiHelpCircle } = FiIcons;

const GameMode = ({ onCharacterInput, currentText, onTextClear, onConsonantClick }) => {
  const [currentWord, setCurrentWord] = useState(null);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [gameState, setGameState] = useState('waiting');
  const [score, setScore] = useState(0);
  const [wordsCompletedCount, setWordsCompletedCount] = useState(0);
  const [requiredBases, setRequiredBases] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [completedWordsList, setCompletedWordsList] = useState([]);

  // Target number of words to get a certificate
  const WORDS_TO_WIN = 5;

  const startNewWord = () => {
    // Filter out words already completed in this session to avoid repetition until all are done
    const availableWords = vocabularyWords.filter(w => !completedWordsList.includes(w.id));
    
    // If we ran out of words or hit the win target
    if (wordsCompletedCount > 0 && wordsCompletedCount % WORDS_TO_WIN === 0 && gameState === 'success') {
      setShowCertificate(true);
      return;
    }

    // Reset if we used all words
    const pool = availableWords.length > 0 ? availableWords : vocabularyWords;
    if (availableWords.length === 0) setCompletedWordsList([]);

    const randomWord = pool[Math.floor(Math.random() * pool.length)];
    setCurrentWord(randomWord);
    setCurrentCharIndex(0);
    setGameState('playing');
    onTextClear();

    // Calculate required base consonants
    const bases = new Set();
    randomWord.characters.forEach(char => {
      const base = baseConsonants.find(b => b.family.includes(char));
      if (base) bases.add(base);
    });
    
    // Add a few random distractions to make it slightly challenging but not too hard
    while (bases.size < Math.min(bases.size + 4, 12)) {
      const randomBase = baseConsonants[Math.floor(Math.random() * baseConsonants.length)];
      bases.add(randomBase);
    }
    
    setRequiredBases(Array.from(bases).sort((a, b) => a.base.localeCompare(b.base)));
  };

  const resetGame = () => {
    setScore(0);
    setWordsCompletedCount(0);
    setCompletedWordsList([]);
    setShowCertificate(false);
    startNewWord();
  };

  const getHint = () => {
    if (!currentWord) return null;
    const targetChar = currentWord.characters[currentCharIndex];
    const consonant = baseConsonants.find(c => c.family.includes(targetChar));
    return consonant ? { base: consonant.base, index: consonant.family.indexOf(targetChar) } : null;
  };

  useEffect(() => {
    if (currentWord && gameState === 'playing') {
      const expectedText = currentWord.characters.slice(0, currentCharIndex + 1).join('');
      
      if (currentText === currentWord.word) {
        setGameState('success');
        setScore(s => s + 10);
        setWordsCompletedCount(c => c + 1);
        setCompletedWordsList(prev => [...prev, currentWord.id]);
        
        // Delay before next word or certificate
        setTimeout(startNewWord, 2000);
        
      } else if (currentText.length > expectedText.length && currentText !== expectedText) {
         onTextClear();
         setCurrentCharIndex(0);
      } else if (currentText === expectedText) {
        if (currentCharIndex < currentWord.characters.length - 1) {
          setCurrentCharIndex(i => i + 1);
        }
      }
    }
  }, [currentText, currentWord]);

  const hint = getHint();

  return (
    <div className="flex flex-col h-full relative">
      <CertificateModal 
        isOpen={showCertificate} 
        onClose={resetGame}
        score={score}
        wordsCompleted={wordsCompletedCount}
      />

      {/* Game Header Area */}
      <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl border-b-8 border-purple-100 mb-6 mx-4">
        <div className="flex justify-between items-start mb-6">
          <div>
             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <SafeIcon icon={FiTarget} />
              </span>
              Word Builder
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-gray-500 text-sm">Level Progress:</p>
              <div className="flex gap-1">
                {[...Array(WORDS_TO_WIN)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 w-6 rounded-full ${i < (wordsCompletedCount % WORDS_TO_WIN) ? 'bg-green-500' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-yellow-100 px-4 py-2 rounded-xl border-2 border-yellow-200">
                <span className="text-xs font-bold text-yellow-600 uppercase">Score</span>
                <div className="text-xl font-bold text-yellow-800">{score}</div>
             </div>
             <button onClick={startNewWord} className="p-3 bg-gray-100 rounded-xl hover:bg-purple-100 text-gray-500 hover:text-purple-600 transition-colors">
               <SafeIcon icon={FiRefreshCw} />
             </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {gameState === 'waiting' ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <button
                onClick={startNewWord}
                className="bg-purple-500 hover:bg-purple-600 text-white text-xl font-bold py-4 px-12 rounded-2xl shadow-[0_6px_0_rgb(107,33,168)] active:shadow-none active:translate-y-[6px] transition-all"
              >
                Start Challenge
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-8 text-center sm:text-left">
                 <h1 className="text-5xl font-bold text-purple-600">{currentWord?.word}</h1>
                 <div className="pb-2">
                    <p className="text-xl font-bold text-gray-700">{currentWord?.translation}</p>
                 </div>
              </div>

              {/* Progress Boxes */}
              <div className="flex gap-3 mb-4 flex-wrap justify-center">
                {currentWord?.characters.map((char, idx) => (
                  <div key={idx} 
                    className={`
                      w-14 h-16 rounded-xl flex items-center justify-center text-2xl font-bold border-b-4 transition-all
                      ${idx < currentCharIndex ? 'bg-green-100 border-green-400 text-green-700' : 
                        idx === currentCharIndex ? 'bg-white border-purple-400 text-purple-600 ring-2 ring-purple-200 scale-110' : 
                        'bg-gray-50 border-gray-200 text-gray-300'}
                    `}
                  >
                    {idx <= currentCharIndex && gameState !== 'waiting' ? (
                         idx < currentCharIndex || gameState === 'success' ? char : '?' 
                    ) : '?'}
                  </div>
                ))}
              </div>
              
              {gameState === 'success' && !showCertificate && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-green-600 font-bold text-xl mt-4">
                  <SafeIcon icon={FiStar} className="text-yellow-400 fill-current text-2xl" />
                  Great Job!
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Limited Keyboard for Game */}
      {gameState === 'playing' && (
        <div className="mt-auto bg-purple-50 rounded-t-3xl p-6 border-t border-purple-100">
           <h3 className="text-center text-purple-800 font-bold mb-4 text-sm uppercase tracking-wider">Available Letters</h3>
           <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
             {requiredBases.map((consonant, idx) => (
               <KeyboardButton
                 key={idx}
                 index={idx} // Pass index for color
                 character={consonant.base}
                 onClick={() => onConsonantClick(consonant)}
                 isHighlighted={hint?.base === consonant.base}
                 size="normal"
                 className="bg-white"
               />
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default GameMode;