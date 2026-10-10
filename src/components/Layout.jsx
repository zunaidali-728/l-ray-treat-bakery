import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState, Suspense, lazy } from 'react';

// Lazy load widgets for high performance edge handling
const ChatbotWidget = lazy(() => import('./ChatbotWidget'));
const ContactModal = lazy(() => import('./ContactModal'));
const ActiveOrderBanner = lazy(() => import('./ActiveOrderBanner'));

export default function Layout() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateHeight = () => {
      const navElement = document.getElementById('global-nav');
      if (navElement) {
        setHeaderHeight(navElement.offsetHeight);
      }
    };

    // Give the DOM a tiny slice to render the navbar
    setTimeout(updateHeight, 50);
    
    // Fallbacks for resize and dynamically sized content
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [location.pathname]);

  // Home page is fully cinematic and expects the navbar to float glass-like over its Hero sections
  const isFullBleed = location.pathname === '/home';

  return (
    <>
      <div className="fixed inset-0 z-[100] film-grain pointer-events-none"></div>
      <Navbar />
      <div 
        className="min-h-screen main-content flex flex-col items-stretch w-full transition-all duration-300" 
        style={{ paddingTop: isFullBleed ? '0px' : `${headerHeight}px` }}
      >
        <Outlet />
      </div>
      
      <Suspense fallback={null}>
        <ActiveOrderBanner />
        <ChatbotWidget />
        <ContactModal />
      </Suspense>

      <Footer />
    </>
  );
}
