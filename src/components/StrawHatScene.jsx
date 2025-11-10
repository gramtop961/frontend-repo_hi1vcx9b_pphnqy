import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StrawHatScene({ onComplete, playSfx, switchMusic }) {
  const dropZoneRef = useRef(null);
  const hatRef = useRef(null);
  const [placed, setPlaced] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  useEffect(() => {
    // Prepare scene music
    switchMusic?.('overtaken');
  }, [switchMusic]);

  const onDrag = (e) => {
    if (!hatRef.current) return;
    const touch = e.touches ? e.touches[0] : e;
    const x = touch.clientX;
    const y = touch.clientY;
    hatRef.current.style.left = x - 40 + 'px';
    hatRef.current.style.top = y - 30 + 'px';
  };

  const onEnd = (e) => {
    if (!dropZoneRef.current || !hatRef.current) return;
    const dz = dropZoneRef.current.getBoundingClientRect();
    const hat = hatRef.current.getBoundingClientRect();
    const overlap = !(hat.right < dz.left || hat.left > dz.right || hat.bottom < dz.top || hat.top > dz.bottom);
    if (overlap) {
      setPlaced(true);
      setSparkle(true);
      playSfx?.('shanks');
      setTimeout(() => setSparkle(false), 1200);
      setTimeout(() => onComplete(), 1500);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50">
      {/* silhouette placeholder */}
      <div className="relative z-10 mx-auto mt-16 flex max-w-sm flex-col items-center px-6">
        <div
          ref={dropZoneRef}
          className="relative h-48 w-48 rounded-full border-4 border-amber-700/40 bg-gradient-to-b from-slate-200 to-slate-100 shadow-inner"
        >
          <div className="absolute inset-0 -z-0 flex items-center justify-center text-center text-slate-600/70" style={{fontFamily:'IBM Plex Sans'}}>
            Shea's Photo
          </div>
        </div>
        <p className="mt-6 text-center text-slate-700">Drag the Straw Hat onto Shea</p>
      </div>

      {/* Hat draggable */}
      <div
        ref={hatRef}
        onMouseMove={(e)=>e.buttons===1&&onDrag(e)}
        onMouseUp={onEnd}
        onTouchMove={onDrag}
        onTouchEnd={onEnd}
        className="absolute left-1/2 top-3/4 z-20 -translate-x-1/2 h-20 w-24 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <svg viewBox="0 0 200 120" className="h-full w-full">
          <defs>
            <linearGradient id="hatg" x1="0" x2="1">
              <stop offset="0%" stopColor="#fbbf24"/>
              <stop offset="100%" stopColor="#d97706"/>
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="90" rx="90" ry="20" fill="#000" opacity="0.15"/>
          <ellipse cx="100" cy="70" rx="90" ry="25" fill="url(#hatg)"/>
          <ellipse cx="100" cy="50" rx="50" ry="30" fill="url(#hatg)"/>
          <rect x="55" y="45" width="90" height="12" fill="#ef4444"/>
        </svg>
      </div>

      {/* sparkles */}
      <AnimatePresence>
        {sparkle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-30"
          >
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 220],
                  y: [0, (Math.random() - 0.5) * 180],
                  rotate: Math.random() * 180,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-md shadow-amber-400/50"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient details */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent" />
    </div>
  );
}
