import { useState } from 'react';
import SmartImage from '../components/SmartImage';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
export default function Signup() {
  const navigate = useNavigate();
  const signUp = useAuthStore(state => state.signUp);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorInput("Passwords do not match");
      return;
    }
    
    if (phone.length !== 10) {
      setErrorInput("Mobile number must be exactly 10 digits");
      return;
    }
    
    try {
      setLoading(true);
      setErrorInput('');
      await signUp(email, password, { full_name: name });
      navigate('/home'); 
    } catch (err) {
      setErrorInput(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden w-screen">
      <div className="fixed inset-0 z-0 film-grain pointer-events-none"></div>
      <main className="relative min-h-screen flex items-center justify-center py-12 px-4 overflow-hidden z-10 w-full">
        {/* Background Artistic Elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-surface-variant/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Registration Container */}
        <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-0 clay-card overflow-hidden shadow-[inset_8px_8px_16px_#ffffff,inset_-8px_-8px_16px_rgba(42,23,15,0.05),0_20px_40px_rgba(42,23,15,0.08)] bg-[#fff1ec] rounded-[3rem]">
          {/* Side Visual (Cinematic Frame) */}
          <div className="hidden md:block md:col-span-5 relative overflow-hidden group">
            <SmartImage className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 desaturate-[0.2]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNIiq27sANFqbKqE4uPW_wUM2Xpc6G6AMHZJbD223y15Y0ul-zplnzBiDLRlHPGP_om9wpoY08jvNvXnno4xdvh7UPPOFTkrngJ1rx5bmplEFapVH1Eim32kGsPWl-FkO6lXfoUl6Fjntr2QHqyo_SxX2dnccwfok-eeAI8uod00xyTN026vmfbiWVRKVVZ4u7_yHCoCr-rN7Z-BbIzK-AKbdNeCMdOflUIS0DUjL65IStHyF3BwXmc_TOKHi-7GPOWS4A5gOMcO1Y"/>
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent"></div>
            <div className="absolute bottom-12 left-8 right-8 text-surface">
              <h2 className="font-headline italic text-4xl mb-4 leading-tight border-b-0">Crafting Memories, <br/>One Treat at a Time.</h2>
              <p className="font-label text-xs uppercase tracking-[0.2em] opacity-80">Established in the heart of Kolkata</p>
            </div>
          </div>
          
          {/* Form Content */}
          <div className="md:col-span-7 p-8 md:p-16 flex flex-col justify-center">
            <div className="mb-10 text-center md:text-left">
              <h1 className="font-headline font-black text-4xl text-on-surface mb-2 tracking-tight border-b-0">L'RAY Treat</h1>
              <p className="font-label text-xs uppercase tracking-widest text-primary mb-8">Create Your Account</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSignup}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label className="font-label text-xs uppercase tracking-wider text-outline mb-2 ml-1">Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none py-2 px-1 transition-colors text-on-surface focus:ring-0" placeholder="Satyajit Ray" type="text" required/>
                </div>
                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-label text-xs uppercase tracking-wider text-outline mb-2 ml-1">Email Address</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none py-2 px-1 transition-colors text-on-surface focus:ring-0" placeholder="ray@cinema.com" type="email" required/>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mobile Number */}
                <div className="flex flex-col">
                  <label className="font-label text-xs uppercase tracking-wider text-outline mb-2 ml-1">Mobile Number</label>
                  <input 
                    value={phone}
                    onChange={(e) => {
                      const cleanVal = e.target.value.replace(/\D/g, '');
                      if (cleanVal.length <= 10) {
                        setPhone(cleanVal);
                        if (errorInput === "Mobile number must be exactly 10 digits" && cleanVal.length === 10) setErrorInput('');
                      }
                    }}
                    className="bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none py-2 px-1 transition-colors text-on-surface focus:ring-0" 
                    placeholder="9830000000" 
                    type="tel" 
                    maxLength="10"
                    required
                  />
                </div>
                {/* Date of Birth */}
                <div className="flex flex-col">
                  <label className="font-label text-xs uppercase tracking-wider text-outline mb-2 ml-1">Date of Birth (For Rewards)</label>
                  <input className="bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none py-2 px-1 transition-colors text-on-surface focus:ring-0" type="date"/>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div className="flex flex-col relative">
                  <label className="font-label text-xs uppercase tracking-wider text-outline mb-2 ml-1">Password</label>
                  <div className="relative">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none py-2 px-1 transition-colors text-on-surface focus:ring-0 pr-10" placeholder="••••••••" type={showPassword ? "text" : "password"} required/>
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
                {/* Confirm Password */}
                <div className="flex flex-col relative">
                  <label className="font-label text-xs uppercase tracking-wider text-outline mb-2 ml-1">Confirm Password</label>
                  <div className="relative">
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none py-2 px-1 transition-colors text-on-surface focus:ring-0 pr-10" placeholder="••••••••" type={showConfirmPassword ? "text" : "password"} required/>
                    <button 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none" 
                      type="button">
                      <span className="material-symbols-outlined text-xl">
                        {showConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gender (Optional) */}
                <div className="flex flex-col">
                  <label className="font-label text-xs uppercase tracking-wider text-outline mb-2 ml-1">Gender (Optional)</label>
                  <select className="bg-transparent border-0 border-b border-outline-variant focus:border-primary outline-none py-2 px-1 transition-colors text-on-surface appearance-none cursor-pointer focus:ring-0" defaultValue="">
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 pt-2">
                <input className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="terms" type="checkbox" required/>
                <label className="text-sm text-on-surface-variant leading-tight" htmlFor="terms">
                  I agree to the <a className="text-secondary font-medium hover:underline" href="#">Terms &amp; Conditions</a> and <a className="text-secondary font-medium hover:underline" href="#">Privacy Policy</a> of L'RAY Treat.
                </label>
              </div>
              
              {errorInput && (
                <div className="p-3 bg-red-100 text-red-700 text-sm font-body rounded-md mt-4">
                  {errorInput}
                </div>
              )}
              
              {/* CTA Button */}
              <button disabled={loading} className="w-full py-4 rounded-xl text-on-primary-container font-headline italic font-bold text-lg mt-4 flex items-center justify-center gap-2 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(0,0,0,0.2),0_10px_20px_rgba(126,87,0,0.2)] bg-[#c8922a] hover:scale-[0.98] disabled:opacity-50 transition-all duration-300" type="submit">
                {loading ? 'Registering...' : "Join the L'RAY Family"}
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
              
              {/* Social Login Section */}
              <div className="pt-8 mt-8 border-t border-outline-variant/30 text-center">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-outline mb-6">Or continue with your cinematic journey via</p>
                <div className="flex justify-center gap-6">
                  <button className="group flex items-center justify-center w-12 h-12 rounded-full shadow-md bg-[#fff1ec] transition-all hover:bg-surface-container" type="button">
                    <SmartImage alt="Google" className="w-5 h-5 opacity-80 group-hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk5TquoD881F5abxM509xISylFDlbYOJSsguoKYm8xd8f3-iSZx7UFl7i00H5xk3Jw-YiuepxCMi_iz-1RzXsha3KGJmXb2V2OgUTxw9cLgz7J1ESb-twPKjjJVYSgGGAGGoFb64oRP9WfpLChFcAKrhlHvRQdHBsId_AfI0un_a-dzjft9FmilsGZSQB9QOo-A5bx8-wFbuIMk4_7TX0v3A0EKEHXeiqBfEg455sth-rz_TgrQ9-2qULO07bvUIkROB3yVsW187IQ"/>
                  </button>
                  <button className="group flex items-center justify-center w-12 h-12 rounded-full shadow-md bg-[#fff1ec] transition-all hover:bg-surface-container" type="button">
                    <span className="material-symbols-outlined text-on-surface opacity-80 group-hover:opacity-100" style={{fontVariationSettings: "'FILL' 1"}}>social_leaderboard</span>
                  </button>
                  <button className="group flex items-center justify-center w-12 h-12 rounded-full shadow-md bg-[#fff1ec] transition-all hover:bg-surface-container" type="button">
                    <span className="material-symbols-outlined text-on-surface opacity-80 group-hover:opacity-100" style={{fontVariationSettings: "'FILL' 1"}}>ios</span>
                  </button>
                </div>
              </div>
              <p className="text-center text-sm text-on-surface-variant mt-8">
                Already have an account? <Link className="text-primary font-bold hover:underline" to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      
      {/* Footer Attribution (Minimal) */}
      <footer className="w-full py-8 text-center text-on-surface-variant opacity-60 px-4 relative z-10">
        <p className="font-label text-[10px] uppercase tracking-[0.2em]">© 2024 L'RAY Treat. Kolkata's 1st Satyajit Ray-Themed Café.</p>
      </footer>
    </div>
  );
}
