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
    <div className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen relative flex items-center justify-center overflow-hidden w-screen">
      <div className="fixed inset-0 z-0 film-grain pointer-events-none"></div>
      
      {/* Background Cinematic Canvas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-sm z-10"></div>
        <SmartImage alt="Café background" className="w-full h-full object-cover opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEjtY0RfZI5xP-rC8xZBIgFhY5NN0ogasijpYM2y580Owg3aBCV9K0hjMc1q4OkSsK0j00RjjyxyecapoPwaQf9uQVRZT9XAVIaDIl6Pv8j8AHlfnCTcOM8xX8Sm3wj6k_d1837GgVPptTGg46Xmh398ssKhv3Z51dyL4nafqO8x958nlNDnO0ZrI84zcLF_DP_3MDYZE-1V5YSvL5bJKCg4bDdd1iuNgqXS2PPC7k61j6IKnIDy1GeryIg0eJpMlkmAkPyYfnakUx"/>
      </div>
      
      {/* Floating 3D Elements (Decorative) */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
        <div className="absolute top-[10%] left-[15%] filter drop-shadow-[0_15px_30px_rgba(42,23,15,0.15)] animate-bounce" style={{animationDuration: "5s"}}>
          <span className="material-symbols-outlined text-8xl text-primary/40" style={{fontVariationSettings: "'wght' 200"}}>movie</span>
        </div>
        <div className="absolute bottom-[20%] left-[10%] filter drop-shadow-[0_15px_30px_rgba(42,23,15,0.15)] animate-pulse" style={{animationDuration: "4s"}}>
          <span className="material-symbols-outlined text-9xl text-secondary/40" style={{fontVariationSettings: "'wght' 200"}}>local_pizza</span>
        </div>
        <div className="absolute top-[25%] right-[12%] filter drop-shadow-[0_15px_30px_rgba(42,23,15,0.15)] animate-bounce" style={{animationDuration: "6s"}}>
          <span className="material-symbols-outlined text-8xl text-primary-container/40" style={{fontVariationSettings: "'wght' 200"}}>bakery_dining</span>
        </div>
        <div className="absolute bottom-[10%] right-[15%] filter drop-shadow-[0_15px_30px_rgba(42,23,15,0.15)] animate-pulse" style={{animationDuration: "7s"}}>
          <span className="material-symbols-outlined text-7xl text-tertiary/40" style={{fontVariationSettings: "'wght' 200"}}>videocam</span>
        </div>
      </div>
      
      {/* Login Container */}
      <main className="relative z-20 w-full max-w-xl px-6 py-12">
        <div className="clay-card p-8 md:p-12 shadow-[0_20px_40px_rgba(42,23,15,0.08),inset_8px_8px_16px_rgba(255,255,255,0.4),inset_-8px_-8px_16px_rgba(126,87,0,0.05)] rounded-[3rem] bg-[#fff1ec]">
          {/* Brand & Header */}
          <div className="text-center mb-10">
            <h2 className="font-headline font-black text-4xl tracking-tight text-on-surface mb-2 border-b-0">L'RAY Treat</h2>
            <div className="h-0.5 w-12 bg-secondary mx-auto mb-8 rounded-full opacity-30"></div>
            <h1 className="font-headline italic text-3xl md:text-4xl text-on-surface leading-tight border-b-0">Welcome Back to the Treat!</h1>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mt-4">A Satyajit Ray Inspired Experience</p>
          </div>
          
          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username/Email Field */}
            <div className="space-y-1">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-1" htmlFor="identity">Email or Mobile Number</label>
              <div className="relative group">
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 py-3 font-body text-lg transition-colors placeholder:text-outline-variant/50" id="identity" placeholder="e.g. apu.sansar@cinema.com" type="text"/>
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant" htmlFor="password">Password</label>
              </div>
              <div className="relative group">
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 py-3 font-body text-lg transition-colors placeholder:text-outline-variant/50" 
                  id="password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}/>
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none" 
                  type="button">
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
            
            {/* Remember & Forgot */}
            <div className="flex items-center justify-between font-body text-sm px-1">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input className="w-5 h-5 rounded-md border-outline-variant text-secondary focus:ring-secondary/20 transition-all cursor-pointer" type="checkbox"/>
                <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Remember Me</span>
              </label>
              <Link className="text-secondary font-semibold hover:underline underline-offset-4 transition-all" to="/forgot-password">Forgot Password?</Link>
            </div>
            
            {errorInput && (
              <div className="p-3 bg-red-100 text-red-700 text-sm font-body rounded-md">
                {errorInput}
              </div>
            )}
            
            {/* Primary CTA */}
            <div className="pt-4">
                <button 
                  disabled={loading}
                  className="clay-button-primary w-full py-4 rounded-full text-white font-headline text-xl italic tracking-wide hover:brightness-110 disabled:opacity-50 transition-all" type="submit">
                  {loading ? 'Authenticating...' : 'Login'}
                </button>
            </div>
          </form>
          
          {/* Social Login Divider */}
          <div className="relative my-10 flex items-center justify-center">
            <div className="absolute inset-x-0 h-px bg-outline-variant opacity-20"></div>
            <span className="relative px-6 bg-[#fff1ec] font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70">Or continue with</span>
          </div>
          
          {/* Social Buttons Bento-esque Grid */}
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-[#fff8f6] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(42,23,15,0.05)] flex items-center justify-center space-x-3 py-3 rounded-full hover:scale-[1.02] transition-transform">
              <SmartImage alt="Google" className="w-5 h-5 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVbLZhz2nWbOTzx0DTp1u_tuveCtptxgLxuXHLm6ypMYAKo4XeGfSIDlgSYURDqI0seZZMBAlUpgTMUq6wLgMhQiSTyryMZkjofudyBii0u9R51eT5QKRJ6tNbtwHRqLGPYL_0OarW25nY3dyM4c81zt5fGaAZMQOQWobas9DZ1eccmBwxDbZCNTws12Fclm-G_Ri0h8VhVYWh5WcchSBtxk-2YQar_GMvJb1Y6UG77lUH5Jyp1dcaMMYNnXFhRT8dZCQXdNVkB-vu"/>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold">Google</span>
            </button>
            <button className="bg-[#fff8f6] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(42,23,15,0.05)] flex items-center justify-center space-x-3 py-3 rounded-full hover:scale-[1.02] transition-transform">
              <span className="material-symbols-outlined text-xl text-on-surface-variant">phone_iphone</span>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold">Mobile OTP</span>
            </button>
            <button className="bg-[#fff8f6] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(42,23,15,0.05)] flex items-center justify-center space-x-3 py-3 rounded-full hover:scale-[1.02] transition-transform">
              <span className="material-symbols-outlined text-xl text-on-surface-variant">ios</span>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold">Apple</span>
            </button>
            <button className="bg-[#fff8f6] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(42,23,15,0.05)] flex items-center justify-center space-x-3 py-3 rounded-full hover:scale-[1.02] transition-transform">
              <span className="material-symbols-outlined text-xl text-on-surface-variant">social_leaderboard</span>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold">Facebook</span>
            </button>
          </div>
          
          {/* Footer Links */}
          <div className="mt-12 text-center">
            <p className="font-body text-on-surface-variant">
              New to the Ray's Universe? 
              <Link className="text-secondary font-bold hover:underline underline-offset-4 ml-1" to="/signup">Create Account</Link>
            </p>
          </div>
        </div>
        
        {/* Semantic Back Action */}
        <div className="mt-8 text-center">
          <Link className="inline-flex items-center space-x-2 text-on-surface/60 hover:text-on-surface transition-colors font-label text-[10px] uppercase tracking-widest" to="/">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Return to Cinema Home</span>
          </Link>
        </div>
      </main>
      
      {/* Bottom Copyright Disclaimer (Subtle) */}
      <footer className="fixed bottom-6 w-full text-center z-20 pointer-events-none">
        <p className="font-label text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/40">
            © 2024 L'RAY Treat • Kolkata's 1st Satyajit Ray-Themed Café
        </p>
      </footer>
    </div>
  );
}
