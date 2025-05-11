import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_8cTawadL.mjs';
import 'kleur/colors';
import { useRef, useState, useEffect } from 'preact/hooks';
import { c as chapters } from '../chunks/chapters_CxRl5e-J.mjs';
import { g as getGameData, $ as $$Layout } from '../chunks/storage_piGGCiBF.mjs';
import { jsx, jsxs } from 'preact/jsx-runtime';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const ChapterMapModal = ({
  onClose
}) => {
  const currentChapter = getGameData().currentChapter ?? 1;
  return jsx("div", {
    class: "fixed inset-0 bg-black/70 backdrop-blur z-50 flex justify-center items-center p-4",
    children: jsxs("div", {
      class: "bg-white rounded-xl p-6 relative w-full max-w-md shadow-2xl overflow-hidden",
      children: [jsx("button", {
        onClick: onClose,
        class: "absolute top-4 right-4 text-black hover:text-red-600 text-2xl font-bold",
        children: "✕"
      }), jsx("h2", {
        class: "text-3xl font-bold text-center mb-6 text-black",
        children: "Карта глав"
      }), jsx("ul", {
        class: "flex flex-col gap-3",
        children: chapters.map((chapter) => jsxs("li", {
          class: `flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all border
                ${currentChapter === chapter.id ? "bg-indigo-100 border-indigo-400 font-bold text-indigo-800 shadow" : "bg-white border-gray-200 hover:bg-indigo-50 text-gray-800"}`,
          onClick: () => window.location.href = `/chapter/${chapter.id}`,
          children: [jsx("span", {
            class: "w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300 text-black font-semibold text-lg",
            children: chapter.id
          }), jsx("span", {
            class: "truncate",
            children: chapter.title
          })]
        }, chapter.id))
      })]
    })
  });
};

const Welcome = () => {
  useRef(null);
  const [showMap, setShowMap] = useState(false);
  const handleStart = () => {
    setShowMap(true);
  };
  useEffect(() => {
    const audio = window.document.getElementById("bg-music");
    if (audio) {
      audio.volume = 1;
      audio.play().catch(() => {
      });
    }
  }, []);
  return jsxs("div", {
    class: "min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4 gap-[190px]",
    style: {
      backgroundImage: `url('/img/start/startBack-0.jpg')`
    },
    children: [showMap && jsx(ChapterMapModal, {
      onClose: () => setShowMap(false)
    }), jsx("h1", {
      class: "text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-300 via-purple-400 to-blue-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradientFlow text-glow animate-glow",
      children: "ESCAPE THE WORD LAB"
    }), jsxs("div", {
      class: "w-full max-w-xs space-y-4",
      children: [jsx("p", {
        class: "text-white/80 mb-8",
        children: "ГЛАВА 1 ИЗ 12"
      }), ["Начать приключение", "Книга слов", "Карта глав", "Настройки"].map((text, index) => jsx("button", {
        onClick: index === 0 ? handleStart : void 0,
        class: "w-full py-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white text-lg font-medium hover:bg-white/20 hover:scale-105 transition-all duration-200",
        children: text
      }, text))]
    })]
  });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "WordFlow - \u0418\u0437\u0443\u0447\u0435\u043D\u0438\u0435 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u0433\u043E" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Welcome", Welcome, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/a.zhurkin/Desktop/wordFlow/src/components/Welcome", "client:component-export": "default" })} ` })}`;
}, "/Users/a.zhurkin/Desktop/wordFlow/src/pages/index.astro", void 0);

const $$file = "/Users/a.zhurkin/Desktop/wordFlow/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
