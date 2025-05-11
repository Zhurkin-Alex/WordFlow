/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";

const GlobalAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 1;
      audio.play().catch(() => {});
      // @ts-ignore
      window.bgMusic = audio;
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      id="bg-music"
      src="/audio/581.opus"
      preload="auto"
      loop
      style="display:none"
    />
  );
};

export default GlobalAudio; 