/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import { getGameData, saveGameData } from "../lib/storage";

interface WordModalProps {
  word: string;
  onClose: () => void;
}

const WordModal = ({ word, onClose }: WordModalProps) => {
  const [translation, setTranslation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement translation API call
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|ru`);
      const data = await response.json();
      setTranslation(data.responseData.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
    setIsLoading(false);
  };

  const handlePronounce = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleAddToVocabulary = () => {
    const game = getGameData();
    game.knownWords[word] = {
      learned: false,
      shownTimes: (game.knownWords[word]?.shownTimes || 0) + 1,
    };
    saveGameData(game);
    onClose();
  };

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 class="text-2xl font-bold mb-4">{word}</h2>
        
        <div class="space-y-4">
          <button
            onClick={handleTranslate}
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Translating..." : "Translate"}
          </button>
          
          {translation && (
            <div class="p-3 bg-gray-100 rounded">
              <p class="text-gray-800">{translation}</p>
            </div>
          )}

          <button
            onClick={handlePronounce}
            class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Pronounce
          </button>

          <button
            onClick={handleAddToVocabulary}
            class="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Add to Vocabulary
          </button>

          <button
            onClick={onClose}
            class="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordModal; 