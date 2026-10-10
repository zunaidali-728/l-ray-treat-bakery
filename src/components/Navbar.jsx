import { Link, useLocation } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';

export default function Navbar() {
  const location = useLocation();
  const cartItems = useCartStore(state => state.items);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const getLinkClass = (path) => {
    const isActive = location.pathname.startsWith(path);
    if (isActive) {
      return "text-amber-800 font-bold border-b-2 border-amber-700 pb-1 transition-all";
    }
    return "text-stone-600 font-medium hover:text-amber-900 transition-all";
  };

  return (
    <nav id="global-nav" className="fixed top-0 w-full z-50 glass-nav border-b border-stone-200/50 max-w-[1440px] left-1/2 -translate-x-1/2 transition-all duration-300">
      <div className="flex justify-between items-center px-8 py-4">
        <Link to="/home" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>movie_filter</span>
          <span className="text-2xl font-serif font-black tracking-tight text-amber-900">L'RAY Treat</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-mono">
          <Link to="/home" className={getLinkClass('/home')}>Home</Link>
          <Link to="/menu" className={getLinkClass('/menu')}>Menu</Link>
          <Link to="/custom-cake" className={getLinkClass('/custom-cake')}>Custom Cakes</Link>
          {isAuthenticated && <Link to="/my-cakes" className={getLinkClass('/my-cakes')}>My Cakes</Link>}
          <Link to="/offers" className={getLinkClass('/offers')}>Offers</Link>
          <Link to="/gallery" className={getLinkClass('/gallery')}>Gallery</Link>
        </div>
        <div className="flex items-center gap-5 text-amber-700">
          <Link to="/wishlist"><span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform">favorite</span></Link>
          {isAuthenticated && (
              <Link to="/order-history">
                  <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform">receipt_long</span>
              </Link>
          )}
          <div className="relative">
            <Link to="/cart">
              <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform">shopping_cart</span>
            </Link>
            {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartItemCount}
                </span>
            )}
          </div>
          <Link to={isAuthenticated ? "/profile" : "/login"}>
            <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform">person</span>
          </Link>
        </div>
      </div>
      {/* Mobile nav indicator */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] glass-nav rounded-full shadow-2xl z-50 flex justify-around items-center p-4 border border-outline-variant/20">
        <Link to="/home"><span className={`material-symbols-outlined ${location.pathname === '/home' ? 'text-primary' : 'text-stone-500'}`} style={location.pathname === '/home' ? {fontVariationSettings: "'FILL' 1"} : {}}>home</span></Link>
        <Link to="/menu"><span className={`material-symbols-outlined ${location.pathname === '/menu' ? 'text-primary' : 'text-stone-500'}`} style={location.pathname === '/menu' ? {fontVariationSettings: "'FILL' 1"} : {}}>restaurant_menu</span></Link>
        <Link to="/cart"><span className={`material-symbols-outlined ${location.pathname === '/cart' ? 'text-primary' : 'text-stone-500'}`} style={location.pathname === '/cart' ? {fontVariationSettings: "'FILL' 1"} : {}}>shopping_bag</span></Link>
        {isAuthenticated && (
            <Link to="/order-history"><span className={`material-symbols-outlined ${location.pathname === '/order-history' ? 'text-primary' : 'text-stone-500'}`} style={location.pathname === '/order-history' ? {fontVariationSettings: "'FILL' 1"} : {}}>receipt_long</span></Link>
        )}
        <Link to="/profile"><span className={`material-symbols-outlined ${location.pathname === '/profile' ? 'text-primary' : 'text-stone-500'}`} style={location.pathname === '/profile' ? {fontVariationSettings: "'FILL' 1"} : {}}>person</span></Link>
      </div>
    </nav>
  );
}
