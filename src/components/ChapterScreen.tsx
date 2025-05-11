/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { getGameData, saveGameData } from "../lib/storage";
import WordModal from "./WordModal";

interface Scene {
  text: string;
  words: string[];
}

interface Chapter {
  id: number;
  title: string;
  scenes: Scene[];
  image?: string;
}

const ChapterScreen = ({ chapter }: { chapter: Chapter }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [knownWords, setKnownWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const scene = chapter.scenes[sceneIndex];

  if (!chapter?.scenes) {
    return <div class="text-white p-6">⚠️ Scene not found</div>;
  }

  useEffect(() => {
    const game = getGameData();
    const known = Object.keys(game.knownWords || {});
    setKnownWords(known);
  }, []);

  useEffect(() => {
    const updateVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    // Плавно уменьшить громкость музыки до 0.5
    const audio = window.document.getElementById('bg-music') as HTMLAudioElement | null;
    if (audio) {
      const start = audio.volume;
      const end = 0.5;
      const duration = 600; // мс
      const steps = 20;
      let currentStep = 0;
      const step = (start - end) / steps;
      const fade = () => {
        if (currentStep < steps) {
          audio.volume = Math.max(end, start - step * currentStep);
          currentStep++;
          setTimeout(fade, duration / steps);
        } else {
          audio.volume = end;
        }
      };
      fade();
    }
  }, []);

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
  };

  const handleNext = () => {
    setTranslation("");
    if (sceneIndex + 1 < chapter.scenes.length) {
      setSceneIndex(sceneIndex + 1);
    } else {
      const game = getGameData();
      game.currentChapter = chapter.id + 1;
      game.currentScene = 0;
      game.completedChapters = [...new Set([...(game.completedChapters || []), chapter.id])];
      saveGameData(game);
      window.location.href = `/chapter/${game.currentChapter}`;
    }
  };

  const handleReadAloud = () => {
    if (scene?.text) {
      const utterance = new window.SpeechSynthesisUtterance(scene.text);
      // Найти Google-голос (en), иначе первый en, иначе первый доступный
      let voice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'))
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0];
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTranslate = async () => {
    if (!scene?.text) return;
    setIsTranslating(true);
    setTranslation("");
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(scene.text)}&langpair=en|ru`
      );
      const data = await response.json();
      setTranslation(data.responseData.translatedText);
    } catch (e) {
      setTranslation("Ошибка перевода");
    }
    setIsTranslating(false);
  };

  return (
    <div
      class="min-h-screen bg-cover bg-center text-white px-4 py-8 flex flex-col justify-center items-center"
      style={{ backgroundImage: `url('${chapter.image || "/images/cupboard-scene.jpg"}')` }}>
      <div class="max-w-xl text-center text-xl bg-black/40 p-6 rounded-lg backdrop-blur-md flex flex-wrap">
        {scene.text.split(" ").map((word, idx) => {
          const clean = word.replace(/[.,!?]/g, "");
          const isWord = scene.words.includes(clean);
          return (
            <span
              key={idx}
              class={`mx-1 ${isWord ? "cursor-pointer underline decoration-yellow-400 hover:text-yellow-300" : ""}`}
              onClick={() => isWord && handleWordClick(clean)}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Кнопки Read и Translate */}
      <div class="flex gap-4 mt-6">
        <button
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-xl shadow transition-all text-lg"
          onClick={handleReadAloud}
        >
          <span role="img" aria-label="Read">🔊</span> Read
        </button>
        <button
          class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-5 rounded-xl shadow transition-all text-lg disabled:opacity-60"
          onClick={handleTranslate}
          disabled={isTranslating}
        >
          <span role="img" aria-label="Translate">🌐</span> Translate
          {isTranslating && (
            <svg class="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Перевод */}
      {translation && (
        <div class="max-w-xl text-center text-lg bg-emerald-100/80 text-emerald-900 mt-6 p-4 rounded-xl shadow border border-emerald-200">
          {translation}
        </div>
      )}

      <button
        class="mt-10 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-xl transition-all"
        onClick={handleNext}
      >
        {sceneIndex + 1 < chapter.scenes.length ? "Продолжить" : "Следующая глава"}
      </button>

      {selectedWord && (
        <WordModal
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  );
};

export default ChapterScreen;
