import { Link, useNavigate, useLocation } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import { useState, useRef } from 'react';
import useAuthStore from '../store/useAuthStore';

export default function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, type } = location.state || { email: '', type: 'email' };
  
  const verifyOtpCode = useAuthStore(state => state.verifyOtpCode);
  const updatePassword = useAuthStore(state => state.updatePassword);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  
  // viewState can be 'otp' or 'new-password'
  const [viewState, setViewState] = useState('otp');
  
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorInput, setErrorInput] = useState('');

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow pasting
    if (value.length > 1) {
        const pasted = value.slice(0, 6).split('');
        for(let i=0; i<pasted.length; i++) {
           if(index+i < 6) newOtp[index+i] = pasted[i];
        }
        setOtp(newOtp);
        const focusIndex = Math.min(index + pasted.length, 5);
        inputRefs.current[focusIndex].focus();
        return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const token = otp.join('');
    if (token.length < 6) {
        setErrorInput("Please enter the full 6-digit code.");
        return;
    }
    if (!email) {
        setErrorInput("No email was found in session. Please start over.");
        return;
    }

    try {
      setLoading(true);
      setErrorInput('');
      await verifyOtpCode(email, token, type === 'recovery' ? 'recovery' : 'email');
      
      if (type === 'recovery') {
          setViewState('new-password');
      } else {
          navigate('/home');
      }
    } catch (err) {
      setErrorInput(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
      e.preventDefault();
      if (newPass !== confirmPass) {
          setErrorInput("Passwords do not match.");
          return;
      }
      try {
          setLoading(true);
          setErrorInput('');
          await updatePassword(newPass);
          navigate('/home');
      } catch (err) {
          setErrorInput(err.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed w-screen overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'}}></div>
      
      <main className="flex-grow flex items-center justify-center px-6 py-20 relative overflow-hidden z-10 w-full">
        {/* Asymmetric Decorative Background Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-surface-container-high rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-48 -right-48 w-[32rem] h-[32rem] bg-secondary-fixed-dim rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        
        <div className="clay-card shadow-[20px_20px_40px_rgba(42,23,15,0.08),inset_8px_8px_16px_rgba(255,255,255,0.8),inset_-8px_-8px_16px_rgba(126,87,0,0.05)] bg-[#fff1ec] rounded-[3rem] w-full max-w-lg p-10 md:p-16 flex flex-col items-center text-center relative z-10">
          
          {/* Icon Container */}
          <div className="mb-10 relative">
            <div className="w-24 h-24 bg-surface-container-highest rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-5xl text-primary">{viewState === 'otp' ? 'cell_tower' : 'key'}</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-container rounded-full flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-sm text-on-secondary-container" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
            </div>
          </div>
          
          {/* Typography */}
          <h1 className="font-headline text-4xl md:text-5xl font-black text-on-background tracking-tight italic mb-4 border-b-0">
            {viewState === 'otp' ? "Verify It's You" : "Reset Password"}
          </h1>
          <p className="text-stone-600 font-body text-lg mb-12">
            {viewState === 'otp' ? (
                <>
                We've sent a secret artisanal code to<br/>
                <span className="font-label font-bold text-on-surface tracking-widest">{email || 'your email'}</span>
                </>
            ) : "Enter a new secure password below to complete your recovery."}
          </p>
          
          {viewState === 'otp' ? (
              <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
                <div className="flex gap-3 md:gap-4 mb-12 justify-center w-full">
                  {otp.map((data, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={data}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        autoComplete="one-time-code" 
                        className="bg-transparent border-0 border-b-2 border-outline-variant text-center text-2xl font-label w-12 py-2 focus:outline-none focus:border-primary focus:ring-0 transition-colors" 
                        maxLength="6" 
                        placeholder="•" 
                        type="text" 
                      />
                  ))}
                </div>
                
                {errorInput && (
                    <div className="w-full p-3 bg-red-100 text-red-700 text-sm font-body rounded-md mb-8">
                    {errorInput}
                    </div>
                )}
                
                {/* CTA */}
                <button disabled={loading} type="submit" className="w-full py-5 rounded-full text-on-primary-container font-label font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all bg-[#c8922a] shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(0,0,0,0.2)] disabled:opacity-50">
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>
          ) : (
             <form onSubmit={handlePasswordUpdate} className="w-full">
                <div className="space-y-6 text-left w-full mb-8">
                    <div className="flex flex-col">
                        <label className="font-label text-xs uppercase tracking-wider text-outline mb-2 ml-1">New Password</label>
                        <input value={newPass} onChange={(e) => setNewPass(e.target.value)} className="bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none py-2 px-1 transition-colors text-on-surface focus:ring-0" placeholder="••••••••" type="password" required/>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-label text-xs uppercase tracking-wider text-outline mb-2 ml-1">Confirm Password</label>
                        <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none py-2 px-1 transition-colors text-on-surface focus:ring-0" placeholder="••••••••" type="password" required/>
                    </div>
                </div>
                
                {errorInput && (
                    <div className="w-full p-3 bg-red-100 text-red-700 text-sm font-body rounded-md mb-8 text-center text-left">
                    {errorInput}
                    </div>
                )}

                <button disabled={loading} type="submit" className="w-full py-5 rounded-full text-on-primary-container font-label font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all bg-[#c8922a] shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(0,0,0,0.2)] disabled:opacity-50">
                  {loading ? 'Updating...' : 'Set Complete Route'}
                </button>
             </form>
          )}
          
          {/* Decorative Link */}
          {viewState === 'otp' && (
              <Link to="/login" className="mt-8 text-stone-400 font-label text-xs uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
                Having trouble? Return to Login
              </Link>
          )}
        </div>
        
        {/* Cinema-Inspired Background Graphic */}
        <div className="hidden lg:block absolute left-10 md:left-20 bottom-10 md:bottom-20 w-48 md:w-64 opacity-20 filter grayscale contrast-125 pointer-events-none">
          <SmartImage alt="Vintage film reel" className="rounded-xl grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDupli5i9FxhIYy9wMqY5hu2nXdbFQ5J6FbBdyaHZyaeh1tPmCTi7JgXKB9Iw65M-hFBRLANy7r5tvNM-h8qBwonzrKchmHoHJW1vXRYqhzVvA_M4kWPF25H1W5Uso8oMxq0qzsxA_i8ZMZs5Fw1rlqOfVUHpA_6LCIwzfBoL1G8J7hkhLtwn2k5i374_5Nogdn2Ws1AfZppw0MZBF6ferRkfiWYaDMkHgq3LmDQmubF9V-RPdnf4Kse-Og2gKXJ4rCYaYOg8ZMiIJu"/>
        </div>
      </main>
    </div>
  );
}
