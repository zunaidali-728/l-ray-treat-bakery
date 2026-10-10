import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="deep-bg font-body overflow-hidden h-screen w-screen flex flex-col items-center justify-center relative">
      {/* Cinematic Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Parallax Background Image */}
        <div className="absolute inset-0 scale-110 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpvovgJg1J3kJOpuWvNHZ3izH962jrRsdxxrI1WbhqsvyeznmwvCETPlQ2PkFwMQaIGHjYpcTasIFVkAjmJTuHYAeYAr4kHFjBjnsyvlJCOLFjyxblVcYTr8Hjip0pEBUbKyL39RPIF5IA-3889a0DDkBrUh7-tjQ74PD-hDVLTdJ9kcyrUILGPm2yhAUo_SDL5_947kQjDhad82rAOF3hNBHGfKUmQmjUyr7YdV3VyU6bb2ovMRGEyjhU4Y4MBuquPbz1SPHc2UM8')", filter: "grayscale(40%) contrast(120%) brightness(30%)"}}></div>
        {/* Film Grain Overlay */}
        <div className="absolute inset-0 z-10 film-grain"></div>
        {/* Amber Gradient Sweep */}
        <div className="absolute inset-x-0 bottom-0 h-[716px] z-20 cinematic-gradient"></div>
      </div>
      
      {/* Main Content Shell */}
      <main className="relative z-30 flex flex-col items-center max-w-2xl px-6 text-center">
        {/* Animated Logo & Iconography Section */}
        <div className="mb-12 relative flex flex-col items-center">
          {/* Spinning Reel/Cake Morph Representation */}
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            {/* Outer Spinning Frame */}
            <div className="absolute inset-0 border-4 border-dashed border-primary-container/30 rounded-full reel-spin"></div>
            {/* Central Icon */}
            <span className="material-symbols-outlined text-primary-container text-7xl select-none logo-glow" style={{fontVariationSettings: "'FILL' 1, 'wght' 200"}}>
              movie_filter
            </span>
            {/* Secondary Icon Overlay */}
            <div className="absolute -bottom-2 -right-2 bg-surface-container-highest p-2 rounded-full shadow-lg">
              <span className="material-symbols-outlined text-secondary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>
                bakery_dining
              </span>
            </div>
          </div>
          
          {/* Brand Typography */}
          <h1 className="font-headline font-black italic text-6xl md:text-7xl tracking-tighter text-surface-container-highest mb-3 logo-glow">
            L'RAY Treat
          </h1>
          <p className="font-label text-primary-fixed uppercase tracking-[0.3em] text-sm md:text-base font-light">
            The 1st Themed Bakery Café in Newtown
          </p>
        </div>
        
        {/* Progress Indicator Shell */}
        <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mb-12">
          <div className="h-full bg-surface-container-low w-3/4 shadow-[0_0_10px_rgba(255,241,236,0.5)]"></div>
        </div>
      </main>
      
      {/* Bottom Metadata Anchor */}
      <footer className="absolute bottom-12 z-30 w-full flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-2">
          <span className="h-[1px] w-8 bg-primary-container/40"></span>
          <span className="font-label text-primary-fixed/60 text-[10px] uppercase tracking-[0.5em]">Kolkata • West Bengal</span>
          <span className="h-[1px] w-8 bg-primary-container/40"></span>
        </div>
        <p className="font-label text-surface-container-low/40 text-[11px] uppercase tracking-[0.2em]">
          New Town, Kolkata · Action Area 1B
        </p>
      </footer>
      
      {/* Edge Decorative Elements */}
      <div className="absolute top-12 left-12 z-30 opacity-20 hidden md:block">
        <p className="font-label text-primary-container text-[10px] uppercase vertical-rl tracking-[1em]">SCENE 01 / TAKE 01</p>
      </div>
      <div className="absolute top-12 right-12 z-30 opacity-20 hidden md:block text-right">
        <p className="font-label text-primary-container text-[10px] uppercase vertical-rl tracking-[1em]">ESTD. 2024</p>
      </div>
    </div>
  );
}
