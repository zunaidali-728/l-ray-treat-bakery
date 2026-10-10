import React from 'react';
import SmartImage from '../components/SmartImage';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderInfo = location.state?.order;
    const items = orderInfo?.items || [];
    const grandTotal = orderInfo?.totalDue || 0;
    const orderId = orderInfo?.orderId || "LRT-202600001";
    return (
        <main className="relative pt-20 pb-32 px-6 max-w-5xl mx-auto flex flex-col items-center text-center cinematic-bg min-h-screen">
            {/* Animated Success Anchor */}
            <div className="relative mb-12 w-full max-w-md mx-auto">
                <div className="absolute -top-12 -left-12 opacity-20 transform -rotate-12">
                    <span className="material-symbols-outlined text-[8rem] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>movie_filter</span>
                </div>
                <div className="absolute -bottom-8 -right-16 opacity-20 transform rotate-12">
                    <span className="material-symbols-outlined text-[6rem] text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>cake</span>
                </div>
                <div className="w-32 h-32 bg-primary-container rounded-full flex items-center justify-center clay-card mx-auto mb-8 relative z-10">
                    <span className="material-symbols-outlined text-on-primary-container text-6xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                </div>
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-background leading-none relative z-10">Order Placed! 🎉</h1>
                <p className="font-label text-secondary tracking-[0.2em] mt-6 text-sm uppercase relative z-10">Curtain rises on your artisan experience</p>
            </div>

            {/* Order Identity */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                {/* Main Content: Summary */}
                <div className="md:col-span-7 space-y-8 text-left">
                    <div className="bg-surface-container-low rounded-xl p-8 clay-card border border-outline-variant/10 shadow-inner">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="font-label text-[10px] text-tertiary uppercase tracking-widest">Reference ID</p>
                                <h2 className="font-headline text-xl md:text-2xl font-bold text-primary">#{orderId.substring(0,8).toUpperCase()}</h2>
                            </div>
                            <div className="text-right">
                                <p className="font-label text-[10px] text-tertiary uppercase tracking-widest">Est. Handover</p>
                                <p className="font-body font-bold text-on-surface">45-55 mins</p>
                            </div>
                        </div>

                        {/* Items List */}
                        {items.length > 0 ? (
                            <div className="space-y-6 pt-6 border-t border-outline-variant/20">
                                {items.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-dim">
                                         <SmartImage className="w-full h-full object-cover grayscale-[30%] contrast-110" alt={item.name} src={item.image}/>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-headline font-bold text-lg">{item.name}</p>
                                        <p className="text-xs font-label text-tertiary">Qty: {item.quantity}</p>
                                        <p className="font-body font-bold text-secondary mt-1">₹{item.price * item.quantity}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6 pt-6 border-t border-outline-variant/20 text-center py-4">
                                <p className="font-label text-stone-500 uppercase tracking-widest text-xs">No Recent Order Data Found in Session</p>
                            </div>
                        )}

                        {/* Total */}
                        <div className="mt-8 pt-6 border-t border-outline-variant/30 flex justify-between items-end">
                            <div>
                                <p className="font-label text-[10px] text-tertiary uppercase tracking-widest">Billing Method</p>
                                <p className="font-body text-sm font-medium italic">Cinematic Reserve Credits</p>
                            </div>
                            {grandTotal > 0 && (
                            <div className="text-right">
                                <p className="font-label text-xs text-tertiary">Grand Total</p>
                                <p className="font-headline text-3xl font-bold text-on-background">₹{grandTotal}</p>
                            </div>
                            )}
                        </div>
                    </div>

                    {/* Secondary Visual Message */}
                    <div className="p-8 bg-surface-container-highest rounded-xl flex items-center gap-6 shadow-sm">
                        <span className="material-symbols-outlined text-4xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                        <div>
                            <p className="font-headline font-bold text-xl">The Oven is Preheated</p>
                            <p className="text-sm text-on-surface-variant leading-relaxed">Our head baker has received your script. Your treats are being composed with the precision of a master cinematographer.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="md:col-span-5 space-y-6">
                    <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-8 rounded-xl clay-card space-y-4 border border-outline-variant/10">
                        <h3 className="font-label text-xs font-bold tracking-[0.2em] text-tertiary uppercase mb-4 text-center">Post-Credit Scenes</h3>
                        
                        <button 
                            onClick={() => navigate('/order-tracking/' + orderId, { state: { orderInfo } })}
                            className="w-full py-4 bg-primary-container text-on-primary-container font-headline font-bold text-lg rounded-full clay-button flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md">
                            <span className="material-symbols-outlined">location_on</span>
                            Track Order
                        </button>
                        
                        <button className="w-full py-4 bg-surface-container-high text-on-background font-headline font-bold text-lg rounded-full clay-button flex items-center justify-center gap-2 hover:bg-surface-container transition-all shadow-md">
                            <span className="material-symbols-outlined">shopping_bag</span>
                            Continue Shopping
                        </button>

                        <button className="w-full py-4 bg-transparent border-b-2 border-outline-variant/30 text-on-surface-variant font-label text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                            View My Orders
                        </button>

                        <div className="pt-6 border-t border-outline-variant/20">
                            <p className="text-xs font-label text-center text-tertiary mb-4">Tell your circle about the treat</p>
                            <button className="w-full py-3 bg-[#25D366]/10 text-[#25D366] font-bold text-sm rounded-xl flex items-center justify-center gap-2 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-all">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.883 11.883 0 005.685 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                                Share on WhatsApp
                            </button>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="px-8 text-center md:text-left">
                        <p className="font-body text-xs text-tertiary">Need to edit your order? <a className="text-primary font-bold underline underline-offset-4" href="#">Contact the Studio</a> immediately.</p>
                    </div>
                </div>
            </div>

            {/* Background Aesthetic Elements */}
            <div className="fixed top-1/4 left-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -z-10"></div>
            <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-secondary/5 blur-3xl rounded-full -z-10"></div>
        </main>
    );
};

export default OrderConfirmation;
