import { c as createComponent, b as createAstro, d as addAttribute, e as renderHead, r as renderComponent, f as renderSlot, a as renderTemplate } from './astro/server_8cTawadL.mjs';
import 'kleur/colors';
import { useState, useEffect } from 'preact/hooks';
import { jsx, jsxs } from 'preact/jsx-runtime';
/* empty css                        */

const Navigation = () => {
  const [musicOn, setMusicOn] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("musicOn");
    if (saved !== null) setMusicOn(saved === "true");
  }, []);
  useEffect(() => {
    const audio = window.bgMusic || document.getElementById("bg-music");
    if (audio) {
      if (musicOn) {
        audio.play().catch(() => {
        });
        audio.muted = false;
      } else {
        audio.muted = true;
      }
    }
    localStorage.setItem("musicOn", musicOn ? "true" : "false");
  }, [musicOn]);
  return jsx("nav", {
    class: "bg-gray-800 text-white p-4",
    children: jsxs("div", {
      class: "max-w-7xl mx-auto flex justify-between items-center",
      children: [jsx("a", {
        href: "/",
        class: "text-xl font-bold",
        children: "WordFlow"
      }), jsxs("div", {
        class: "space-x-4 flex items-center",
        children: [jsx("a", {
          href: "/vocabulary",
          class: "hover:text-yellow-400 transition-colors",
          children: "Мой словарь"
        }), jsx("button", {
          class: "ml-4 text-2xl hover:text-yellow-400 transition-colors focus:outline-none",
          title: musicOn ? "Выключить музыку" : "Включить музыку",
          onClick: () => setMusicOn((v) => !v),
          children: musicOn ? "🔊" : "🔇"
        })]
      })]
    })
  });
};

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="ru"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navigation", Navigation, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/a.zhurkin/Desktop/wordFlow/src/components/Navigation", "client:component-export": "default" })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "GlobalAudio", null, { "client:only": "preact", "client:component-hydration": "only", "client:component-path": "/Users/a.zhurkin/Desktop/wordFlow/src/components/GlobalAudio.tsx", "client:component-export": "default" })} </body></html>`;
}, "/Users/a.zhurkin/Desktop/wordFlow/src/layouts/Layout.astro", void 0);

const defaultState = {
  currentChapter: 1,
  currentScene: 0,
  knownWords: {},
  completedChapters: [],
  userSettings: {
    sound: true,
    language: "ru"
  }
};
const getGameData = () => {
  if (typeof window === "undefined") return defaultState;
  const raw = localStorage.getItem("escape-word-lab");
  return raw ? JSON.parse(raw) : structuredClone(defaultState);
};
const saveGameData = (data) => {
  localStorage.setItem("escape-word-lab", JSON.stringify(data));
};

export { $$Layout as $, getGameData as g, saveGameData as s };
