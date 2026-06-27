import { useEffect, useRef } from 'react';

const COLORS = ['#FFD700', '#FF8C00', '#FFF176', '#FFAA00', '#FF6B00'];

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId: number;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Nodes
    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    }));

    // Particles
    class Particle {
      x = 0; y = 0; vx = 0; vy = 0; r = 0;
      color = ''; alpha = 0; life = 0; maxLife = 0;
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.8 + 0.5;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = Math.random() * 0.5 + 0.2;
        this.life = 0; this.maxLife = Math.random() * 300 + 200;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha * (1 - this.life / this.maxLife);
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color; ctx.shadowBlur = 12; ctx.shadowColor = this.color;
        ctx.fill(); ctx.restore();
      }
    }

    const particles = Array.from({ length: 120 }, () => new Particle());
    let boltTimer = 0, boltAlpha = 0, boltX1 = 0, boltY1 = 0, boltX2 = 0, boltY2 = 0;
    let nextBolt = 200;

    const drawBolt = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#FFD700'; ctx.shadowBlur = 25; ctx.shadowColor = '#FFD700';
      ctx.lineWidth = 1.2; ctx.beginPath();
      for (let i = 0; i <= 8; i++) {
        const t = i / 8;
        const nx = x1 + (x2 - x1) * t + (i > 0 && i < 8 ? (Math.random() - 0.5) * 30 : 0);
        const ny = y1 + (y2 - y1) * t + (i > 0 && i < 8 ? (Math.random() - 0.5) * 30 : 0);
        i === 0 ? ctx.moveTo(nx, ny) : ctx.lineTo(nx, ny);
      }
      ctx.stroke(); ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.save(); ctx.globalAlpha = (1 - dist / 130) * 0.08;
            ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); ctx.restore();
          }
        }
      }
      particles.forEach(p => { p.update(); p.draw(); });
      boltTimer++;
      if (boltTimer >= nextBolt) {
        boltAlpha = 0.7; boltX1 = Math.random() * W; boltY1 = 0;
        boltX2 = boltX1 + (Math.random() - 0.5) * 200; boltY2 = Math.random() * H * 0.6;
        boltTimer = 0; nextBolt = Math.random() * 300 + 200;
      }
      if (boltAlpha > 0) { drawBolt(boltX1, boltY1, boltX2, boltY2, boltAlpha); boltAlpha -= 0.05; }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
}
