import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_8cTawadL.mjs';
import 'kleur/colors';
import { g as getGameData, s as saveGameData, $ as $$Layout } from '../chunks/storage_piGGCiBF.mjs';
import { useState, useEffect } from 'preact/hooks';
import { jsx, jsxs } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

const Vocabulary = () => {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const game = getGameData();
    const vocabularyWords = Object.entries(game.knownWords || {}).map(([word, data]) => ({
      word,
      data
    }));
    setWords(vocabularyWords);
  }, []);
  const handleTranslate = async (word) => {
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
  const handlePronounce = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ru-RU";
    window.speechSynthesis.speak(utterance);
  };
  const toggleLearned = (word) => {
    const game = getGameData();
    game.knownWords[word].learned = !game.knownWords[word].learned;
    saveGameData(game);
    setWords(words.map((w) => w.word === word ? {
      ...w,
      data: {
        ...w.data,
        learned: !w.data.learned
      }
    } : w));
  };
  return jsx("div", {
    class: "min-h-screen bg-gray-100 py-8 px-4",
    children: jsxs("div", {
      class: "max-w-4xl mx-auto",
      children: [jsx("h1", {
        class: "text-3xl font-bold text-gray-800 mb-8",
        children: "Мой словарь"
      }), jsxs("div", {
        class: "grid grid-cols-1 md:grid-cols-2 gap-6",
        children: [jsxs("div", {
          class: "bg-white rounded-lg shadow-md p-6",
          children: [jsx("h2", {
            class: "text-xl font-semibold mb-4",
            children: "Слова для изучения"
          }), jsx("div", {
            class: "space-y-4",
            children: words.map(({
              word,
              data
            }) => jsxs("div", {
              class: "flex items-center justify-between p-3 bg-gray-50 rounded-lg",
              children: [jsxs("div", {
                class: "flex items-center space-x-3",
                children: [jsx("input", {
                  type: "checkbox",
                  checked: data.learned,
                  onChange: () => toggleLearned(word),
                  class: "w-5 h-5 text-blue-600 rounded"
                }), jsx("span", {
                  class: `font-medium ${data.learned ? "line-through text-gray-500" : "text-gray-800"}`,
                  children: word
                })]
              }), jsxs("div", {
                class: "flex space-x-2",
                children: [jsx("button", {
                  onClick: () => handlePronounce(word),
                  class: "p-2 text-green-600 hover:bg-green-50 rounded",
                  title: "Произнести",
                  children: "🔊"
                }), jsx("button", {
                  onClick: () => {
                    setSelectedWord(word);
                    handleTranslate(word);
                  },
                  class: "p-2 text-blue-600 hover:bg-blue-50 rounded",
                  title: "Перевести",
                  children: "📖"
                })]
              })]
            }, word))
          })]
        }), selectedWord && jsxs("div", {
          class: "bg-white rounded-lg shadow-md p-6",
          children: [jsx("h2", {
            class: "text-xl font-semibold mb-4",
            children: "Детали слова"
          }), jsxs("div", {
            class: "space-y-4",
            children: [jsx("div", {
              class: "text-2xl font-bold text-gray-800",
              children: selectedWord
            }), isLoading ? jsx("div", {
              class: "text-gray-600",
              children: "Загрузка перевода..."
            }) : translation ? jsx("div", {
              class: "p-3 bg-gray-50 rounded-lg",
              children: jsx("p", {
                class: "text-gray-800",
                children: translation
              })
            }) : null, jsxs("div", {
              class: "text-sm text-gray-500",
              children: ["Показано раз: ", words.find((w) => w.word === selectedWord)?.data.shownTimes]
            })]
          })]
        })]
      })]
    })
  });
};

const $$Vocabulary = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u041C\u043E\u0439 \u0441\u043B\u043E\u0432\u0430\u0440\u044C" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "VocabularyComponent", Vocabulary, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/a.zhurkin/Desktop/wordFlow/src/components/Vocabulary", "client:component-export": "default" })} ` })}`;
}, "/Users/a.zhurkin/Desktop/wordFlow/src/pages/vocabulary.astro", void 0);

const $$file = "/Users/a.zhurkin/Desktop/wordFlow/src/pages/vocabulary.astro";
const $$url = "/vocabulary";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Vocabulary,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
