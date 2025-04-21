/** @jsxImportSource preact */

import { useEffect, useRef } from "preact/hooks";

const Welcome = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        const playAudio = () => {
          const audio = audioRef.current;
          if (audio) {
            audio.volume = 0.4; // по желанию
            audio.play().catch((err) => {
              console.warn("err", err);
            });
          }
        };

        document.addEventListener('click', playAudio, { once: true });

        return () => {
            document.removeEventListener('click', playAudio);
        };
    }, []);
    return (
        <div
          class="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4 gap-[190px]"
          style={{
            backgroundImage: `url('/img/start/startBack-0.jpg')`,
          }}
        >
          <audio ref={audioRef} src="/audio/581.mp3" preload="auto" loop />
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
    
            {["Начать приключение", "Книга слов", "Карта глав", "Настройки"].map((text) => (
              <button
                key={text}
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