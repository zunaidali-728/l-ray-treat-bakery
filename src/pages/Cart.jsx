import React, { useState } from 'react';
import SmartImage from '../components/SmartImage';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

const Cart = () => {
    const navigate = useNavigate();
    const { items, updateQuantity, removeItem } = useCartStore();
    const [isDelivery, setIsDelivery] = useState(true);

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const packaging = cartTotal > 0 ? 20 : 0;
    const gst = Math.round(cartTotal * 0.05);
    const deliveryFee = (!isDelivery || cartTotal >= 499 || cartTotal === 0) ? 0 : 50;
    const totalPayable = cartTotal + packaging + gst + deliveryFee;
    const totalItemCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <main className="max-w-7xl mx-auto pt-32 pb-24 px-6 min-h-screen">
            <header className="mb-16">
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-4">Your Selection</h1>
                <p className="font-label text-sm tracking-widest uppercase text-tertiary">The Director's Cut • {totalItemCount} Items in Cart</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,420px)] gap-8 lg:gap-12 items-start">
                
                {/* Cart Items List */}
                <div className="space-y-8 w-full">
                    {/* Delivery/Dine-in Toggle */}
                    <div className="clay-card rounded-full p-1.5 flex items-center w-fit mb-12">
                        <button 
                            onClick={() => setIsDelivery(true)}
                            className={`px-8 py-2 rounded-full ${isDelivery ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:bg-surface-container-high'} font-label text-sm tracking-wide transition-all`}>
                            DELIVERY
                        </button>
                        <button 
                            onClick={() => setIsDelivery(false)}
                            className={`px-8 py-2 rounded-full ${!isDelivery ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:bg-surface-container-high'} font-label text-sm tracking-wide transition-all`}>
                            DINE-IN PICKUP
                        </button>
                    </div>

                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">shopping_cart</span>
                            <h3 className="font-headline text-2xl text-on-surface-variant">Your tray is currently empty.</h3>
                            <Link to="/menu" className="mt-6 inline-block clay-button bg-primary text-white px-8 py-3 rounded-full font-bold">Explore Menu</Link>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="clay-card rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 group">
                                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-surface-container-highest">
                                    <SmartImage className="w-full h-full object-cover" alt={item.name} src={item.image}/>
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="font-headline text-2xl text-on-surface">{item.name}</h3>
                                    <p className="text-secondary font-label text-xs tracking-widest mt-1">NO SPECIAL INSTRUCTIONS</p>
                                    <div className="mt-4 flex items-center justify-center md:justify-start gap-6">
                                        <div className="flex items-center bg-surface-container-highest rounded-full px-3 py-1">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-primary hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-sm">remove</span>
                                            </button>
                                            <span className="font-label w-8 text-center text-on-surface font-bold">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-primary hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-sm">add</span>
                                            </button>
                                        </div>
                                        <span className="font-label text-sm text-tertiary">₹ {item.price} / unit</span>
                                    </div>
                                </div>
                                <div className="md:text-right">
                                    <p className="font-headline text-xl text-primary font-bold">₹ {item.price * item.quantity}</p>
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="mt-2 text-error/60 hover:text-error transition-colors flex items-center gap-1 font-label text-[10px] tracking-widest mx-auto md:ml-auto">
                                        <span className="material-symbols-outlined text-xs">delete</span> REMOVE
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Promo Code */}
                    {items.length > 0 && (
                        <div className="mt-12">
                            <label className="block font-label text-xs tracking-widest text-tertiary mb-3">HAVE A VINTAGE VOUCHER?</label>
                            <div className="flex gap-4">
                                <input className="flex-grow bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary font-label tracking-widest placeholder:text-outline-variant text-on-surface" placeholder="ENTER CODE" type="text"/>
                                <button className="font-label text-xs tracking-widest text-primary border-2 border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all">APPLY</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary Panel */}
                <aside className="lg:sticky lg:top-32 w-full">
                    <div className="clay-card rounded-xl p-6 md:p-8">
                        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-8">Summary</h2>
                        <div className="space-y-5 mb-8">
                            <div className="flex justify-between items-center gap-4">
                                <span className="font-body text-on-surface-variant flex-shrink-0">Subtotal</span>
                                <span className="font-label font-bold text-on-surface text-right truncate min-w-[80px]">₹ {cartTotal}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <span className="font-body text-on-surface-variant flex-shrink-0">Packaging</span>
                                <span className="font-label font-bold text-on-surface text-right truncate min-w-[80px]">₹ {packaging}</span>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex flex-col flex-shrink">
                                    <span className="font-body text-on-surface-variant">Delivery Fee</span>
                                    {isDelivery && cartTotal < 499 && (
                                        <span className="text-[10px] text-stone-500 font-label mt-0.5 leading-tight">ADD ₹{499 - cartTotal} FOR FREE DELIVERY</span>
                                    )}
                                </div>
                                {deliveryFee === 0 ? (
                                    <span className="font-label font-bold text-primary italic flex-shrink-0 text-right min-w-[60px]">
                                        {!isDelivery ? 'N/A' : 'FREE'}
                                    </span>
                                ) : (
                                    <span className="font-label font-bold text-on-surface flex-shrink-0 text-right min-w-[80px]">₹ {deliveryFee}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <span className="font-body text-on-surface-variant flex-shrink-0">GST (5%)</span>
                                <span className="font-label font-bold text-on-surface text-right truncate min-w-[80px]">₹ {gst}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t-[0.5px] border-outline-variant flex flex-wrap justify-between items-end gap-3 mb-10 w-full overflow-hidden">
                            <span className="font-headline text-lg italic text-secondary whitespace-nowrap">Total Payable</span>
                            <span className="font-headline text-3xl md:text-4xl font-bold text-primary truncate min-w-[120px] text-right">₹ {totalPayable}</span>
                        </div>

                        <button 
                            disabled={items.length === 0}
                            onClick={() => navigate('/checkout', { state: { totalPayable } })}
                            className={`clay-button w-full py-5 rounded-full text-on-primary-container font-label font-bold tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            PROCEED TO PAYMENT
                        </button>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Cart;
