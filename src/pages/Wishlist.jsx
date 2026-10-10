import React, { useEffect } from 'react';
import SmartImage from '../components/SmartImage';
import { useNavigate } from 'react-router-dom';
import useWishlistStore from '../store/useWishlistStore';
import useCartStore from '../store/useCartStore';

export default function Wishlist() {
    const navigate = useNavigate();
    const { items, toggleWishlist, isLoading, fetchWishlist } = useWishlistStore();
    const addToCart = useCartStore(state => state.addItem);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const handleAddToCart = (item) => {
        addToCart(item);
        toggleWishlist(item); // Move to cart functionality
    };

    const handleAddAllToCart = () => {
        items.forEach(item => {
            addToCart(item);
            toggleWishlist(item);
        });
    };

    const totalSavedValue = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <main className="pt-32 pb-48 px-6 max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <p className="font-label text-secondary uppercase tracking-[0.2em] text-xs mb-2">Artisan Collection</p>
                    <h2 className="font-headline text-5xl md:text-6xl font-black text-on-surface leading-none tracking-tight">
                        Curated <br/>Pleasures
                    </h2>
                </div>
            </div>

            {isLoading ? (
                <div className="py-20 text-center font-label uppercase tracking-widest animate-pulse text-on-surface-variant">Loading Archive...</div>
            ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <span className="material-symbols-outlined text-8xl text-secondary/20 mb-6" style={{fontVariationSettings: "'wght' 200"}}>movie</span>
                    <h3 className="font-headline text-3xl font-bold mb-4">Your Frame is Empty</h3>
                    <p className="text-on-surface-variant max-w-md mx-auto mb-8">You haven't favored any of our cinematic masterpieces yet. Explore the menu to curate your collection.</p>
                    <button onClick={() => navigate('/menu')} className="bg-primary text-on-primary px-8 py-3 rounded-full font-label tracking-widest uppercase text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        Browse Menu
                    </button>
                </div>
            ) : (
                <>
                    {/* Wishlist Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {items.map(item => (
                            <div key={item.id} className="clay-card bg-surface-container-low group flex flex-col overflow-hidden p-4 rounded-[2rem] shadow-[0_20px_40px_rgba(42,23,15,0.08),inset_4px_4px_8px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(126,87,0,0.05)]">
                                <div className="relative aspect-square overflow-hidden rounded-xl mb-6">
                                    <SmartImage src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    
                                    {item.is_bestseller && (
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            <span className="bg-primary-container text-on-primary-container font-label text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">Best Seller</span>
                                        </div>
                                    )}
                                    
                                    <button 
                                        onClick={() => toggleWishlist(item)}
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-error hover:scale-110 active:scale-95 transition-transform shadow-sm">
                                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1 px-2 flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-headline text-2xl font-bold text-on-surface leading-tight">{item.name}</h3>
                                    </div>
                                    <p className="font-body text-sm text-on-surface-variant opacity-70 mb-4 line-clamp-2">{item.description}</p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="font-headline text-2xl font-bold text-secondary">₹{item.price}</span>
                                        <button 
                                            onClick={() => handleAddToCart(item)}
                                            className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-full font-label text-sm font-bold shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95">
                                            Move to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fixed Total Bottom */}
                    <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-outline-variant/20 px-6 py-6 z-[60] shadow-[0_-10px_30px_rgba(42,23,15,0.06)]">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                            <div className="flex items-baseline gap-3">
                                <span className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Total saved value</span>
                                <span className="font-headline text-3xl font-black text-on-surface tracking-tighter">₹{totalSavedValue}</span>
                            </div>
                            <button 
                                onClick={handleAddAllToCart}
                                className="w-full md:w-auto bg-secondary text-on-secondary px-12 py-4 rounded-full font-headline text-lg font-bold shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                Move all to cart
                            </button>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
