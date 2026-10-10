import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { supabase } from '../lib/supabase';

const MyCakes = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthStore();
    const [cakes, setCakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchCustomCakes = async () => {
            const { data, error } = await supabase
                .from('custom_cakes')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setCakes(data);
            }
            setLoading(false);
        };

        fetchCustomCakes();
    }, [user, isAuthenticated, navigate]);

    const getStatusConfig = (status) => {
        switch(status) {
            case 'pending_approval': 
                return { label: 'Pending Review', color: 'bg-amber-100 text-amber-800 border-amber-300', icon: 'hourglass_empty', animation: 'animate-pulse' };
            case 'approved': 
                return { label: 'Approved', color: 'bg-green-100 text-green-800 border-green-300 relative overflow-hidden', icon: 'check_circle', animation: 'shimmer-effect' };
            case 'in_preparation': 
                return { label: 'In Preparation', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: 'skillet', animation: '' };
            case 'ready': 
                return { label: 'Ready for Pickup', color: 'bg-emerald-100 text-emerald-800 border-emerald-400', icon: 'storefront', animation: '' };
            case 'delivered': 
                return { label: 'Delivered', color: 'bg-stone-100 text-stone-600 border-stone-300', icon: 'inventory_2', animation: '' };
            case 'rejected': 
                return { label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-300', icon: 'cancel', animation: '' };
            default: 
                return { label: 'Unknown', color: 'bg-stone-100 text-stone-800 border-stone-300', icon: 'help', animation: '' };
        }
    };

    if (loading) {
        return <div className="min-h-screen pt-32 pb-24 flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
            <header className="mb-16">
                <span className="font-label text-sm uppercase tracking-[0.3em] text-[#C1440E] font-bold mb-4 block text-center md:text-left">Your Gallery</span>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-[#3B1F0C] dark:text-[#FAF3E8]">My Cinematic <br/><span className="italic font-normal text-[#D4A017]">Cakes</span></h1>
                    <button onClick={() => navigate('/custom-cake')} className="bg-[#3B1F0C] text-[#FAF3E8] px-8 py-3 rounded-full font-label text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-md active:scale-95 flex items-center gap-2 m-auto md:m-0 font-bold">
                        <span className="material-symbols-outlined text-sm">add</span> New Masterpiece
                    </button>
                </div>
            </header>

            {cakes.length === 0 ? (
                <div className="text-center py-20 bg-[#FAF3E8] dark:bg-[#2A180E] rounded-[2rem] border border-[#3B1F0C]/10 shadow-sm">
                    <span className="material-symbols-outlined text-7xl text-stone-300 mb-4" style={{fontVariationSettings: "'wght' 200"}}>cake</span>
                    <h3 className="font-headline text-2xl font-bold text-[#3B1F0C] dark:text-[#FAF3E8] mb-2">The Canvas is Empty</h3>
                    <p className="text-stone-500 max-w-sm mx-auto mb-6">You haven't commissioned any custom cakes yet. Step into the director's chair to begin.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {cakes.map(cake => {
                        const statusConfig = getStatusConfig(cake.status);
                        const isExpanded = expandedId === cake.id;

                        return (
                            <div key={cake.id} className="clay-card bg-white dark:bg-[#20130d] rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200 dark:border-stone-800 transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-label font-bold uppercase tracking-widest border flex items-center gap-1 ${statusConfig.color} ${statusConfig.animation}`}>
                                                <span className="material-symbols-outlined text-[10px]">{statusConfig.icon}</span>
                                                {statusConfig.label}
                                            </span>
                                            <span className="text-xs text-stone-500 font-label tracking-widest uppercase">
                                                {new Date(cake.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-2xl font-bold text-[#3B1F0C] dark:text-[#FAF3E8] mb-1">
                                            {cake.flavour} {cake.shape}
                                        </h3>
                                        <p className="text-sm text-stone-500">
                                            {cake.size} • Occasion: <strong className="text-[#C1440E]">{cake.occasion_date}</strong>
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 md:gap-2">
                                        <div className="font-headline text-2xl font-bold text-[#3B1F0C] dark:text-[#FAF3E8]">₹{cake.estimated_price}</div>
                                        <button 
                                            onClick={() => setExpandedId(isExpanded ? null : cake.id)}
                                            className="text-xs font-label uppercase tracking-widest text-stone-500 hover:text-[#C1440E] flex items-center gap-1 font-bold transition-colors">
                                            {isExpanded ? 'Hide Specs' : 'View Specs'}
                                            <span className="material-symbols-outlined text-sm">{isExpanded ? 'expand_less' : 'expand_more'}</span>
                                        </button>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-top-4 fade-in duration-300">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-label uppercase tracking-widest text-stone-400 font-bold mb-1">Architecture</p>
                                                <p className="font-body text-sm text-[#3B1F0C] dark:text-[#FAF3E8]">{cake.shape} • {cake.size} • {cake.tiers} Tier(s)</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-label uppercase tracking-widest text-stone-400 font-bold mb-1">Flavor Profile</p>
                                                <p className="font-body text-sm text-[#3B1F0C] dark:text-[#FAF3E8]">{cake.flavour} with {cake.frosting}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-label uppercase tracking-widest text-stone-400 font-bold mb-1">Theme</p>
                                                <p className="font-body text-sm text-[#3B1F0C] dark:text-[#FAF3E8]">{cake.theme}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-label uppercase tracking-widest text-stone-400 font-bold mb-1">Decorations</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {cake.decorations?.length > 0 ? cake.decorations.map((d, i) => (
                                                        <span key={i} className="bg-stone-100 dark:bg-stone-800 text-[10px] px-2 py-0.5 rounded text-stone-600 font-bold border border-stone-200 dark:border-stone-700">{d}</span>
                                                    )) : <span className="text-sm text-stone-400 italic">No added decorations</span>}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-label uppercase tracking-widest text-stone-400 font-bold mb-1">Script (Message)</p>
                                                <p className="font-serif italic text-[#3B1F0C] dark:text-[#FAF3E8] bg-[#FAF3E8] dark:bg-[#2A180E] px-3 py-2 rounded-lg border border-[#3B1F0C]/10 text-sm">
                                                    {cake.message || "No message inscribed."}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-[#FAF3E8] dark:bg-[#2A180E] p-4 rounded-xl border border-[#C1440E]/20 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#C1440E]"></div>
                                            <p className="text-[10px] font-label uppercase tracking-widest text-[#C1440E] font-bold mb-2 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[10px]">support_agent</span>
                                                Baker's Note
                                            </p>
                                            <p className="font-body text-sm text-[#3B1F0C] dark:text-stone-300 italic">
                                                {cake.admin_note || "Our artisans are currently reviewing your brief. You will be updated here once approved."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                .shimmer-effect::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </main>
    );
};

export default MyCakes;
