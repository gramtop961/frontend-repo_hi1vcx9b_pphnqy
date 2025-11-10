import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const crew = [
  { id: 1, name: 'Luffy', msg: 'Oi Captain Shea! Wishing you the best birthday on all the seas!' },
  { id: 2, name: 'Zoro', msg: 'Stay the course. Your dreams are your true north. Happy Birthday.' },
  { id: 3, name: 'Nami', msg: 'May fortune winds fill your sails. Enjoy your treasure day!' },
  { id: 4, name: 'Usopp', msg: 'Legend says Shea defeated the Sea King with a smile. Have an epic year!' },
  { id: 5, name: 'Sanji', msg: 'A feast fit for our Captain! Bon appétit and happy birthday.' },
];

export default function CrewMessages({ onNext }) {
  const [active, setActive] = useState(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-100 to-sky-200">
      {/* rocking deck */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom animate-[rock_6s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_top,rgba(2,132,199,0.25),transparent_60%)]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <h2 className="px-6 pt-8 text-center text-xl font-semibold text-slate-800">Crew Messages</h2>

        <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6">
          {crew.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className="snap-center shrink-0 rounded-xl border border-slate-200 bg-white/80 px-4 py-6 shadow-md backdrop-blur-sm"
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-200 to-amber-400" />
              <div className="mt-3 text-sm font-medium text-slate-800">{c.name}</div>
            </button>
          ))}
        </div>

        <div className="mt-auto px-6 pb-8">
          <button onClick={onNext} className="w-full rounded-full bg-sky-600 px-5 py-3 text-white shadow-md active:scale-95">Continue</button>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 grid place-items-center bg-black/50 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl bg-white p-6 text-slate-800 shadow-xl"
              onClick={(e)=>e.stopPropagation()}
            >
              <div className="mb-2 text-sm font-semibold text-slate-500">{active.name} says:</div>
              <div className="text-base">{active.msg}</div>
              <div className="mt-6 text-right">
                <button onClick={()=>setActive(null)} className="rounded-full bg-amber-500 px-4 py-2 text-white">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes rock { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(0.6deg)} }
      `}</style>
    </div>
  );
}
