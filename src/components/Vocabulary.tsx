/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { getGameData, saveGameData } from "../lib/storage";

interface WordData {
  learned: boolean;
  shownTimes: number;
}

interface VocabularyWord {
  word: string;
  data: WordData;
}

const Vocabulary = () => {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const game = getGameData();
    const vocabularyWords = Object.entries(game.knownWords || {}).map(([word, data]) => ({
      word,
      data: data as WordData
    }));
    setWords(vocabularyWords);
  }, []);

  const handleTranslate = async (word: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=ru|en`);
      const data = await response.json();
      setTranslation(data.responseData.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
    setIsLoading(false);
  };

  const handlePronounce = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ru-RU";
    window.speechSynthesis.speak(utterance);
  };

  const toggleLearned = (word: string) => {
    const game = getGameData();
    game.knownWords[word].learned = !game.knownWords[word].learned;
    saveGameData(game);
    setWords(words.map(w => 
      w.word === word 
        ? { ...w, data: { ...w.data, learned: !w.data.learned } }
        : w
    ));
  };

  return (
    <div class="min-h-screen bg-gray-100 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Мой словарь</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Слова для изучения</h2>
            <div class="space-y-4">
              {words.map(({ word, data }) => (
                <div key={word} class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={data.learned}
                      onChange={() => toggleLearned(word)}
                      class="w-5 h-5 text-blue-600 rounded"
                    />
                    <span class={`font-medium ${data.learned ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {word}
                    </span>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      onClick={() => handlePronounce(word)}
                      class="p-2 text-green-600 hover:bg-green-50 rounded"
                      title="Произнести"
                    >
                      🔊
                    </button>
                    <button
                      onClick={() => {
                        setSelectedWord(word);
                        handleTranslate(word);
                      }}
                      class="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      title="Перевести"
                    >
                      📖
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedWord && (
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold mb-4">Детали слова</h2>
              <div class="space-y-4">
                <div class="text-2xl font-bold text-gray-800">{selectedWord}</div>
                {isLoading ? (
                  <div class="text-gray-600">Загрузка перевода...</div>
                ) : translation ? (
                  <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="text-gray-800">{translation}</p>
                  </div>
                ) : null}
                <div class="text-sm text-gray-500">
                  Показано раз: {words.find(w => w.word === selectedWord)?.data.shownTimes}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vocabulary; 