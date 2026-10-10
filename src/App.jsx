import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import useMenuStore from './store/useMenuStore';
import useWishlistStore from './store/useWishlistStore';
import useAppStore from './store/useAppStore';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Otp from './pages/Otp';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Menu from './pages/Menu';
import CustomCake from './pages/CustomCake';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Offers from './pages/Offers';
import Loyalty from './pages/Loyalty';
import Feedback from './pages/Feedback';
import MissingScene from './pages/MissingScene';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import Profile from './pages/Profile';
import SavedPaymentMethods from './pages/SavedPaymentMethods';
import OrderTracking from './pages/OrderTracking';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import MyCakes from './pages/MyCakes';

export default function App() {
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const fetchProducts = useMenuStore(state => state.fetchProducts);
  const fetchWishlist = useWishlistStore(state => state.fetchWishlist);
  const initTheme = useAppStore(state => state.initTheme);

  useEffect(() => {
    initTheme();
    initializeAuth();
    fetchProducts();
    fetchWishlist();
  }, [initializeAuth, fetchProducts, fetchWishlist, initTheme]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Main Routes wrapped in global Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/custom-cake" element={<CustomCake />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/payment-methods" element={<SavedPaymentMethods />} />
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
          <Route path="/order-tracking" element={<OrderTracking />} /> {/* Fallback if navigated without ID */}
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/my-cakes" element={<MyCakes />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>

        <Route path="*" element={<MissingScene />} />
      </Routes>
    </BrowserRouter>
  );
}
