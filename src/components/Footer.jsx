import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-100 pt-20 border-t-0 mb-20 md:mb-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 pb-20 w-full max-w-screen-2xl mx-auto">
        <div>
          <h2 className="text-3xl font-serif text-amber-900 mb-4">L'RAY Treat</h2>
          <p className="font-body text-stone-600 max-w-xs leading-relaxed">Experience the intersection of Bengali cinematic intellectualism and artisan bakery craftsmanship.</p>
        </div>
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] text-stone-400 mb-6">Navigation</h4>
          <ul className="space-y-3 font-body text-sm">
            <li><Link to="/home" className="text-stone-500 hover:text-amber-600 transition-all">Home</Link></li>
            <li><Link to="/menu" className="text-amber-700 underline underline-offset-4 font-bold transition-all">Menu</Link></li>
            <li><Link to="/custom-cake" className="text-stone-500 hover:text-amber-600 transition-all">Custom Cakes</Link></li>
            <li><Link to="/about" className="text-stone-500 hover:text-amber-600 transition-all">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] text-stone-400 mb-6">Contact</h4>
          <ul className="space-y-3 font-body text-sm text-stone-600">
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> Park Street, Kolkata</li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">call</span> +91 98765 43210</li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span> hello@lraytreat.com</li>
          </ul>
        </div>
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] text-stone-400 mb-6">Newsletter</h4>
          <div className="relative flex items-center">
            <input className="w-full bg-white border border-outline-variant/30 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ring-amber-500 text-sm" placeholder="Cinematic updates..." type="email"/>
            <button className="absolute right-2 material-symbols-outlined text-amber-700">arrow_forward</button>
          </div>
        </div>
      </div>
      <div className="bg-amber-900 py-6 px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-screen-2xl mx-auto">
          <span className="text-[10px] font-label uppercase tracking-widest text-amber-200">© {new Date().getFullYear()} L'RAY Treat. Kolkata's 1st Satyajit Ray-Themed Café.</span>
          <div className="flex items-center gap-3 md:gap-5 z-10 relative">
            {/* Chat Icon - Primary Action */}
            <button 
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-contact')); }}
              aria-label="Open Contact Modal"
              className="text-amber-200 hover:text-white transition-all duration-300 ease-out cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(253,230,138,0.5)] flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[40px] leading-none">chat</span>
            </button>
            
            {/* Instagram Icon - Secondary Action */}
            <a 
              href="https://www.instagram.com/l_ray_treat/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit Instagram Profile"
              className="flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <img 
                src="/Instagram-Icon.png" 
                alt="Instagram" 
                className="w-auto h-[28px] object-contain opacity-80 hover:opacity-100 transition-all duration-300 ease-out hover:scale-[1.15] hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(253,230,138,0.3)] scale-110 origin-center" 
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
