/** @jsxImportSource preact */
import chapters from "../data/chapters.ts";
import { getGameData } from "../lib/storage";

interface Props {
  onClose: () => void;
}

const ChapterMapModal = ({ onClose }: Props) => {
  const currentChapter = getGameData().currentChapter ?? 1;

  return (
    <div class="fixed inset-0 bg-black/70 backdrop-blur z-50 flex justify-center items-center p-4">
      <div class="bg-white rounded-xl p-6 relative w-full max-w-md shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          class="absolute top-4 right-4 text-black hover:text-red-600 text-2xl font-bold"
        >
          ✕
        </button>
        <h2 class="text-3xl font-bold text-center mb-6 text-black">Карта глав</h2>
        <ul class="flex flex-col gap-3">
          {chapters.map((chapter) => (
            <li
              key={chapter.id}
              class={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all border
                ${currentChapter === chapter.id
                  ? 'bg-indigo-100 border-indigo-400 font-bold text-indigo-800 shadow'
                  : 'bg-white border-gray-200 hover:bg-indigo-50 text-gray-800'}`}
              onClick={() => window.location.href = `/chapter/${chapter.id}`}
            >
              <span class="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300 text-black font-semibold text-lg">
                {chapter.id}
              </span>
              <span class="truncate">{chapter.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChapterMapModal;
