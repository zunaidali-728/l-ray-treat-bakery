import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import CakeVisualizer from '../components/CakeVisualizer';

const CustomCake = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthStore();
    
    // Component State
    const [submitting, setSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        full_name: user?.user_metadata?.full_name || '',
        contact_number: '',
        occasion_date: '',
        shape: 'Round',
        size: '1kg',
        tiers: 1,
        flavour: 'Vanilla Bean',
        frosting: 'Buttercream',
        frosting_color: '#fdfbf7', // Default cream
        decorations: [],
        theme: 'Cinematic',
        message: '',
        vision: ''
    });

    // Preset Options
    const shapes = ['Round', 'Square', 'Heart', 'Tier'];
    const sizes = ['500g', '1kg', '1.5kg', '2kg', 'Custom'];
    const flavours = [
        { name: 'Vanilla Bean', color: '#f3e5ab' },
        { name: 'Dark Chocolate', color: '#3B1F0C' },
        { name: 'Red Velvet', color: '#8B0000' },
        { name: 'Pistachio', color: '#93C572' },
        { name: 'Mango', color: '#FFD700' },
        { name: 'Black Forest', color: '#4A0404' }
    ];
    const frostings = ['Buttercream', 'Whipped Cream', 'Fondant', 'Ganache', 'Mirror Glaze'];
    const frostingColors = [
        '#fdfbf7', '#faddd1', '#e18a99', '#c4697c', '#C1440E', 
        '#3B1F0C', '#D4A017', '#e7f0c3', '#a4cbb4', '#84b6f4', '#cda434', '#e6e6fa'
    ];
    const decorationOptions = ['Fresh Flowers', 'Edible Gold Leaf', 'Macarons', 'Drip Effect', 'Sprinkles', 'Fruit Topping', 'Figurines', 'Cinema Reel Topper'];
    const themes = ['Cinematic', 'Floral', 'Minimal Elegant', 'Rustic', 'Vintage Film Noir', 'Festive', 'Custom'];

    // Real-time Pricing Logic
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    useEffect(() => {
        let base = 800; // Starting base
        if (formData.size === '1kg') base += 600;
        if (formData.size === '1.5kg') base += 1200;
        if (formData.size === '2kg') base += 1800;
        if (formData.shape === 'Tier') base += ((formData.tiers - 1) * 1000);
        if (formData.frosting === 'Fondant' || formData.frosting === 'Mirror Glaze') base += 500;
        
        const decoCost = formData.decorations.length * 150;
        if (formData.decorations.includes('Edible Gold Leaf')) base += 300;
        
        setEstimatedPrice(base + decoCost);
    }, [formData]);

    // Handlers
    const handleToggleDeco = (deco) => {
        setFormData(prev => ({
            ...prev,
            decorations: prev.decorations.includes(deco) 
                ? prev.decorations.filter(d => d !== deco)
                : [...prev.decorations, deco]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        setSubmitting(true);
        try {
            const { error } = await supabase.from('custom_cakes').insert({
                user_id: user.id,
                full_name: formData.full_name,
                contact_number: formData.contact_number,
                occasion_date: formData.occasion_date,
                shape: formData.shape,
                size: formData.size,
                tiers: formData.shape === 'Tier' ? formData.tiers : 1,
                flavour: formData.flavour,
                frosting: formData.frosting,
                frosting_color: formData.frosting_color,
                decorations: formData.decorations,
                theme: formData.theme,
                message: formData.message,
                vision: formData.vision,
                estimated_price: estimatedPrice,
                status: 'pending_approval'
            });

            if (error) throw error;
            
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/my-cakes');
            }, 3000);

        } catch (error) {
            console.error("Error submitting custom cake:", error);
            alert("Failed to submit custom cake request. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <main className="pt-32 pb-24 px-6 max-w-[1440px] mx-auto min-h-screen">
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <span className="font-label text-sm uppercase tracking-[0.3em] text-[#C1440E] font-bold mb-4 block">The Director's Chair</span>
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-[#3B1F0C] dark:text-[#FAF3E8] mb-6">Design Your <br/><span className="italic font-normal text-[#D4A017]">Masterpiece</span></h1>
                <p className="font-body text-lg text-stone-600 dark:text-stone-400 leading-relaxed">Control every frame. Use our real-time interactive studio to conceptualize the perfect cinematic confection for your special moment.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
                
                {/* LEFT PANEL: Builder Controls */}
                <div className="lg:col-span-7 clay-card bg-[#FAF3E8] dark:bg-[#2A180E] rounded-[2rem] p-8 shadow-xl border border-[#3B1F0C]/10 h-full max-h-[800px] overflow-y-auto custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        
                        {/* 1. Personal Details */}
                        <section>
                            <h3 className="font-label text-sm uppercase tracking-[0.2em] text-[#C1440E] font-bold mb-6 border-b border-[#3B1F0C]/10 pb-2">1. The Protagonist</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input required type="text" placeholder="Your Name" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full bg-transparent border-0 border-b-2 border-[#3B1F0C]/20 focus:ring-0 focus:border-[#C1440E] px-0 py-2 text-[#3B1F0C] dark:text-[#FAF3E8] transition-colors" />
                                <input required type="tel" maxLength="10" placeholder="Contact Number" value={formData.contact_number} onChange={e => setFormData({...formData, contact_number: e.target.value.replace(/\D/g, '')})} className="w-full bg-transparent border-0 border-b-2 border-[#3B1F0C]/20 focus:ring-0 focus:border-[#C1440E] px-0 py-2 text-[#3B1F0C] dark:text-[#FAF3E8] transition-colors" />
                                <input required type="date" value={formData.occasion_date} onChange={e => setFormData({...formData, occasion_date: e.target.value})} className="w-full md:col-span-2 bg-transparent border-0 border-b-2 border-[#3B1F0C]/20 focus:ring-0 focus:border-[#C1440E] px-0 py-2 text-[#3B1F0C] dark:text-[#FAF3E8] transition-colors" />
                            </div>
                        </section>

                        {/* 2. Shape & Size */}
                        <section>
                            <h3 className="font-label text-sm uppercase tracking-[0.2em] text-[#C1440E] font-bold mb-6 border-b border-[#3B1F0C]/10 pb-2">2. Structure & Scale</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold uppercase text-stone-500 mb-3 block">Silhouette</label>
                                    <div className="flex flex-wrap gap-3">
                                        {shapes.map(s => (
                                            <button type="button" key={s} onClick={() => setFormData({...formData, shape: s})} className={`px-5 py-2.5 rounded-full font-label text-xs uppercase tracking-widest font-bold transition-all border ${formData.shape === s ? 'bg-[#3B1F0C] text-[#FAF3E8] border-[#3B1F0C] shadow-md' : 'border-[#3B1F0C]/20 text-stone-600 hover:border-[#C1440E]'}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {formData.shape === 'Tier' && (
                                    <div className="animate-in fade-in zoom-in-95 duration-300">
                                        <label className="text-xs font-bold uppercase text-stone-500 mb-3 block">Verticality (Tiers)</label>
                                        <input type="range" min="1" max="3" value={formData.tiers} onChange={e => setFormData({...formData, tiers: Number(e.target.value)})} className="w-full accent-[#C1440E]" />
                                        <div className="flex justify-between px-2 mt-2 text-xs font-label"><span>1</span><span>2</span><span>3</span></div>
                                    </div>
                                )}

                                <div>
                                    <label className="text-xs font-bold uppercase text-stone-500 mb-3 block">Size Rating</label>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map(s => (
                                            <button type="button" key={s} onClick={() => setFormData({...formData, size: s})} className={`px-4 py-2 rounded-full font-label text-[10px] uppercase tracking-widest font-bold transition-all border ${formData.size === s ? 'bg-[#D4A017] text-[#3B1F0C] border-[#D4A017]' : 'border-[#3B1F0C]/20 text-stone-500 hover:border-[#D4A017]'}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Flavour */}
                        <section>
                            <h3 className="font-label text-sm uppercase tracking-[0.2em] text-[#C1440E] font-bold mb-6 border-b border-[#3B1F0C]/10 pb-2">3. The Essence (Sponge)</h3>
                            <div className="flex flex-wrap gap-3">
                                {flavours.map(f => (
                                    <button type="button" key={f.name} onClick={() => setFormData({...formData, flavour: f.name})} className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-label text-xs tracking-wide transition-all border ${formData.flavour === f.name ? 'bg-white shadow-sm border-[#D4A017] text-[#3B1F0C]' : 'border-transparent bg-stone-100 dark:bg-stone-800 text-stone-600 hover:bg-stone-200'}`}>
                                        <span className="w-3 h-3 rounded-full border border-stone-300" style={{backgroundColor: f.color}}></span>
                                        {f.name}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 4. Frosting */}
                        <section>
                            <h3 className="font-label text-sm uppercase tracking-[0.2em] text-[#C1440E] font-bold mb-6 border-b border-[#3B1F0C]/10 pb-2">4. Cinematography (Coating)</h3>
                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-2">
                                    {frostings.map(f => (
                                        <button type="button" key={f} onClick={() => setFormData({...formData, frosting: f})} className={`px-4 py-2 rounded-full font-label text-[10px] uppercase tracking-widest font-bold transition-all border ${formData.frosting === f ? 'bg-[#3B1F0C] text-[#FAF3E8]' : 'border-[#3B1F0C]/20 text-stone-500'}`}>
                                            {f}
                                        </button>
                                    ))}
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-stone-500 mb-3 block">Color Palette</label>
                                    <div className="flex flex-wrap gap-3">
                                        {frostingColors.map(c => (
                                            <button type="button" key={c} onClick={() => setFormData({...formData, frosting_color: c})} className={`w-8 h-8 rounded-full border-2 transition-transform ${formData.frosting_color === c ? 'scale-125 border-[#C1440E] shadow-lg' : 'border-stone-300 hover:scale-110'}`} style={{backgroundColor: c}} title={c} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 5. Decorations */}
                        <section>
                            <h3 className="font-label text-sm uppercase tracking-[0.2em] text-[#C1440E] font-bold mb-6 border-b border-[#3B1F0C]/10 pb-2">5. Visual Effects</h3>
                            <div className="flex flex-wrap gap-3">
                                {decorationOptions.map(d => (
                                    <button type="button" key={d} onClick={() => handleToggleDeco(d)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm transition-all border ${formData.decorations.includes(d) ? 'bg-[#C1440E]/10 border-[#C1440E] text-[#C1440E]' : 'border-[#3B1F0C]/10 text-stone-600 hover:border-[#D4A017]'}`}>
                                        <span className="material-symbols-outlined text-[18px]">
                                            {formData.decorations.includes(d) ? 'check_box' : 'check_box_outline_blank'}
                                        </span>
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 6 & 7. Theme & Typography */}
                        <section>
                            <h3 className="font-label text-sm uppercase tracking-[0.2em] text-[#C1440E] font-bold mb-6 border-b border-[#3B1F0C]/10 pb-2">6. Direction & Script</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold uppercase text-stone-500 mb-3 block">Thematic Style</label>
                                    <div className="flex flex-wrap gap-2">
                                        {themes.map(t => (
                                            <button type="button" key={t} onClick={() => setFormData({...formData, theme: t})} className={`px-4 py-2 rounded-full font-label text-[10px] uppercase tracking-widest font-bold transition-all border ${formData.theme === t ? 'bg-[#3B1F0C] text-[#FAF3E8]' : 'border-[#3B1F0C]/20 text-stone-500'}`}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="text-xs font-bold uppercase text-stone-500 mb-2 block">Imprinted Message (Max 40)</label>
                                    <input maxLength="40" type="text" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="e.g. Happy Birthday Apu..." className="w-full bg-transparent border-0 border-b-2 border-[#3B1F0C]/20 focus:ring-0 focus:border-[#C1440E] px-0 py-2 text-[#3B1F0C] dark:text-[#FAF3E8] font-serif italic text-lg" />
                                </div>
                                <div className="relative">
                                    <label className="text-xs font-bold uppercase text-stone-500 mb-2 block">Director's Notes (Optional)</label>
                                    <textarea rows="3" value={formData.vision} onChange={e => setFormData({...formData, vision: e.target.value})} placeholder="Describe specific reference points or special requirements..." className="w-full bg-transparent border-0 border-b-2 border-[#3B1F0C]/20 focus:ring-0 focus:border-[#C1440E] px-0 py-2 text-[#3B1F0C] dark:text-[#FAF3E8] resize-none"></textarea>
                                </div>
                            </div>
                        </section>

                        {/* Submit Row */}
                        <div className="pt-6">
                            <button disabled={submitting} type="submit" className="w-full bg-[#C1440E] text-[#FAF3E8] py-5 rounded-2xl font-label text-sm uppercase tracking-widest font-bold shadow-lg shadow-[#C1440E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3">
                                {submitting ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Submit My Masterpiece'}
                                <span className="material-symbols-outlined text-lg">movie_filter</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* RIGHT PANEL: Live Visualizer Tracker */}
                <div className="lg:col-span-5 sticky top-32">
                    <div className="clay-card bg-white dark:bg-[#1a100a] rounded-[2rem] p-6 shadow-2xl border border-[#3B1F0C]/10 flex flex-col items-center">
                        <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative bg-stone-50 dark:bg-[#20130d]">
                            <CakeVisualizer 
                                shape={formData.shape}
                                tiers={formData.shape === 'Tier' ? formData.tiers : 1}
                                frostingColor={formData.frosting_color}
                                decorations={formData.decorations}
                                message={formData.message}
                            />
                        </div>
                        
                        <div className="w-full bg-[#FAF3E8] dark:bg-[#2A180E] rounded-xl p-5 border border-[#3B1F0C]/5">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <span className="font-label text-[10px] uppercase tracking-widest text-[#C1440E] font-bold block mb-1">Production Estimate</span>
                                    <div className="font-headline text-4xl font-bold text-[#3B1F0C] dark:text-[#FAF3E8]">₹{estimatedPrice}</div>
                                </div>
                                <div className="text-right">
                                    <span className="font-label text-[10px] uppercase tracking-widest text-stone-500 block">Lead Time</span>
                                    <span className="font-label font-bold text-sm text-[#3B1F0C] dark:text-[#FAF3E8]">Avg. 48 Hours</span>
                                </div>
                            </div>
                            <div className="h-px w-full bg-[#3B1F0C]/10 mb-4"></div>
                            <div className="flex flex-wrap gap-2 gap-y-3 justify-between items-center text-xs">
                                <span className="bg-white border border-[#3B1F0C]/10 px-3 py-1 rounded-md font-bold text-[#3B1F0C] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{backgroundColor: flavours.find(f => f.name === formData.flavour)?.color}}></span>
                                    {formData.flavour}
                                </span>
                                <span className="bg-white border border-[#3B1F0C]/10 px-3 py-1 rounded-md font-bold text-[#3B1F0C] truncate max-w-[150px]">
                                    {formData.occasion_date || 'Date Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Success Micro-Animation Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF3E8]/80 backdrop-blur-sm animate-in fade-in duration-500">
                    <div className="bg-white p-12 rounded-[3xl] shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-500 slide-in-from-bottom-10 border border-[#3B1F0C]/10 max-w-md">
                        <span className="material-symbols-outlined text-7xl text-[#C1440E] mb-6 animate-pulse" style={{fontVariationSettings: "'wght' 200"}}>movie_filter</span>
                        <h2 className="font-headline text-3xl font-bold text-[#3B1F0C] mb-4">Masterpiece Submitted</h2>
                        <p className="text-stone-600 mb-8">Your script is in the hands of our artisans. You will be redirected to the tracking page...</p>
                        <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-[#D4A017] w-full animate-[shrink_3s_linear_forwards]"></div>
                        </div>
                    </div>
                    <style>{`@keyframes shrink { from { width: 0%; } to { width: 100%; } }`}</style>
                </div>
            )}
        </main>
    );
};

export default CustomCake;
