import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { supabase } from '../lib/supabase';

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

export default function SavedPaymentMethods() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [savedMethods, setSavedMethods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    
    // Form state
    const [methodType, setMethodType] = useState('card');
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '' });
    const [upiDetails, setUpiDetails] = useState({ upi_id: '' });

    const fetchMethods = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from('profiles').select('saved_payments').eq('id', user.id).single();
            if (error) throw error;
            if (data && data.saved_payments) {
                setSavedMethods(data.saved_payments);
            }
        } catch (error) {
            console.error("Error fetching methods:", error);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchMethods();
    }, [user, navigate, fetchMethods]);

    const handleSaveMethod = async (e) => {
        e.preventDefault();
        
        let newMethod = {
            id: Date.now().toString(),
            type: methodType
        };

        if (methodType === 'card') {
            // Store only last 4 digits securely in the DB for cinematic mockup purposes
            const last4 = cardDetails.number.slice(-4);
            newMethod = { ...newMethod, label: `•••• •••• •••• ${last4}`, name: cardDetails.name, expiry: cardDetails.expiry };
        } else {
            newMethod = { ...newMethod, label: upiDetails.upi_id };
        }

        const updatedMethods = [...savedMethods, newMethod];

        try {
            const { error } = await supabase.from('profiles').update({ saved_payments: updatedMethods }).eq('id', user.id);
            if (error) throw error;
            setSavedMethods(updatedMethods);
            setIsAddOpen(false);
            setCardDetails({ number: '', name: '', expiry: '' });
            setUpiDetails({ upi_id: '' });
        } catch (error) {
            console.error("Error saving method:", error);
            alert("Failed to save method. Ensure your database is updated.");
        }
    };

    const handleDeleteMethod = async (id) => {
        const updatedMethods = savedMethods.filter(m => m.id !== id);
        try {
            const { error } = await supabase.from('profiles').update({ saved_payments: updatedMethods }).eq('id', user.id);
            if (error) throw error;
            setSavedMethods(updatedMethods);
        } catch (error) {
            console.error("Error deleting method:", error);
        }
    };

    return (
        <main className="min-h-screen bg-[#faf8f6] dark:bg-[#1f1a18] transition-colors duration-500 pb-32 pt-32 px-6">
            <div className="max-w-3xl mx-auto">
                <header className="flex items-center gap-4 mb-12">
                    <button onClick={() => navigate('/profile')} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors text-primary">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface">Payment Methods</h1>
                        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mt-1">Manage your Secure Payment Vault</p>
                    </div>
                </header>

                <div className="bg-[#fff8f5] dark:bg-[#2b221e] rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#f0e3dc] dark:border-[#3b322e]">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="font-headline text-2xl text-[#1a0f0a] dark:text-[#ede0d9]">Stored Methods</h2>
                        <button onClick={() => setIsAddOpen(true)} className="w-10 h-10 rounded-full bg-[#f2e6dc] dark:bg-[#4d3e35] flex items-center justify-center text-[#5f4100] dark:text-[#f8bc51] hover:bg-[#e8dad0] transition-colors">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>

                    {isLoading ? (
                        <p className="text-sm opacity-50 py-4">Loading secure vault...</p>
                    ) : savedMethods.length === 0 ? (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">no_encryption</span>
                            <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Your vault is empty</h3>
                            <p className="text-sm text-on-surface-variant max-w-sm mx-auto">Store your preferred payment methods for a frictionless cinematic checkout experience.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {savedMethods.map((method) => (
                                <div key={method.id} className="flex items-center gap-6 p-4 rounded-xl bg-surface-container-low border border-transparent dark:border-[#3b322e] group shadow-inner">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${method.type === 'card' ? 'bg-[#3b1f0e] text-[#e2b759]' : 'bg-primary/10 text-primary'}`}>
                                        <span className="material-symbols-outlined text-2xl">{method.type === 'card' ? 'credit_card' : 'account_balance_wallet'}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-body font-bold text-[#2a170f] dark:text-[#f0e0d5] text-lg tracking-wider">{method.label}</h4>
                                        <p className="font-label text-xs uppercase tracking-widest text-[#7a6a60] dark:text-[#a09187] mt-1">
                                            {method.type === 'card' ? `Expires ${method.expiry}` : 'Verified UPI'}
                                        </p>
                                    </div>
                                    <button onClick={() => handleDeleteMethod(method.id)} className="opacity-0 group-hover:opacity-100 p-2 text-[#ba1a1a] transition-all">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Secure Payment Method">
                <div className="flex gap-4 mb-8">
                    <button 
                        onClick={() => setMethodType('card')}
                        className={`flex-1 py-3 font-label text-xs uppercase tracking-widest border-b-2 transition-colors ${methodType === 'card' ? 'border-primary text-primary font-bold' : 'border-transparent text-outline-variant'}`}>
                        Credit/Debit
                    </button>
                    <button 
                        onClick={() => setMethodType('upi')}
                        className={`flex-1 py-3 font-label text-xs uppercase tracking-widest border-b-2 transition-colors ${methodType === 'upi' ? 'border-primary text-primary font-bold' : 'border-transparent text-outline-variant'}`}>
                        UPI ID
                    </button>
                </div>
                
                <form onSubmit={handleSaveMethod} className="space-y-6">
                    {methodType === 'card' ? (
                        <>
                            <div>
                                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Card Number</label>
                                <input required value={cardDetails.number} onChange={e=>setCardDetails({...cardDetails, number: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary/50 shadow-inner text-on-surface" placeholder="0000 0000 0000 0000" minLength="16" maxLength="16" type="text"/>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Name on Card</label>
                                    <input required value={cardDetails.name} onChange={e=>setCardDetails({...cardDetails, name: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary/50 shadow-inner text-on-surface" placeholder="Satyajit Ray" type="text"/>
                                </div>
                                <div>
                                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Expiry</label>
                                    <input required value={cardDetails.expiry} onChange={e=>setCardDetails({...cardDetails, expiry: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary/50 shadow-inner text-on-surface" placeholder="MM/YY" type="text" maxLength="5"/>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">UPI ID</label>
                            <input required value={upiDetails.upi_id} onChange={e=>setUpiDetails({...upiDetails, upi_id: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary/50 shadow-inner text-on-surface" placeholder="you@bank" type="text"/>
                        </div>
                    )}
                    
                    <button type="submit" className="w-full py-4 mt-6 bg-primary text-on-primary rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
                        Save Securely
                    </button>
                    <p className="text-center font-label text-[10px] uppercase tracking-widest opacity-40 mt-4">256-Bit Bank Grade Encryption</p>
                </form>
            </Modal>
        </main>
    );
}
