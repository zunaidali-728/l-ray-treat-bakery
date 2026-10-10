import { Link, useNavigate } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const sendPasswordReset = useAuthStore(state => state.sendPasswordReset);
  
  const [email, setEmail] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setErrorInput('');
        await sendPasswordReset(email);
        navigate('/otp', { state: { email, type: 'recovery' } });
    } catch (err) {
        setErrorInput(err.message);
    } finally {
        setLoading(false);
    }
  };
  return (
    <div className="bg-background text-on-background font-body min-h-screen relative overflow-x-hidden w-screen flex items-center justify-center selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none film-grain z-[100]"></div>
      
      {/* Cinematic Background Element */}
      <div className="fixed inset-0 z-0">
        <SmartImage className="w-full h-full object-cover opacity-10 filter grayscale-[20%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdSfYPu3yypX76KSzCFPvJ8Pa08wqO3Cfs6iDZZNhWRNjBoXXg8R0VUic0tdp3dYdQ-p6W_tzFYUPrU0vtDAvQ9YglJX8WzGN2MlxM1--Ku_Lm4GKEZDx8uLW7ZVI8VPsprBYG46I-PxROJRjKMsuT8-OylyQGJ052KMTxQQF3WeBlmuTif8gfogZ5mV4whaHF91lYfO2Bb_envx_3B2Z1FP4D6jb1EV7tFfGeoMbvv-uEwzW6eIIdipgAHA2EmEA0vMoZXxNS0GlT" alt="Café detailed background"/>
      </div>
      
      {/* Background Vignette/Frame Decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none shadow-[inset_0_0_150px_rgba(42,23,15,0.15)] z-20"></div>
      
     {/* Decorative Cinematic Element: Asymmetric Frame */}
      <div className="fixed top-12 right-12 w-32 h-32 md:w-64 md:h-64 opacity-20 pointer-events-none z-0">
        <div className="w-full h-full border-t border-r border-outline-variant absolute top-0 right-0"></div>
        <div className="absolute top-4 right-4 text-[10px] font-label text-outline uppercase whitespace-nowrap rotate-90 origin-top-right tracking-[0.5em]">Scene 04: Recovery</div>
      </div>
      
      {/* Main Content Canvas */}
      <main className="relative z-10 w-full max-w-lg p-6 md:p-12">
        {/* Branding Header */}
        <div className="text-center mb-12">
          <h1 className="font-headline italic text-4xl font-black tracking-tight text-on-surface mb-2 border-b-0">L'RAY Treat</h1>
          <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary">Cinematic Artisan Bakery</p>
        </div>
        
        {/* Container */}
        <div className="shadow-[inset_10px_10px_20px_#fff1ec,inset_-10px_-10px_20px_#ffffff,0_20px_40px_rgba(42,23,15,0.08)] bg-[#fff8f6] rounded-[3rem] p-10 md:p-14 relative overflow-hidden backdrop-blur-sm">
          
          {/* Step Navigation Visualization (Subtle) */}
          <div className="flex justify-center gap-3 mb-10">
            <div className="h-1 w-8 rounded-full bg-primary/40"></div>
            <div className="h-1 w-8 rounded-full bg-primary/40"></div>
            <div className="h-1 w-8 rounded-full bg-primary"></div>
          </div>
          
          {/* Input Form  */}
          <div className="flex flex-col items-center">
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-8 border-b-0">Reset Password</h2>
            
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-2">
                <label className="font-label text-xs text-on-surface-variant ml-1 font-bold tracking-widest">REGISTERED EMAIL</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-0 border-b border-outline-variant py-3 focus:ring-0 focus:border-primary transition-colors text-lg font-medium" placeholder="ray.t@calcutta.com" type="email" required/>
              </div>
              
              {errorInput && (
                <div className="p-3 bg-red-100 text-red-700 text-sm font-body rounded-md mt-4">
                  {errorInput}
                </div>
              )}
              
              <button disabled={loading} type="submit" className="w-full py-4 bg-primary-container text-on-primary-container rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-md mt-6 disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Recovery OTP'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Global Actions */}
        <div className="mt-12 text-center pointer-events-auto relative z-30">
          <Link className="inline-flex items-center gap-2 group" to="/login">
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="font-label text-sm uppercase tracking-wider text-secondary border-b-2 border-secondary/20 pb-0.5 group-hover:border-secondary transition-colors">Return to Login</span>
          </Link>
        </div>
      </main>
      
      {/* Footer Identity */}
      <footer className="fixed bottom-0 w-full p-8 z-30 pointer-events-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto opacity-40 grayscale">
          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface">© 2024 L'RAY Treat • Recovery Shell</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span className="material-symbols-outlined text-sm">info</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
