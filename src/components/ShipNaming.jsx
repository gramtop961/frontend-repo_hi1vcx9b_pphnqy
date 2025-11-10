import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ShipNaming({ onNext }) {
  const [name, setName] = useState('Shea\'s Adventure');
  const [engraved, setEngraved] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setEngraved(true);
    setTimeout(onNext, 1800);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-amber-100 via-sky-100 to-sky-200">
      <div className="relative z-10 mx-auto max-w-md px-6 py-10">
        <h2 className="text-center text-xl font-semibold text-slate-800">Name Your Ship</h2>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white/80 p-4 shadow-sm focus:border-amber-500 focus:outline-none"
            placeholder="Ship name"
            maxLength={28}
          />
          <button type="submit" className="w-full rounded-full bg-amber-600 px-5 py-3 text-white shadow-md active:scale-95">Engrave Name</button>
        </form>

        <div className="mt-10 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 p-4 text-center text-white shadow-lg">
          <div className="mx-auto mb-4 h-24 w-full rounded-lg bg-gradient-to-b from-sky-300/40 to-sky-700/50" />
          <div className="relative mx-auto h-24 w-full overflow-hidden rounded-lg bg-gradient-to-b from-amber-200 to-amber-300">
            {/* hull */}
            <div className="absolute inset-x-4 bottom-4 h-10 rounded-b-[2rem] bg-amber-800" />
            {/* name engraving */}
            <motion.div
              initial={false}
              animate={engraved ? { opacity: 1 } : { opacity: 0.1 }}
              className="absolute inset-x-0 bottom-6 text-center font-semibold tracking-wide text-amber-100/90"
              style={{ fontFamily:'Mona Sans' }}
            >
              <TypeWriter text={name} active={engraved} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* breeze */}
      <div className="pointer-events-none absolute inset-0 animate-[breeze_8s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]" />
      <style>{`@keyframes breeze{0%{background-position:-150% 0}100%{background-position:150% 0}}`}</style>
    </div>
  );
}

function TypeWriter({ text, active }){
  const visible = active ? text : '';
  return (
    <span className="inline-block">
      {visible.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
