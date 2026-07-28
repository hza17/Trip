import { useState, useEffect } from "react";
import { cn, toPersianDigits } from "@/lib/utils";
import { 
  User, 
  Bell, 
  Heart, 
  CreditCard, 
  ChevronDown, 
  Sun, 
  Moon, 
  Headphones, 
  Briefcase, 
  Sparkles, 
  Info,
  LogOut,
  Building2, 
  BookOpen, 
  Menu,
  X,
  Compass,
  Plane,
  ChevronLeft,
  MapPin,
  Palmtree,
  Ticket
} from "lucide-react";

interface HeaderProps {
  credit: number;
  onLoginClick: () => void;
  onNavigateHome: () => void;
  onNavigateDashboard?: (tab?: string) => void;
  onNavigateBlog?: () => void;
  onNavigatePlanner?: () => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export function Header({ 
  credit, 
  onLoginClick, 
  onNavigateHome, 
  onNavigateDashboard, 
  onNavigateBlog,
  onNavigatePlanner,
  isDarkMode, 
  toggleDarkMode 
}: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Simulated login state
  const isLoggedIn = true; 

  // Close mobile menu on desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleDashboardNav = (tab: string) => {
    setShowProfileMenu(false);
    setShowNotifications(false);
    setIsMobileMenuOpen(false);
    if (onNavigateDashboard) {
      onNavigateDashboard(tab);
    } else {
      onLoginClick();
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <>
      <header className="relative z-40 px-3 sm:px-6 pt-3 sm:pt-5 pb-2 transition-all duration-300 text-right" dir="rtl">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 text-xs font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-5 py-3 rounded-2xl border border-blue-200 dark:border-blue-900 shadow-2xl animate-in fade-in slide-in-from-top-4">
            <Info size={16} className="shrink-0 text-blue-500" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="w-full bg-white/80 dark:bg-slate-900/85 border border-slate-200/70 dark:border-slate-800/60 backdrop-blur-2xl shadow-lg shadow-slate-100/40 dark:shadow-black/50 rounded-2xl sm:rounded-[2.2rem] px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between transition-all duration-300">
          
          {/* RIGHT: Brand Logo & Desktop Nav */}
          <div className="flex items-center gap-4 lg:gap-7">
            
            {/* Logo */}
            <div
              className="cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
              onClick={() => { onNavigateHome(); setIsMobileMenuOpen(false); }}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-2xl blur-md opacity-25 group-hover:opacity-45 transition-all duration-500"></div>
                
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-[1.1rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-blue-400/50">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-blue-500/40 group-hover:border-blue-500/80 transition-all duration-700"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 group-hover:scale-110 transition-transform">
                      <span className="w-0.5 h-0.5 rounded-full bg-white block mx-auto mt-0.5"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-right leading-none select-none">
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-500 transition-colors">
                  اونجا
                </span>
                <span className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] text-blue-500 font-mono uppercase mt-0.5 opacity-90">
                  oonja
                </span>
              </div>
            </div>

            {/* Desktop Clean Nav Items */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
              
              {/* Accommodations & Stays */}
              <button 
                onClick={onNavigateHome}
                className="px-3 py-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Building2 size={15} className="text-blue-500" />
                <span>رزرو اقامتگاه</span>
              </button>

              {/* Smart AI Trip Planner */}
              <button 
                onClick={onNavigatePlanner ? onNavigatePlanner : () => showToast("برنامه‌ریز هوشمند سفر")}
                className="px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-1.5 cursor-pointer group"
              >
                <Sparkles size={15} className="text-indigo-500 group-hover:rotate-12 transition-transform" />
                <span>برنامه‌ریز سفر</span>
                <span className="bg-indigo-500 text-white text-[9px] px-1.5 py-0.2 rounded-md font-black">AI</span>
              </button>

              {/* Travel Blog */}
              <button 
                onClick={onNavigateBlog ? onNavigateBlog : () => showToast("مجله سفر")}
                className="px-3 py-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen size={15} className="text-slate-400" />
                <span>مجله سفر</span>
              </button>

              {/* B2B Partner / Hosts Portal Button */}
              <button 
                onClick={() => handleDashboardNav('supplier')} 
                className="px-3.5 py-2 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 transition-all flex items-center gap-1.5 cursor-pointer font-extrabold border border-blue-200/50 dark:border-blue-800/40 mr-1"
              >
                <Briefcase size={15} className="text-blue-500" />
                <span>پنل تامین‌کنندگان</span>
              </button>

              {/* Tourism Services Dropdown (سایر خدمات) */}
              <div className="relative group">
                <button className="px-2.5 py-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-all flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer font-bold">
                  <span>خدمات گردشگری</span>
                  <ChevronDown size={13} className="group-hover:rotate-180 transition-transform text-slate-400" />
                </button>

                <div className="absolute right-0 top-full mt-1.5 w-56 bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all backdrop-blur-2xl z-50">
                  <button 
                    onClick={() => showToast("بخش تور و گشت‌های شهری بزودی")}
                    className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
                  >
                    <Palmtree size={15} className="text-emerald-500" />
                    <span>تور و گشت‌های شهری</span>
                  </button>

                  <button 
                    onClick={() => showToast("خدمات بلیت و پرواز بزودی")}
                    className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
                  >
                    <Ticket size={15} className="text-cyan-500" />
                    <span>بلیت و حمل‌ونقل</span>
                  </button>

                  <button 
                    onClick={() => showToast("اجاره ویلا و سوئیت ساحلی")}
                    className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
                  >
                    <MapPin size={15} className="text-indigo-500" />
                    <span>اجاره ویلا و سوئیت</span>
                  </button>
                </div>
              </div>

            </nav>
          </div>

          {/* LEFT: User Profile, Balance, Theme & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Wallet Credit (Desktop) */}
            {isLoggedIn && (
              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100/70 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span>اعتبار:</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-extrabold text-xs">
                  {toPersianDigits(credit.toLocaleString())}
                </span>
                <span className="text-[10px] text-slate-400">تومان</span>
              </div>
            )}

            {/* Dark Mode Toggle */}
            {toggleDarkMode && (
              <button 
                onClick={toggleDarkMode}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                title="تغییر پوسته تم"
                aria-label={isDarkMode ? "تغییر به تم روشن" : "تغییر به تم تیره"}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Notifications Icon */}
            {isLoggedIn && (
              <div className="relative">
                <button 
                  onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative cursor-pointer"
                  aria-label="صندوق پیام‌ها"
                >
                  <Bell size={18} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-50 overflow-hidden p-1 backdrop-blur-2xl text-right animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/30">
                      <span className="text-slate-900 dark:text-white font-extrabold text-xs">صندوق پیام‌ها</span>
                      <span className="bg-rose-500/10 text-rose-500 text-[10px] px-2 py-0.5 rounded-full font-bold">۱ جدید</span>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-1">
                      <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer rounded-xl transition-all" onClick={() => handleDashboardNav('notifications')}>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          رزرو شما با موفقیت تایید شد
                        </div>
                        <div className="text-[10px] text-slate-400 pr-3.5">واچر اقامتگاه صادر گردید.</div>
                      </div>
                    </div>
                    <button onClick={() => handleDashboardNav('notifications')} className="w-full p-2.5 text-center text-xs font-bold text-blue-500 hover:bg-blue-500/5 transition rounded-b-xl border-t border-slate-100 dark:border-slate-800">نمایش همه</button>
                  </div>
                )}
              </div>
            )}

            {/* User Profile Dropdown / Login Button */}
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                  className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 pl-3 pr-1 py-1 rounded-xl hover:border-blue-400/40 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-all text-slate-800 dark:text-slate-100 cursor-pointer"
                  aria-label="منوی حساب کاربری"
                >
                  <div className="w-7 h-7 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-sm">
                    ع
                  </div>
                  <span className="hidden sm:inline text-slate-800 dark:text-slate-200 text-xs font-bold max-w-[100px] truncate">
                    علیرضا مرادی
                  </span>
                  <ChevronDown size={13} className="text-slate-400" />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute left-0 top-full mt-2 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-50 overflow-hidden p-1.5 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleDashboardNav('trips')} className="w-full text-right p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition">
                      <Compass size={15} className="text-blue-500" />
                      <span>سفرهای من (رزروها)</span>
                    </button>

                    <button onClick={() => handleDashboardNav('favorites')} className="w-full text-right p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition">
                      <Heart size={15} className="text-rose-500" />
                      <span>اقامتگاه‌های موردعلاقه</span>
                    </button>

                    <button onClick={() => handleDashboardNav('wallet')} className="w-full text-right p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition">
                      <CreditCard size={15} className="text-emerald-500" />
                      <span>کیف پول و تراکنش‌ها</span>
                    </button>

                    <button onClick={() => handleDashboardNav('notifications')} className="w-full text-right p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition">
                      <Headphones size={15} className="text-indigo-500" />
                      <span>پشتیبانی اختصاصی</span>
                    </button>
                    
                    <hr className="border-slate-100 dark:border-slate-800 my-1" />
                    
                    <button onClick={() => handleDashboardNav('supplier')} className="w-full text-right p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 text-xs font-bold flex items-center gap-2.5 text-blue-600 dark:text-blue-400 transition">
                      <Briefcase size={15} className="text-blue-500" />
                      <span>پنل تامین‌کنندگان (B2B)</span>
                    </button>
                    
                    <hr className="border-slate-100 dark:border-slate-800 my-1" />
                    
                    <button onClick={onNavigateHome} className="w-full text-right p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold flex items-center gap-2.5 text-rose-500 transition">
                      <LogOut size={15} className="text-rose-400" />
                      <span>خروج از حساب</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition shadow-md cursor-pointer"
              >
                ورود | ثبت نام
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors cursor-pointer mr-1"
              aria-label="منوی موبایل"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          
          {/* Drawer Sidebar */}
          <div className="w-[85%] max-w-xs h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 text-right p-5">
            
            {/* Top Bar with Logo & Close */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                    O
                  </div>
                  <div className="flex flex-col text-right leading-none">
                    <span className="text-base font-black text-slate-900 dark:text-white">پلتفرم گردشگری اونجا</span>
                    <span className="text-[9px] font-mono text-blue-500 font-bold mt-0.5">oonja.ir</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>

              {/* User Profile / Quick Stats Card */}
              {isLoggedIn ? (
                <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        ع
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">علیرضا مرادی</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">کاربر ویژه اونجا</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-bold">موجودی کیف پول:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-black">
                      {toPersianDigits(credit.toLocaleString())} تومان
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onLoginClick(); }}
                  className="mt-4 w-full py-3 rounded-xl bg-blue-600 text-white text-xs font-black text-center shadow-md"
                >
                  ورود یا ثبت‌نام کاربر
                </button>
              )}

              {/* Cleaned Mobile Navigation Items */}
              <div className="mt-5 space-y-1">
                
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onNavigateHome(); }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                      <Building2 size={16} />
                    </div>
                    <span>رزرو اقامتگاه و هتل</span>
                  </div>
                  <ChevronLeft size={16} className="text-slate-400" />
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); onNavigatePlanner ? onNavigatePlanner() : showToast("برنامه‌ریز هوشمند سفر"); }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
                      <Sparkles size={16} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>برنامه‌ریز هوشمند سفر</span>
                      <span className="bg-indigo-500 text-white text-[8px] px-1.5 py-0.2 rounded font-black">AI</span>
                    </div>
                  </div>
                  <ChevronLeft size={16} className="text-slate-400" />
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); handleDashboardNav('trips'); }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                      <Compass size={16} />
                    </div>
                    <span>سفرهای من (رزروها)</span>
                  </div>
                  <ChevronLeft size={16} className="text-slate-400" />
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); onNavigateBlog ? onNavigateBlog() : showToast("مجله سفر"); }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                      <BookOpen size={16} />
                    </div>
                    <span>مجله سفر و راهنما</span>
                  </div>
                  <ChevronLeft size={16} className="text-slate-400" />
                </button>

                <div className="pt-2 pb-1">
                  <div className="text-[10px] font-extrabold text-slate-400 px-3 mb-1">خدمات و همکاری</div>
                  
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); handleDashboardNav('supplier'); }}
                    className="w-full p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between text-xs font-black text-blue-600 dark:text-blue-400 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                        <Briefcase size={16} />
                      </div>
                      <span>پنل تامین‌کنندگان (B2B)</span>
                    </div>
                    <ChevronLeft size={16} className="text-blue-400" />
                  </button>
                </div>

              </div>
            </div>

            {/* Mobile Footer Support & Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleDashboardNav('notifications'); }}
                className="w-full p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 text-xs font-extrabold text-slate-600 dark:text-slate-400"
              >
                <Headphones size={16} className="text-indigo-500" />
                <span>پشتیبانی ۲۴ ساعته</span>
              </button>

              {isLoggedIn && (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onNavigateHome(); }}
                  className="w-full p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 text-xs font-extrabold text-rose-500"
                >
                  <LogOut size={16} />
                  <span>خروج از حساب</span>
                </button>
              )}
            </div>

          </div>

          {/* Clickable Backdrop to Close */}
          <div 
            className="flex-1 cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />

        </div>
      )}
    </>
  );
}
