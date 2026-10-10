import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import SmartImage from '../components/SmartImage';

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { items, clearCart } = useCartStore();
    const { user } = useAuthStore();

    const [selectedMethod, setSelectedMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [savedMethods, setSavedMethods] = useState([]);

    useEffect(() => {
        const fetchSavedMethods = async () => {
            if (user) {
                const { data } = await supabase.from('profiles').select('saved_payments').eq('id', user.id).single();
                if (data && data.saved_payments) setSavedMethods(data.saved_payments);
            }
        };
        fetchSavedMethods();
    }, [user]);

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = cartTotal >= 499 || cartTotal === 0 ? 0 : 50;
    const computedTotalDue = cartTotal + deliveryFee;
    const finalAmount = location.state?.totalDue || computedTotalDue;
    const addressId = location.state?.addressId || null;

    const handlePayment = async () => {
        setIsProcessing(true);
        const finalOrder = { items: [...items], totalDue: finalAmount, paymentMethod: selectedMethod, addressId };

        try {
            if (user && finalAmount > 0) {
                const { data, error } = await supabase
                    .from('orders')
                    .insert({
                        user_id: user.id,
                        items: items,
                        total_amount: finalAmount,
                        status: 'pending'
                    })
                    .select()
                    .single();

                if (error) {
                    console.error("Order save error:", error);
                } else if (data) {
                    finalOrder.orderId = data.id;
                }
            }
        } catch (error) {
            console.error(error);
        }

        clearCart();
        navigate('/order-confirmation', { state: { order: finalOrder } });
    };

    const isSelected = (id) => selectedMethod === id;

    const baseCardClass = "bg-[#fff1ec] dark:bg-[#382b24] rounded-[2rem] p-8 cursor-pointer transition-all shadow-[inset_4px_4px_8px_rgba(255,219,206,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.3),0_10px_20px_rgba(42,23,15,0.04)]";

    return (
        <div className="bg-[#fff8f6] dark:bg-[#1f1a18] text-[#2a170f] dark:text-[#ede0d9] font-body min-h-screen relative overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen relative z-10">
                {/* Editorial Header */}
                <header className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-label text-xs uppercase tracking-[0.2em] text-[#a63b10] dark:text-[#ffb59d]">Step 03 — Checkout</span>
                        <div className="h-[1px] w-12 bg-[#827564] opacity-40"></div>
                    </div>
                    <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-[#2a170f] dark:text-[#ede0d9] leading-none">
                        Complete Your <br />
                        <span className="italic font-normal text-[#7e5700] dark:text-[#f8bc51]">Cinematic Journey</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Payment Methods Selection */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Saved Methods (Dynamic Injection) */}
                        {savedMethods.length > 0 && (
                            <div className="mb-8 space-y-4">
                                <h3 className="font-label text-xs uppercase tracking-widest text-[#504536] dark:text-[#a09187] opacity-80 mb-4 pl-2">Stored Sanctuary Methods</h3>
                                {savedMethods.map((method) => (
                                    <section key={method.id} onClick={() => setSelectedMethod(method.id)} className={`${baseCardClass} ${isSelected(method.id) ? 'border-2 border-[#7e5700]' : 'border-2 border-transparent hover:bg-[#ffe2d8] dark:hover:bg-[#4d3e35]'}`}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <span className="material-symbols-outlined text-3xl text-[#7e5700] dark:text-[#f8bc51]">
                                                    {method.type === 'card' ? 'credit_card' : 'account_balance_wallet'}
                                                </span>
                                                <div>
                                                    <h3 className="font-headline text-xl font-bold">{method.label}</h3>
                                                    <p className="text-xs font-label uppercase text-[#504536] dark:text-[#a09187] tracking-wider">{method.type === 'card' ? `Expires ${method.expiry}` : 'Verified Profile Vault'}</p>
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected(method.id) ? 'border-[#7e5700] dark:border-[#f8bc51]' : 'border-[#827564]/40'}`}>
                                                {isSelected(method.id) && <div className="w-3 h-3 rounded-full bg-[#7e5700] dark:bg-[#f8bc51]"></div>}
                                            </div>
                                        </div>
                                    </section>
                                ))}
                            </div>
                        )}

                        {/* Credit/Debit Card */}
                        <section onClick={() => setSelectedMethod('card')} className={`${baseCardClass} ${isSelected('card') ? 'border-2 border-[#7e5700]' : 'border-2 border-transparent hover:bg-[#ffe2d8] dark:hover:bg-[#4d3e35]'}`}>
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-3xl text-[#7e5700] dark:text-[#f8bc51]" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
                                    <div>
                                        <h3 className="font-headline text-xl font-bold">Credit / Debit Card</h3>
                                        <p className="text-xs font-label uppercase text-[#504536] dark:text-[#a09187] tracking-wider">Secure Visa, Mastercard, AMEX</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected('card') ? 'border-[#7e5700] dark:border-[#f8bc51]' : 'border-[#827564]/40'}`}>
                                    {isSelected('card') && <div className="w-3 h-3 rounded-full bg-[#7e5700] dark:bg-[#f8bc51]"></div>}
                                </div>
                            </div>

                            {isSelected('card') && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                                    <div className="relative">
                                        <label className="font-label text-xs uppercase text-[#504536] dark:text-[#a09187] block mb-2">Cardholder Name</label>
                                        <input className="w-full bg-transparent border-0 border-b border-[#827564]/40 focus:ring-0 focus:border-[#7e5700] dark:focus:border-[#f8bc51] px-0 py-2 placeholder:text-[#2a170f]/30 dark:placeholder:text-[#ede0d9]/30 font-body transition-colors" placeholder="SATYAJIT RAY" type="text" />
                                    </div>
                                    <div className="relative">
                                        <label className="font-label text-xs uppercase text-[#504536] dark:text-[#a09187] block mb-2">Card Number</label>
                                        <div className="flex items-center gap-3 bg-transparent border-0 border-b border-[#827564]/40 focus-within:border-[#7e5700] dark:focus-within:border-[#f8bc51] transition-all">
                                            <input className="w-full bg-transparent border-0 focus:ring-0 px-0 py-2 placeholder:text-[#2a170f]/30 dark:placeholder:text-[#ede0d9]/30 font-body" placeholder="0000 0000 0000 0000" type="text" />
                                            <span className="material-symbols-outlined text-[#827564]">lock</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="relative">
                                            <label className="font-label text-xs uppercase text-[#504536] dark:text-[#a09187] block mb-2">Expiry Date</label>
                                            <input className="w-full bg-transparent border-0 border-b border-[#827564]/40 focus:ring-0 focus:border-[#7e5700] dark:focus:border-[#f8bc51] px-0 py-2 placeholder:text-[#2a170f]/30 dark:placeholder:text-[#ede0d9]/30 font-body transition-colors" placeholder="MM/YY" type="text" />
                                        </div>
                                        <div className="relative">
                                            <label className="font-label text-xs uppercase text-[#504536] dark:text-[#a09187] block mb-2">CVV</label>
                                            <input className="w-full bg-transparent border-0 border-b border-[#827564]/40 focus:ring-0 focus:border-[#7e5700] dark:focus:border-[#f8bc51] px-0 py-2 placeholder:text-[#2a170f]/30 dark:placeholder:text-[#ede0d9]/30 font-body transition-colors" placeholder="***" type="password" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* UPI */}
                        <section onClick={() => setSelectedMethod('upi')} className={`${baseCardClass} ${isSelected('upi') ? 'border-2 border-[#7e5700]' : 'border-2 border-transparent hover:bg-[#ffe2d8] dark:hover:bg-[#4d3e35]'}`}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-3xl text-stone-500 transition-colors">qr_code_2</span>
                                    <div>
                                        <h3 className="font-headline text-xl font-bold">UPI / QR Code</h3>
                                        <p className="text-xs font-label uppercase text-[#504536] dark:text-[#a09187] tracking-wider">GPay, PhonePe, Paytm</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected('upi') ? 'border-[#7e5700] dark:border-[#f8bc51]' : 'border-[#827564]/40'}`}>
                                    {isSelected('upi') && <div className="w-3 h-3 rounded-full bg-[#7e5700] dark:bg-[#f8bc51]"></div>}
                                </div>
                            </div>
                        </section>

                        {/* Net Banking */}
                        <section onClick={() => setSelectedMethod('net')} className={`${baseCardClass} ${isSelected('net') ? 'border-2 border-[#7e5700]' : 'border-2 border-transparent hover:bg-[#ffe2d8] dark:hover:bg-[#4d3e35]'}`}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-3xl text-stone-500 transition-colors">account_balance</span>
                                    <div>
                                        <h3 className="font-headline text-xl font-bold">Net Banking</h3>
                                        <p className="text-xs font-label uppercase text-[#504536] dark:text-[#a09187] tracking-wider">All Indian Banks</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected('net') ? 'border-[#7e5700] dark:border-[#f8bc51]' : 'border-[#827564]/40'}`}>
                                    {isSelected('net') && <div className="w-3 h-3 rounded-full bg-[#7e5700] dark:bg-[#f8bc51]"></div>}
                                </div>
                            </div>
                        </section>

                        {/* Loyalty / Gift */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <section className={`${baseCardClass} !p-6 border-2 border-transparent hover:bg-[#ffe2d8] dark:hover:bg-[#4d3e35]`}>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-2xl text-[#a63b10] dark:text-[#fd7a4c]">card_giftcard</span>
                                    <h3 className="font-headline text-lg font-bold">Gift Voucher</h3>
                                </div>
                            </section>
                            <section className={`${baseCardClass} !p-6 border-2 border-transparent hover:bg-[#ffe2d8] dark:hover:bg-[#4d3e35]`}>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-2xl text-[#7e5700] dark:text-[#f8bc51]">stars</span>
                                    <h3 className="font-headline text-lg font-bold">Loyalty Points</h3>
                                </div>
                            </section>
                        </div>

                        {/* COD */}
                        <section onClick={() => setSelectedMethod('cod')} className={`${baseCardClass} ${isSelected('cod') ? 'border-2 border-[#7e5700]' : 'border-2 border-transparent hover:bg-[#ffe2d8] dark:hover:bg-[#4d3e35]'}`}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-3xl text-stone-500 transition-colors">payments</span>
                                    <div>
                                        <h3 className="font-headline text-xl font-bold">Cash on Delivery</h3>
                                        <p className="text-xs font-label uppercase text-[#504536] dark:text-[#a09187] tracking-wider">Pay at the doorstep</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected('cod') ? 'border-[#7e5700] dark:border-[#f8bc51]' : 'border-[#827564]/40'}`}>
                                    {isSelected('cod') && <div className="w-3 h-3 rounded-full bg-[#7e5700] dark:bg-[#f8bc51]"></div>}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Order Summary */}
                    <aside className="lg:col-span-5 space-y-8 sticky top-28">
                        <div className="bg-[#ffe9e2] dark:bg-[#382218] rounded-[2rem] p-8 relative overflow-hidden shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(42,23,15,0.05),0_10px_20px_rgba(42,23,15,0.08)]">
                            {/* Decorative Element */}
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#c8922a]/10 dark:bg-[#f8bc51]/10 rounded-full blur-3xl"></div>
                            <h2 className="font-headline text-2xl font-bold mb-8 flex items-center gap-2">Order Essence</h2>

                            <div className="space-y-6 mb-8 max-h-72 overflow-y-auto custom-scrollbar pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start">
                                        <div className="flex-1 pr-4">
                                            <p className="font-body font-semibold">{item.name}</p>
                                            <p className="text-xs text-[#504536] dark:text-[#a09187] font-label">Qty: {item.quantity < 10 ? '0' + item.quantity : item.quantity}</p>
                                        </div>
                                        <span className="font-headline font-bold">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                                {items.length === 0 && (
                                    <p className="font-label opacity-50 uppercase tracking-widest text-sm text-center">Your Cart is Empty.</p>
                                )}
                            </div>

                            <div className="pt-6 border-t border-[#827564]/30 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="font-label text-[#504536] dark:text-[#a09187] uppercase tracking-widest">Subtotal</span>
                                    <span className="font-body">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-label text-[#504536] dark:text-[#a09187] uppercase tracking-widest">Artisan Service Fee</span>
                                    <span className="font-body">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-4">
                                    <span className="font-headline">Total</span>
                                    <span className="font-headline">₹{finalAmount}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={!selectedMethod || isProcessing || items.length === 0}
                            onClick={handlePayment}
                            className="w-full py-5 px-8 rounded-full bg-[#7e5700] text-[#ffffff] dark:bg-[#f8bc51] dark:text-[#281900] font-headline text-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(126,87,0,0.2)] disabled:opacity-50">
                            <span>{isProcessing ? 'Processing Hub...' : `Pay ₹${finalAmount} Securely`}</span>
                            <span className="material-symbols-outlined">shutter_speed</span>
                        </button>

                        <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
                            <div className="flex flex-col items-center">
                                <span className="material-symbols-outlined text-4xl mb-1">security</span>
                                <span className="font-label text-[10px] uppercase tracking-tighter">SSL Secured</span>
                            </div>
                            <div className="h-8 w-[1px] bg-[#827564] opacity-50"></div>
                            <div className="flex flex-col items-center">
                                <span className="font-headline font-bold text-lg leading-none">razorpay</span>
                                <span className="font-label text-[10px] uppercase tracking-tighter">Partnered</span>
                            </div>
                        </div>

                        {/* Cinematic Visual Anchor */}
                        <div className="rounded-xl overflow-hidden h-48 relative shadow-xl hidden md:block">
                            <SmartImage alt="Cinematic baker workspace" className="w-full h-full object-cover grayscale contrast-125" src="https://images.unsplash.com/photo-1549646875-e8d195568858?auto=format&fit=crop&q=80&w=800" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 z-30">
                                <p className="font-headline italic text-white text-sm leading-tight">"To create is to pay tribute to the shadows as much as the light."</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
