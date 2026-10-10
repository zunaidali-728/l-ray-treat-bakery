import { useState } from 'react';
import SmartImage from '../components/SmartImage';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorInput('');
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setErrorInput(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 w-full">
      <div className="fixed inset-0 z-0 film-grain pointer-events-none"></div>
      
      {/* Background Cinematic Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-sm z-10"></div>
        <SmartImage alt="Café background" className="w-full h-full object-cover opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEjtY0RfZI5xP-rC8xZBIgFhY5NN0ogasijpYM2y580Owg3aBCV9K0hjMc1q4OkSsK0j00RjjyxyecapoPwaQf9uQVRZT9XAVIaDIl6Pv8j8AHlfnCTcOM8xX8Sm3wj6k_d1837GgVPptTGg46Xmh398ssKhv3Z51dyL4nafqO8x958nlNDnO0ZrI84zcLF_DP_3MDYZE-1V5YSvL5bJKCg4bDdd1iuNgqXS2PPC7k61j6IKnIDy1GeryIg0eJpMlkmAkPyYfnakUx"/>
      </div>
      
      {/* Floating 3D Elements (Decorative) */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden xl:block">
        <div className="absolute top-[10%] left-[12%] filter drop-shadow-[0_15px_30px_rgba(42,23,15,0.15)] animate-bounce" style={{animationDuration: "5s"}}>
          <span className="material-symbols-outlined text-7xl text-primary/30" style={{fontVariationSettings: "'wght' 200"}}>movie</span>
        </div>
        <div className="absolute bottom-[15%] left-[8%] filter drop-shadow-[0_15px_30px_rgba(42,23,15,0.15)] animate-pulse" style={{animationDuration: "4s"}}>
          <span className="material-symbols-outlined text-8xl text-secondary/30" style={{fontVariationSettings: "'wght' 200"}}>local_pizza</span>
        </div>
        <div className="absolute top-[20%] right-[10%] filter drop-shadow-[0_15px_30px_rgba(42,23,15,0.15)] animate-bounce" style={{animationDuration: "6s"}}>
          <span className="material-symbols-outlined text-7xl text-primary-container/30" style={{fontVariationSettings: "'wght' 200"}}>bakery_dining</span>
        </div>
        <div className="absolute bottom-[12%] right-[12%] filter drop-shadow-[0_15px_30px_rgba(42,23,15,0.15)] animate-pulse" style={{animationDuration: "7s"}}>
          <span className="material-symbols-outlined text-6xl text-tertiary/30" style={{fontVariationSettings: "'wght' 200"}}>videocam</span>
        </div>
      </div>
      
      {/* Login Container */}
      <main className="relative z-20 w-full max-w-md my-auto flex flex-col items-center">
        <div className="clay-card p-6 sm:p-8 shadow-[0_20px_40px_rgba(42,23,15,0.08),inset_8px_8px_16px_rgba(255,255,255,0.4),inset_-8px_-8px_16px_rgba(126,87,0,0.05)] rounded-3xl bg-[#fff1ec] w-full">
          {/* Brand & Header */}
          <div className="text-center mb-5">
            <h2 className="font-headline font-black text-2xl sm:text-3xl tracking-tight text-on-surface mb-1 border-b-0">L'RAY Treat</h2>
            <div className="h-0.5 w-10 bg-secondary mx-auto mb-2 rounded-full opacity-40"></div>
            <h1 className="font-headline italic text-xl sm:text-2xl text-on-surface leading-tight border-b-0">Welcome Back to the Treat!</h1>
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mt-1.5">A Satyajit Ray Inspired Experience</p>
          </div>
          
          {/* Form */}
          <form className="space-y-3.5" onSubmit={handleLogin}>
            {/* Username/Email Field */}
            <div className="space-y-1">
              <label className="font-label text-[11px] uppercase tracking-wider text-on-surface-variant ml-1 font-semibold" htmlFor="identity">Email or Mobile Number</label>
              <div className="relative group">
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 py-2 font-body text-base transition-colors placeholder:text-outline-variant/50" id="identity" placeholder="e.g. apu.sansar@cinema.com" type="text" required/>
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="font-label text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold" htmlFor="password">Password</label>
              </div>
              <div className="relative group">
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 py-2 font-body text-base transition-colors placeholder:text-outline-variant/50 pr-8" 
                  id="password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  required/>
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none" 
                  type="button">
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
            
            {/* Remember & Forgot */}
            <div className="flex items-center justify-between font-body text-xs px-1 pt-0.5">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary/20 transition-all cursor-pointer" type="checkbox"/>
                <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Remember Me</span>
              </label>
              <Link className="text-secondary font-semibold hover:underline underline-offset-4 transition-all" to="/forgot-password">Forgot Password?</Link>
            </div>
            
            {errorInput && (
              <div className="p-2.5 bg-red-100 text-red-700 text-xs font-body rounded-md">
                {errorInput}
              </div>
            )}
            
            {/* Primary CTA */}
            <div className="pt-2">
                <button 
                  disabled={loading}
                  className="clay-button-primary w-full py-3 rounded-full text-white font-headline text-lg italic tracking-wide hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all" type="submit">
                  {loading ? 'Authenticating...' : 'Login'}
                </button>
            </div>
          </form>
          
          {/* Social Login Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute inset-x-0 h-px bg-outline-variant opacity-20"></div>
            <span className="relative px-4 bg-[#fff1ec] font-label text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/70">Or continue with</span>
          </div>
          
          {/* Social Buttons Bento-esque Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" className="bg-[#fff8f6] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(42,23,15,0.05)] flex items-center justify-center space-x-2 py-2 px-3 rounded-full hover:scale-[1.02] active:scale-95 transition-transform">
              <SmartImage alt="Google" className="w-4 h-4 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVbLZhz2nWbOTzx0DTp1u_tuveCtptxgLxuXHLm6ypMYAKo4XeGfSIDlgSYURDqI0seZZMBAlUpgTMUq6wLgMhQiSTyryMZkjofudyBii0u9R51eT5QKRJ6tNbtwHRqLGPYL_0OarW25nY3dyM4c81zt5fGaAZMQOQWobas9DZ1eccmBwxDbZCNTws12Fclm-G_Ri0h8VhVYWh5WcchSBtxk-2YQar_GMvJb1Y6UG77lUH5Jyp1dcaMMYNnXFhRT8dZCQXdNVkB-vu"/>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold">Google</span>
            </button>
            <button type="button" className="bg-[#fff8f6] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(42,23,15,0.05)] flex items-center justify-center space-x-2 py-2 px-3 rounded-full hover:scale-[1.02] active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-lg text-on-surface-variant">phone_iphone</span>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold">Mobile OTP</span>
            </button>
            <button type="button" className="bg-[#fff8f6] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(42,23,15,0.05)] flex items-center justify-center space-x-2 py-2 px-3 rounded-full hover:scale-[1.02] active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-lg text-on-surface-variant">ios</span>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold">Apple</span>
            </button>
            <button type="button" className="bg-[#fff8f6] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(42,23,15,0.05)] flex items-center justify-center space-x-2 py-2 px-3 rounded-full hover:scale-[1.02] active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-lg text-on-surface-variant">social_leaderboard</span>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold">Facebook</span>
            </button>
          </div>
          
          {/* Footer Links */}
          <div className="mt-4 text-center">
            <p className="font-body text-xs text-on-surface-variant">
              New to the Ray's Universe? 
              <Link className="text-secondary font-bold hover:underline underline-offset-4 ml-1" to="/signup">Create Account</Link>
            </p>
          </div>
        </div>
        
        {/* Semantic Back Action */}
        <div className="mt-3 text-center">
          <Link className="inline-flex items-center space-x-1.5 text-on-surface/60 hover:text-on-surface transition-colors font-label text-[10px] uppercase tracking-widest" to="/">
            <span className="material-symbols-outlined text-xs">arrow_back</span>
            <span>Return to Cinema Home</span>
          </Link>
        </div>

        {/* Bottom Copyright Disclaimer */}
        <p className="mt-2 text-center font-label text-[9px] uppercase tracking-[0.25em] text-on-surface-variant/40">
          © 2024 L'RAY Treat • Kolkata's 1st Satyajit Ray-Themed Café
        </p>
      </main>
    </div>
  );
}
