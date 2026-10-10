import React from 'react';

const Loyalty = () => {
    return (
        <main className="max-w-7xl mx-auto px-8 py-12 md:py-20 relative bg-surface">
            {/* Hero Section: Asymmetric Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-8">
                    <span className="font-label text-sm uppercase tracking-[0.3em] text-secondary font-bold">The Connoisseur's Club</span>
                    <h1 className="font-headline text-6xl md:text-8xl -ml-1 text-on-surface leading-[0.9] tracking-tighter font-bold">
                        Crafted for <br/>
                        <span className="italic text-primary font-normal">True Devotees.</span>
                    </h1>
                    <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed font-medium">
                        Welcome back, Apurba. Your journey through the cinematic flavors of L'RAY continues. Every treat is a frame, and every visit is a premiere.
                    </p>

                    {/* Progress Reel */}
                    <div className="pt-8 max-w-md">
                        <div className="flex justify-between items-end mb-4">
                            <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Current Points: 840</div>
                            <div className="font-headline italic text-primary text-xl font-bold">160 pts till next milestone</div>
                        </div>
                        <div className="h-6 w-full bg-surface-container rounded-full relative overflow-hidden flex items-center border border-outline-variant/30 shadow-inner" style={{ backgroundImage: 'radial-gradient(#d4c4b0 20%, transparent 20%)', backgroundSize: '16px 16px', backgroundPosition: 'center' }}>
                            <div className="h-4 bg-primary-container rounded-full mx-1 shadow-[0_0_10px_rgba(200,146,42,0.8)] transition-all duration-1000" style={{ width: '84%' }}></div>
                        </div>
                        <div className="flex justify-between mt-3 font-label text-[10px] text-on-surface-variant tracking-widest font-bold">
                            <span>ACT I: APPRENTICE</span>
                            <span>ACT II: CONNOISSEUR</span>
                            <span>FINALE: LEGEND</span>
                        </div>
                    </div>
                </div>

                {/* Animated Digital Loyalty Card */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="w-full max-w-[400px] aspect-[1.6/1] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl transition-transform hover:-translate-y-2 duration-500" style={{ background: 'linear-gradient(135deg, #7e5700 0%, #462f00 100%)', boxShadow: '0 25px 50px -12px rgba(42, 23, 15, 0.4)' }}>
                        {/* Glossy overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                        <div className="flex justify-between items-start z-10">
                            <div className="space-y-1">
                                <div className="font-label text-[10px] tracking-[0.2em] text-[#ffdeab] uppercase opacity-70 font-bold">Membership Status</div>
                                <div className="font-headline text-2xl text-[#f8bc51] tracking-tight font-bold">The Golden Tier</div>
                            </div>
                            <span className="material-symbols-outlined text-[#f8bc51] text-4xl opacity-50">camera_roll</span>
                        </div>
                        <div className="z-10">
                            <div className="font-label text-[10px] tracking-[0.2em] text-[#ffdeab] uppercase opacity-70 mb-2 font-bold">Connoisseur</div>
                            <div className="font-headline text-3xl text-white tracking-wide font-bold">Apurba Chatterjee</div>
                        </div>
                        {/* Card details */}
                        <div className="flex justify-between items-center z-10 border-t border-white/20 pt-4 mt-2">
                            <div className="font-label text-[10px] text-[#ffdeab] opacity-80 font-bold tracking-widest">ID: LRT-1955-AC</div>
                            <div className="font-label text-[10px] text-[#ffdeab] opacity-80 italic tracking-widest">Est. 2023</div>
                        </div>
                        {/* Background abstract shape */}
                        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-[#c8922a]/30 rounded-full blur-3xl group-hover:bg-[#c8922a]/50 transition-colors duration-700"></div>
                    </div>
                </div>
            </div>

            {/* How it Works Section: Clay Icons */}
            <section className="mt-32 space-y-16">
                <div className="text-center">
                    <h2 className="font-headline text-4xl text-on-surface font-bold">The Ritual of Rewards</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Order */}
                    <div className="clay-card p-10 text-center space-y-6 hover:-translate-y-2 transition-transform duration-500 rounded-[2rem] bg-surface-container-low shadow-sm hover:shadow-lg">
                        <div className="w-20 h-20 mx-auto flex items-center justify-center bg-surface rounded-full shadow-inner border border-outline-variant/30">
                            <span className="material-symbols-outlined text-secondary text-4xl">movie_edit</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold text-on-surface">Order</h3>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed font-medium">Secure your front-row seat. Every artisanal purchase records 10 points for every ₹100 spent.</p>
                    </div>
                    {/* Earn */}
                    <div className="clay-card p-10 text-center space-y-6 hover:-translate-y-2 transition-transform duration-500 rounded-[2rem] bg-surface-container-low shadow-sm hover:shadow-lg">
                        <div className="w-20 h-20 mx-auto flex items-center justify-center bg-surface rounded-full shadow-inner border border-outline-variant/30">
                            <span className="material-symbols-outlined text-primary text-4xl">stars</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold text-on-surface">Earn</h3>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed font-medium">Watch your portfolio grow. Unlock exclusive screenings, secret menus, and limited-edition bakes.</p>
                    </div>
                    {/* Redeem */}
                    <div className="clay-card p-10 text-center space-y-6 hover:-translate-y-2 transition-transform duration-500 rounded-[2rem] bg-surface-container-low shadow-sm hover:shadow-lg">
                        <div className="w-20 h-20 mx-auto flex items-center justify-center bg-surface rounded-full shadow-inner border border-outline-variant/30">
                            <span className="material-symbols-outlined text-tertiary text-4xl">cake</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold text-on-surface">Redeem</h3>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed font-medium">Trade your applause for treats. Use points to purchase any item from the Ray Collection.</p>
                    </div>
                </div>
            </section>

            {/* Points History & CTA */}
            <section className="mt-32 grid grid-cols-1 xl:grid-cols-3 gap-16 items-start pb-24">
                <div className="xl:col-span-2">
                    <div className="bg-surface-container-low rounded-[2rem] p-8 md:p-12 shadow-sm border border-outline-variant/20 relative overflow-hidden">
                        <h3 className="font-headline text-3xl mb-8 border-b border-outline-variant/30 pb-6 font-bold text-on-surface">Points Ledger</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full font-body text-sm text-left">
                                <thead className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/30">
                                    <tr>
                                        <th className="py-4 font-bold">Date</th>
                                        <th className="py-4 font-bold">Description</th>
                                        <th className="py-4 font-bold">Transaction</th>
                                        <th className="py-4 font-bold text-right">Points</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/20">
                                    <tr className="hover:bg-surface-container-highest/20 transition-colors">
                                        <td className="py-6 font-bold text-on-surface">Oct 12, 2023</td>
                                        <td className="py-6 italic text-on-surface">Signature Sourdough & Misti Doi Tart</td>
                                        <td className="py-6 text-on-surface-variant font-medium">Order #LRT-8821</td>
                                        <td className="py-6 text-right font-bold text-primary">+120</td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-highest/20 transition-colors">
                                        <td className="py-6 font-bold text-on-surface">Oct 08, 2023</td>
                                        <td className="py-6 italic text-on-surface">Birthday Bonus Premiere</td>
                                        <td className="py-6 text-on-surface-variant font-medium">Annual Reward</td>
                                        <td className="py-6 text-right font-bold text-primary">+500</td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-highest/20 transition-colors">
                                        <td className="py-6 font-bold text-on-surface">Sep 24, 2023</td>
                                        <td className="py-6 italic text-on-surface">Artisan Espresso Beans (500g)</td>
                                        <td className="py-6 text-on-surface-variant font-medium">In-Store Purchase</td>
                                        <td className="py-6 text-right font-bold text-primary">+45</td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-highest/20 transition-colors">
                                        <td className="py-6 font-bold text-on-surface">Sep 15, 2023</td>
                                        <td className="py-6 italic text-on-surface">The Charulata Cake (Large)</td>
                                        <td className="py-6 text-on-surface-variant font-medium">Redemption #R-442</td>
                                        <td className="py-6 text-right font-bold text-secondary">-800</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Redemption CTA Sidebar */}
                <div className="space-y-8 sticky top-32">
                    <div className="bg-primary-container text-on-primary-container rounded-[2rem] p-8 shadow-xl relative overflow-hidden group clay-card border-none hover:-translate-y-2 transition-transform duration-300">
                        <div className="relative z-10 space-y-6">
                            <span className="material-symbols-outlined text-5xl">shopping_basket</span>
                            <h4 className="font-headline text-3xl leading-tight font-bold">Ready for a Premiere?</h4>
                            <p className="font-body text-sm opacity-90 leading-relaxed font-medium">
                                You have enough points to redeem for <strong className="text-on-primary-fixed">The Baker's Special Selection</strong> or any small pastry.
                            </p>
                            <button className="clay-button w-full bg-surface text-primary font-label font-bold text-sm tracking-widest py-4 rounded-full shadow-md hover:brightness-105 active:scale-95 transition-all uppercase mt-4">
                                Redeem Points in Cart
                            </button>
                        </div>
                        {/* Abstract Background */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Loyalty;
