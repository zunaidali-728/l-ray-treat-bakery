import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useMenuStore from '../store/useMenuStore';

export default function Home() {
  const addItem = useCartStore(state => state.addItem);
  const { products, loading } = useMenuStore();

  const popularPicks = products.filter(p => p.is_bestseller || p.is_chefs_choice).slice(0, 3);
  return (
    <>
      {/* 2. HERO */}
      <section className="relative min-h-[700px] h-screen w-full flex items-center justify-center overflow-hidden bg-[#1A1209]">
        <div className="absolute inset-0 bg-cover bg-center z-0 opacity-60" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkXKAnXb2otqua3ekd1SJDKdxZaS_Jh-GEUj00jXpNRqCsztrNRtyhgmR5YDnbeKpduO2at5WfNkHWQxe9d2I3YwraAfJCUs8dCQbi-EySINQPNsAO6cBsATKIIFTwqM9F7kfgSqCrNdM7gmoRhawYHYoRR7n47KgdHrSdKlD_p3bNs-bqsoQuMiUPSPXoSNL7VTeHG8TI0Bbb0UgeRTztHMq4G4QRmkFID1MSv9sHk6PbspTIbdz9nnwUq_HU1gYg5a8-vBhmCadW')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1209]/40 to-[#1A1209] z-10"></div>
        <div className="relative z-30 text-center px-6 max-w-4xl opacity-100">
          <h1 className="font-headline italic font-black text-6xl md:text-8xl lg:text-9xl text-white mb-8 tracking-tighter leading-tight">
            Where <span className="text-primary italic">Cinema</span> <br /> Meets Cuisine
          </h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link to="/menu">
              <button className="clay-button-secondary px-10 py-5 text-white font-bold text-lg hover:scale-105 transition-transform">
                Order Now
              </button>
            </Link>
            <Link to="/menu">
              <button className="clay-button-primary px-10 py-5 text-white font-bold text-lg hover:scale-105 transition-transform">
                Explore Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TICKER */}
      <div className="bg-primary py-4 overflow-hidden relative z-20">
        <div className="marquee">
          <div className="marquee-content font-label text-on-primary tracking-widest uppercase text-sm font-bold flex items-center">
            <span>Kolkata's 1st Satyajit Ray-Themed Café</span>
            <span className="mx-8 opacity-40">•</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-amber-300" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8 Rating</span>
            <span className="mx-8 opacity-40">•</span>
            <span>Artisan Pizzas &amp; Hand-crafted Brownies</span>
            <span className="mx-8 opacity-40">•</span>
            <span>Authentic Bengali Cinematic Ambiance</span>
          </div>
          <div className="marquee-content font-label text-on-primary tracking-widest uppercase text-sm font-bold flex items-center">
            <span>Kolkata's 1st Satyajit Ray-Themed Café</span>
            <span className="mx-8 opacity-40">•</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-amber-300" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8 Rating</span>
            <span className="mx-8 opacity-40">•</span>
            <span>Artisan Pizzas &amp; Hand-crafted Brownies</span>
            <span className="mx-8 opacity-40">•</span>
            <span>Authentic Bengali Cinematic Ambiance</span>
          </div>
        </div>
      </div>

      {/* 4. CATEGORY CAROUSEL */}
      <section className="py-24 px-8 opacity-100 bg-surface">
        <h2 className="font-headline text-4xl font-black text-on-surface mb-16 text-center">Curated Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
          <Link to="/menu#pizzas">
            <div className="clay-card p-6 flex flex-col items-center justify-center aspect-square hover:-translate-y-2 transition-all cursor-pointer group">
              <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_jyPb1YM01HCZqZa84C_PDwptlq1JiUc_nsCCjAGZM4xiPk40tdv2SKZAsUvbbDOkqUXSCxpuPsISJAvsAcEgsK0_h6nB110EGrqSWTYbpt1P3IwwYNFCUVnGXTIGuV2tLNIqEcxOeoqK5_IHwis7t9M7zHogfaB0uwlaGhiJDjN1w_J3QuNYbiDlG9lZ2gCMqnEytHYk-wsl9om5mIwzSnHikS10lk5mjhixa_WZR20Iem9nIQMTRG5yYMgI7fzpS7LNEDiWv7h-" />
              </div>
              <span className="font-label text-xs tracking-widest uppercase text-primary font-bold">Pizzas</span>
            </div>
          </Link>
          <Link to="/menu#pasta">
            <div className="clay-card p-6 flex flex-col items-center justify-center aspect-square hover:-translate-y-2 transition-all cursor-pointer group">
              <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp6VaAiHfYMidp64hyr99nRSKk7Ye-j23B67U4PpIfZkVXEgKoFOexSlD1_xYjcVPoosfrpKOJoeKt448rMgkoIM8UWJGnIdSosU6IAKbr73YJjMNVnWuzjbvORsEjR-IBVoEbtqrCZ2LiheGB4K9DCq44MpOxPZjfMj-_Dbx1ZO0AJVupSUL4SKEZXEHuvLsNTdPfsGsc6LCbjIvw5xDWFYXtPjt8mSzFLJtmDE3M3QZpuMyTbNjhEKS4naDhnBy-JfH2GUBsVe6K" />
              </div>
              <span className="font-label text-xs tracking-widest uppercase text-primary font-bold">Pasta</span>
            </div>
          </Link>
          <Link to="/custom-cake">
            <div className="clay-card p-6 flex flex-col items-center justify-center aspect-square hover:-translate-y-2 transition-all cursor-pointer group">
              <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAluNKwkbVI5_ZLYT5wYeZ0BtJvvrytRLn2erM-6w085j8hC6bSdUj8Qx2hCQ5yq6_aqYbiJ0YI1_wIRRvRSTkKKV3RzJENlj3OsiKe3r55BvK4qtooNeI26XyT0b6WVRRpBWIyto3cpuBKyY9NXlyX8KrxFNJBxaCvffwktiJuJFOCfFQRdtl7TFWV5C3aeimOjhNAmJno88DnVfOEM4pN1S9Ff9Wggygmqby94E2-9JVaonFR2vHiI_hagUn6QwHbAEWnauGMdxSx" />
              </div>
              <span className="font-label text-xs tracking-widest uppercase text-primary font-bold">Cakes</span>
            </div>
          </Link>
          <Link to="/menu#beverages">
            <div className="clay-card p-6 flex flex-col items-center justify-center aspect-square hover:-translate-y-2 transition-all cursor-pointer group">
              <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUl-ONAdBY5uqMRlkx8fI6S4JmAmkxCVlCRuZq7lQLenqSLafaCQrP3Q93Dt7Z5TNbNg5tlExkgDwhn0YjRThWojbgk9wR6hjHjFcYEK_kkwTJ-lHYAY9XnrOVcjB7urwBdDQiSfrxyBoZrOjslOytrGnVqRlfOqMfFt-W_razQF5rqNVmR2OeSSpfXpbL6uX3a2NlgcGtk0cJ7XiELslZBnUdijTZC0SD0RdXehxe7UJ2tr1FwNzoLJ_cXCwcc01FfZMBsi2uTb4q" />
              </div>
              <span className="font-label text-xs tracking-widest uppercase text-primary font-bold">Beverages</span>
            </div>
          </Link>
        </div>
      </section>



      {/* 6. BESTSELLERS */}
      <section className="py-24 bg-[#FFF8F0] opacity-100">
        <div className="px-8 max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-label text-xs tracking-widest uppercase text-secondary font-bold block mb-2">Popular Picks</span>
              <h2 className="font-headline text-5xl font-black text-on-surface">The Director's Favorites</h2>
            </div>
            <Link to="/menu" className="text-primary font-bold hover:underline underline-offset-8">View Full Menu</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-12 opacity-50">
                <span className="material-symbols-outlined animate-spin text-5xl">refresh</span>
              </div>
            ) : (
              popularPicks.map((product) => (
                <div key={product.id} className="clay-card overflow-hidden p-4 group flex flex-col">
                  <div className="aspect-video rounded-xl overflow-hidden mb-6 relative">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} src={product.image_url} />
                    <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full font-label text-xs font-bold">
                      {product.is_bestseller ? 'Bestseller' : "Chef's Choice"}
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline text-xl font-bold">{product.name}</h3>
                      <span className="font-label text-primary font-bold">₹{product.price}</span>
                    </div>
                    <p className="text-sm text-stone-600 mb-6">{product.description}</p>
                    <button
                      onClick={() => addItem({ id: product.id, name: product.name, price: Number(product.price), image: product.image_url })}
                      className="mt-auto w-full bg-surface-container-highest py-3 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-base">shopping_bag</span> Add to Tray
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. CUSTOM CAKE CTA */}
      <section className="py-20 px-8 opacity-100 bg-surface">
        <div className="max-w-screen-2xl mx-auto clay-card bg-primary/5 border border-primary/10 p-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="font-headline text-4xl font-black mb-6 border-b-0">Celebrations, Conceptualized.</h2>
            <p className="text-xl text-stone-600 mb-8 leading-relaxed">Turn your cinematic vision into a delicious reality. Custom cakes designed with artisan precision for your special frames.</p>
            <Link to="/custom-cake" className="clay-button-secondary px-8 py-4 text-white font-bold inline-block">Request Custom Design</Link>
          </div>
          <div className="w-full md:w-1/3 aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAluNKwkbVI5_ZLYT5wYeZ0BtJvvrytRLn2erM-6w085j8hC6bSdUj8Qx2hCQ5yq6_aqYbiJ0YI1_wIRRvRSTkKKV3RzJENlj3OsiKe3r55BvK4qtooNeI26XyT0b6WVRRpBWIyto3cpuBKyY9NXlyX8KrxFNJBxaCvffwktiJuJFOCfFQRdtl7TFWV5C3aeimOjhNAmJno88DnVfOEM4pN1S9Ff9Wggygmqby94E2-9JVaonFR2vHiI_hagUn6QwHbAEWnauGMdxSx" />
          </div>
        </div>
      </section>

      {/* 8. RAY EXPERIENCE */}
      <section className="py-32 bg-on-surface text-surface opacity-100 relative">
        <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="opacity-100">
              <span className="font-label text-xs tracking-widest uppercase text-primary font-bold mb-4 block">The Ambience</span>
              <h2 className="font-headline text-5xl md:text-7xl italic font-black mb-8 border-b-0">The Satyajit Ray Experience</h2>
              <p className="text-xl text-surface/70 mb-12 leading-relaxed">Step into a storyboard where every corner tells a story. From 'Apu Trilogy' aesthetics to 'Charulata' inspired seating.</p>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="bg-primary/20 p-4 rounded-2xl"><span className="material-symbols-outlined text-primary text-3xl">photo_frame</span></div>
                  <div><h4 className="font-headline text-2xl mb-2 italic">Ray-Themed Décor</h4><p className="text-surface/60">Original posters and sketch replicas integrated into the flow.</p></div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="bg-primary/20 p-4 rounded-2xl"><span className="material-symbols-outlined text-primary text-3xl">weekend</span></div>
                  <div><h4 className="font-headline text-2xl mb-2 italic">Pinteresty Seating</h4><p className="text-surface/60">Cozy nooks with vintage lamps and plush fabrics.</p></div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] clay-card overflow-hidden shadow-2xl relative z-10">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT9fvQQEj5cUahuRd7Ttl2-D4fJpfJpzj0Y0-Ka-D7Ux_-cbqQd0MBZSyezfzSI1asZLxNaxLFNP6xnmT_Qvvj0eXIoGvbyRrq0r8ekKP2MEnZrck0XrZmp_tnizwjRQ1KY1T3HRodMMGfgOl7IwfBbFz1FFC3vFdrsDOjL3Q20kwlgkzxrV1jwPFkSiMHSnFliR3EvJj5jVwH4uPyC_zhnq_julZQjzWWiICRvZaI5nlv5lrwR-zBECloiN7WzW5DfTh7JOwAEXxk" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US */}
      <section className="py-24 px-8 bg-surface opacity-100">
        <div className="max-w-screen-2xl mx-auto text-center mb-16">
          <h2 className="font-headline text-4xl font-black mb-4 border-b-0">Why L'RAY?</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="text-center p-8">
            <span className="material-symbols-outlined text-5xl text-primary mb-6">local_pizza</span>
            <h3 className="font-headline text-2xl font-bold mb-4">Artisan Ingredients</h3>
            <p className="text-stone-600">Sourdough bases, imported cheese, and farm-fresh toppings.</p>
          </div>
          <div className="text-center p-8">
            <span className="material-symbols-outlined text-5xl text-primary mb-6">movie_filter</span>
            <h3 className="font-headline text-2xl font-bold mb-4">Cinematic Vibe</h3>
            <p className="text-stone-600">A tribute to world cinema in the heart of Kolkata.</p>
          </div>
          <div className="text-center p-8">
            <span className="material-symbols-outlined text-5xl text-primary mb-6">handyman</span>
            <h3 className="font-headline text-2xl font-bold mb-4">Hand-Crafted</h3>
            <p className="text-stone-600">No mass production. Every treat is a unique creation.</p>
          </div>
        </div>
      </section>

      {/* 10. REVIEWS */}
      <section className="py-24 bg-surface-container opacity-100 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8 text-center mb-16">
          <h2 className="font-headline text-4xl font-black mb-4 border-b-0">Critics' Choice</h2>
          <div className="flex justify-center items-center gap-1">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
            <span className="font-label text-sm font-bold ml-2">4.8 AVERAGE RATING</span>
          </div>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-12 px-8 no-scrollbar snap-x w-full">
          <div className="min-w-[350px] md:min-w-[450px] bg-white p-8 rounded-3xl snap-center border border-stone-200">
            <div className="flex gap-4 items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">S</div>
              <div><h4 className="font-bold">Siddharth Roy</h4><p className="text-xs text-stone-500 font-label">Local Guide • 42 Reviews</p></div>
            </div>
            <p className="italic text-stone-700 leading-relaxed">"The attention to detail in the Satyajit Ray theme is impeccable. And the Meatball Dynamite? Absolutely sensational!"</p>
          </div>
          <div className="min-w-[350px] md:min-w-[450px] bg-white p-8 rounded-3xl snap-center border border-stone-200">
            <div className="flex gap-4 items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary">A</div>
              <div><h4 className="font-bold">Ananya Das</h4><p className="text-xs text-stone-500 font-label">5 days ago</p></div>
            </div>
            <p className="italic text-stone-700 leading-relaxed">"Perfect place for book lovers and cinema buffs. The coffee is artisan grade and the pizza crust is the best in the city."</p>
          </div>
          <div className="min-w-[350px] md:min-w-[450px] bg-white p-8 rounded-3xl snap-center border border-stone-200">
            <div className="flex gap-4 items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-tertiary/20 flex items-center justify-center font-bold text-tertiary">P</div>
              <div><h4 className="font-bold">Pritam K.</h4><p className="text-xs text-stone-500 font-label">2 weeks ago</p></div>
            </div>
            <p className="italic text-stone-700 leading-relaxed">"Beautifully designed space. It feels like stepping into a movie set from the 60s. Great food and even better service."</p>
          </div>
        </div>
      </section>

      {/* 11. GALLERY */}
      <section className="py-24 px-8 max-w-screen-2xl mx-auto opacity-100 bg-surface">
        <h2 className="font-headline text-4xl font-black text-center mb-16 italic border-b-0">Frames from the Café</h2>
        <div className="asymmetric-masonry">
          <div className="masonry-span-2 rounded-3xl overflow-hidden group">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATQ7QoYjMr3c1og9SO6EwWuF25EdV0iRX5Vsty58BzXURor9Eha-_-wGTHis9uTVu7J1Fs5klv8ysGABLG5bEyETwNq--dzGhjwgFeEjb2trCgBlqWsufjR1x_dPJEinC6KxuizZ9DTNltVWqARrSvYHoyGDuBSWj_rVWivjDf365oZsgULHYBdIP-rzizwVfrPqcF426YA7tW8IgLNTU8EpXfL2DKdem3sLmrHhXt5ANo_Ac5BJvyhP1ecD2x-l5QGgOBZRYmyExT" />
          </div>
          <div className="rounded-3xl overflow-hidden group">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKSF_1VQl-pG87hjyqoxvS5xohOqAo6T2vquTvyoGjeEDWnLqmr3Dl98iRbj9aS9fyPIIS3370gNaVUg8a5c06NWU9AcfQnHDnaLyU9gmfsScKMuizDK7gbD_RanpRfi2lZ6AfuEz3ibRVJucOskeE6fB0UO5OIJzpjYFYp6XZqGumTw_CkQd8f9T20TiRCkbTw_gShTVRJ6RwXiqadAxhc-ks4EKQ1UB1EpQMCmlGbmR_EzJCp1WvRZOeMdqggb-lQvEY8Q352kJF" />
          </div>
          <div className="masonry-span-2 rounded-3xl overflow-hidden group">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb35ietN8Iha9a-h9Od0F-heoOHhqiiH3KiSC1VXgTMBejw-yuCnVwBvpfjkDkB2wgxTRE873siysWS0565EHvESekH_FuYpwOcp5MboPWs1S2OkvtfXUgx3s2fPjxoaY8Myaj4Ubom4zzHGHDZ9Kx4RlBygjDPS857kuTkBeARKv2OJ8HmW_wBWqLyBjsJY44zbqtkJq06-ngNNOPcugeglEBKMX_GsYb524XJwdqY1e_Rf_ukiLPivwzEpNJW2t-78m12GstdRvf" />
          </div>
          <div className="rounded-3xl overflow-hidden group">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3dyfSvzRAfDI5mg9_hFU4idZL_xSjUpeV6_y5T6q-g9H5xK3Km43kAzEn7FYkzqV89WwXeflWLo9HT6g6Kwfp4XkCIQRN0W3NUYe1wfGjcft2RnQCZw2c85F5b-XxG6c0YsdGlPNECEkcgVYZHajjRV3lYFw-A1emfC8XT4pexhNbouZWIhhTz5HKIlRM-8bnirNAHvKkKveiqE7fzq2xrBng3E8KlZiYqahWTvq8eX9QGn8M5u0b_a5QYemo7auEXGgPO5E8a6NF" />
          </div>
        </div>
      </section>

      {/* 12. ORDER BUTTONS */}
      <section className="py-12 bg-primary/10 opacity-100">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 px-8">
          <Link to="/menu">
            <button className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all">Full Menu</button>
          </Link>
          <Link to="/offers">
            <button className="bg-secondary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all">Current Offers</button>
          </Link>
          <Link to="/gallery">
            <button className="bg-amber-800 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all">Virtual Tour</button>
          </Link>
        </div>
      </section>

      {/* 13. NEWSLETTER */}
      <section className="py-24 bg-[#1A1209] text-white opacity-100">
        <div className="max-w-screen-xl mx-auto px-8 text-center">
          <h2 className="font-headline text-4xl font-black mb-6 italic border-b-0 text-white">Join the Inner Circle</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">Get exclusive event invites, secret menu updates, and a complimentary dessert on your first visit.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input className="bg-white/10 border border-white/20 rounded-full px-6 py-4 flex-1 focus:outline-none focus:ring-2 focus:ring-primary text-white" placeholder="Your email address" type="email" />
            <button className="clay-button-primary px-8 py-4 text-white font-bold whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
}
