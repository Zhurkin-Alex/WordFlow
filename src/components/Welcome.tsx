/** @jsxImportSource preact */

import { useEffect, useRef, useState } from "preact/hooks";
import { getGameData, saveGameData } from "../lib/storage";
import ChapterMapModal from "./ChapterMapModal";

const Welcome = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [showMap, setShowMap] = useState(false);

    const handleStart = () => {
      setShowMap(true);
    };
  
    useEffect(() => {
        const audio = window.document.getElementById('bg-music') as HTMLAudioElement | null;
        if (audio) {
          audio.volume = 1;
          audio.play().catch(() => {});
        }
    }, []);

    // const handleStart = () => {
    //     const game = getGameData();
    //     if (!game.currentChapter) {
    //       game.currentChapter = 1;
    //       game.currentScene = 0;
    //       saveGameData(game);
    //     }
      
    //     window.location.href = `/chapter/${game.currentChapter}`;
    //   };
    return (
        <div
          class="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4 gap-[190px]"
          style={{
            backgroundImage: `url('/img/start/startBack-0.jpg')`,
          }}
        >
          {showMap && <ChapterMapModal onClose={() => setShowMap(false)} />}
          <h1
            class="text-4xl md:text-5xl font-bold mb-2
                    bg-gradient-to-r from-pink-300 via-purple-400 to-blue-400
                    bg-[length:200%_200%] bg-clip-text text-transparent
                    animate-gradientFlow text-glow animate-glow"
            >
            ESCAPE THE WORD LAB
          </h1>
          <div class="w-full max-w-xs space-y-4">
          <p class="text-white/80 mb-8">ГЛАВА 1 ИЗ 12</p>
    
            {["Начать приключение", "Книга слов", "Карта глав", "Настройки"].map((text, index) => (
              <button
                key={text}
                onClick={index === 0 ? handleStart : undefined}
                class="w-full py-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white text-lg font-medium hover:bg-white/20 hover:scale-105 transition-all duration-200"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      );
  };
  
export default Welcome;