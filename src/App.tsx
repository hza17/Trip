import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { PresentationController } from "./components/PresentationController";
import { HomeView } from "./components/HomeView";
import { SerpView } from "./components/SerpView";
import { DetailView } from "./components/DetailView";
import { CheckoutView } from "./components/CheckoutView";
import { StatusView } from "./components/StatusView";
import { DashboardView } from "./components/DashboardView";
import { Modal } from "./components/Modal";
import { BusinessWorkspace } from "./components/BusinessWorkspace";
import { AdminModal } from "./components/AdminModal";
import { AuthModal } from "./components/AuthModal";
import { Footer } from "./components/Footer";
import { BlogView } from "./components/BlogView";
import { TripPlanner } from "./components/TripPlanner";
import { AITravelAssistant } from "./components/AITravelAssistant";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [activeSearchCategory, setActiveSearchCategory] = useState("hotel");
  const [credit, setCredit] = useState(5000000);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [dashboardTab, setDashboardTab] = useState("trips");
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleModal = (modalName: string) => {
    setActiveModal(activeModal === modalName ? null : modalName);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="font-sans text-slate-900 dark:text-white antialiased min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900 bg-slate-50/50 dark:bg-[#070913] transition-colors duration-300 relative overflow-x-hidden" dir="rtl">
      
      {/* Global Ambient background glows for premium Glassmorphism effect */}
      <div className="absolute top-[5%] left-[5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-amber-500/10 dark:bg-amber-600/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[5%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-blue-500/10 dark:bg-indigo-600/10 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute top-[45%] left-[10%] w-[350px] sm:w-[400px] h-[350px] sm:h-[400px] rounded-full bg-sky-500/5 dark:bg-blue-600/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[70%] right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-cyan-500/5 dark:bg-blue-600/5 blur-[140px] pointer-events-none z-0"></div>
      
      {currentView !== 'supplier' && currentView !== 'admin' && (
        <Header 
          credit={credit}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onNavigateHome={() => setCurrentView('home')}
          onNavigateBlog={() => setCurrentView('blog')}
          onNavigatePlanner={() => setCurrentView('planner')}
          onLoginClick={() => handleToggleModal('auth')}
          onNavigateDashboard={(tab) => { 
            if (tab === 'supplier') {
              setCurrentView('supplier');
            } else {
              setDashboardTab(tab || 'trips'); 
              setCurrentView('dashboard'); 
            }
          }}
        />
      )}

      <main className={`flex-grow w-full mx-auto relative z-20 ${currentView === 'home' ? 'pb-0' : 'pb-12'}`}>
        {currentView === 'home' && <HomeView onSearch={(tab) => { setActiveSearchCategory(tab); setCurrentView('serp'); }} onBlogClick={() => setCurrentView('blog')} />}
        {currentView === 'planner' && <TripPlanner onBack={() => setCurrentView('home')} />}
        {currentView === 'blog' && <BlogView onBack={() => setCurrentView('home')} />}
        {currentView === 'serp' && <SerpView onSelect={() => setCurrentView('detail')} activeCategory={activeSearchCategory} />}
        {currentView === 'detail' && <DetailView onCheckout={() => setCurrentView('checkout')} />}
        {currentView === 'checkout' && <CheckoutView onSuccess={() => setCurrentView('success')} />}
        {currentView === 'success' && <StatusView status="success" onAction={() => window.alert('در حال ایجاد فایل PDF واچر...')} onCancel={() => setCurrentView('home')} />}
        {currentView === 'failed' && <StatusView status="failed" onAction={() => setCurrentView('checkout')} onCancel={() => setCurrentView('home')} />}
        {currentView === 'dashboard' && <DashboardView onClose={() => setCurrentView('home')} onNavigate={(v) => setCurrentView(v as any)} defaultTab={dashboardTab} />}
        {currentView === 'supplier' && <BusinessWorkspace onClose={() => setCurrentView('home')} />}
        {currentView === 'admin' && <AdminModal onClose={() => setCurrentView('home')} />}
      </main>

      {/* Auth Modal */}
      <Modal isOpen={activeModal === 'auth'} onClose={closeModal}>
        <AuthModal onClose={closeModal} />
      </Modal>

      {/* Soldout Test Modal */}
      <Modal isOpen={activeModal === 'soldout'} onClose={closeModal} title="تکمیل ظرفیت">
         <div className="text-center space-y-4 pt-2">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">ظرفیت پذیرش اتاق تکمیل گردید</h3>
            <button onClick={() => { closeModal(); setCurrentView('detail'); }} className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-2.5 rounded-lg font-bold">بازگشت</button>
        </div>
      </Modal>

      {/* Timeout Test Modal */}
      <Modal isOpen={activeModal === 'timeout'} onClose={closeModal} title="پایان زمان">
         <div className="text-center space-y-4 pt-2">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">زمان مجاز به پایان رسید</h3>
            <button onClick={() => { closeModal(); setCurrentView('serp'); }} className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-2.5 rounded-lg font-bold">تلاش مجدد</button>
        </div>
      </Modal>
      
      <Footer 
        isHome={currentView === 'home'}
        onNavigateHome={() => setCurrentView('home')} 
        onNavigateSerp={() => setCurrentView('serp')} 
        onNavigateDashboard={() => setCurrentView('dashboard')} 
      />

      <PresentationController 
        currentView={currentView}
        onSwitchView={setCurrentView}
        onToggleModal={handleToggleModal}
      />

      <AITravelAssistant />
    </div>
  );
}
