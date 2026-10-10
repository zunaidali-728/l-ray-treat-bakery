import React from 'react';
import SmartImage from '../components/SmartImage';

const Contact = () => {
    return (
        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            {/* Hero Title Section */}
            <header className="mb-20 text-center md:text-left">
                <h1 className="font-headline text-6xl md:text-8xl font-bold -tracking-widest text-on-surface mb-4">In Touch With <br/><span className="italic text-primary font-normal">Tradition.</span></h1>
                <p className="font-label text-sm uppercase tracking-[0.3em] text-secondary max-w-xl">Correspondence for the discerning palate and the artisan heart.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left: Claymorphism Contact Form */}
                <section className="clay-card p-8 md:p-12 shadow-sm rounded-[32px] bg-surface-container-low">
                    <h2 className="font-headline text-3xl mb-8 text-on-primary-container">Send a Message</h2>
                    <form className="space-y-8">
                        <div className="relative">
                            <label className="font-label text-xs uppercase tracking-widest text-secondary mb-2 block font-bold">Name</label>
                            <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 placeholder-on-surface-variant/50 transition-colors" placeholder="Ray Chaudhury" type="text"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative">
                                <label className="font-label text-xs uppercase tracking-widest text-secondary mb-2 block font-bold">Email</label>
                                <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 placeholder-on-surface-variant/50 transition-colors" placeholder="ray@example.com" type="email"/>
                            </div>
                            <div className="relative">
                                <label className="font-label text-xs uppercase tracking-widest text-secondary mb-2 block font-bold">Mobile</label>
                                <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 placeholder-on-surface-variant/50 transition-colors" placeholder="089103 63559" type="tel"/>
                            </div>
                        </div>
                        <div className="relative">
                            <label className="font-label text-xs uppercase tracking-widest text-secondary mb-2 block font-bold">Subject</label>
                            <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 placeholder-on-surface-variant/50 transition-colors" placeholder="Artisan Partnership Request" type="text"/>
                        </div>
                        <div className="relative">
                            <label className="font-label text-xs uppercase tracking-widest text-secondary mb-2 block font-bold">Message</label>
                            <textarea className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 placeholder-on-surface-variant/50 resize-none transition-colors" placeholder="Share your thoughts or inquiries with us..." rows="4"></textarea>
                        </div>
                        <button className="clay-button bg-primary-container text-on-primary-container px-12 py-4 rounded-full font-label uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg font-bold">
                            Dispatch Message
                        </button>
                    </form>
                </section>

                {/* Right: Contact Info & Map */}
                <section className="space-y-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Address Card */}
                        <div className="bg-surface-container-low p-8 rounded-xl shadow-sm space-y-4 hover:-translate-y-1 transition-transform">
                            <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                            <h3 className="font-headline text-xl font-bold">The Bakehouse</h3>
                            <p className="text-on-surface-variant leading-relaxed">Street No. 174, BE Block,<br/>Action Area 1B, New Town,<br/>WB 700163</p>
                        </div>
                        {/* Phone & Hours Card */}
                        <div className="bg-surface-container-low p-8 rounded-xl shadow-sm space-y-4 hover:-translate-y-1 transition-transform">
                            <span className="material-symbols-outlined text-primary text-3xl">call</span>
                            <h3 className="font-headline text-xl font-bold">Connections</h3>
                            <p className="text-on-surface-variant">
                                <span className="block font-label text-xs uppercase text-secondary mb-1 font-bold">Phone</span>
                                089103 63559
                            </p>
                            <p className="text-on-surface-variant mt-4">
                                <span className="block font-label text-xs uppercase text-secondary mb-1 font-bold">Status</span>
                                Open now • Closes 10 PM
                            </p>
                        </div>
                    </div>

                    {/* Google Maps Embed Representation */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl group cursor-pointer">
                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                        <SmartImage className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" alt="Map View" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCyZ49kaHkMljKPxdQDk_TWkS-svkB7UhPApPt-yAFrlzNs5X6p4UIobiPvLCwlgu73zsc-SD69vZpnuga0uqDyL3dHdRquO42kkCUj5NB7-JwQ5KOUVUerByGE4-pg4zWlb6qOYWhBwYP_0R0OWUs6wqxEP_eVgt42YAuP1uwElqc6lAoNjniSUS4HS-Adhs03POXfAk89xvFzqV8wuo14g6g5sJPv7UkrYDDJWFnBCQsQEIFFk-ycaUZ1DskTE922Q-V4hleIajS"/>
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-lg z-20 shadow-xl border border-outline-variant/20 group-hover:-translate-y-2 transition-transform">
                            <p className="font-label text-xs uppercase tracking-widest text-primary mb-1 font-bold">Find Us In</p>
                            <p className="font-headline text-lg font-bold text-on-surface">New Town, Kolkata</p>
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="bg-surface-container-highest p-8 rounded-xl shadow-inner">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
                            <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden shadow-md">
                                <SmartImage className="w-full h-full object-cover grayscale contrast-125" alt="Founder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiT0IPBdrjGXns4ayj12KzUaZp1ZT8y5RYMsMU9HcWuCzPjnakj-pTCDDif1e2p7IXQ9iKL92woqo_2VKk-UbzHyzOTA8EMlvlxGQaAxoLfH7TH2xNqncTId57liFqWJhxMbtaz8LJQH83Lx0B1Gld3p94guOySFvzcQha7MKoUhqxdvuV-tsh2EjogUN0ri70PUdyIN7N7NZMJDCmWuLTELrGiY-krekApOcbmhTRIoOcktIP0Kw0iNFi2cxp7tUcxMyBUvPT7SMO"/>
                            </div>
                            <div className="flex-1">
                                <p className="italic text-on-surface mb-2 font-headline text-lg">"Every inquiry is a thread in the tapestry of our community. We look forward to your words."</p>
                                <p className="font-label text-xs uppercase tracking-widest text-secondary font-bold">— Ray Chaudhury, Founder</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Contact;
