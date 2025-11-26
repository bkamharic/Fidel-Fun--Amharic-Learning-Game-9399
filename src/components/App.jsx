import React,{useState} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import TextDisplay from './components/TextDisplay';
import MainKeyboard from './components/MainKeyboard';
import NumeralKeyboard from './components/NumeralKeyboard';
import ExplosionModal from './components/ExplosionModal';
import GameMode from './components/GameMode';
import InstructionsModal from './components/InstructionsModal';
import SafeIcon from './common/SafeIcon';
import {useAudio} from './hooks/useAudio';
import * as FiIcons from 'react-icons/fi';

const {FiGrid,FiHash,FiGamepad,FiHelpCircle}=FiIcons;

function App() {
  const [currentText,setCurrentText]=useState('');
  const [mode,setMode]=useState('free');// 'free' or 'game'
  const [keyboardType,setKeyboardType]=useState('letters');// 'letters' or 'numbers' (only for free mode)
  const [selectedConsonant,setSelectedConsonant]=useState(null);
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [showInstructions,setShowInstructions]=useState(false);
  const {playCharacterSound,speakText}=useAudio();

  const handleConsonantClick=(consonant)=> {
    setSelectedConsonant(consonant);
    setIsModalOpen(true);
  };

  const handleCharacterSelect=(character)=> {
    setCurrentText(prev=> prev + character);
    playCharacterSound(character);
    setIsModalOpen(false);
    setSelectedConsonant(null);
  };

  const handleSpace=()=> {
    setCurrentText(prev=> prev + ' ');
  };

  const handleNumeralClick=(numeral)=> {
    setCurrentText(prev=> prev + numeral);
    playCharacterSound(numeral);
  };

  const clearText=()=> setCurrentText('');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#E63946]/50">
      
      {/* Top Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white shadow-xl sticky top-0 z-40 border-b-4 border-[#E63946]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#E63946] to-[#D62839] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-2xl">
            ፊ
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">Fidel Fun</h1>
            <p className="text-xs text-gray-800 font-medium">Interactive Learning</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={()=> setShowInstructions(true)}
             className="p-2 text-gray-600 hover:text-[#E63946] transition-colors"
             title="How to use"
           >
             <SafeIcon icon={FiHelpCircle} className="text-2xl" />
           </button>
           
           <button
            onClick={()=> {
              setMode(mode==='free' ? 'game' : 'free');
              clearText();
            }}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-[4px]
              ${mode==='game' 
                ? 'bg-[#2A9D8F] text-white shadow-[#1E7A6F] hover:bg-[#1E7A6F]' 
                : 'bg-[#FFD60A] text-gray-900 shadow-[#FFC300] hover:bg-[#FFC300]'}
            `}
          >
            <SafeIcon icon={mode==='free' ? FiGamepad : FiGrid} className="text-lg" />
            {mode==='free' ? 'Word Builder' : 'Free Play'}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 pb-32">
        
        {/* Writing Board (Always visible in Free Mode,hidden/managed in Game Mode) */}
        {mode==='free' && (
          <>
            <TextDisplay
              text={currentText}
              onClear={clearText}
              onSpeak={()=> speakText(currentText)}
              onCopy={()=> navigator.clipboard.writeText(currentText)}
            />

            {/* Mode Toggles */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={()=> setKeyboardType('letters')}
                className={`
                  px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all border-b-4
                  ${keyboardType==='letters'
                    ? 'bg-[#2A9D8F] border-[#1E7A6F] text-white shadow-lg'
                    : 'bg-white border-gray-400 text-gray-800 hover:bg-gray-50'}
                `}
              >
                <SafeIcon icon={FiGrid} />
                ፊደል
              </button>
              <button
                onClick={()=> setKeyboardType('numbers')}
                className={`
                  px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all border-b-4
                  ${keyboardType==='numbers'
                    ? 'bg-[#FFD60A] border-[#FFC300] text-gray-900 shadow-lg'
                    : 'bg-white border-gray-400 text-gray-800 hover:bg-gray-50'}
                `}
              >
                <SafeIcon icon={FiHash} />
                Numbers
              </button>
            </div>

            {/* Keyboards */}
            <div className="relative">
              {keyboardType==='letters' ? (
                <MainKeyboard 
                  onConsonantClick={handleConsonantClick}
                  onSpace={handleSpace}
                />
              ) : (
                <NumeralKeyboard 
                   onNumeralClick={handleNumeralClick} 
                   onSpace={handleSpace}
                />
              )}
            </div>
          </>
        )}

        {/* Game Mode Interface */}
        {mode==='game' && (
          <GameMode
            currentText={currentText}
            onCharacterInput={handleCharacterSelect}
            onTextClear={clearText}
            onConsonantClick={handleConsonantClick}
          />
        )}
      </main>

      {/* Modals */}
      <ExplosionModal
        isOpen={isModalOpen}
        onClose={()=> setIsModalOpen(false)}
        consonantFamily={selectedConsonant}
        onCharacterSelect={handleCharacterSelect}
      />

      <InstructionsModal 
        isOpen={showInstructions} 
        onClose={()=> setShowInstructions(false)} 
      />

    </div>
  );
}

export default App;