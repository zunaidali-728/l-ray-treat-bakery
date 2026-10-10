import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useProfileStore from '../store/useProfileStore';
import useAppStore from '../store/useAppStore';
import useWishlistStore from '../store/useWishlistStore';
import SmartImage from '../components/SmartImage';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pt-10">
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-surface relative z-10 w-full max-w-lg rounded-[2rem] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-outline-variant/20 mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-headline text-2xl font-bold text-on-surface">{title}</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { profile, addresses, isLoading, fetchProfile, updateProfileInfo, addAddress, deleteAddress } = useProfileStore();
    const { isDarkMode, toggleDarkMode, language, setLanguage } = useAppStore();
    const wishlistItems = useWishlistStore(state => state.items);

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

    // Profile Edit State
    const [editForm, setEditForm] = useState({ full_name: '', contact_number: '' });
    
    // Address Edit State
    const [addressForm, setAddressForm] = useState({ title: '', address_line: '' });

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user, fetchProfile]);

    useEffect(() => {
        if (profile) {
            setEditForm({ full_name: profile.full_name || '', contact_number: profile.contact_number || '' });
        }
    }, [profile]);

    if (!user) {
        return (
            <main className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-6">account_circle</span>
                <h1 className="font-headline text-4xl mb-4">Guest Experience</h1>
                <p className="mb-8 text-on-surface-variant max-w-md mx-auto">Please log in to view your profile, cinematic rewards, and order history.</p>
                <button 
                    onClick={() => navigate('/login')} 
                    className="clay-button bg-primary px-12 py-4 rounded-full text-white font-headline tracking-widest uppercase transition-all">
                    Login
                </button>
            </main>
        );
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const success = await updateProfileInfo(editForm);
        if (success) setIsEditProfileOpen(false);
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        const success = await addAddress(addressForm);
        if (success) {
            setAddressForm({ title: '', address_line: '' });
            setIsAddAddressOpen(false);
        }
    };

    const createdDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently';

    return (
        <main className="min-h-screen bg-[#faf8f6] dark:bg-[#1f1a18] transition-colors duration-500 pb-32 overflow-hidden">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"}}></div>
            
            {/* Cinematic Header */}
            <section className="relative pt-32 pb-16 w-full flex flex-col items-center">
                {/* Abstract Soft Gradient Backdrop */}
                <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-[#ffd3c2]/30 via-[#fff0e6]/10 to-[#faf8f6] dark:from-[#3a2010]/30 dark:to-[#1f1a18] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center mt-8">
                    <div className="w-32 h-32 rounded-full p-1 bg-white/50 backdrop-blur-md border border-white/40 shadow-[0_10px_30px_rgba(166,59,16,0.1)] mb-6 overflow-hidden">
                        <SmartImage alt="Avatar" src={profile?.avatar_url || "https://ui-avatars.com/api/?name="+encodeURIComponent(profile?.full_name || user.email)+"&background=a63b10&color=fff&size=150"}/>
                    </div>
                    <p className="font-label text-[10px] uppercase tracking-[0.4em] text-[#a63b10] dark:text-[#ffb59d] font-bold mb-8">
                        The Connoisseur Member
                    </p>

                    {/* Stats */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-4xl px-6">
                        <div className="flex-1 bg-[#ffebe3] dark:bg-[#3d2417] text-[#4a2411] dark:text-[#ffd6c4] rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4)] border border-transparent dark:border-[#52301f]">
                            <span className="material-symbols-outlined text-2xl mb-4">restaurant</span>
                            <p className="font-label text-[9px] uppercase tracking-[0.2em] opacity-70 mb-1">Total Orders</p>
                            <p className="font-headline text-3xl font-black">42</p>
                        </div>
                        <div className="flex-1 bg-[#ffebe3] dark:bg-[#3d2417] text-[#4a2411] dark:text-[#ffd6c4] rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4)] border border-transparent dark:border-[#52301f]">
                            <span className="material-symbols-outlined text-2xl mb-4" style={{fontVariationSettings: "'FILL' 1"}}>loyalty</span>
                            <p className="font-label text-[9px] uppercase tracking-[0.2em] opacity-70 mb-1">Loyalty Points</p>
                            <p className="font-headline text-3xl font-black">{profile?.loyalty_points || '1,840'}</p>
                        </div>
                        <div className="flex-1 bg-[#ffebe3] dark:bg-[#3d2417] text-[#4a2411] dark:text-[#ffd6c4] rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4)] border border-transparent dark:border-[#52301f]">
                            <span className="material-symbols-outlined text-2xl mb-4">payments</span>
                            <p className="font-label text-[9px] uppercase tracking-[0.2em] opacity-70 mb-1">Total Spent</p>
                            <p className="font-headline text-3xl font-black">₹12,450</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Blocks */}
            <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10 w-full mt-4">

                {/* Personal Info */}
                <div className="bg-[#fff8f5] dark:bg-[#2b221e] rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#f0e3dc] dark:border-[#3b322e]">
                    <div className="flex justify-between items-baseline mb-10">
                        <h2 className="font-headline text-4xl text-[#1a0f0a] dark:text-[#ede0d9]">Personal Info</h2>
                        <button onClick={() => setIsEditProfileOpen(true)} className="font-body text-sm font-semibold text-[#8b6118] border-b border-[#8b6118]/30 pb-0.5 hover:text-[#5f3f04] dark:hover:text-[#f8bc51] transition-colors">Update Records</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16">
                        <div>
                            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#7a6a60] dark:text-[#a09187] mb-2 font-bold">Full Name</p>
                            <p className="font-body text-lg text-[#261811] dark:text-[#dfd1ca] border-b border-[#e6dcd6] dark:border-[#453c37] pb-4">{profile?.full_name || '—'}</p>
                        </div>
                        <div>
                            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#7a6a60] dark:text-[#a09187] mb-2 font-bold">Email Address</p>
                            <p className="font-body text-lg text-[#261811] dark:text-[#dfd1ca] border-b border-[#e6dcd6] dark:border-[#453c37] pb-4 truncate">{user.email}</p>
                        </div>
                        <div>
                            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#7a6a60] dark:text-[#a09187] mb-2 font-bold">Contact Number</p>
                            <p className="font-body text-lg text-[#261811] dark:text-[#dfd1ca] border-b border-[#e6dcd6] dark:border-[#453c37] pb-4">{profile?.contact_number || '—'}</p>
                        </div>
                        <div>
                            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#7a6a60] dark:text-[#a09187] mb-2 font-bold">Member Since</p>
                            <p className="font-body text-lg text-[#261811] dark:text-[#dfd1ca] border-b border-[#e6dcd6] dark:border-[#453c37] pb-4">{createdDate}</p>
                        </div>
                    </div>
                </div>

                {/* Saved Addresses */}
                <div className="bg-[#fff8f5] dark:bg-[#2b221e] rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#f0e3dc] dark:border-[#3b322e]">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="font-headline text-3xl text-[#1a0f0a] dark:text-[#ede0d9]">Saved Addresses</h2>
                        <button onClick={() => setIsAddAddressOpen(true)} className="w-10 h-10 rounded-full bg-[#f2e6dc] dark:bg-[#4d3e35] flex items-center justify-center text-[#5f4100] dark:text-[#f8bc51] hover:bg-[#e8dad0] transition-colors">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                    {isLoading ? (
                        <p className="text-sm opacity-50 py-4">Loading atlas...</p>
                    ) : addresses.length === 0 ? (
                        <p className="text-sm text-[#7a6a60] dark:text-[#a09187] italic py-4">No sanctuaries saved yet.</p>
                    ) : (
                        <div className="space-y-6">
                            {addresses.map((addr) => (
                                <div key={addr.id} className="flex items-center gap-6 p-2 group">
                                    <div className="w-14 h-14 rounded-[1.2rem] bg-[#fcdbd0] dark:bg-[#52291b] flex flex-shrink-0 items-center justify-center text-[#802a06] dark:text-[#ffb396]">
                                        <span className="material-symbols-outlined">{addr.title.toLowerCase().includes('work') || addr.title.toLowerCase().includes('studio') ? 'work' : 'home'}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-body font-bold text-[#2a170f] dark:text-[#f0e0d5] text-lg">{addr.title}</h4>
                                        <p className="font-body text-sm text-[#7a6a60] dark:text-[#a09187] opacity-90">{addr.address_line}</p>
                                    </div>
                                    <button onClick={() => deleteAddress(addr.id)} className="opacity-0 group-hover:opacity-100 p-2 text-[#ba1a1a] transition-all">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Atmosphere & Preferences */}
                <div className="bg-[#fff8f5] dark:bg-[#2b221e] rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#f0e3dc] dark:border-[#3b322e]">
                    <h2 className="font-headline text-3xl text-[#1a0f0a] dark:text-[#ede0d9] mb-8">Atmosphere</h2>
                    
                    <div className="flex items-center justify-between mb-8 cursor-pointer group" onClick={toggleDarkMode}>
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-[#7e5700] dark:text-[#f8bc51] text-2xl group-hover:rotate-12 transition-transform">dark_mode</span>
                            <span className="font-body font-semibold text-lg text-[#1a0f0a] dark:text-[#ede0d9]">Cinematic Dark Mode</span>
                        </div>
                        {/* Toggle Pill */}
                        <div className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors duration-300 ${isDarkMode ? 'bg-[#7e5700]' : 'bg-[#e8dad0] dark:bg-[#4d3e35]'}`}>
                            <div className={`w-6 h-6 rounded-full bg-white dark:bg-[#ffdeab] shadow-sm transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <label className="font-label text-[10px] uppercase tracking-[0.2em] text-[#7a6a60] dark:text-[#a09187] font-bold block mb-4">Dialect Preference</label>
                        <div className="flex gap-4">
                            {['English', 'Bengali', 'Hindi'].map(lang => (
                                <button 
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={`px-6 py-2.5 rounded-full font-body text-sm font-semibold transition-all shadow-sm
                                        ${language === lang 
                                            ? 'bg-[#7e5700] text-white border border-[#7e5700] dark:bg-[#f8bc51] dark:text-[#281900] dark:border-[#f8bc51]' 
                                            : 'bg-transparent text-[#504539] dark:text-[#d4c4b5] border border-[#d4c4b0] dark:border-[#52453c] hover:border-[#7e5700]'
                                        }`}>
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button onClick={() => navigate('/wishlist')} className="w-full flex items-center justify-between p-4 rounded-[1.5rem] hover:bg-[#fff0e6] dark:hover:bg-[#382b24] transition-colors border border-transparent hover:border-[#ffd6c4] dark:hover:border-[#4d3a31] group">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-[#a63b10] dark:text-[#fd7a4c] group-hover:scale-110 transition-transform">favorite</span>
                                <span className="font-body font-semibold text-lg text-[#1a0f0a] dark:text-[#ede0d9]">My Wishlist</span>
                            </div>
                            <span className="bg-[#fd7a4c] text-[#ffffff] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                                {wishlistItems.length} Items
                            </span>
                        </button>
                        
                        <button onClick={() => navigate('/profile/payment-methods')} className="w-full flex items-center justify-between p-4 rounded-[1.5rem] hover:bg-[#fff0e6] dark:hover:bg-[#382b24] transition-colors border border-transparent hover:border-[#ffd6c4] dark:hover:border-[#4d3a31] group">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-[#a63b10] dark:text-[#fd7a4c] group-hover:scale-110 transition-transform">credit_card</span>
                                <span className="font-body font-semibold text-lg text-[#1a0f0a] dark:text-[#ede0d9]">Payment Methods</span>
                            </div>
                            <span className="material-symbols-outlined text-[#a09187] group-hover:text-[#a63b10] transition-colors">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Logout Button */}
                <button 
                    onClick={() => { logout(); navigate('/login'); }}
                    className="w-full bg-[#fcebe6] dark:bg-[#3a2010] text-[#a63b10] dark:text-[#ffb59d] py-5 rounded-[1.5rem] font-label text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#fcdbd0] dark:hover:bg-[#4f2a13] transition-colors flex items-center justify-center gap-3 shadow-sm">
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Sign Out Protocol
                </button>
            </div>

            {/* Modals */}
            <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} title="Update Personal Info">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div>
                        <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Full Name</label>
                        <input required value={editForm.full_name} onChange={e=>setEditForm({...editForm, full_name: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary/50 shadow-inner text-on-surface transition-shadow" placeholder="Your Name" type="text"/>
                    </div>
                    <div>
                        <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Contact Number</label>
                        <input value={editForm.contact_number} onChange={e=>setEditForm({...editForm, contact_number: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary/50 shadow-inner text-on-surface transition-shadow" placeholder="+91 00000 00000" type="text"/>
                    </div>
                    <button type="submit" className="w-full py-4 mt-6 bg-primary text-on-primary rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">Save Changes</button>
                </form>
            </Modal>

            <Modal isOpen={isAddAddressOpen} onClose={() => setIsAddAddressOpen(false)} title="Add Sanctuary">
                <form onSubmit={handleAddAddress} className="space-y-6">
                    <div>
                        <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Address Title</label>
                        <input required value={addressForm.title} onChange={e=>setAddressForm({...addressForm, title: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary/50 shadow-inner text-on-surface transition-shadow" placeholder="E.g., Director's Studio" type="text"/>
                    </div>
                    <div>
                        <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Full Address</label>
                        <textarea required value={addressForm.address_line} onChange={e=>setAddressForm({...addressForm, address_line: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary/50 shadow-inner text-on-surface h-24 resize-none transition-shadow" placeholder="14/2 Bishop Lefroy Road..." />
                    </div>
                    <button type="submit" className="w-full py-4 mt-6 bg-primary text-on-primary rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">Save Address</button>
                </form>
            </Modal>
        </main>
    );
}
