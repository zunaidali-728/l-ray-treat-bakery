import React from 'react';
import SmartImage from '../components/SmartImage';

const Offers = () => {
    return (
        <main className="relative">
            {/* Hero Section */}
            <section className="relative h-[716px] flex items-center justify-center overflow-hidden bg-surface-container-low">
                <div className="absolute inset-0 z-0">
                    <SmartImage className="w-full h-full object-cover opacity-30 grayscale contrast-125 blur-sm" alt="Cinematic bakery shot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmG3HmzGQOpKO5N9yN-8FDYiTHZRZiuFwI11EdYqaXxFQtKputmosKdX1ieNno00DxYTccp9acPJza7k3mfNf2St6ry5D-ndqjcUdt6gjZPYvXXUxOSLoaq02zWFJgl_X85AzLvU7OGC7T9_g52772V4G29AVMjhwYiwvN_OP_c0lS68YH7PM-l9hvnRGnP4yCmJ3xz0PoCe3O6CoGqnT0mXuyzKlJMw9FgAbDYK5rb7gS-OoSn87-rk-9XPMaDe51eFo7t7bFaRE6"/>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl drop-shadow-md">
                    <span className="font-label text-secondary tracking-[0.4em] uppercase text-xs mb-4 block font-bold">Limited Time Curations</span>
                    <h1 className="font-headline text-5xl md:text-8xl text-on-background tracking-tighter leading-[0.9] mb-8 font-bold">
                        Cinematic Treats, <br/> <span className="italic text-primary font-light">Artisanal Savings</span>
                    </h1>
                    <p className="font-body text-lg text-on-surface-variant max-w-xl mx-auto font-medium">
                        Experience the theater of taste through our curated seasonal offers. Crafted with celluloid precision and oven-born passion.
                    </p>
                </div>
            </section>

            {/* Active Offers Section */}
            <section className="max-w-7xl mx-auto px-8 py-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="font-headline text-4xl mb-4 text-on-surface font-bold">Now Playing: The Golden Selection</h2>
                        <p className="text-on-surface-variant leading-relaxed">Handpicked combinations that celebrate the heritage of Bengal's flavors and the art of the perfect bake.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 md:pt-16">
                    {/* Offer 1: The Apu Trilogy Combo */}
                    <div className="clay-card p-4 group rounded-[32px] bg-surface hover:-translate-y-2 transition-transform duration-500">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 shadow-inner">
                            <SmartImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Apu Trilogy Combo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf8Xlt4IzVxRW3ryGTbMs7m3E0HyZRvg1dFG5ei8sxVsDv1rP86tJZ9p_UdXzLmEnLDyFdwZgp2gU-Ei-muhtLR51XjijqyqvxYCV6CpBNDz8V3ugNd2qhs8Ekft6VrmF43HXpwqDKpvSoELKoMHeU5zclH0XcFWAjbfYfwvwyqCX8q4c7sUDH7smZTnnmLPaHTZ6SJ8DExsTuKDYqmPA24LfyfwehWl7WL8HNRk0ZugG8fcpNIGDZcacqrbH2YBlQpwbW3Th8E8oD"/>
                            <div className="absolute top-4 left-4 bg-secondary text-white font-label px-4 py-1 rounded-full text-xs font-bold tracking-widest shadow-md">20% OFF</div>
                        </div>
                        <div className="px-4 pb-6">
                            <h3 className="font-headline text-2xl mb-2 font-bold text-on-surface">The Apu Trilogy Combo</h3>
                            <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">A triple-feature of our signature sourdough pizzas and two artisanal beverages.</p>
                            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/30">
                                <div>
                                    <span className="font-label text-[10px] uppercase text-stone-500 block mb-1 font-bold tracking-widest">Expires 12 Oct</span>
                                    <code className="bg-surface-container-highest px-3 py-1 rounded-lg text-primary font-bold font-label tracking-widest border border-primary/20 shadow-inner">APU20</code>
                                </div>
                                <button className="clay-button bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label text-xs font-bold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md">Copy Code</button>
                            </div>
                        </div>
                    </div>

                    {/* Offer 2: Director's Cut Breakfast */}
                    <div className="clay-card p-4 group rounded-[32px] md:-mt-16 bg-surface hover:-translate-y-2 transition-transform duration-500">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 shadow-inner">
                            <SmartImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Director's Cut Breakfast" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDouI8CvtGwEWBPdLyBsfFqMQKwHWJzsLQ5BMqkOwH9pK-PoJ-ut_3r2l_Vv5SkNmHvcrNM4NbDuaYKvmOaVZ-bCu2tww5YuS5IQYZmUMZ3ghNuPhRBU2v29M3bnOPbYJhH4POb990oSTKXmVZKo1F_4q-4BOmx0Xlg-FbKXYgzSj0KL3lhlCssDhSZ6aT9YJzkilLS3T1yRwkqTo3SK4wso3lyXQLvexFPT06bLNwe48SKUDtA5miWQIf4JvX1rnhf4CmD4viRpZZr"/>
                            <div className="absolute top-4 left-4 bg-primary text-white font-label px-4 py-1 rounded-full text-xs font-bold tracking-widest shadow-md">FLAT ₹100 OFF</div>
                        </div>
                        <div className="px-4 pb-6">
                            <h3 className="font-headline text-2xl mb-2 font-bold text-on-surface">Director's Cut Breakfast</h3>
                            <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Start your narrative with our grand baker's basket and roasted single-origin brew.</p>
                            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/30">
                                <div>
                                    <span className="font-label text-[10px] uppercase text-stone-500 block mb-1 font-bold tracking-widest">Expires 05 Oct</span>
                                    <code className="bg-surface-container-highest px-3 py-1 rounded-lg text-primary font-bold font-label tracking-widest border border-primary/20 shadow-inner">MORNING100</code>
                                </div>
                                <button className="clay-button bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label text-xs font-bold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md">Copy Code</button>
                            </div>
                        </div>
                    </div>

                    {/* Offer 3: Matinee Magic BOGO */}
                    <div className="clay-card p-4 group rounded-[32px] bg-surface hover:-translate-y-2 transition-transform duration-500">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 shadow-inner">
                            <SmartImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Matinee Magic BOGO" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1j4GPMI8WjWabGOiGaJTPZTncjmyCLLPwY2ZdZlMPgb-Qpvwp9ef5NxlT8gFM0uCTpflnGn6owS3rwqZLSyLJ-pldXYF_lRqFbw5GYINN2lgjiIJmfLzQKpuyOj-W1Uw2hPaG02oTbxO834DmcPJdldcIR1JKG2gwxxJ0pQf16TgYI6xhWlOyN1hrWGOHDNMDqJnGvfTXV1QkIVN9B_XQZnqQiuI5lNKY9a8X5vk_W9uqXyH4ZPAKELccbB2cFP5IV13stFhkxdHU"/>
                            <div className="absolute top-4 left-4 bg-on-background text-white font-label px-4 py-1 rounded-full text-xs font-bold tracking-widest shadow-md">BOGO MAGIC</div>
                        </div>
                        <div className="px-4 pb-6">
                            <h3 className="font-headline text-2xl mb-2 font-bold text-on-surface">Matinee Magic</h3>
                            <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Buy one, get one on all artisan pastries between 3 PM and 6 PM daily.</p>
                            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/30">
                                <div>
                                    <span className="font-label text-[10px] uppercase text-stone-500 block mb-1 font-bold tracking-widest">Ends Soon</span>
                                    <code className="bg-surface-container-highest px-3 py-1 rounded-lg text-primary font-bold font-label tracking-widest border border-primary/20 shadow-inner">BOGOFREE</code>
                                </div>
                                <button className="clay-button bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label text-xs font-bold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md">Copy Code</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expired Section */}
            <section className="bg-surface-container-low/50 py-24 mt-12 overflow-hidden border-t border-outline-variant/20 rounded-t-[3rem]">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="mb-12 flex items-center justify-between">
                        <div>
                            <h2 className="font-headline text-3xl mb-2 text-on-surface font-bold">The Archive</h2>
                            <p className="font-label text-xs uppercase tracking-widest text-stone-500 font-bold">Past Curations</p>
                        </div>
                        <span className="material-symbols-outlined text-4xl text-outline-variant/50">movie_edit</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 opacity-60 grayscale filter contrast-75">
                        <div className="bg-surface p-4 rounded-xl border border-dashed border-outline-variant shadow-sm hover:grayscale-0 transition-all duration-300">
                            <SmartImage className="w-full h-32 object-cover rounded-lg mb-4" alt="Monsoon Melodies" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9I5k2BYunbhG8mNylDW5i_AtARtNo6PWbI9FcXbjwHPHAIIzRYiGbjNoD7ECchF3bsGDNrOR-yKPnSXfrm5Cp4m9oK_V-6SrhUykO28yfsWzUNhayVpYEs91Ob7k5lcN4OZ4sJGb3L1PjLhAIwT-op0eJ6gO_mxinEobKJkppD5lIzXGQ7ZDJH0DHqYY7kfslr0kiLvlTKBW7-1PuSsW9kudNSJVIyhREtSqldMbmoToL6cAjDPlqAypxhb07O3RLXbupeYB9UJQ6"/>
                            <p className="font-headline text-lg mb-1 font-bold text-on-surface">Monsoon Melodies</p>
                            <p className="font-label text-[10px] text-stone-500 font-bold tracking-widest">EXPIRED AUG 2023</p>
                        </div>
                        <div className="bg-surface p-4 rounded-xl border border-dashed border-outline-variant shadow-sm hover:grayscale-0 transition-all duration-300">
                            <SmartImage className="w-full h-32 object-cover rounded-lg mb-4" alt="Winter Solstice Bake" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmigltE5CbnYf9u2wrnWYhW0_zDi4VQXj3Z-u9S_46QsdcaFPWsqUzwh1tGl3l-P6yTZzaAStQKuTli7AakOATD-KMUMHCK5ydRjZlDq-wHHhWruzT92KFJA8toX_kPnwW-S_77heLkp7Y1QQoLyn712H-xadDe2bLpyVcQU2EE_a5gzaRvvLZ4MaZHKP6OvNEmhsS7f0ZOyrpnm5qLE7yxY7NBl2pY8x_7f5Veu-N4K4besc3RchfeJQHGyLu1aHIdBk73EjbuylK"/>
                            <p className="font-headline text-lg mb-1 font-bold text-on-surface">Winter Solstice Bake</p>
                            <p className="font-label text-[10px] text-stone-500 font-bold tracking-widest">EXPIRED JAN 2023</p>
                        </div>
                        <div className="bg-surface p-4 rounded-xl border border-dashed border-outline-variant shadow-sm hover:grayscale-0 transition-all duration-300">
                            <SmartImage className="w-full h-32 object-cover rounded-lg mb-4" alt="Dark Roast Debut" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4J4ItAiIzU92h2TpmMOWiG4GiM74XgdnGfaQo-v-9BzYJy7QGir6wZqtldwwQ7zCPFwOZMuSsy4P5eHJMerGYkLRkiZGyHxWMYREhZY6QBYKnuSNJC2jib-aAIydEj4lMXxll81KjQ3ZZBpvjGmeTwkJgGPY0qt7IRWKbcfHr23MNWP_LtEKghGlr-E-A-EJGh6RVydZrescC0FICvJuR3noPGjudBJcfAG3vTBNSb7EH-2orhfOWQrYhbqdifwx9gJAVrj4p8hVq"/>
                            <p className="font-headline text-lg mb-1 font-bold text-on-surface">Dark Roast Debut</p>
                            <p className="font-label text-[10px] text-stone-500 font-bold tracking-widest">EXPIRED DEC 2022</p>
                        </div>
                        {/* Empty/Upcoming slot */}
                        <div className="bg-transparent p-4 rounded-xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center opacity-40">
                            <span className="material-symbols-outlined text-4xl mb-2 text-outline-variant">hourglass_empty</span>
                            <p className="font-label text-[10px] uppercase tracking-widest text-outline-variant">Awaiting Next Act</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Offers;
