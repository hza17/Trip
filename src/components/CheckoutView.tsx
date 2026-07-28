import { useState } from "react";
import { User, Receipt, CreditCard, ShieldCheck, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutViewProps {
  onSuccess: () => void;
}

export function CheckoutView({ onSuccess }: CheckoutViewProps) {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start text-sm animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-8">
        
        {/* Passenger Info Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-sm space-y-6">
          {notification && (
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 bg-blue-50/50 dark:bg-blue-950/20 p-3.5 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 animate-in fade-in">
              <Info size={14} className="shrink-0" />
              <span>{notification}</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-r-4 border-blue-500 pr-3 gap-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3 flex items-center gap-2">
              <User size={20} className="text-blue-500" /> مشخصات مسافر اصلی
            </h3>
            <button 
              onClick={() => showNotification('لیست مسافران از دیتابیس خوانده و جای‌گذاری خواهد شد')}
              className="text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors font-semibold"
            >
              فراخوانی مسافر سابق
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-slate-500 dark:text-slate-400 font-semibold text-xs block mb-2">نام (فارسی)</label>
              <input type="text" placeholder="مثال: علیرضا" className="w-full border border-slate-200/70 dark:border-slate-700/70 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all font-semibold dark:text-white shadow-inner" />
            </div>
            <div>
              <label className="text-slate-500 dark:text-slate-400 font-semibold text-xs block mb-2">نام خانوادگی (فارسی)</label>
              <input type="text" placeholder="مثال: مرادی" className="w-full border border-slate-200/70 dark:border-slate-700/70 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all font-semibold dark:text-white shadow-inner" />
            </div>
            <div>
              <label className="text-slate-500 dark:text-slate-400 font-semibold text-xs block mb-2">کد ملی</label>
              <input type="text" placeholder="۰۰۱۲۳۴۵۶۷۸" className="w-full border border-slate-200/70 dark:border-slate-700/70 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-sans text-left bg-white/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all dark:text-white shadow-inner" dir="ltr" />
            </div>
            <div>
              <label className="text-slate-500 dark:text-slate-400 font-semibold text-xs block mb-2">تلفن همراه (جهت ارسال واچر)</label>
              <input type="text" placeholder="۰۹۱۲۳۴۵۶۷۸۹" className="w-full border border-slate-200/70 dark:border-slate-700/70 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-sans text-left bg-white/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-900 transition-all dark:text-white shadow-inner" dir="ltr" />
            </div>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3 flex items-center gap-2">
            <ShieldCheck size={20} className="text-blue-500" /> خدمات ویژه و تشریفات
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl flex items-start justify-between cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4">
                      <div className="mt-1 w-5 h-5 rounded border border-slate-300 dark:border-slate-600 group-hover:border-blue-500 flex items-center justify-center transition-colors"></div>
                      <div>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white mb-1">ترانسفر رفت فرودگاهی</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">خودروی اختصاصی از فرودگاه مهرآباد یا امام به هتل</span>
              </div>
          </div>
          <span className="text-xs font-sans tracking-tighter font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg whitespace-nowrap">۷۵۰,۰۰۰</span>
      </label>

      <label className="border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl flex items-start justify-between cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group">
          <div className="flex items-start gap-4">
              <div className="mt-1 w-5 h-5 rounded border border-slate-300 dark:border-slate-600 group-hover:border-blue-500 flex items-center justify-center transition-colors"></div>
              <div>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white mb-1">تزئین ویژه اتاق</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">تزئین با گل رز و شمع ویژه ماه‌عسل و سالگرد</span>
              </div>
          </div>
          <span className="text-xs font-sans tracking-tighter font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg whitespace-nowrap">۱,۲۰۰,۰۰۰</span>
      </label>

      <label className="border border-blue-600 dark:border-blue-600/50 bg-blue-50/50 dark:bg-blue-700/10 p-4 rounded-2xl flex items-start justify-between cursor-pointer shadow-sm group">
          <div className="flex items-start gap-4">
              <div className="mt-1 w-5 h-5 rounded bg-blue-600 border border-blue-600 text-white flex items-center justify-center transition-colors">
                  <Check size={14} strokeWidth={4} />
              </div>
              <div>
                  <span className="block text-sm font-bold text-slate-900 dark:text-white mb-1">بیمه مسافرتی</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">پوشش کامل حوادث در طول اقامت</span>
              </div>
          </div>
          <span className="text-xs font-sans tracking-tighter font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-700/30 px-3 py-1.5 rounded-lg whitespace-nowrap border border-blue-50 dark:border-blue-700/50">رایگان</span>
      </label>
  </div>
</div>
</div>

<div className="lg:col-span-1 space-y-6">
{/* Price Breakdown */}
<div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden">
  <div className="absolute -right-10 top-0 bottom-0 w-32 bg-blue-900/10 transform skew-x-12 pointer-events-none"></div>
  
  <h4 className="font-bold text-lg text-white border-r-4 border-blue-500 pr-3 flex items-center gap-2 relative z-10">
    <Receipt size={20} className="text-blue-400" /> صورت‌حساب نهایی
  </h4>
  
  <div className="space-y-4 text-xs font-medium text-slate-400 border-b border-slate-700/50 pb-6 relative z-10">
    <div className="flex justify-between items-center">
        <span className="text-slate-300">هتل اسپیناس پالاس</span> 
        <span className="bg-slate-800 px-2.5 py-1.5 rounded-lg text-white font-semibold">۳ شب</span>
    </div>
    <div className="flex justify-between items-center">
        <span className="text-slate-300">اتاق دبل استاندارد</span> 
        <span className="font-sans tracking-tighter">۱۴,۸۸۰,۰۰۰ تومان</span>
    </div>
    <div className="flex justify-between items-center text-blue-400 font-bold bg-blue-950/30 p-2.5 rounded-xl border border-blue-900/50">
        <span>تخفیف پلتفرم</span> 
        <span>-۰ تومان</span>
    </div>
    <div className="flex justify-between items-center">
        <span className="text-slate-300">مالیات و عوارض (۹٪)</span> 
        <span className="font-sans tracking-tighter">۱,۳۳۹,۲۰۰ تومان</span>
    </div>
  </div>
  
  <div className="relative z-10">
    <div className="flex justify-between items-end text-sm font-bold mb-6">
        <span className="text-slate-300">مبلغ قابل پرداخت:</span>
        <span className="text-2xl font-bold font-sans text-white tracking-tighter">۱۶,۲۱۹,۲۰۰ <span className="text-xs font-sans font-medium text-slate-500 tracking-normal">تومان</span></span>
    </div>
            <button onClick={onSuccess} className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base cursor-pointer">
                <CreditCard size={20} /> پرداخت امن بانکی
            </button>
            <div className="text-center mt-4 flex items-center justify-center gap-1.5 text-slate-400 text-[10px]">
                <ShieldCheck size={12} /> پرداخت شما رمزنگاری شده و امن است
            </div>
          </div>
        </div>

        <div className="bg-slate-50/80 dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex gap-3 items-start shadow-inner">
            <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
            <p>
                با کلیک بر روی دکمه پرداخت، شما <a href="#" className="text-blue-500 dark:text-blue-400 font-bold hover:underline">قوانین و مقررات رزرو هتل</a> و سیاست‌های لغو و استرداد را می‌پذیرید.
            </p>
        </div>
      </div>
    </div>
  );
}
