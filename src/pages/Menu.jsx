import React, { useState, useEffect } from 'react';
import useCartStore from '../store/useCartStore';
import useMenuStore from '../store/useMenuStore';
import useWishlistStore from '../store/useWishlistStore';
import SmartImage from '../components/SmartImage';

export default function Menu() {
  const addItem = useCartStore(state => state.addItem);
  const { products, loading } = useMenuStore();
  const { toggleWishlist, isWishlisted } = useWishlistStore();

  const [activeCategory, setActiveCategory] = useState('pizzas');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // We only care about intersections that bring the element into view
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    // Assuming sections have unique IDs that match the categories
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [loading, products]);

  const pizzas = products.filter(p => p.category === 'pizza');
  const pastas = products.filter(p => p.category === 'pasta');
  const desserts = products.filter(p => p.category === 'dessert');
  const beverages = products.filter(p => p.category === 'beverage');

  // Generic Product Card Component to keep code DRY
  const ProductCard = ({ product }) => (
    <div className="clay-card rounded-xl p-6 relative group overflow-visible min-h-[220px] flex flex-col">
      <div className="absolute -top-12 -right-4 w-44 h-44 drop-shadow-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 z-10">
        <SmartImage 
          alt={product.name} 
          src={product.image_url} 
          className="w-full h-full rounded-full border-8 border-surface-container-low" 
        />
        <button 
          onClick={() => toggleWishlist(product)}
          className="absolute bottom-2 left-2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center z-20 hover:scale-110 active:scale-95 transition-transform">
          <span className={`material-symbols-outlined ${isWishlisted(product.id) ? 'text-error' : 'text-stone-300'}`} style={isWishlisted(product.id) ? {fontVariationSettings: "'FILL' 1"} : {}}>favorite</span>
        </button>
      </div>
      <div className="pr-36 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className={`material-symbols-outlined text-sm ${product.dietary_type === 'non-veg' ? 'text-red-600' : 'text-green-600'}`}>square</span>
          {product.is_bestseller && (
            <span className="bg-primary-container/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Bestseller</span>
          )}
        </div>
        <h3 className="text-2xl font-serif text-on-surface mb-2">{product.name}</h3>
        <p className="text-sm text-stone-600 font-light mb-6 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-amber-900">₹{product.price}</span>
          <button 
            onClick={() => addItem({ id: product.id, name: product.name, price: Number(product.price), image: product.image_url })}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-xl hover:bg-primary-dark">
            Add
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Hero Header */}
      <header className="pt-12 pb-12 px-8 max-w-screen-2xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-4">
          <span className="material-symbols-outlined text-secondary text-4xl">theaters</span>
          <h1 className="text-6xl md:text-8xl font-serif italic text-amber-900 tracking-tighter">Our Menu</h1>
          <span className="material-symbols-outlined text-secondary text-4xl">movie_edit</span>
        </div>
        <p className="font-label text-sm uppercase tracking-[0.3em] text-on-surface-variant max-w-lg">A cinematic culinary journey curated through the lens of artistry and tradition.</p>
      </header>

      {/* Search & Filters */}
      <section className="px-8 pb-16 max-w-screen-xl mx-auto">
        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center border border-outline-variant/15">
          <div className="w-full relative flex items-center group">
            <span className="material-symbols-outlined absolute left-4 text-outline group-focus-within:text-primary transition-colors">search</span>
            <input className="w-full bg-transparent border-b border-outline-variant py-3 pl-12 pr-4 focus:outline-none focus:border-primary font-body text-lg placeholder:text-stone-400 placeholder:italic" placeholder="Search for your favorite masterpiece..." type="text"/>
          </div>
          <div className="flex gap-8 items-center shrink-0">
            <div className="flex items-center gap-3">
              <label className="font-label text-xs uppercase tracking-wider text-stone-500">Dietary</label>
              <div className="flex bg-surface-container-high p-1 rounded-full border border-outline-variant/20">
                <button className="px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-surface text-on-surface shadow-sm">All</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-medium text-stone-500 hover:text-primary transition-all">Veg</button>
                <button className="px-4 py-1.5 rounded-full text-xs font-medium text-stone-500 hover:text-primary transition-all">Non-Veg</button>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[200px]">
              <div className="flex justify-between items-center">
                <label className="font-label text-xs uppercase tracking-wider text-stone-500">Price Range</label>
                <span className="text-xs font-mono text-primary font-bold">₹100 - ₹1000+</span>
              </div>
              <input className="accent-primary h-1.5 rounded-full bg-surface-container-highest appearance-none cursor-pointer" type="range"/>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="px-8 pb-32 max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
        {/* Sticky Sidebar Navigation */}
        <aside className="sticky top-28 h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-4">
          <nav className="flex flex-col gap-1">
            <h3 className="font-label text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-6 pl-4">Categories</h3>
            <a onClick={() => setActiveCategory('pizzas')} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold group transition-colors ${activeCategory === 'pizzas' ? 'bg-primary-container/20 text-primary' : 'text-stone-500 hover:bg-surface-container-low'}`} href="#pizzas">
              <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">local_pizza</span>
              <span className="text-sm">Pizzas</span>
            </a>
            <a onClick={() => setActiveCategory('pasta')} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold group transition-colors ${activeCategory === 'pasta' ? 'bg-primary-container/20 text-primary' : 'text-stone-500 hover:bg-surface-container-low'}`} href="#pasta">
              <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">dinner_dining</span>
              <span className="text-sm">Pasta</span>
            </a>
            <a onClick={() => setActiveCategory('desserts')} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold group transition-colors ${activeCategory === 'desserts' ? 'bg-primary-container/20 text-primary' : 'text-stone-500 hover:bg-surface-container-low'}`} href="#desserts">
              <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">cake</span>
              <span className="text-sm">Sweets & Desserts</span>
            </a>
            <a onClick={() => setActiveCategory('beverages')} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold group transition-colors ${activeCategory === 'beverages' ? 'bg-primary-container/20 text-primary' : 'text-stone-500 hover:bg-surface-container-low'}`} href="#beverages">
              <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">local_cafe</span>
              <span className="text-sm">Beverages</span>
            </a>
          </nav>
        </aside>

        {/* Menu Grid Content */}
        <div className="space-y-24">
          {loading ? (
             <div className="flex justify-center p-20 opacity-50">
                <span className="material-symbols-outlined animate-spin text-5xl">refresh</span>
             </div>
          ) : (
            <>
              {/* PIZZAS Section */}
              {pizzas.length > 0 && (
                <section id="pizzas">
                  <div className="flex items-end gap-4 mb-12 border-b border-outline-variant/15 pb-6">
                    <h2 className="text-4xl font-serif italic text-amber-900">Pizzas</h2>
                    <span className="font-label text-xs tracking-widest text-stone-400 mb-1">Hand-stretched Artisanal Crusts</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                    {pizzas.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* PASTA Section */}
              {pastas.length > 0 && (
                <section id="pasta">
                  <div className="flex items-end gap-4 mb-12 border-b border-outline-variant/15 pb-6">
                    <h2 className="text-4xl font-serif italic text-amber-900">Pasta</h2>
                    <span className="font-label text-xs tracking-widest text-stone-400 mb-1">Authentic Italian Semolina Pasta</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                    {pastas.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* DESSERTS Section */}
              {desserts.length > 0 && (
                <section id="desserts">
                  <div className="flex items-end gap-4 mb-12 border-b border-outline-variant/15 pb-6 mt-12">
                    <h2 className="text-4xl font-serif italic text-amber-900">Sweets & Desserts</h2>
                    <span className="font-label text-xs tracking-widest text-stone-400 mb-1">Artisanal Regional & Global Finales</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                    {desserts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* BEVERAGES Section */}
              {beverages.length > 0 && (
                <section id="beverages">
                  <div className="flex items-end gap-4 mb-12 border-b border-outline-variant/15 pb-6 mt-12">
                    <h2 className="text-4xl font-serif italic text-amber-900">Beverages</h2>
                    <span className="font-label text-xs tracking-widest text-stone-400 mb-1">Crafted Brews & Chilled Elixirs</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                    {beverages.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
