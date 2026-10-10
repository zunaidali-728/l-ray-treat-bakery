import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useOrderStore from '../store/useOrderStore';
import useAuthStore from '../store/useAuthStore';

export default function ActiveOrderBanner() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuthStore();
    const { activeOrder, fetchActiveOrder } = useOrderStore();

    useEffect(() => {
        if (user) {
            fetchActiveOrder();
            // Polling interval seamlessly picks up status variations from backend
            const interval = setInterval(fetchActiveOrder, 5000);
            return () => clearInterval(interval);
        }
    }, [user, fetchActiveOrder]);

    // Don't clutter screen if no active order exists or if they are already observing the tracking screen
    if (!activeOrder || location.pathname.includes('/order-tracking')) return null;

    const getStatusText = (status) => {
        switch(status) {
            case 'pending': return 'Order Sent';
            case 'preparing': return 'Being Prepared';
            case 'packed': return 'Packed & Ready';
            case 'delivering': return 'Out For Delivery';
            default: return 'Active Order';
        }
    };

    return (
        <div 
            onClick={() => navigate(`/order-tracking/${activeOrder.id}`)}
            className="fixed bottom-24 md:bottom-8 left-6 md:left-8 z-[80] bg-[#a63b10]/95 dark:bg-[#7e5700]/95 backdrop-blur-xl text-white p-4 rounded-2xl shadow-[0_20px_40px_rgba(42,23,15,0.2)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in zoom-in-95 flex items-center gap-4 w-[280px] border border-white/20 group"
        >
            <div className="w-12 h-12 rounded-full flex-shrink-0 bg-white/20 flex items-center justify-center relative shadow-inner">
                <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>room_service</span>
                {/* Live pulsing dot indicates backend synchronization */}
                {(activeOrder.status === 'preparing' || activeOrder.status === 'delivering') && (
                    <>
                        <span className="absolute top-0 right-0 w-3 h-3 bg-[#f8bc51] rounded-full animate-ping border border-[#a63b10]"></span>
                        <span className="absolute top-0 right-0 w-3 h-3 bg-[#f8bc51] rounded-full border border-[#a63b10] shadow-[0_0_8px_rgba(248,188,81,0.8)]"></span>
                    </>
                )}
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
                <span className="font-label text-[10px] uppercase tracking-widest text-white/70">Live Tracking</span>
                <span className="font-headline font-bold text-base tracking-wide truncate">{getStatusText(activeOrder.status)}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <span className="material-symbols-outlined text-white text-sm">arrow_forward_ios</span>
            </div>
        </div>
    );
}
