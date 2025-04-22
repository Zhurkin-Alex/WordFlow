export const defaultState = {
    currentChapter: 1,
    currentScene: 0,
    knownWords: {},
    completedChapters: [],
    userSettings: {
      sound: true,
      language: "ru",
    },
};
  
export const getGameData = () => {
if (typeof window === "undefined") return defaultState;
const raw = localStorage.getItem("escape-word-lab");
return raw ? JSON.parse(raw) : structuredClone(defaultState);
};

export const saveGameData = (data: any) => {
localStorage.setItem("escape-word-lab", JSON.stringify(data));
};

export const resetGame = () => {
localStorage.removeItem("escape-word-lab");
};
  