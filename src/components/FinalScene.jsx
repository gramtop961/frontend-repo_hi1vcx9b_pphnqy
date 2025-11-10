import { motion } from 'framer-motion';

export default function FinalScene({ onReplay }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-orange-200 via-rose-200 to-sky-200">
      {/* sunset */}
      <div className="absolute inset-0">
        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 blur-xl" />
      </div>

      {/* ship sailing */}
      <motion.div
        initial={{ x: '-20%' }}
        animate={{ x: '120%' }}
        transition={{ duration: 12, ease: 'easeInOut' }}
        className="absolute bottom-24 left-0"
      >
        <svg width="220" height="120" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90 text-slate-800 drop-shadow">
          <path d="M10 60 C 40 30, 140 30, 170 60 L 150 60 C140 75,40 75,30 60 Z" fill="currentColor" />
          <rect x="80" y="20" width="6" height="30" fill="currentColor" />
          <path d="M86 20 L120 40 L86 40 Z" fill="currentColor" />
          <circle cx="55" cy="50" r="10" fill="currentColor" />
        </svg>
      </motion.div>

      {/* fireworks */}
      {[...Array(3)].map((_,i)=>(
        <motion.div key={i} className="absolute inset-0" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1+i*1.2}}>
          {[...Array(14)].map((__,j)=>(
            <motion.span
              key={j}
              className="absolute left-1/2 top-1/3 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
              animate={{
                x: (Math.random()-0.5)*220,
                y: (Math.random()-0.5)*180,
                opacity: [1,0],
              }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.8 }}
            />
          ))}
        </motion.div>
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="max-w-md text-lg text-slate-800"
        >
          May your next voyage be full of laughter, dreams, and endless adventures.
        </motion.p>

        <div className="mt-8 flex items-center gap-3">
          <button onClick={onReplay} className="rounded-full bg-amber-600 px-5 py-3 text-white shadow-md active:scale-95">Replay</button>
          <button onClick={() => navigator.share ? navigator.share({ title: 'Shea\'s Voyage', text: 'Sail with Captain Shea!', url: window.location.href }) : alert('Sharing not supported on this device')} className="rounded-full bg-sky-600 px-5 py-3 text-white shadow-md active:scale-95">Share</button>
        </div>
      </div>
    </div>
  );
}
