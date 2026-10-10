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
    <div className="bg-background text-on-background font-body min-h-screen relative overflow-x-hidden w-full flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none film-grain z-[100]"></div>
      
      {/* Cinematic Background Element */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SmartImage className="w-full h-full object-cover opacity-10 filter grayscale-[20%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdSfYPu3yypX76KSzCFPvJ8Pa08wqO3Cfs6iDZZNhWRNjBoXXg8R0VUic0tdp3dYdQ-p6W_tzFYUPrU0vtDAvQ9YglJX8WzGN2MlxM1--Ku_Lm4GKEZDx8uLW7ZVI8VPsprBYG46I-PxROJRjKMsuT8-OylyQGJ052KMTxQQF3WeBlmuTif8gfogZ5mV4whaHF91lYfO2Bb_envx_3B2Z1FP4D6jb1EV7tFfGeoMbvv-uEwzW6eIIdipgAHA2EmEA0vMoZXxNS0GlT" alt="Café detailed background"/>
      </div>
      
      {/* Background Vignette/Frame Decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none shadow-[inset_0_0_150px_rgba(42,23,15,0.15)] z-20"></div>
      
      {/* Main Content Canvas */}
      <main className="relative z-10 w-full max-w-md my-auto flex flex-col items-center">
        {/* Branding Header */}
        <div className="text-center mb-5">
          <h1 className="font-headline italic text-2xl sm:text-3xl font-black tracking-tight text-on-surface mb-1 border-b-0">L'RAY Treat</h1>
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">Cinematic Artisan Bakery</p>
        </div>
        
        {/* Container */}
        <div className="shadow-[inset_10px_10px_20px_#fff1ec,inset_-10px_-10px_20px_#ffffff,0_20px_40px_rgba(42,23,15,0.08)] bg-[#fff8f6] rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm w-full">
          
          {/* Step Navigation Visualization (Subtle) */}
          <div className="flex justify-center gap-2.5 mb-6">
            <div className="h-1 w-8 rounded-full bg-primary/40"></div>
            <div className="h-1 w-8 rounded-full bg-primary/40"></div>
            <div className="h-1 w-8 rounded-full bg-primary"></div>
          </div>
          
          {/* Input Form  */}
          <div className="flex flex-col items-center text-center">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4 border-b-0">Reset Password</h2>
            <p className="text-stone-500 font-body text-xs mb-6 max-w-xs">Enter your registered email address to receive your recovery code.</p>
            
            <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
              <div className="space-y-1">
                <label className="font-label text-[10px] text-on-surface-variant ml-1 font-bold tracking-widest">REGISTERED EMAIL</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-0 border-b border-outline-variant py-2 focus:ring-0 focus:border-primary transition-colors text-base font-medium" placeholder="ray.t@calcutta.com" type="email" required/>
              </div>
              
              {errorInput && (
                <div className="p-2.5 bg-red-100 text-red-700 text-xs font-body rounded-md">
                  {errorInput}
                </div>
              )}
              
              <button disabled={loading} type="submit" className="w-full py-3 bg-primary-container text-on-primary-container rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-md mt-4 disabled:opacity-50 text-sm tracking-wide">
                {loading ? 'Sending...' : 'Send Recovery OTP'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Global Actions */}
        <div className="mt-4 text-center pointer-events-auto relative z-30">
          <Link className="inline-flex items-center gap-1.5 group text-xs" to="/login">
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="font-label uppercase tracking-wider text-secondary border-b border-secondary/20 pb-0.5 group-hover:border-secondary transition-colors">Return to Login</span>
          </Link>
        </div>

        {/* Footer Identity */}
        <p className="mt-3 text-center font-label text-[9px] uppercase tracking-widest text-on-surface/40">© 2024 L'RAY Treat • Recovery Shell</p>
      </main>
    </div>
  );
}
