import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { supabase } from '../lib/supabase';

const OrderHistory = () => {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setOrders(data || []);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    const formatDate = (dateString) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    };

    return (
        <main className="max-w-7xl mx-auto pt-32 px-6 pb-24">
            {/* Header Section */}
            <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-2xl">
                    <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">Archive of Taste</span>
                    <h1 className="font-headline italic text-5xl md:text-7xl text-on-surface tracking-tighter leading-none">Past Cinematic Journeys</h1>
                    <p className="mt-6 text-on-surface-variant font-body leading-relaxed opacity-80">Every order is a frame in our shared story. Revisit your favorite scenes of flavor and artisan craftsmanship.</p>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input className="w-full md:w-64 bg-surface-container-low border-none border-b border-outline-variant focus:border-primary focus:ring-0 font-label text-xs tracking-widest pl-12 py-3 rounded-full transition-colors" placeholder="SEARCH ORDER ID..." type="text" />
                    </div>
                </div>
            </header>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-8 mb-12 border-none overflow-x-auto pb-4 scrollbar-hide">
                <button className="text-amber-800 font-semibold border-b-2 border-amber-800 pb-1 font-label text-sm uppercase tracking-widest whitespace-nowrap">All Orders</button>
                <button className="text-stone-600 hover:text-stone-900 transition-colors font-label text-sm uppercase tracking-widest whitespace-nowrap">Active</button>
                <button className="text-stone-600 hover:text-stone-900 transition-colors font-label text-sm uppercase tracking-widest whitespace-nowrap">Completed</button>
                <button className="text-stone-600 hover:text-stone-900 transition-colors font-label text-sm uppercase tracking-widest whitespace-nowrap">Cancelled</button>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {loading ? (
                    <div className="col-span-1 lg:col-span-2 text-center py-20 opacity-50">
                        <span className="material-symbols-outlined animate-spin text-5xl">refresh</span>
                    </div>
                ) : !user ? (
                    <div className="col-span-1 lg:col-span-2 text-center py-20">
                        <p className="font-headline text-2xl mb-4">You are not signed in.</p>
                        <p className="font-body text-stone-500">Sign in to view your archive.</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="col-span-1 lg:col-span-2 text-center py-20">
                        <p className="font-headline text-2xl mb-4">No cinematic journeys yet.</p>
                        <p className="font-body text-stone-500 border border-outline/20 p-4 rounded-xl inline-block mt-4">Your archive is waiting for its first scene.</p>
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className={`clay-card p-8 flex flex-col gap-6 transition-all duration-300 ${order.status === 'cancelled' ? 'opacity-80 grayscale hover:grayscale-0 hover:opacity-100' : 'group hover:-translate-y-1'}`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-label text-[10px] uppercase tracking-widest text-outline">ORDER #{order.id.substring(0, 8).toUpperCase()}</span>
                                    <h3 className="font-headline text-2xl mt-1">L'Ray Treat Delivery</h3>
                                    <p className="font-label text-[10px] text-stone-500 uppercase mt-1">{formatDate(order.created_at)}</p>
                                </div>
                                <div className={`px-4 py-1 rounded-full text-[10px] font-label font-bold uppercase tracking-widest border ${order.status === 'pending' || order.status === 'paid' ? 'bg-primary-container/20 text-primary border-primary/20' :
                                        order.status === 'delivered' ? 'bg-stone-200 text-stone-600 border-stone-300' :
                                            'bg-error-container text-error border-error/20'
                                    }`}>
                                    {order.status}
                                </div>
                            </div>

                            <div className="flex gap-4 overflow-hidden py-2">
                                {order.items.slice(0, 3).map((item, idx) => (
                                    <img key={idx} className="w-20 h-20 rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-sm border border-outline-variant/30" alt={item.name} src={item.image} />
                                ))}
                                {order.items.length > 3 && (
                                    <div className="w-20 h-20 rounded-xl bg-surface-container-highest flex items-center justify-center font-label text-xs text-on-surface-variant font-bold shadow-inner">
                                        +{order.items.length - 3}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <span className="font-label text-[10px] uppercase tracking-widest text-outline">Total Amount</span>
                                    <p className="font-headline text-xl font-bold">₹ {order.total_amount}</p>
                                </div>
                                <div className="flex gap-3">
                                    {order.status !== 'delivered' && order.status !== 'rejected' && (
                                        <button onClick={() => navigate(`/order-tracking/${order.id}`)} className="px-6 py-3 rounded-full bg-primary text-on-primary font-label text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-md">
                                            <span className="material-symbols-outlined text-sm">local_shipping</span> Track
                                        </button>
                                    )}
                                    {order.status === 'delivered' && (
                                        <button onClick={() => navigate(`/order-tracking/${order.id}`)} className="px-6 py-3 rounded-full bg-[#C1440E] text-[#FAF3E8] font-label text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-md">
                                            <span className="material-symbols-outlined text-sm">rate_review</span> Edit Review
                                        </button>
                                    )}
                                    <button className="px-6 py-3 rounded-full border border-secondary text-secondary font-label text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">Reorder</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Featured Still Section */}
            <section className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-7 relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-container/10 rounded-full blur-3xl"></div>
                    <img className="rounded-xl shadow-2xl relative z-10 w-full" alt="Chef kneading dough" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByXKmgu9X1_56MS7KxA83yv73g6bq1ScxHyfxTaHvVkpMlpdh3q1u-G-61km6ufhqHVKF70SjNLyTOB20LeyLUTExX8ozDB2uV7xLiluXoL_LpGCz8IL1nJodw7ekikGtVos8rvnY1JUXY2v1TwijJHE-CB9MisV5U4eVUoLXVBskzzrLeIeDBupjNac1jS76Zy5bYW6h49WG0e51eLbUQ6wJl9GX8yC75PBb0KCJgXR2fbjLDSPqMIkMDjO-zeVsCFg4tvuNnjCmw" />
                </div>
                <div className="md:col-span-5 flex flex-col gap-6">
                    <h2 className="font-headline text-4xl leading-tight font-bold text-on-surface">The Art of the Retake</h2>
                    <p className="text-on-surface-variant font-body opacity-80 text-lg">Did a particular scene steal your heart? Revisit any past culinary experience with a single click. Our artisans are ready to recreate the magic just as you remember it.</p>
                </div>
            </section>
        </main>
    );
};

export default OrderHistory;
