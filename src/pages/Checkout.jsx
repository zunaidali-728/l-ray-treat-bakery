import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useProfileStore from '../store/useProfileStore';
import useAuthStore from '../store/useAuthStore';
import SmartImage from '../components/SmartImage';

// Glassmorphism Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#2a170f]/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="bg-[#fff8f5] dark:bg-[#2b221e] relative z-10 w-full max-w-2xl rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(42,23,15,0.2)] animate-in fade-in zoom-in-95 duration-300 border border-[#f0e3dc] dark:border-[#3b322e]">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-headline text-3xl font-bold text-[#1a0f0a] dark:text-[#ede0d9]">{title}</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f2e6dc] dark:bg-[#4d3e35] hover:bg-[#e8dad0] transition-colors text-[#5f4100] dark:text-[#f8bc51]">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default function Checkout() {
    const navigate = useNavigate();
    const { items } = useCartStore();
    const { user } = useAuthStore();
    const { addresses, fetchProfile, addAddress, isLoading } = useProfileStore();
    
    // States
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const prevAddressCount = useRef(0);

    // Form State
    const [formData, setFormData] = useState({
        label: '',
        recipientName: '',
        mobileNumber: '',
        flat: '',
        street: '',
        landmark: '',
        area: '',
        city: '',
        pincode: ''
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchProfile();
    }, [user, navigate, fetchProfile]);

    // Auto-select newly added address
    useEffect(() => {
        if (addresses.length > prevAddressCount.current && addresses.length > 0) {
            // New address was added, it's usually at the end of the array
            const newAddress = addresses[addresses.length - 1];
            setSelectedAddressId(newAddress.id);
            setShowError(false);
        }
        prevAddressCount.current = addresses.length;
    }, [addresses]);

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = cartTotal >= 499 || cartTotal === 0 ? 0 : 50;
    const finalAmount = cartTotal + deliveryFee;

    const handleContinue = () => {
        if (!selectedAddressId) {
            setShowError(true);
            setTimeout(() => setShowError(false), 600); // 600ms corresponds to the animation length
            return;
        }
        navigate('/payment', { state: { totalDue: finalAmount, addressId: selectedAddressId } });
    };

    const handleSaveAddress = async (e) => {
        e.preventDefault();
        const fullAddressLine = `${formData.recipientName} (${formData.mobileNumber}), ${formData.flat}, ${formData.street}, ${formData.landmark ? formData.landmark + ', ' : ''}${formData.area}, ${formData.city} - ${formData.pincode}`;
        
        const newAddress = { title: formData.label || 'Home', address_line: fullAddressLine };
        const success = await addAddress(newAddress);
        
        if (success) {
            setIsModalOpen(false);
            setFormData({ label: '', recipientName: '', mobileNumber: '', flat: '', street: '', landmark: '', area: '', city: '', pincode: '' });
        }
    };

    const baseCardClass = "bg-[#fff1ec] dark:bg-[#382b24] rounded-[2rem] p-6 cursor-pointer transition-all duration-300 shadow-[inset_4px_4px_8px_rgba(255,219,206,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.3),0_10px_20px_rgba(42,23,15,0.04)]";

    return (
        <div className="bg-[#fff8f6] dark:bg-[#1f1a18] text-[#2a170f] dark:text-[#ede0d9] font-body min-h-screen relative overflow-x-hidden selection:bg-[#ffdeab] selection:text-[#281900]">
            <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"}}></div>
            
            {/* Shake Animation Keyframes */}
            <style>{`
                @keyframes subtleShake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-5px); }
                    40% { transform: translateX(5px); }
                    60% { transform: translateX(-3px); }
                    80% { transform: translateX(3px); }
                }
                .shake-error { animation: subtleShake 0.6s cubic-bezier(.36,.07,.19,.97) both; }
            `}</style>

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen relative z-10">
                {/* Stepper Header */}
                <header className="mb-16 text-center">
                    <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-[#2a170f] dark:text-[#ede0d9] mb-8">Delivery Dossier</h1>
                    <div className="flex items-center justify-center gap-4 text-xs font-label uppercase tracking-widest text-[#a09187]">
                        <span className="opacity-50">01 Cart</span>
                        <div className="h-[1px] w-8 bg-[#827564] opacity-30"></div>
                        <span className="text-[#a63b10] dark:text-[#ffb59d] font-bold border-b border-[#a63b10] pb-1">02 Address</span>
                        <div className="h-[1px] w-8 bg-[#827564] opacity-30"></div>
                        <span className="opacity-50">03 Payment</span>
                        <div className="h-[1px] w-8 bg-[#827564] opacity-30"></div>
                        <span className="opacity-50">04 Confirmation</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,420px)] gap-8 lg:gap-12 items-start">
                    {/* Left Panel: Addresses */}
                    <div className="space-y-12 w-full">
                        
                        {/* Saved Destinations Section */}
                        <section className={showError ? 'shake-error rounded-[2rem] ring-2 ring-[#ba1a1a]/20 p-2 -m-2 transition-all' : 'transition-all'}>
                            <div className="flex justify-between items-baseline mb-6">
                                <h2 className="font-headline text-2xl font-bold">Saved Destinations</h2>
                                {showError && <span className="font-label text-[10px] text-[#ba1a1a] uppercase tracking-widest font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">error</span> Please select or add an address</span>}
                                {!showError && addresses.length > 0 && <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#a63b10] font-bold">DIRECTOR's ARCHIVE</span>}
                            </div>

                            {isLoading ? (
                                <div className="py-12 text-center opacity-50"><p>Loading archives...</p></div>
                            ) : addresses.length === 0 ? (
                                /* Empty State Card */
                                <div onClick={() => setIsModalOpen(true)} className="group border-2 border-dashed border-[#d4c4b0] dark:border-[#52453c] rounded-[2rem] p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#fff1ec] dark:hover:bg-[#382b24] hover:border-[#a63b10] transition-all">
                                    <span className="material-symbols-outlined text-5xl mb-4 text-[#a09187] group-hover:text-[#a63b10] transition-colors">location_on</span>
                                    <h3 className="font-headline text-2xl font-bold mb-2">No saved addresses yet</h3>
                                    <p className="font-label text-xs uppercase tracking-widest text-[#a09187] mb-6">Create your first sanctuary to continue</p>
                                    <button className="bg-[#7e5700] text-white px-8 py-3 rounded-full font-label text-xs uppercase tracking-widest font-bold group-hover:scale-105 transition-transform">Add Address</button>
                                </div>
                            ) : (
                                /* Address Grid */
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {addresses.map((addr) => {
                                        const isSelected = selectedAddressId === addr.id;
                                        return (
                                            <div 
                                                key={addr.id}
                                                onClick={() => { setSelectedAddressId(addr.id); setShowError(false); }}
                                                className={`${baseCardClass} ${isSelected ? 'ring-2 ring-[#7e5700] ring-offset-2 ring-offset-[#fff8f6] dark:ring-offset-[#1f1a18] shadow-[0_10px_30px_rgba(126,87,0,0.15)] bg-[#fff0e6] dark:bg-[#4d3e35]' : 'hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(166,59,16,0.1)]'}`}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="material-symbols-outlined text-[#7e5700] dark:text-[#f8bc51]">{addr.title.toLowerCase().includes('work') || addr.title.toLowerCase().includes('office') ? 'work' : 'home'}</span>
                                                    <span className="font-label text-[9px] uppercase tracking-widest text-[#a09187] font-bold">{addr.title}</span>
                                                </div>
                                                <h3 className="font-headline font-bold text-lg mb-1 truncate">{addr.title}</h3>
                                                <p className="font-body text-xs text-[#504536] dark:text-[#a09187] line-clamp-3 leading-relaxed">{addr.address_line}</p>
                                            </div>
                                        );
                                    })}

                                    {/* + Add New Address Card (Alongside existing ones) */}
                                    <div 
                                        onClick={() => setIsModalOpen(true)}
                                        className="border-2 border-dashed border-[#d4c4b0] dark:border-[#52453c] rounded-[2rem] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#fff1ec] dark:hover:bg-[#382b24] hover:border-[#7e5700] hover:scale-[1.02] transition-all group min-h-[160px]"
                                    >
                                        <span className="material-symbols-outlined text-[#a09187] group-hover:text-[#7e5700] mb-2">add</span>
                                        <h3 className="font-headline font-bold text-[#a09187] group-hover:text-[#7e5700]">Add New Address</h3>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Cinematic Timing (Kept intact) */}
                        <section>
                            <h2 className="font-headline text-2xl font-bold mb-6">Cinematic Timing</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#c8922a] text-white rounded-[1.5rem] p-4 flex items-center gap-4 shadow-[0_10px_20px_rgba(126,87,0,0.2)] cursor-pointer">
                                    <span className="material-symbols-outlined">auto_awesome</span>
                                    <div>
                                        <p className="font-body font-bold text-sm leading-none mb-1">Today</p>
                                        <p className="font-label text-[9px] uppercase tracking-widest opacity-80">BEFORE 9:00 PM</p>
                                    </div>
                                </div>
                                <div className="bg-[#fff1ec] dark:bg-[#382b24] border border-[#f8d2c4] dark:border-[#52453c] rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#ffe2d8] transition-colors">
                                    <span className="material-symbols-outlined text-[#827564]">calendar_today</span>
                                    <div>
                                        <p className="font-body font-bold text-sm leading-none mb-1">Tomorrow</p>
                                        <p className="font-label text-[9px] uppercase tracking-widest text-[#827564]">MORNING 8 - 11 AM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <p className="font-label text-[10px] uppercase tracking-widest text-[#a09187] mb-2 font-bold">SPECIAL INSTRUCTIONS FOR THE BAKER</p>
                                <textarea className="w-full bg-transparent border-0 border-b border-[#d4c4b0] focus:ring-0 focus:border-[#7e5700] px-0 py-2 text-sm italic placeholder:text-[#a09187]/60 resize-none h-12 transition-colors" placeholder="Tell us if you prefer extra golden crust or a handwritten note..."></textarea>
                            </div>
                        </section>
                    </div>

                    {/* Right Panel: Order Summary */}
                    <aside className="relative mt-4 lg:mt-0 lg:sticky lg:top-32 w-full">
                        <div className="bg-[#fff1ec] dark:bg-[#382b24] rounded-[2rem] p-6 md:p-8 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.4),0_20px_40px_rgba(42,23,15,0.04)] mb-6">
                            <h2 className="font-headline text-xl font-bold mb-6">Production Summary</h2>
                            
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-12 h-12 rounded-full shadow-sm border border-[#f0e3dc] dark:border-[#52453c] shrink-0 overflow-hidden">
                                                <SmartImage 
                                                    src={item.image_url} 
                                                    alt={item.name} 
                                                />
                                            </div>
                                            <div>
                                                <p className="font-body font-bold text-sm">{item.name}</p>
                                                <p className="font-label text-[10px] text-[#a09187] tracking-widest">₹{item.price}</p>
                                            </div>
                                        </div>
                                        <span className="font-label text-[10px] uppercase font-bold">x{item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-[#827564]/20 space-y-5">
                                <div className="flex justify-between items-center gap-4 text-xs font-label uppercase tracking-widest">
                                    <span className="text-[#a09187] flex-shrink-0">Subtotal</span>
                                    <span className="font-bold text-right truncate min-w-[80px]">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between items-center gap-4 text-xs font-label uppercase tracking-widest">
                                    <span className="text-[#a09187] flex-shrink-0">Delivery Fee</span>
                                    <span className="font-bold text-right truncate min-w-[80px]">₹{deliveryFee}</span>
                                </div>
                                <div className="flex flex-wrap justify-between items-end gap-3 pt-4 border-t border-[#827564]/10 w-full overflow-hidden">
                                    <span className="font-headline text-lg font-bold whitespace-nowrap">Total Due</span>
                                    <span className="font-headline text-3xl md:text-4xl font-bold text-right truncate min-w-[120px]">₹{finalAmount}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleContinue}
                                className="w-full mt-8 py-5 rounded-[1.5rem] bg-[#c8922a] text-white font-headline text-lg font-bold shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),0_10px_20px_rgba(200,146,42,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                                Continue to Payment
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <div className="text-center mt-4">
                                <span className="font-label text-[8px] uppercase tracking-[0.2em] text-[#a09187]">Secured with Artisan Seals</span>
                            </div>
                        </div>

                        {/* Ray Promise */}
                        <div className="bg-white dark:bg-[#3b322e] rounded-[1.5rem] p-6 shadow-sm flex gap-4 items-start border border-[#f0e3dc] dark:border-[#52453c]">
                            <span className="material-symbols-outlined text-[#a63b10] dark:text-[#ffb59d]">verified</span>
                            <div>
                                <h4 className="font-body font-bold text-sm mb-1 text-[#2a170f] dark:text-[#ede0d9]">The Ray Quality Promise</h4>
                                <p className="font-body text-[10px] text-[#504536] dark:text-[#a09187] leading-relaxed">Every loaf is inspected for theatrical perfection and packaged in sustainable film-grade paper.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Modals */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Address">
                <form onSubmit={handleSaveAddress} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1 border-b border-[#d4c4b0]/40">
                            <label className="font-label text-[10px] uppercase tracking-widest text-[#a09187] block mb-2 font-bold">Address Label</label>
                            <input required value={formData.label} onChange={e=>setFormData({...formData, label: e.target.value})} className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 text-sm focus:border-b-2 focus:border-[#7e5700] transition-colors" placeholder="Home, Studio, Office" type="text"/>
                        </div>
                        <div className="col-span-2 md:col-span-1 border-b border-[#d4c4b0]/40">
                            <label className="font-label text-[10px] uppercase tracking-widest text-[#a09187] block mb-2 font-bold">Recipient Name</label>
                            <input required value={formData.recipientName} onChange={e=>setFormData({...formData, recipientName: e.target.value})} className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 text-sm focus:border-b-2 focus:border-[#7e5700] transition-colors" placeholder="Satyajit Ray" type="text"/>
                        </div>
                        <div className="border-b border-[#d4c4b0]/40">
                            <label className="font-label text-[10px] uppercase tracking-widest text-[#a09187] block mb-2 font-bold">Mobile Number</label>
                            <input required value={formData.mobileNumber} onChange={e=>setFormData({...formData, mobileNumber: e.target.value})} className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 text-sm focus:border-b-2 focus:border-[#7e5700] transition-colors" placeholder="+91 98765 43210" type="text"/>
                        </div>
                        <div className="border-b border-[#d4c4b0]/40">
                            <label className="font-label text-[10px] uppercase tracking-widest text-[#a09187] block mb-2 font-bold">Flat / House No.</label>
                            <input required value={formData.flat} onChange={e=>setFormData({...formData, flat: e.target.value})} className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 text-sm focus:border-b-2 focus:border-[#7e5700] transition-colors" placeholder="32/A" type="text"/>
                        </div>
                        <div className="col-span-2 border-b border-[#d4c4b0]/40">
                            <label className="font-label text-[10px] uppercase tracking-widest text-[#a09187] block mb-2 font-bold">Street Name</label>
                            <input required value={formData.street} onChange={e=>setFormData({...formData, street: e.target.value})} className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 text-sm focus:border-b-2 focus:border-[#7e5700] transition-colors" placeholder="Bishop Lefroy Road" type="text"/>
                        </div>
                        <div className="border-b border-[#d4c4b0]/40">
                            <label className="font-label text-[10px] uppercase tracking-widest text-[#a09187] block mb-2 font-bold">Landmark</label>
                            <input value={formData.landmark} onChange={e=>setFormData({...formData, landmark: e.target.value})} className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 text-sm focus:border-b-2 focus:border-[#7e5700] transition-colors" placeholder="Near Victoria Memorial" type="text"/>
                        </div>
                        <div className="border-b border-[#d4c4b0]/40">
                            <label className="font-label text-[10px] uppercase tracking-widest text-[#a09187] block mb-2 font-bold">Area / Locality</label>
                            <input required value={formData.area} onChange={e=>setFormData({...formData, area: e.target.value})} className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 text-sm focus:border-b-2 focus:border-[#7e5700] transition-colors" placeholder="Bhowanipore" type="text"/>
                        </div>
                        <div className="border-b border-[#d4c4b0]/40">
                            <label className="font-label text-[10px] uppercase tracking-widest text-[#a09187] block mb-2 font-bold">City</label>
                            <input required value={formData.city} onChange={e=>setFormData({...formData, city: e.target.value})} className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 text-sm focus:border-b-2 focus:border-[#7e5700] transition-colors" placeholder="Kolkata" type="text"/>
                        </div>
                        <div className="border-b border-[#d4c4b0]/40">
                            <label className="font-label text-[10px] uppercase tracking-widest text-[#a09187] block mb-2 font-bold">Pincode</label>
                            <input required value={formData.pincode} onChange={e=>setFormData({...formData, pincode: e.target.value})} className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 text-sm focus:border-b-2 focus:border-[#7e5700] transition-colors" placeholder="700020" type="text"/>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-4 mt-8 bg-[#c8922a] text-white rounded-[1.5rem] font-headline text-lg font-bold shadow-[0_10px_20px_rgba(200,146,42,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">Save Context</button>
                </form>
            </Modal>

        </div>
    );
}
