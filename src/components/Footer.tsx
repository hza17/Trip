import React, { useState } from "react";
import { Phone, Mail, Instagram, MapPin, Compass, Globe, Shield, CreditCard, Sparkles, HelpCircle, Info } from "lucide-react";

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateSerp?: () => void;
  onNavigateDashboard?: (tab?: string) => void;
  isHome?: boolean;
}

export function Footer({ onNavigateHome, onNavigateSerp, onNavigateDashboard, isHome }: FooterProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNotImplemented = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    showToast(`بخش «${title}» در حال توسعه و راه‌اندازی است.`);
  };

  return (
    <footer className={cn(
      "w-full text-slate-600 dark:text-slate-300 transition-colors duration-300 relative z-10 text-right border-t border-slate-200/60 dark:border-slate-900/60",
      isHome ? 'mt-0 pt-36 sm:pt-40 lg:pt-44 bg-slate-50/50 dark:bg-slate-950/40' : 'mt-16 pt-16 bg-slate-50/80 dark:bg-slate-950/80'
    )} dir="rtl">
      {/* Footer In-component Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 bg-blue-50/95 dark:bg-blue-950/95 backdrop-blur-md p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/50 shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <Info size={14} className="shrink-0 text-blue-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div
              className="cursor-pointer flex items-center gap-3.5 group"
              onClick={onNavigateHome}
            >
              <div className="relative flex items-center justify-center shrink-0">
                {/* Ambient glowing aura */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-3xl blur-lg opacity-10 group-hover:opacity-35 transition-all duration-700"></div>
                
                {/* Premium geometric layout block */}
                <div className="relative w-11 h-11 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white flex items-center justify-center shadow-sm transition-all duration-500 overflow-hidden backdrop-blur-md group-hover:scale-105 group-hover:border-blue-400/50">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:6px_6px]"></div>
                  
                  {/* Custom minimalist geometric pin logo */}
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-blue-500/30 group-hover:border-blue-500/60 group-hover:rotate-180 transition-all duration-1000"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-right leading-none select-none">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-500 transition-colors duration-300">
                  اونجا
                </span>
                <span className="text-[9px] font-black tracking-[0.25em] text-blue-500 font-mono uppercase opacity-90 mt-1 mr-0.5">
                  oonja
                </span>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
              سامانه هوشمند و یکپارچه رزرواسیون آنلاین هتل‌های سراسر ایران. تجربه اقامتی دلنشین، تایید آنی واچر، تضمین شایسته‌ترین قیمت و پشتیبانی کانسیرژ اختصاصی در تمام ساعات شبانه‌روز.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <Shield size={14} className="text-emerald-500" />
                <span>عضو اتحادیه کشوری کسب‌وکارهای مجازی</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-black text-slate-900 dark:text-white text-sm tracking-wider relative">دسترسی سریع</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              <li><button onClick={onNavigateSerp} className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-[-4px] transition-all cursor-pointer">جستجو و رزرو هتل‌ها</button></li>
              <li><button onClick={() => onNavigateDashboard?.('trips')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-[-4px] transition-all cursor-pointer">پیگیری رزرواسیون‌ها</button></li>
              <li><button onClick={(e) => handleNotImplemented(e, 'قوانین و مقررات')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-[-4px] transition-all cursor-pointer">قوانین و مقررات سایت</button></li>
              <li><button onClick={(e) => handleNotImplemented(e, 'درباره ما')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-[-4px] transition-all cursor-pointer">درباره پلتفرم اونجا</button></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-black text-slate-900 dark:text-white text-sm tracking-wider relative">همکاری با ما</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              <li><button onClick={(e) => handleNotImplemented(e, 'ثبت‌نام و عضویت تامین‌کنندگان')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-[-4px] transition-all cursor-pointer flex items-center gap-2"><span>ثبت‌نام و عضویت تامین‌کنندگان</span> <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[8px] px-1.5 py-0.5 rounded-full font-extrabold font-mono">PMS</span></button></li>
              <li><button onClick={(e) => handleNotImplemented(e, 'پنل رزرو سازمانی')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-[-4px] transition-all cursor-pointer">رزرو سازمانی (B2B)</button></li>
              <li><button onClick={(e) => handleNotImplemented(e, 'وبلاگ و مجله')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-[-4px] transition-all cursor-pointer">مجله گردشگری و سفر</button></li>
              <li><button onClick={(e) => handleNotImplemented(e, 'فرصت‌های شغلی')} className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-[-4px] transition-all cursor-pointer">فرصت‌های همکاری و استخدام</button></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-black text-slate-900 dark:text-white text-sm tracking-wider relative">ارتباط با اونجا</h4>
            <ul className="space-y-4 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-500 dark:text-slate-400">تهران، سعادت آباد، میدان فرهنگ، نبش کوچه دوازدهم، پلاک ۲۴، پارک نوآوری اونجا</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span dir="ltr" className="text-right w-full block font-mono text-sm sm:text-base font-extrabold text-slate-800 dark:text-white">۰۲۱ - ۸۸۹۹۰۰۱۱</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span className="font-mono text-slate-800 dark:text-white">support@oonja.ir</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200/60 dark:border-slate-900/60 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-bold">
          <div>© {new Date().getFullYear()} Oonja Platform. تمامی حقوق مادی و معنوی این سامانه متعلق به شرکت فناوری سفر اونجا می‌باشد.</div>
          <div className="flex gap-3">
              <a 
                href="#instagram" 
                onClick={(e) => handleNotImplemented(e, 'اینستاگرام')}
                className="w-9 h-9 rounded-full bg-slate-200/50 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600 hover:text-white transition-all shadow-inner"
                title="ما را در اینستاگرام دنبال کنید"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#globe" 
                onClick={(e) => handleNotImplemented(e, 'زبان بین‌المللی')}
                className="w-9 h-9 rounded-full bg-slate-200/50 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-inner"
                title="تغییر زبان به انگلیسی"
              >
                <Globe size={16} />
              </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Ensure cn helper is fully available or use basic helper
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

