import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_8cTawadL.mjs';
import 'kleur/colors';
import { g as getGameData, s as saveGameData, $ as $$Layout } from '../../chunks/storage_piGGCiBF.mjs';
import { useState, useEffect } from 'preact/hooks';
import { jsx, jsxs } from 'preact/jsx-runtime';
import { c as chapters } from '../../chunks/chapters_CxRl5e-J.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const WordModal = ({
  word,
  onClose
}) => {
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleTranslate = async () => {
    setIsLoading(true);
    try {
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
      shownTimes: (game.knownWords[word]?.shownTimes || 0) + 1
    };
    saveGameData(game);
    onClose();
  };
  return jsx("div", {
    class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
    children: jsxs("div", {
      class: "bg-white rounded-lg p-6 max-w-md w-full mx-4",
      children: [jsx("h2", {
        class: "text-2xl font-bold mb-4",
        children: word
      }), jsxs("div", {
        class: "space-y-4",
        children: [jsx("button", {
          onClick: handleTranslate,
          class: "w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded",
          disabled: isLoading,
          children: isLoading ? "Translating..." : "Translate"
        }), translation && jsx("div", {
          class: "p-3 bg-gray-100 rounded",
          children: jsx("p", {
            class: "text-gray-800",
            children: translation
          })
        }), jsx("button", {
          onClick: handlePronounce,
          class: "w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded",
          children: "Pronounce"
        }), jsx("button", {
          onClick: handleAddToVocabulary,
          class: "w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded",
          children: "Add to Vocabulary"
        }), jsx("button", {
          onClick: onClose,
          class: "w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded",
          children: "Close"
        })]
      })]
    })
  });
};

const ChapterScreen = ({
  chapter
}) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [knownWords, setKnownWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [voices, setVoices] = useState([]);
  const scene = chapter.scenes[sceneIndex];
  if (!chapter?.scenes) {
    return jsx("div", {
      class: "text-white p-6",
      children: "⚠️ Scene not found"
    });
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
    const audio = window.document.getElementById("bg-music");
    if (audio) {
      const start = audio.volume;
      const end = 0.5;
      const duration = 600;
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
  const handleWordClick = (word) => {
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
      game.completedChapters = [.../* @__PURE__ */ new Set([...game.completedChapters || [], chapter.id])];
      saveGameData(game);
      window.location.href = `/chapter/${game.currentChapter}`;
    }
  };
  const handleReadAloud = () => {
    if (scene?.text) {
      const utterance = new window.SpeechSynthesisUtterance(scene.text);
      let voice = voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google")) || voices.find((v) => v.lang.startsWith("en")) || voices[0];
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
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(scene.text)}&langpair=en|ru`);
      const data = await response.json();
      setTranslation(data.responseData.translatedText);
    } catch (e) {
      setTranslation("Ошибка перевода");
    }
    setIsTranslating(false);
  };
  return jsxs("div", {
    class: "min-h-screen bg-cover bg-center text-white px-4 py-8 flex flex-col justify-center items-center",
    style: {
      backgroundImage: `url('${chapter.image || "/images/cupboard-scene.jpg"}')`
    },
    children: [jsx("div", {
      class: "max-w-xl text-center text-xl bg-black/40 p-6 rounded-lg backdrop-blur-md flex flex-wrap",
      children: scene.text.split(" ").map((word, idx) => {
        const clean = word.replace(/[.,!?]/g, "");
        const isWord = scene.words.includes(clean);
        return jsx("span", {
          class: `mx-1 ${isWord ? "cursor-pointer underline decoration-yellow-400 hover:text-yellow-300" : ""}`,
          onClick: () => isWord && handleWordClick(clean),
          children: word
        }, idx);
      })
    }), jsxs("div", {
      class: "flex gap-4 mt-6",
      children: [jsxs("button", {
        class: "flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-xl shadow transition-all text-lg",
        onClick: handleReadAloud,
        children: [jsx("span", {
          role: "img",
          "aria-label": "Read",
          children: "🔊"
        }), " Read"]
      }), jsxs("button", {
        class: "flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-5 rounded-xl shadow transition-all text-lg disabled:opacity-60",
        onClick: handleTranslate,
        disabled: isTranslating,
        children: [jsx("span", {
          role: "img",
          "aria-label": "Translate",
          children: "🌐"
        }), " Translate", isTranslating && jsxs("svg", {
          class: "animate-spin ml-2 h-5 w-5 text-white",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          children: [jsx("circle", {
            class: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }), jsx("path", {
            class: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8v8z"
          })]
        })]
      })]
    }), translation && jsx("div", {
      class: "max-w-xl text-center text-lg bg-emerald-100/80 text-emerald-900 mt-6 p-4 rounded-xl shadow border border-emerald-200",
      children: translation
    }), jsx("button", {
      class: "mt-10 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-xl transition-all",
      onClick: handleNext,
      children: sceneIndex + 1 < chapter.scenes.length ? "Продолжить" : "Следующая глава"
    }), selectedWord && jsx(WordModal, {
      word: selectedWord,
      onClose: () => setSelectedWord(null)
    })]
  });
};

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const chapterId = parseInt(id ?? "1");
  const chapter = chapters.find((c) => c.id === chapterId);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": chapter?.title ?? "\u0413\u043B\u0430\u0432\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430" }, { "default": ($$result2) => renderTemplate`${chapter ? renderTemplate`${renderComponent($$result2, "ChapterScreen", ChapterScreen, { "chapter": chapter, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/a.zhurkin/Desktop/wordFlow/src/components/ChapterScreen.tsx", "client:component-export": "default" })}` : renderTemplate`${maybeRenderHead()}<div class="min-h-screen flex flex-col items-center justify-center text-white bg-black/80 text-center gap-6 px-6"> <h2 class="text-3xl font-bold">⚠️ Chapter not found</h2> <a href="/" class="mt-4 bg-yellow-500 px-4 py-2 rounded-xl">← Вернуться в меню</a> </div>`}` })}`;
}, "/Users/a.zhurkin/Desktop/wordFlow/src/pages/chapter/[id].astro", void 0);

const $$file = "/Users/a.zhurkin/Desktop/wordFlow/src/pages/chapter/[id].astro";
const $$url = "/chapter/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
