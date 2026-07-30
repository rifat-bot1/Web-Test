import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ThreeBackground } from './components/ThreeBackground';
import { ToastContainer, ToastMessage } from './components/Toast';
import { LiveChatWidget } from './components/LiveChatWidget';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CoinCalculatorModal } from './components/CoinCalculatorModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { InstantTopUpView } from './views/InstantTopUpView';
import { CheckoutView } from './views/CheckoutView';
import { TrackOrderView } from './views/TrackOrderView';
import { FAQView } from './views/FAQView';
import { ContactView } from './views/ContactView';
import { BlogView } from './views/BlogView';
import { ReviewsView } from './views/ReviewsView';
import { AboutView } from './views/AboutView';
import { PolicyViews } from './views/PolicyViews';
import { NotFoundView } from './views/NotFoundView';

import { CoinPackage, PlatformType, RegionType, Order } from './types';
import { COIN_PACKAGES } from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Top-Up & Checkout Flow State
  const [selectedPackageForTopUp, setSelectedPackageForTopUp] = useState<CoinPackage | null>(null);
  const [checkoutOrderData, setCheckoutOrderData] = useState<{
    playerId: string;
    platform: PlatformType;
    region: RegionType;
    packageItem: CoinPackage;
    couponCode?: string;
    discountBDT: number;
    finalPriceBDT: number;
  } | null>(null);

  // Modals State
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [successfulOrder, setSuccessfulOrder] = useState<Order | null>(null);
  const [trackSearchId, setTrackSearchId] = useState<string>('');

  // Toast Handler
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info') => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      type,
      title,
      message
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handlers for top-up flow
  const handleSelectPackage = (pkg: CoinPackage) => {
    setSelectedPackageForTopUp(pkg);
    setActiveView('topup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Package Selected', `Selected ${pkg.name}. Enter your Player ID below.`, 'info');
  };

  const handleProceedToCheckout = (data: {
    playerId: string;
    platform: PlatformType;
    region: RegionType;
    packageItem: CoinPackage;
    couponCode?: string;
    discountBDT: number;
    finalPriceBDT: number;
  }) => {
    setCheckoutOrderData(data);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: Order) => {
    setSuccessfulOrder(order);
    setActiveView('home');
    showToast('Order Placed! 🎉', `Order #${order.id} is now processing!`, 'success');
  };

  const handleTrackOrderFromModal = (orderId: string) => {
    setTrackSearchId(orderId);
    setActiveView('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCalculatedCoins = (coinsAmount: number, priceBDT: number) => {
    // Find closest package or create custom pack object
    const customPack: CoinPackage = {
      id: 'custom-' + coinsAmount,
      name: `${coinsAmount.toLocaleString()} Custom Coins`,
      coins: coinsAmount,
      bonusCoins: Math.round(coinsAmount * 0.12),
      priceBDT,
      priceUSD: Math.round(priceBDT / 115),
      originalPriceBDT: Math.round(priceBDT * 1.25),
      category: 'standard',
      discountPercent: 15,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
      description: `Custom calculated refill of ${coinsAmount} eFootball Coins.`,
      features: ['Automated Direct Refill', '100% Ban Safe', '24/7 Support']
    };

    handleSelectPackage(customPack);
  };

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Three.js Animated Particles Canvas Background */}
      <ThreeBackground />

      {/* Navbar Header */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        cartCount={checkoutOrderData ? 1 : 0}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeView === 'home' && (
          <HomeView
            onSelectPackage={handleSelectPackage}
            onNavigate={setActiveView}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {activeView === 'shop' && (
          <ShopView
            onSelectPackage={handleSelectPackage}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {activeView === 'topup' && (
          <InstantTopUpView
            initialPackage={selectedPackageForTopUp}
            onProceedToCheckout={handleProceedToCheckout}
            onShowToast={showToast}
          />
        )}

        {activeView === 'checkout' && checkoutOrderData && (
          <CheckoutView
            orderData={checkoutOrderData}
            onBack={() => setActiveView('topup')}
            onOrderSuccess={handleOrderSuccess}
            onShowToast={showToast}
          />
        )}

        {activeView === 'track' && (
          <TrackOrderView
            initialSearchId={trackSearchId}
            onShowToast={showToast}
          />
        )}

        {activeView === 'faq' && <FAQView />}

        {activeView === 'contact' && <ContactView onShowToast={showToast} />}

        {activeView === 'blog' && <BlogView />}

        {activeView === 'reviews' && <ReviewsView onShowToast={showToast} />}

        {activeView === 'about' && <AboutView />}

        {(activeView === 'privacy' || activeView === 'refund' || activeView === 'terms') && (
          <PolicyViews initialTab={activeView as any} />
        )}

        {activeView === '404' && <NotFoundView onReturnHome={() => setActiveView('home')} />}
      </main>

      {/* Footer */}
      <Footer setActiveView={setActiveView} onShowToast={showToast} />

      {/* Floating Action Utilities */}
      <LiveChatWidget />
      <FloatingWhatsApp />

      {/* Modals & Toast Overlays */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      <CoinCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSelectCalculatedCoinPackage={handleSelectCalculatedCoins}
      />

      <OrderSuccessModal
        order={successfulOrder}
        onClose={() => setSuccessfulOrder(null)}
        onTrackOrder={handleTrackOrderFromModal}
        onShowToast={showToast}
      />

    </div>
  );
}
