import { useEffect, useRef, useState } from 'react';
import OpeningScene from './components/OpeningScene';
import StrawHatScene from './components/StrawHatScene';
import WantedPoster from './components/WantedPoster';
import CrewMessages from './components/CrewMessages';
import ShipNaming from './components/ShipNaming';
import FinalScene from './components/FinalScene';

export default function App() {
  const [step, setStep] = useState(0);
  const bgmRef = useRef(null);
  const sfxRef = useRef({});

  useEffect(() => {
    // Preload audio lazily after first interaction
    const bgm = new Audio('/audio/we-are-piano.mp3');
    bgm.loop = true;
    bgm.volume = 0.35;
    bgmRef.current = bgm;

    sfxRef.current['shanks'] = new Audio('/audio/shanks-line.mp3');
    sfxRef.current['shanks'].volume = 0.8;
  }, []);

  const startAudio = () => {
    try { bgmRef.current?.play(); } catch {}
  };

  const playSfx = (key) => {
    const s = sfxRef.current[key];
    if (!s) return;
    try { s.currentTime = 0; s.play(); } catch {}
  };

  const switchMusic = (name) => {
    // For now, keep one track. Hook for future enhancement.
  };

  const next = () => setStep((s) => s + 1);
  const replay = () => setStep(0);

  return (
    <div className="min-h-screen w-full bg-black selection:bg-amber-200 selection:text-slate-900">
      {step === 0 && <OpeningScene onNext={next} startAudio={startAudio} />}
      {step === 1 && <StrawHatScene onComplete={next} playSfx={playSfx} switchMusic={switchMusic} />}
      {step === 2 && <WantedPoster onNext={next} />}
      {step === 3 && <CrewMessages onNext={next} />}
      {step === 4 && <ShipNaming onNext={next} />}
      {step === 5 && <FinalScene onReplay={replay} />}
    </div>
  );
}
