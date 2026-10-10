import React, { useEffect, useState } from 'react';
import SmartImage from '../components/SmartImage';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import useProfileStore from '../store/useProfileStore';
import ReviewCard from '../components/ReviewCard';

const OrderTracking = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Initial state from router history to prevent layout flicker
    const initialOrderInfo = location.state?.orderInfo || null;
    
    const [order, setOrder] = useState(initialOrderInfo);
    const [status, setStatus] = useState(initialOrderInfo?.status || 'pending');
    const [destination, setDestination] = useState(null);
    const [isLoading, setIsLoading] = useState(!initialOrderInfo);

    const { addresses, fetchProfile } = useProfileStore();

    // Boot Address Store
    useEffect(() => {
        if (addresses.length === 0) fetchProfile();
    }, [fetchProfile, addresses.length]);

    // Link target Address
    useEffect(() => {
        const targetAddressId = order?.addressId;
        if (targetAddressId && addresses.length > 0) {
            const found = addresses.find(a => a.id === targetAddressId);
            if (found) setDestination(found);
        }
    }, [order, addresses]);

    // Boot Database Subscription
    useEffect(() => {
        if (!orderId) {
            const findFallback = async () => {
                const { data: authData } = await supabase.auth.getUser();
                if (authData?.user) {
                    const { data } = await supabase.from('orders')
                        .select('id').eq('user_id', authData.user.id)
                        .not('status', 'in', '("delivered","cancelled")')
                        .order('created_at', { ascending: false }).limit(1).maybeSingle();
                    
                    if (data && data.id) {
                        navigate(`/order-tracking/${data.id}`, { replace: true });
                        return;
                    }
                }
                setIsLoading(false);
            };
            findFallback();
            return;
        }

        const fetchLatestDetails = async () => {
            const { data, error } = await supabase.from('orders').select('*').eq('id', orderId).single();
            if (data) {
                // Ensure we don't nuke local state items if DB items structure is flat
                setOrder(prev => ({...prev, ...data, items: data.items.length > 0 ? data.items : prev?.items }));
                setStatus(data.status || 'pending');
            }
            setIsLoading(false);
        };

        fetchLatestDetails();

        // 🟢 Robust Polling Failsafe (Forces automatic UI updates if Supabase Realtime isn't checked in the backend dashboard)
        const pollInterval = setInterval(() => {
            fetchLatestDetails();
        }, 3000); // Polls every 3 seconds for instant feedback

        // 🟢 Supabase Realtime Socket Registration
        const channel = supabase.channel(`tracking_${orderId}`)
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
                (payload) => {
                    if (payload.new && payload.new.status) {
                        setStatus(payload.new.status);
                    }
                }
            )
            .subscribe();

        return () => {
            clearInterval(pollInterval);
            supabase.removeChannel(channel);
        };
    }, [orderId]);

    // View Mapping logic
    const items = order?.items || [];
    const grandTotal = order?.totalDue || order?.total_amount || 0;
    
    const statuses = ['pending', 'preparing', 'packed', 'delivering', 'delivered'];
    const currentStatusIndex = statuses.indexOf(status) !== -1 ? statuses.indexOf(status) : 0;
    
    const getStepState = (stepIndex) => {
        if (currentStatusIndex > stepIndex) return 'completed';
        if (currentStatusIndex === stepIndex) return 'active';
        return 'pending';
    };

    // Render Logic for Steps
    const StepIndicator = ({ title, timeText, descText, state }) => {
        return (
            <div className={`relative flex gap-6 ${state === 'pending' ? 'opacity-40' : ''} transition-opacity duration-500`}>
                <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500 ${state === 'completed' ? 'bg-primary' : state === 'active' ? 'bg-primary-container ring-4 ring-primary/20' : 'bg-surface-container-highest'}`}>
                    {state === 'completed' && <span className="material-symbols-outlined text-[14px] text-white" style={{fontVariationSettings: "'wght' 700"}}>check</span>}
                    {state === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-on-primary-container animate-pulse"></div>}
                </div>
                <div>
                    <h3 className={`font-headline font-bold text-lg transition-all duration-500 ${state === 'completed' ? 'text-on-surface opacity-60 line-through decoration-primary/30' : state === 'active' ? 'text-on-surface' : 'text-on-surface'}`}>
                        {title}
                    </h3>
                    {state === 'active' && descText && <p className="font-body text-sm text-on-surface-variant mt-1 animate-in fade-in slide-in-from-top-1">{descText}</p>}
                    <p className={`font-label text-[10px] uppercase tracking-wider mt-1 ${state === 'active' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{timeText}</p>
                </div>
            </div>
        );
    };

    const shortId = orderId ? orderId.substring(0,8).toUpperCase() : 'UNKNOWN';

    return (
        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            {/* Hero Section */}
            <header className="mb-16 text-center md:text-left">
                <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block animate-in fade-in">Sequence #{shortId}</span>
                <h1 className="font-headline text-5xl md:text-7xl italic text-on-surface tracking-tight mb-4">Track Your Order</h1>
                <p className="font-body text-on-surface-variant max-w-xl text-lg leading-relaxed">Your artisanal selection is being choreographed with precision. Follow its journey from our hearth to your home.</p>
            </header>

            {/* Empty State Fallback (If no order exists) */}
            {!isLoading && !order && (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <span className="material-symbols-outlined text-8xl text-secondary/20 mb-6" style={{fontVariationSettings: "'wght' 200"}}>explore_off</span>
                    <h2 className="font-headline text-3xl font-bold mb-4">No Active Journeys</h2>
                    <p className="text-on-surface-variant max-w-md mx-auto mb-8">You currently have no orders in transit. Return to the menu to begin a new cinematic culinary experience.</p>
                    <button onClick={() => navigate('/menu')} className="bg-primary text-on-primary px-8 py-3 rounded-full font-label tracking-widest uppercase text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        Browse Menu
                    </button>
                </div>
            )}

            {/* Main Tracking Grid */}
            {!isLoading && order && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Stepper & Delivery Person */}
                <div className="lg:col-span-5 space-y-12">
                    {/* Live Status Stepper */}
                    <section className="clay-card p-10 rounded-xl bg-surface-container-low shadow-sm">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="font-headline text-2xl font-bold flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">restaurant_menu</span>
                                Journey Status
                            </h2>
                            {currentStatusIndex > 0 && currentStatusIndex < 4 && <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(200,146,42,0.8)]"></div>}
                        </div>
                        <div className="relative space-y-10">
                            {/* Connecting Line */}
                            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-surface-container-highest"></div>
                            
                            <StepIndicator title="Order Received" timeText="Confirmed" state={getStepState(0)} />
                            <StepIndicator title="Being Prepared" timeText="Baking in Progress" descText="Our pastry chefs are assembling your masterpiece." state={getStepState(1)} />
                            <StepIndicator title="Packed & Ready" timeText="Sealed with care" descText="Inspected for theatrical perfection and packaged in sustainable film-grade paper." state={getStepState(2)} />
                            <StepIndicator title="Out for Delivery" timeText="On the way" descText="Moving swiftly towards your location." state={getStepState(3)} />
                            <StepIndicator title="Delivered" timeText="Final Frame" descText="Bon Appétit!" state={getStepState(4)} />
                        </div>
                    </section>

                    {/* Delivery Person Card (Mockup for aesthetics) */}
                    {(currentStatusIndex >= 3) && (
                    <section className="bg-surface-container-low p-8 rounded-lg flex items-center justify-between border-l-4 border-primary shadow-inner animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <SmartImage alt="Courier Avatar" className="w-16 h-16 rounded-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkCKv6tgBxPySsxpgBgVFLeI8f7tZlh9RqXLpNQg508FQa5l2Lp0HbLW5DE2bwO156G4sWWei_96Gu3K906ps--55plyV3GxxJvjRcy9u7Z6rf7_HA_hdb2leZra4z7GEWH12LgVE1fSCJAxwgwLhbbYz7pxmOlB02l5j_kEAKRPhZsUfFOWtyYkjDUxyJ0uEZtY0Id7nqHa-zYYx3eHw7PfXDTPVbKRn7Dvd8s9eU240sjlNy7VbGgVGr-6PtBqu5Bbwx9L9G_0Y1"/>
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full text-[10px]">
                                    <span className="material-symbols-outlined text-[14px]">stars</span>
                                </div>
                            </div>
                            <div>
                                <p className="font-label text-[10px] uppercase text-on-surface-variant tracking-widest mb-1">Assigned Courier</p>
                                <h4 className="font-headline font-bold text-xl">Satyaki Das</h4>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="material-symbols-outlined text-sm text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                    <span className="text-xs font-bold">4.9 • 1.2k deliveries</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="bg-primary text-white p-3 rounded-full hover:scale-110 transition-transform shadow-md">
                                <span className="material-symbols-outlined">call</span>
                            </button>
                            <button className="bg-surface-container-highest text-on-surface p-3 rounded-full hover:scale-110 transition-transform shadow-sm">
                                <span className="material-symbols-outlined">chat_bubble</span>
                            </button>
                        </div>
                    </section>
                    )}
                </div>

                {/* Right Column: Map & Summary */}
                <div className="lg:col-span-7 space-y-12">
                    {/* Countdown & Map Container */}
                    <div className="relative overflow-hidden rounded-xl bg-surface-container shadow-2xl border border-outline-variant/20">
                        {/* Delivery Countdown Overlay */}
                        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-lg shadow-lg border border-primary/10">
                            <p className="font-label text-[10px] uppercase text-secondary tracking-widest mb-1">Status Phase</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-headline italic font-bold text-on-surface capitalize">{status}</span>
                            </div>
                        </div>
                        
                        {/* Map Embed Mockup */}
                        <div className="aspect-video w-full bg-stone-200 relative grayscale">
                            <SmartImage alt="Map" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANEv2wTO-3D1aW9RS2f7fex1BwnaDG4sJOeJsnHE8sXud0l2qfqyS8atyrI2nbDVDGkJjNRQECOQCXeNrDPr3m5lCBH9sSxO-AJbCm4FO1IY4ZGUclMLAYnOvupSJPIZvwqEjedhhSiC82rID-JP7GMGWLM_TXu18czcIiLBYNTnWjKNyAYghwtmfDTpGmHaN5S8x5JMvYpCDK6AtxPTbnuDFKeOnUhcqtu6qK7qE563_8qJof3gDc_BF_FX-SUoGgW0fsR9BPVKMs"/>
                            {/* Route Overlay (SVG simulated) */}
                            {currentStatusIndex >= 3 && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none animate-in fade-in duration-1000" viewBox="0 0 1200 675">
                                <path className="opacity-80" d="M200 500 Q400 450 600 300 T1000 100" fill="none" stroke="#7e5700" strokeDasharray="8 8" strokeWidth="4"></path>
                                <circle cx="200" cy="500" fill="#a63b10" r="8"></circle>
                                <circle className="animate-pulse" cx="1000" cy="100" fill="#7e5700" r="12"></circle>
                            </svg>
                            )}
                            <div className="absolute bottom-6 right-6 bg-on-surface text-white px-4 py-2 rounded-full text-xs font-label uppercase tracking-widest shadow-md flex items-center gap-2">
                                {currentStatusIndex >= 3 ? <><div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> Live GPS Active</> : 'Awaiting Transit'}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 clay-card p-8 bg-surface-container-low shadow-sm">
                        {/* Dynamic Items */}
                        <div className="space-y-6">
                            <h3 className="font-headline text-xl font-bold border-b border-outline-variant pb-4">The Selection</h3>
                            <div className="space-y-4 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                {items.length > 0 ? items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start gap-4">
                                        <div>
                                            <p className="font-bold text-sm leading-tight">{item.name}</p>
                                            <p className="text-[10px] text-on-surface-variant font-label uppercase mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-headline font-bold text-sm mt-0.5">₹{item.price * item.quantity}</span>
                                    </div>
                                )) : (
                                    <div className="opacity-50 text-sm py-4">Data syncing...</div>
                                )}
                            </div>
                            <div className="pt-4 flex justify-between items-end border-t border-outline-variant/30">
                                <span className="font-label text-[10px] uppercase tracking-widest text-[#a09187]">Total Bill</span>
                                <span className="text-2xl font-headline italic font-bold text-primary">₹{grandTotal}</span>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="space-y-6">
                            <h3 className="font-headline text-xl font-bold border-b border-outline-variant pb-4">Destination</h3>
                            <div className="space-y-2">
                                {destination ? (
                                    <>
                                        <p className="font-bold text-sm">{destination.title}</p>
                                        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                                            {destination.address_line}
                                        </p>
                                        <div className="mt-4 p-3 bg-surface-container-highest/40 rounded-lg border border-dashed border-outline-variant">
                                            <p className="font-label text-[10px] uppercase text-secondary font-bold mb-1">Access Protocol</p>
                                            <p className="text-[11px] italic leading-tight text-on-surface-variant">Standard delivery drop-off. Keep package horizontal.</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-4">
                                        <p className="text-xs text-on-surface-variant">Retrieving encrypted coordinates...</p>
                                        <div className="h-4 w-3/4 bg-surface-container-highest rounded animate-pulse mt-2"></div>
                                        <div className="h-4 w-1/2 bg-surface-container-highest rounded animate-pulse mt-2"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Post-Delivery Critique */}
                    {currentStatusIndex === 4 && (
                        <div className="animate-in slide-in-from-bottom-8 fade-in duration-500">
                            <ReviewCard orderId={orderId} />
                        </div>
                    )}

                    {/* Help/Back Action */}
                    <div className="flex gap-4 pt-6">
                        <button className="flex-1 border-2 border-primary text-primary font-label text-xs uppercase tracking-widest font-bold py-4 rounded-xl hover:bg-primary/5 transition-colors">
                            Need Help?
                        </button>
                        <button onClick={() => navigate('/home')} className="flex-1 bg-primary text-white font-label text-xs uppercase tracking-widest font-bold py-4 rounded-xl shadow-lg hover:translate-y-[-2px] transition-transform">
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
            )}
        </main>
    );
};

export default OrderTracking;
