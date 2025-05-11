/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";

declare global {
  interface Window {
    bgMusic?: HTMLAudioElement;
  }
}

const Navigation = () => {
  const [musicOn, setMusicOn] = useState(true);

  useEffect(() => {
    // При монтировании читаем состояние из localStorage
    const saved = localStorage.getItem('musicOn');
    if (saved !== null) setMusicOn(saved === 'true');
  }, []);

  useEffect(() => {
    // Управляем музыкой при изменении состояния
    const audio = (window.bgMusic || document.getElementById('bg-music')) as HTMLAudioElement | null;
    if (audio) {
      if (musicOn) {
        audio.play().catch(() => {});
        audio.muted = false;
      } else {
        audio.muted = true;
      }
    }
    localStorage.setItem('musicOn', musicOn ? 'true' : 'false');
  }, [musicOn]);

  return (
    <nav class="bg-gray-800 text-white p-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" class="text-xl font-bold">WordFlow</a>
        <div class="space-x-4 flex items-center">
          <a href="/vocabulary" class="hover:text-yellow-400 transition-colors">
            Мой словарь
          </a>
          <button
            class="ml-4 text-2xl hover:text-yellow-400 transition-colors focus:outline-none"
            title={musicOn ? 'Выключить музыку' : 'Включить музыку'}
            onClick={() => setMusicOn((v) => !v)}
          >
            {musicOn ? '🔊' : '🔇'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 