import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function WantedPoster({ onNext }) {
  const canvasRef = useRef(null);

  const download = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'shea-wanted-poster.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const drawPoster = (canvas) => {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 700; // px for crisp export
    const height = 1000;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = '100%';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Background parchment
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#FEF3C7');
    grad.addColorStop(1, '#FDE68A');
    ctx.fillStyle = grad;
    roundedRect(ctx, 16, 16, width - 32, height - 32, 24);
    ctx.fill();

    // Border
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#92400E';
    roundedRect(ctx, 24, 24, width - 48, height - 48, 18);
    ctx.stroke();

    // Title
    ctx.fillStyle = '#78350F';
    ctx.textAlign = 'center';
    ctx.font = 'bold 72px "IBM Plex Sans", system-ui';
    ctx.fillText('WANTED', width / 2, 120);

    ctx.globalAlpha = 0.8;
    ctx.font = '12px "IBM Plex Sans", system-ui';
    ctx.fillText('DEAD OR ALIVE', width / 2, 150);
    ctx.globalAlpha = 1;

    // Image placeholder frame
    const imgX = width / 2 - 220;
    const imgY = 190;
    const imgW = 440;
    const imgH = 360;
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#A16207';
    roundedRect(ctx, imgX, imgY, imgW, imgH, 12);
    ctx.stroke();
    ctx.fillStyle = '#FDE68A';
    ctx.fillRect(imgX + 5, imgY + 5, imgW - 10, imgH - 10);

    // Placeholder text
    ctx.fillStyle = '#92400E';
    ctx.font = '20px "IBM Plex Sans", system-ui';
    ctx.fillText("Shea's Image", width / 2, imgY + imgH / 2);

    // Name and message
    ctx.fillStyle = '#78350F';
    ctx.font = '28px "IBM Plex Sans", system-ui';
    ctx.fillText('Sulkashana (Shea)', width / 2, 600);

    ctx.font = '20px "IBM Plex Sans", system-ui';
    wrapText(ctx, 'For stealing hearts and making the crew laugh.', width / 2, 635, 520, 24);

    ctx.font = '22px "IBM Plex Sans", system-ui';
    ctx.fillText('Bounty: 1,000,000 smiles', width / 2, 710);

    // Wind sheen effect
    const sheen = ctx.createLinearGradient(0, 0, width, 0);
    sheen.addColorStop(0, 'rgba(255,255,255,0)');
    sheen.addColorStop(0.5, 'rgba(255,255,255,0.18)');
    sheen.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(250,204,21,0.25),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.2),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 py-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-lg p-1 text-amber-900"
          style={{ fontFamily: 'IBM Plex Sans' }}
        >
          <canvas
            ref={(el) => {
              canvasRef.current = el;
              if (el && el.getAttribute('data-drawn') !== '1') {
                drawPoster(el);
                el.setAttribute('data-drawn', '1');
              }
            }}
            className="h-auto w-full rounded-lg shadow-xl"
            height={1000}
          />
        </motion.div>

        <div className="mt-6 flex w-full max-w-md items-center justify-center gap-3">
          <button onClick={download} className="rounded-full bg-amber-600 px-5 py-3 text-white shadow-md active:scale-95">Download Poster</button>
          <button onClick={onNext} className="rounded-full bg-sky-600 px-5 py-3 text-white shadow-md active:scale-95">Continue</button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 animate-[wind_6s_linear_infinite] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)]" />
      <style>{`@keyframes wind { 0%{background-position:-200% 0} 100%{background-position:200% 0} }`}</style>
    </div>
  );
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, xCenter, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  const lines = [];
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  lines.forEach((ln, i) => ctx.fillText(ln.trim(), xCenter, y + i * lineHeight));
}
