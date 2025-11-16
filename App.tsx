
import React, { useState, useEffect, useRef } from 'react';
import PortfolioApp from './components/PortfolioApp';

const Logo = () => (
    <div className="flex items-center gap-2 text-gray-500 dark:text-mono-light transition-colors duration-500">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12L12 0L1.44 12L0 10.56L12 21.12L24 10.56L22.56 12Z" />
      </svg>
      <span className="font-semibold text-lg">SAIFUL ALAM RAFI</span>
    </div>
)

export type Theme = 'light' | 'dark';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>('dark');
  
  useEffect(() => {
     // Set initial theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setLoading(false);
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500); 
      }
    }, 1500);

    const canvas = document.getElementById('plexus-bg') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: {x: number; y: number; vx: number; vy: number}[] = [];
    const particleCount = 40; // Reduced for a subtler effect
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 0.3 - 0.15,
            vy: Math.random() * 0.3 - 0.15,
        });
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = document.documentElement.classList.contains('dark');
        const particleColor = isDark ? 'rgba(224, 224, 224, 0.5)' : 'rgba(55, 65, 81, 0.5)';

        particles.forEach((p) => {
            const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
            if (distToMouse < 200) {
                const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
                const force = (200 - distToMouse) * 0.03;
                p.x += Math.cos(angle) * force;
                p.y += Math.sin(angle) * force;
            }
            
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const lineColor = isDark ? `rgba(160, 160, 160, ${1 - dist / 150})` : `rgba(107, 114, 128, ${1 - dist / 150})`;
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 0.3;
                    ctx.stroke();
                }
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`min-h-screen w-full font-sora text-gray-800 dark:text-mono-white flex flex-col items-center justify-start p-4 sm:p-8 transition-opacity duration-500 relative ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <main className="w-full h-full flex-grow flex items-center justify-center">
            <div className="w-full max-w-screen-2xl">
              <PortfolioApp theme={theme} onThemeChange={handleThemeChange} />
            </div>
        </main>
        <footer className="mt-12 flex-shrink-0">
          <Logo />
        </footer>
    </div>
  );
}