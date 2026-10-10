import React from 'react';
import SmartImage from '../components/SmartImage';

const About = () => {
    return (
        <main className="min-h-screen">
            {/* Parallax Hero */}
            <header className="relative h-[921px] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <SmartImage className="w-full h-full object-cover scale-110 opacity-90 contrast-125 brightness-75" alt="Cafe interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm-F7spwdhsbHli1fGk5hoCDyjJ2BJCLRGRJCOwg64jRLcfjg9TzoI1BB5EbGJcuKqrzb3Y0yRO_CsvGdJBW8aZH0sqsXUr7DZk5aGbF7BYrpB6W2yJEJDd0EpwmFQDRTgkpdYan90HvCrdQF7BH2JSqCSwx-KmsJFIoziALjQtyFzrWtm53Sp5kyJv_ZfI-syBcjsV08hsc31DbGqhRfnrLBz_8lZHI2v-pUr-SDzB0Dezhz9mI3ZDZidfYgOuAX9_Odgxuk8zsqc"/>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface"></div>
                </div>
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="font-label text-secondary tracking-[0.4em] uppercase text-sm mb-6 block drop-shadow-md">Est. 1955 — Reimagined</span>
                    <h1 className="font-headline text-6xl md:text-8xl text-surface-container-lowest font-bold tracking-tight mb-8 drop-shadow-lg text-white">Cinematic Baking.</h1>
                    <p className="font-body text-xl text-surface-bright/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md text-white">Where the celluloid dreams of Satyajit Ray meet the tactile warmth of artisan sourdough.</p>
                </div>
            </header>

            {/* Our Story Section */}
            <section className="py-32 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 relative group">
                        <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
                            <SmartImage className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Baker scoring bread" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKM8Sp-UeeAnddCMd8ZDvz65Bh3oO5ZLp3hNU1QHJOlnBp7sjWbT9gmZe9THyRiG-38r8NUIHV5scwy5XfRtxGSJ3O9D-mA22lqdI9jeQi6LCsO9QDbA0CelzfiJx9gd73F5vQD8WREMoNTVg7w3PpC94tuJU9A24etfwMYyYWkLz9fKCE9KSTOYKdIsUyRGbXGV3A612-lqTsyz8XvN08TXr4324baD0CGBKin_e2AjqRa8nZ2iScZRiJTJqyhO0aXZRH5EijPnYC"/>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary-container rounded-lg -z-10 opacity-20"></div>
                    </div>
                    <div className="lg:col-span-7">
                        <h2 className="font-headline text-5xl text-on-surface mb-8 leading-tight">Newtown's First <span className="italic text-primary">Celluloid</span> Bakehouse</h2>
                        <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-body">
                            <p>L'RAY TREAT wasn't born in a boardroom; it was conceived in the flickering shadows of the Minar Cinema. Our founder, inspired by the rhythmic mastery of Satyajit Ray's storytelling, sought to bring that same balance, texture, and soul to the world of pastry.</p>
                            <p>Since 1955, we've curated a space in Newtown that honors the legacy of Ray. Every croissant has a "frame," every coffee has a "score," and every guest is part of our ongoing production.</p>
                        </div>
                        <div className="mt-12 flex flex-wrap gap-4">
                            <button className="clay-button bg-primary-container text-on-primary-container px-10 py-4 rounded-full font-label uppercase tracking-widest text-sm font-bold active:scale-95 transition-all">Watch the Journey</button>
                            <button className="text-secondary border-b-2 border-secondary/30 px-6 py-4 font-label uppercase tracking-widest text-sm hover:border-secondary transition-all font-bold">Our Legacy</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ray Inspiration (Asymmetric Layout) */}
            <section className="bg-surface-container-low py-32 overflow-hidden border-y border-outline-variant/10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row gap-16 items-end mb-20">
                        <h2 className="font-headline text-7xl md:text-9xl text-outline-variant opacity-30 select-none">Ray.</h2>
                        <div className="max-w-xl">
                            <h3 className="font-headline text-4xl text-primary mb-6">The Director's Palette</h3>
                            <p className="text-on-surface-variant leading-relaxed font-body">We use the "Apu Trilogy" as our seasonal guide. Autumnal bakes mirror the golden fields, while our winter menu takes inspiration from the moody interiors of Charulata.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="h-96 md:mt-24 rounded-lg overflow-hidden group relative shadow-md">
                            <SmartImage className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Vintage camera lens" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjJ9A-br3lQR10J7N8PSjJCIlj0EiuZnRSZ96bkIdu6hBYODOaod_0A6NWzgk0_kLlE6illeVsIcGVSmDgNYYOk69e4PDlVR5uosqbihIW7RyVdy-Et7cX5V7HZx-GyDKwC-4BFJE6Z7rP-4CRrQYckqZWBIgeMv6nRaCVQF-eQhjYAL1yRpGTQQtWBmVXjZDmT20_Mu_7HFcU5zDzX-GyE3TpLHV0lp7g6LaQgQMdQm1cFWpKtCkwslpKkhR4P8oQ00_7j8ZMSvcg"/>
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="h-96 rounded-lg overflow-hidden group relative shadow-md">
                            <SmartImage className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Terracotta motifs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXBeeS-QWffcGA5vyTPiwJ9CnbxQx9MEu_ijEAk1YqPFlPANnQx1gT-Q6Huwrf98y2cpUsGGUQIQDM463Hl5PeAt01rb_93gKhuWXwHN0aHne8JhyD8lAvhAD5rR0UWhhwf9WpCumeagcs5g3bo3y2lnsMJKD-LzxLZwebuIy6xG9G_hsIWeRH8_WmI1K3617MsZJViCaMfhww704Fgza9N85qYFPgPccn6OhuCJ73LT9UDWey6ynJb2Sf5RYSkUO0uQ1cBjnsaY-Z"/>
                        </div>
                        <div className="h-96 md:mt-12 rounded-lg overflow-hidden group relative shadow-md">
                            <SmartImage className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Coffee and script" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBur2qZ3NuU2863YKYQnZsHjnyhRRLmlX8E5olN_tQsSQJ4gbfEw_EPQb6DgpKjKx7MZMeAeMcLs6DoeTIDPmOgf9alM8da4WhI2awq9fAy2DvT_mv_qcXNgn4eetSLzzwlXQljuTX23qWiaS8Ds7azekoQ0lVMD67_djar63NsoUksO96mU4DmeblYsCxXin2R5jQ5PmHE9QwAv9QH9VrnehrApe3pMf1xvaKzE6iDMfLdDixix87luPVIlGkTEuKX70Irpw_aJ6eV"/>
                        </div>
                        <div className="h-96 md:mt-32 rounded-lg overflow-hidden group relative shadow-md">
                            <SmartImage className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Bakery mural" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmE1dp1_49046udx6Dbt6_3H2YsTJuZF7tBdF8xTFcloHDLznJRSPXTucEeq9E5tum6LDwobyXzGTjdrkfqr0f3aM6WjTY3PKcT9CE1_EA4sOPTlCnnCJbqHLBbMZeA1fwpYb6pYjVNGv96Jb8qPw8ocXmayVbNrxFDV6U9C2chMnNKk5Fc_TPln7xAI926SsdWE1XF0Wssea5tjujJzKqhOtD5AYFVsoGef2GaquoYfPxB95MKNoIfn9qcPWMpVeQwClVMn0IbSEm"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Clay Cards */}
            <section className="py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="font-label text-secondary uppercase tracking-widest text-xs">Our Foundation</span>
                        <h2 className="font-headline text-5xl text-on-surface mt-4">The Pillars of L'RAY</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Card 1 */}
                        <div className="clay-card p-10 rounded-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 bg-surface shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-primary-container/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>eco</span>
                            </div>
                            <h4 className="font-headline text-xl mb-4 text-on-surface">Freshness</h4>
                            <p className="text-on-surface-variant font-body text-sm leading-relaxed">Baked thrice daily, mirroring the morning, matinee, and evening shows.</p>
                        </div>
                        {/* Card 2 */}
                        <div className="clay-card p-10 rounded-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 bg-surface shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-secondary-container/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-secondary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>pan_tool_alt</span>
                            </div>
                            <h4 className="font-headline text-xl mb-4 text-on-surface">Artisanship</h4>
                            <p className="text-on-surface-variant font-body text-sm leading-relaxed">Every loaf is hand-scored by craftsmen who view baking as high art.</p>
                        </div>
                        {/* Card 3 */}
                        <div className="clay-card p-10 rounded-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 bg-surface shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-tertiary-container/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-tertiary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>groups</span>
                            </div>
                            <h4 className="font-headline text-xl mb-4 text-on-surface">Community</h4>
                            <p className="text-on-surface-variant font-body text-sm leading-relaxed">A sanctuary for poets, film-makers, and dreamers of Newtown.</p>
                        </div>
                        {/* Card 4 */}
                        <div className="clay-card p-10 rounded-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 bg-surface shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-primary-container/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary-container text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>movie</span>
                            </div>
                            <h4 className="font-headline text-xl mb-4 text-on-surface">Cinema Heritage</h4>
                            <p className="text-on-surface-variant font-body text-sm leading-relaxed">Preserving the soul of Bengali cinema through culinary expression.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Milestone Timeline */}
            <section className="py-32 bg-on-background text-surface rounded-t-[3rem] shadow-2xl">
                <div className="max-w-7xl mx-auto px-8 w-full">
                    <div className="mb-20">
                        <h2 className="font-headline text-5xl mb-4 text-surface">Milestones</h2>
                        <div className="w-24 h-1 bg-primary-container"></div>
                    </div>
                    <div className="space-y-24 relative before:absolute before:left-[15px] md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-outline-variant/20">
                        {/* Event 1 */}
                        <div className="relative flex flex-col md:flex-row items-center justify-between group">
                            <div className="md:w-[45%] mb-8 md:mb-0 text-left md:text-right pr-0 md:pr-12">
                                <span className="font-label text-primary-container text-2xl font-bold">1955</span>
                                <h4 className="font-headline text-2xl mt-2 text-surface">The First Scone</h4>
                                <p className="text-surface-variant/70 font-body mt-4 leading-relaxed">Ray treats opening in a small corner shop near the legendary Minar Cinema.</p>
                            </div>
                            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-on-background bg-primary-container group-hover:scale-150 transition-transform z-10 shadow-lg"></div>
                            <div className="md:w-[45%] hidden md:block"></div>
                        </div>

                        {/* Event 2 */}
                        <div className="relative flex flex-col md:flex-row items-center justify-between group">
                            <div className="md:w-[45%] hidden md:block"></div>
                            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-on-background bg-secondary group-hover:scale-150 transition-transform z-10 shadow-lg"></div>
                            <div className="md:w-[45%] mb-8 md:mb-0 text-left pl-12 md:pl-12 ml-10 md:ml-0">
                                <span className="font-label text-primary-container text-2xl font-bold">1982</span>
                                <h4 className="font-headline text-2xl mt-2 text-surface">The Celluloid Shift</h4>
                                <p className="text-surface-variant/70 font-body mt-4 leading-relaxed">Transitioned into a fully themed experience honoring the Golden Age of Bengali films.</p>
                            </div>
                        </div>

                        {/* Event 3 */}
                        <div className="relative flex flex-col md:flex-row items-center justify-between group">
                            <div className="md:w-[45%] mb-8 md:mb-0 text-left md:text-right pr-0 md:pr-12">
                                <span className="font-label text-primary-container text-2xl font-bold">2024</span>
                                <h4 className="font-headline text-2xl mt-2 text-surface">L'RAY Newtown</h4>
                                <p className="text-surface-variant/70 font-body mt-4 leading-relaxed">Launching our flagship tech-integrated artisan cafe in the heart of the tech hub.</p>
                            </div>
                            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-on-background bg-primary-container group-hover:scale-150 transition-transform z-10 shadow-lg"></div>
                            <div className="md:w-[45%] hidden md:block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32 px-8 max-w-7xl mx-auto bg-surface">
                <h2 className="font-headline text-5xl text-center mb-20 text-on-surface">The Casting Crew</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center group">
                        <div className="aspect-square rounded-full overflow-hidden mb-8 border-8 border-surface-container-low grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl">
                            <SmartImage className="w-full h-full object-cover" alt="Baker" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyiwNNmcKhbxZlI_JcX0SUAAzARJ2vVk0FH3udNWuOaZBah4LiTbVd_nIKTcvfqUvVi-WqAsDLNv23DOsyuC2zZVFdPSoGxzZN93KNz2fezoFqGZ_aW0-37q_RB57eIuevXTvfw1qEQHMh-0JI81NVjaCuED45gJSqRrtFcZ0BpsOu_76iLd_D9BTQsARF9IWomsEcCG3Tkg9s6su4_mf-IVl8h2XakfiGVXX_jrZIW-cbZ91GnnTGPzlfMR12xiuYK9fQoszlNzHY"/>
                        </div>
                        <h4 className="font-headline text-2xl text-on-surface font-bold">Arjun Ray</h4>
                        <p className="font-label text-secondary uppercase text-xs tracking-widest mt-2 font-bold">Master Patissier</p>
                        <p className="text-on-surface-variant font-body mt-4 text-sm px-6">A descendant of the craft, bringing vintage flavors into modern palettes.</p>
                    </div>
                    <div className="text-center group mt-0 md:mt-12">
                        <div className="aspect-square rounded-full overflow-hidden mb-8 border-8 border-surface-container-low grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl">
                            <SmartImage className="w-full h-full object-cover" alt="Barista" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOCeydY5ENewG3BNL-QuoJWdu7N3U0Gf_P_feF-LbOYWnCHnGXXv7CbWdqshHa6AYqynY0rLNIADWsSdaLxspVSeVfDA8E93yw2X1lB6GJTm0u_qlfrZtVnjD4avD-BFB5ov7nr-H_jOFz9BDnHX-BbByG1KsCZQIlCccTwbwu1yOOmlgA-ESkivwpHYKLsFBAC5V8E4M2rTfu47gLXfZLUjZQKp5pQajJAF8klHET7FmKkidscA45ufChbeQsKDO3SWFlYukuLDml"/>
                        </div>
                        <h4 className="font-headline text-2xl text-on-surface font-bold">Maya Chatterjee</h4>
                        <p className="font-label text-secondary uppercase text-xs tracking-widest mt-2 font-bold">Chief of Brews</p>
                        <p className="text-on-surface-variant font-body mt-4 text-sm px-6">Architect of the 'Director's Dark' roast, brewing stories in every cup.</p>
                    </div>
                    <div className="text-center group">
                        <div className="aspect-square rounded-full overflow-hidden mb-8 border-8 border-surface-container-low grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl">
                            <SmartImage className="w-full h-full object-cover" alt="Manager" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB07QkFKYnYQh1OLl_ZdE1xcIOAaDT6HVlgpu35Q0FLtBvJDvHRjtXoqoFdxGvsP68wONVTeUsb9ZC3Dyb28ci1f1P_4KCnrEFdzwdZnVx0rLe9UMx-RM_7-EeW0sv-jjFGhdy979TBrJniKkiCPjlA5wuxlYz42Mv_0MgiWhY_tR_g25ZShZLyZxtM_sRT_Nd8pbrEQOeSrQUGmTwEB_cbpSfZ39gZz6zuGGdOocDY0ZHazsx0YIioDebwAUqLYZqYHi-Ox97tNou2"/>
                        </div>
                        <h4 className="font-headline text-2xl text-on-surface font-bold">Somnath Das</h4>
                        <p className="font-label text-secondary uppercase text-xs tracking-widest mt-2 font-bold">Experience Director</p>
                        <p className="text-on-surface-variant font-body mt-4 text-sm px-6">The curator of the 'L'RAY atmosphere, ensuring every visit is a scene to remember.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
