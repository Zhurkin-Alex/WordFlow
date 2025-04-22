/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { getGameData, saveGameData } from "../lib/storage";

interface Scene {
  text: string;
  words: string[];
}

interface Chapter {
  id: number;
  title: string;
  scenes: Scene[];
}

const ChapterScreen = ({ chapter }: { chapter: Chapter }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [knownWords, setKnownWords] = useState<string[]>([]);
  const scene = chapter.scenes[sceneIndex];

  if (!chapter?.scenes) {
    return <div class="text-white p-6">⚠️ Scene not found</div>;
  }

  useEffect(() => {
    const game = getGameData();
    const known = Object.keys(game.knownWords || {});
    setKnownWords(known);
  }, []);

  const handleWordClick = (word: string) => {
    const game = getGameData();
    game.knownWords[word] = {
      learned: false,
      shownTimes: (game.knownWords[word]?.shownTimes || 0) + 1,
    };
    saveGameData(game);
    setKnownWords(Object.keys(game.knownWords));
  };

  const handleNext = () => {
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

  return (
    <div class="min-h-screen bg-cover bg-center text-white px-4 py-8 flex flex-col justify-center items-center"
         style={{ backgroundImage: `url('/images/cupboard-scene.jpg')` }}>
      <div class="max-w-xl text-center text-xl bg-black/40 p-6 rounded-lg backdrop-blur-md">
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

      <button
        class="mt-10 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-xl transition-all"
        onClick={handleNext}
      >
        {sceneIndex + 1 < chapter.scenes.length ? "Продолжить" : "Следующая глава"}
      </button>
    </div>
  );
};

export default ChapterScreen;
