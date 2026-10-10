import { Link, useNavigate } from 'react-router-dom';
import SmartImage from '../components/SmartImage';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDF6EC] font-body text-on-surface overflow-hidden h-screen w-full relative flex flex-col justify-between py-2 sm:py-4">
      <div className="fixed inset-0 z-0 film-grain pointer-events-none"></div>
      
      {/* Header Brand Anchor */}
      <header className="w-full max-w-md mx-auto px-6 flex justify-between items-center z-20 flex-shrink-0">
        <span className="font-headline font-black text-2xl tracking-tight text-primary">L'RAY Treat</span>
        <Link to="/login" className="font-label text-xs uppercase tracking-widest text-stone-500 hover:text-primary transition-colors">Skip</Link>
      </header>

      {/* Main Content Area */}
      <main className="relative flex-1 min-h-0 w-full flex flex-col justify-center items-center px-4 z-10 my-2">
        {/* Carousel Container */}
        <div className="w-full max-w-md h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar space-x-4">
          {/* Slide 1: Ray's World */}
          <div className="min-w-full h-full snap-center flex items-center justify-center p-1">
            <div className="clay-card w-full h-full p-2.5 flex flex-col overflow-hidden relative rounded-3xl">
              <div className="flex-grow rounded-2xl overflow-hidden min-h-0 relative">
                <SmartImage alt="Satyajit Ray inspired cafe interior" className="w-full h-full object-cover grayscale-[0.3] sepia-[0.2]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpi--0V-wx4RLbGX0qYrCaYJOwDK3iU2kZyEUJXYDdcEcHzo-j5WATulKYOwb-rVd4OQJ64LOA56FZugP_avQFy3d8nbo8BVioZDQV6NzZ-wS2ErhkDjZ4f6wELN7m3pUB_QWw2bODjAzv3Z2R_WL-d30el3vKgy33NU-nSxwEL2t-MUk_PC3akeenudRx2IQVdhQe9HR4N3khjELNox3OO0Fhduf1DwJeKCdO4BJdqxCGaSzfEGiQOZpQKpMWdYuzKxJq1kZrZBZ-"/>
              </div>
              <div className="p-4 sm:p-5 text-center bg-transparent flex-shrink-0">
                <h2 className="font-headline italic text-xl sm:text-2xl font-bold text-on-surface mb-1.5 border-b-0">Step Into Ray's World</h2>
                <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed max-w-[280px] mx-auto">Immerse yourself in a space where cinematic heritage meets artisan comfort.</p>
              </div>
            </div>
          </div>

          {/* Slide 2: Artisan Bakes */}
          <div className="min-w-full h-full snap-center flex items-center justify-center p-1">
            <div className="clay-card w-full h-full p-2.5 flex flex-col overflow-hidden relative rounded-3xl">
              <div className="flex-grow rounded-2xl overflow-hidden min-h-0 relative">
                <SmartImage alt="Artisan bakes and pizzas" className="w-full h-full object-cover contrast-125 saturate-[0.8]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALpMIQZTY3MUJ5l3WkTQlzvSc1Wb_pWPT1JLlFS5Kik-UFe6PJq8B_oi3jKB4FldO5TCnOYGKMPFL6A9hRZRIp6E0zJZklMaS99EJKkkFwDZ2L-N-t-ZQgvnzVFMtJvu7d12z-LOHJqJUFdFmhb7rY_MmJrRWKfKDMJDOQl9BAYBJzWV8-z_j0Y-ggxx-0RNsrY0gh3s0oJpwCGtTFRkjbCLNjpgJLafhLsqTDPifzYLW5vftZAxomiSTmC370_yGARA8fLHU3hlUO"/>
              </div>
              <div className="p-4 sm:p-5 text-center bg-transparent flex-shrink-0">
                <h2 className="font-headline italic text-xl sm:text-2xl font-bold text-on-surface mb-1.5 border-b-0">Artisan Bakes &amp; Pizzas</h2>
                <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed max-w-[280px] mx-auto">Hand-crafted flavors inspired by tradition and baked to perfection.</p>
              </div>
            </div>
          </div>

          {/* Slide 3: Order/Reserve */}
          <div className="min-w-full h-full snap-center flex items-center justify-center p-1">
            <div className="clay-card w-full h-full p-2.5 flex flex-col overflow-hidden relative rounded-3xl">
              <div className="flex-grow rounded-2xl overflow-hidden min-h-0 relative">
                <SmartImage alt="Restaurant table reservation" className="w-full h-full object-cover sepia-[0.1]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCILwoyQas6uhqtREq2op-Z2Toru0V7t_oZ6NSXAr3p5t0v2RZ1cQ7Ipmrl05OQYlFm-ngzP3Cc0_C_taRl5CgpVrHCImRs0czl8p_LnCkD5brVaK-R0rzKSDFKgp9zxSLbRL7x3wpvX7Km8Tj2SZSRMkq5oQ9kODsAXbXj_sR-PXSH-gmT-13wTH-rMNKI7e7CtbyybO6b4I1GuYnuGlZHyiUv0s4KmAr8uhusUgAxnppBqaka8ItpXcMdfY76zWyqnNYP8OzUkvwE"/>
              </div>
              <div className="p-4 sm:p-5 text-center bg-transparent flex-shrink-0">
                <h2 className="font-headline italic text-xl sm:text-2xl font-bold text-on-surface mb-1.5 border-b-0">Dine-In or Take-Away</h2>
                <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed max-w-[280px] mx-auto">Whether reserving a corner for reflection or ordering a feast home, we've got you covered.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Area with Dots and CTA */}
      <footer className="w-full max-w-md mx-auto px-6 z-20 flex flex-col items-center flex-shrink-0">
        {/* Pagination Dots */}
        <div className="flex space-x-2 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-outline-variant/30"></div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => navigate('/login')}
          className="clay-button-secondary w-full py-3.5 sm:py-4 rounded-xl font-label text-xs sm:text-sm uppercase tracking-[0.2em] text-white font-bold flex items-center justify-center space-x-3 active:scale-95 transition-transform"
        >
          <span>Get Started</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
        <p className="mt-2 text-center font-label text-[10px] uppercase tracking-widest text-stone-400">Kolkata's 1st Satyajit Ray-Themed Café</p>
      </footer>

      {/* Visual Accents */}
      <div className="fixed -bottom-10 -left-10 w-40 h-40 bg-surface-container-highest/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="fixed -top-10 -right-10 w-60 h-60 bg-primary-container/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
    </div>
  );
}
