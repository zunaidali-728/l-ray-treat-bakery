import React, { useEffect, useState } from 'react';
import SmartImage from '../components/SmartImage';
import { supabase } from '../lib/supabase';
import useAuthStore from '../store/useAuthStore';

const Feedback = () => {
    const { isAuthenticated } = useAuthStore();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        avg: 0,
        total: 0,
        five: 0, four: 0, three: 0, two: 0, one: 0
    });

    useEffect(() => {
        const fetchReviews = async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setReviews(data);
                
                // Calculate Stats
                const total = data.length;
                if (total > 0) {
                    const avg = (data.reduce((acc, curr) => acc + curr.overall_rating, 0) / total).toFixed(1);
                    const five = data.filter(r => Math.round(r.overall_rating) === 5).length;
                    const four = data.filter(r => Math.round(r.overall_rating) === 4).length;
                    const three = data.filter(r => Math.round(r.overall_rating) === 3).length;
                    const two = data.filter(r => Math.round(r.overall_rating) === 2).length;
                    const one = data.filter(r => Math.round(r.overall_rating) <= 1).length;

                    setStats({
                        avg, total,
                        p5: ((five/total)*100).toFixed(0),
                        p4: ((four/total)*100).toFixed(0),
                        p3: ((three/total)*100).toFixed(0),
                        p2: ((two/total)*100).toFixed(0),
                        p1: ((one/total)*100).toFixed(0),
                    });
                }
            }
            setLoading(false);
        };
        fetchReviews();
    }, []);

    const renderStars = (rating) => {
        const stars = [];
        for(let i=1; i<=5; i++) {
            if (rating >= i) {
                stars.push(<span key={i} className="material-symbols-outlined text-sm text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>);
            } else if (rating >= i - 0.5) {
                stars.push(<span key={i} className="material-symbols-outlined text-sm text-primary" style={{fontVariationSettings: "'FILL' 0.5"}}>star_half</span>);
            } else {
                stars.push(<span key={i} className="material-symbols-outlined text-sm text-outline-variant">star</span>);
            }
        }
        return stars;
    };

    return (
        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-[90vh]">
            <header className="mb-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                    <div className="md:col-span-8">
                        <span className="font-label text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">The Critical Frame</span>
                        <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tight text-on-surface leading-none">Voices of the <br/><span className="italic font-normal text-primary">Bakehouse</span></h1>
                    </div>
                    <div className="md:col-span-4 pb-2">
                        <p className="text-stone-500 font-body leading-relaxed border-l-2 border-outline-variant pl-6">
                            Every review is a scene in our unfolding story. From the first crackle of crust to the lingering spice of the city.
                        </p>
                    </div>
                </div>
            </header>

            {!loading ? (
                <>
                    {/* Stats Bento Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 animate-in fade-in slide-in-from-bottom-8">
                        {/* Overall Rating */}
                        <div className="md:col-span-2 bg-surface-container-low p-10 rounded-xl flex flex-col justify-center items-center text-center relative overflow-hidden shadow-sm border border-primary/10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            <div className="font-label text-secondary text-xs uppercase tracking-widest mb-4 font-bold">Overall Score</div>
                            <div className="text-9xl font-headline font-bold text-primary leading-none mb-2">{stats.total > 0 ? stats.avg : '0.0'}</div>
                            <div className="flex gap-1 mb-4">
                                {renderStars(parseFloat(stats.avg || 0))}
                            </div>
                            <p className="font-body text-stone-600 uppercase tracking-tighter text-sm font-bold">Based on {stats.total} cinematic experiences</p>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="md:col-span-2 bg-surface-container p-10 rounded-xl shadow-sm border border-outline-variant/15">
                            <div className="font-label text-on-surface-variant text-xs uppercase tracking-widest mb-8 font-bold">Performance Breakdown</div>
                            <div className="space-y-4">
                                {[
                                    { s: 5, p: stats.p5 }, { s: 4, p: stats.p4 }, 
                                    { s: 3, p: stats.p3 }, { s: 2, p: stats.p2 }, { s: 1, p: stats.p1 }
                                ].map((row) => (
                                    <div key={row.s} className="flex items-center gap-4">
                                        <span className="font-label text-xs w-12 text-stone-500 font-bold">{row.s} STAR</span>
                                        <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{width: `${row.p || 0}%`}}></div>
                                        </div>
                                        <span className="font-label text-xs w-8 text-right text-stone-900 font-bold">{row.p || 0}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Interactive Context */}
                        <aside className="lg:col-span-4">
                            <div className="clay-card p-8 rounded-xl sticky top-32 bg-surface-container-low shadow-sm border border-outline-variant/20">
                                <span className="material-symbols-outlined text-[#C1440E] text-4xl mb-4">movie_filter</span>
                                <h3 className="font-headline text-2xl font-bold mb-4">Review Policies</h3>
                                <p className="text-sm font-body text-stone-600 leading-relaxed mb-6">
                                    To maintain the integrity of our culinary records, reviews can only be penned against fulfilled orchestrations. 
                                </p>
                                {!isAuthenticated && (
                                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 text-xs font-label text-primary uppercase font-bold tracking-widest text-center">
                                        Authentication Required
                                    </div>
                                )}
                                {isAuthenticated && (
                                     <div className="p-4 bg-[#FAF3E8] rounded-lg border border-[#C1440E]/20 text-xs font-label text-[#3B1F0C] leading-snug">
                                         You have authorized access. Visit your <a href="/order-history" className="text-[#C1440E] font-bold hover:underline">Order History</a> to cast your final critique on a delivered masterpiece.
                                     </div>
                                )}
                            </div>
                        </aside>

                        {/* Live Review Feed */}
                        <div className="lg:col-span-8 space-y-12">
                            {reviews.length === 0 ? (
                                <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-200">
                                    <span className="material-symbols-outlined text-4xl text-stone-300 mb-2">rate_review</span>
                                    <h3 className="font-headline text-xl text-stone-400">The Archives are quiet.</h3>
                                </div>
                            ) : (
                                reviews.map((review) => (
                                    <article key={review.id} className="group animate-in fade-in slide-in-from-bottom-4">
                                        <div className="flex gap-6 items-start mb-6">
                                            <div className="w-16 h-16 rounded-full bg-[#FAF3E8] border border-[#3B1F0C]/10 flex items-center justify-center text-[#3B1F0C] font-headline text-2xl font-bold font-serif shadow-sm">
                                                {review.user_name ? review.user_name.charAt(0) : 'C'}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="font-headline text-xl font-bold">{review.user_name || 'Anonymous Connoisseur'}</h4>
                                                    <span className="font-label text-xs uppercase tracking-widest text-stone-400">
                                                        {new Date(review.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex gap-0.5 mb-2">
                                                    {renderStars(review.overall_rating)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:pl-22 ml-0 md:ml-16">
                                            <p className="font-body text-lg leading-relaxed text-on-surface-variant mb-6 italic border-l-2 border-primary/40 pl-4 py-1 bg-surface-container-lowest/50 rounded-r-lg">
                                                "{review.review_text}"
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-surface-container-highest text-secondary font-label text-[10px] uppercase tracking-widest rounded-full font-bold flex gap-1"><span className="material-symbols-outlined text-[12px]">restaurant</span> {review.food_quality}/5 Quality</span>
                                                <span className="px-3 py-1 bg-surface-container-highest text-secondary font-label text-[10px] uppercase tracking-widest rounded-full font-bold flex gap-1"><span className="material-symbols-outlined text-[12px]">palette</span> {review.presentation}/5 Aesthetics</span>
                                                <span className="px-3 py-1 bg-surface-container-highest text-secondary font-label text-[10px] uppercase tracking-widest rounded-full font-bold flex gap-1"><span className="material-symbols-outlined text-[12px]">inventory_2</span> {review.packaging}/5 Packaging</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-px bg-outline-variant/30 mt-12 group-hover:bg-[#C1440E]/30 transition-colors"></div>
                                    </article>
                                ))
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center py-32"><span className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</span></div>
            )}
        </main>
    );
};

export default Feedback;
