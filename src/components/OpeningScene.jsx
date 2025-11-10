import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OpeningScene({ onNext, startAudio }) {
  // Gentle bobbing ocean background using CSS gradients + animation
  useEffect(() => {
    // ensure audio can start after first user tap
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 text-slate-900">
      {/* Ocean */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-1/2">
          <div className="absolute inset-0 animate-[wave_10s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.6),rgba(59,130,246,0)_60%)] opacity-70" />
          <div className="absolute inset-0 animate-[wave2_12s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.5),rgba(14,165,233,0)_60%)] opacity-70" />
        </div>
      </div>

      {/* Thousand Sunny silhouette */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        <svg width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70 text-slate-800">
          <path d="M10 60 C 40 30, 140 30, 170 60 L 150 60 C140 75,40 75,30 60 Z" fill="currentColor" />
          <rect x="80" y="20" width="6" height="30" fill="currentColor" />
          <path d="M86 20 L120 40 L86 40 Z" fill="currentColor" />
          <circle cx="55" cy="50" r="10" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Title */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="font-semibold tracking-wide text-slate-800"
          style={{ fontFamily: 'Mona Sans, Inter, system-ui' }}
        >
          <span className="block text-sm uppercase text-slate-700/80">Episode</span>
          <span className="mt-2 block text-2xl sm:text-3xl">The Birthday of the Future Pirate Queen – Shea!</span>
        </motion.h1>

        <motion.button
          onClick={() => {
            startAudio?.();
            onNext();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 rounded-full bg-amber-500 px-6 py-3 text-white shadow-lg shadow-amber-500/30 active:scale-95"
        >
          Tap to Continue
        </motion.button>
      </div>

      {/* subtle sun */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-60 blur-2xl" />

      <style>{`
        @keyframes wave { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes wave2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(12px)} }
      `}</style>
    </div>
  );
}
