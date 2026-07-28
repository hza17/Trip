import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Business } from "./workspace/types";
import { initialBusinesses } from "./workspace/mockData";

const mockChartData = [
  { name: 'شنبه', users: 4000, revenue: 2400 },
  { name: 'یکشنبه', users: 3000, revenue: 1398 },
  { name: 'دوشنبه', users: 2000, revenue: 9800 },
  { name: 'سه‌شنبه', users: 2780, revenue: 3908 },
  { name: 'چهارشنبه', users: 1890, revenue: 4800 },
  { name: 'پنجشنبه', users: 2390, revenue: 3800 },
  { name: 'جمعه', users: 3490, revenue: 4300 },
];

export function AdminModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("users");
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const saved = localStorage.getItem('paradise_businesses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return Array.from(new Map(parsed.map(b => [b.id, b])).values());
        }
      } catch (e) {
        // ignore
      }
    }
    return initialBusinesses;
  });

  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('paradise_businesses');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setBusinesses(Array.from(new Map(parsed.map(b => [b.id, b])).values()));
          }
        } catch (e) {
          // ignore
        }
      }
    };
    window.addEventListener('businesses_updated', handleSync);
    return () => window.removeEventListener('businesses_updated', handleSync);
  }, []);

  const updateBusinessStatus = (id: string, status: 'Active' | 'Pending' | 'Suspended') => {
    const updated = businesses.map(b => b.id === id ? { ...b, status } : b);
    const unique = Array.from(new Map(updated.map(b => [b.id, b])).values());
    setBusinesses(unique);
    localStorage.setItem('paradise_businesses', JSON.stringify(unique));
    window.dispatchEvent(new Event('businesses_updated'));
  };

  const pendingCount = businesses.filter(b => b.status === 'Pending').length;

  const tabs = [
    { id: "users", label: "👥 مدیریت کاربران", badge: null },
    { id: "approvals", label: "📂 تاییدیه مدارک و هتل‌ها", badge: pendingCount || null, badgeColor: "text-white bg-amber-500" },
    { id: "rbac", label: "🛡️ دسترسی پرسنل (RBAC)", badge: null },
    { id: "finance", label: "💳 تسویه‌حساب و شبا", badge: null },
    { id: "coupons", label: "🏷️ کمپین‌ها و کدهای تخفیف", badge: 2, badgeColor: "text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-slate-800" },
    { id: "tickets", label: "💬 پاسخگویی به تیکت‌ها", badge: 2, badgeColor: "text-white bg-rose-500" },
    { id: "audit", label: "📜 لاگ‌های امنیتی و سیستم", badge: null },
  ];

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2rem] w-full md:h-[calc(100vh-140px)] h-[calc(100vh-80px)] md:min-h-[600px] min-h-[500px] flex overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50 flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-slate-950/95 dark:bg-slate-950 text-slate-300 p-4 md:p-5 space-y-4 flex flex-col shrink-0 border-l border-slate-800/50 backdrop-blur-md">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3 md:pb-4 shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-900/20 shrink-0">SA</div>
          <div>
            <div className="text-white text-xs font-black">پنل کنترلر مرکزی</div>
            <div className="text-[10px] text-slate-400 font-bold mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              مدیر ارشد: سهراب علوی
            </div>
          </div>
        </div>
        
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-1 md:pb-0 scrollbar-none gap-2 md:space-y-2 shrink-0 md:flex-grow">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "text-right p-3 rounded-xl transition-all flex justify-between items-center font-bold whitespace-nowrap shrink-0 md:w-full",
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" 
                  : "hover:bg-slate-800 hover:text-white text-slate-400"
              )}
            >
              <span className="flex items-center gap-2">{tab.label}</span>
              {tab.badge && (
                <span className={cn("text-[9px] px-2 py-0.5 rounded-full font-black shadow-sm mr-2 md:mr-0", tab.badgeColor || "bg-slate-800 text-slate-300")}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </aside>
      
      <div className="flex-grow flex flex-col h-full overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-900 dark:text-white text-lg">⚙️</span>
            <h2 className="font-black text-sm text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">مدیریت سیستم</h2>
          </div>
          <button onClick={onClose} className="bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 text-xs px-4 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-bold shadow-sm text-slate-700 dark:text-slate-200 cursor-pointer">
            بستن پنل ✕
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow space-y-6 text-xs text-slate-900 dark:text-slate-100 font-bold">
          {activeTab === 'users' && (
             <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-bold text-slate-900 dark:text-slate-100">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 space-y-1 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-medium">ثبت‌نام روزانه کاربران جدید (Daily Signups)</span>
                        <div className="text-xl font-black font-mono text-slate-900 dark:text-white">+۴۸ مسافر امروز</div>
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400">↑ ۱۲٪ بیشتر از دیروز</span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 space-y-1 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-medium">کل کاربران فعال پلتفرم (Active Users)</span>
                        <div className="text-xl font-black font-mono text-slate-900 dark:text-white">۱۲,۴۵۰ نفر</div>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">مجموع ثبت‌نام تایید هویت شده</span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-5 space-y-1 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                        <span className="text-blue-600/80 dark:text-blue-400/80 text-[10px] block font-medium relative z-10">کاربران آنلاین هم‌اکنون (Live Session)</span>
                        <div className="text-xl font-black font-mono text-blue-700 dark:text-blue-400 relative z-10">۳۴۲ کاربر لایو</div>
                        <span className="text-[9px] text-blue-600 dark:text-blue-400 animate-pulse relative z-10">● سرورهای درگاه بدون لگی</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 space-y-4 shadow-sm">
                        <h3 className="font-black text-xs text-slate-800 dark:text-slate-200 mb-2 border-r-4 border-blue-500 pr-3">نمودار رشد کاربران سیستم (هفته گذشته)</h3>
                        <div className="h-64 w-full text-xs font-mono">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', color: '#fff', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '11px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                    <Area type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="lg:col-span-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 space-y-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100/50 dark:border-slate-800/50 pb-4">
                            <h3 className="font-black text-xs text-slate-800 dark:text-slate-200 border-r-4 border-blue-500 pr-3">فهرست مسافران ثبت شده در سامانه</h3>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <input type="text" placeholder="جستجو بر اساس نام، کدملی..." className="bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 p-2 rounded-xl text-[10px] outline-none w-full sm:w-56 font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-slate-900 dark:text-white" />
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-right text-[11px] font-bold">
                                <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-800/50">
                                    <tr>
                                        <th className="p-3">نام و نام خانوادگی</th>
                                        <th className="p-3">کد ملی</th>
                                        <th className="p-3">شماره همراه</th>
                                        <th className="p-3 text-center">وضعیت دسترسی</th>
                                        <th className="p-3 text-left">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                                        <td className="p-3 text-slate-900 dark:text-white font-black">علیرضا مرادی</td>
                                        <td className="p-3 font-mono">۰۰۱۲۳۴۵۶۷۸</td>
                                        <td className="p-3 font-mono">۰۹۱۲۳۴۵۶۷۸۹</td>
                                        <td className="p-3 text-center"><span className="bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-md text-[9px] font-black">فعال</span></td>
                                        <td className="p-3 text-left"><span className="text-blue-600 dark:text-blue-400 hover:underline">ممیزی کامل ➔</span></td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                                        <td className="p-3 text-slate-900 dark:text-white font-black">همایون شجری</td>
                                        <td className="p-3 font-mono">۴۵۶۷۸۹۰۱۲۳</td>
                                        <td className="p-3 font-mono">۰۹۱۹۸۷۶۵۴۳۲</td>
                                        <td className="p-3 text-center"><span className="bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-md text-[9px] font-black">فعال</span></td>
                                        <td className="p-3 text-left"><span className="text-blue-600 dark:text-blue-400 hover:underline">ممیزی کامل ➔</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 space-y-4 shadow-sm">
                            <div className="border-b border-slate-100/50 dark:border-slate-800/50 pb-3">
                                <h4 className="font-black text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2 border-r-4 border-blue-500 pr-3">
                                    <span className="text-blue-500">🔍</span> جزئیات حساب و سوابق مسافر
                                </h4>
                            </div>
                            <div className="space-y-3 text-[11px] font-bold">
                                <div className="flex justify-between border-b border-slate-100/50 dark:border-slate-800/50 pb-2">
                                    <span className="text-slate-500 dark:text-slate-400">نام کامل مسافر:</span>
                                    <span className="text-slate-900 dark:text-white">علیرضا مرادی</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100/50 dark:border-slate-800/50 pb-2">
                                    <span className="text-slate-500 dark:text-slate-400">کد ملی شناسایی:</span>
                                    <span className="text-slate-900 dark:text-white font-mono">۰۰۱۲۳۴۵۶۷۸</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100/50 dark:border-slate-800/50 pb-2">
                                    <span className="text-slate-500 dark:text-slate-400">شماره موبایل:</span>
                                    <span className="text-slate-900 dark:text-white font-mono">۰۹۱۲۳۴۵۶۷۸۹</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100/50 dark:border-slate-800/50 pb-2">
                                    <span className="text-slate-500 dark:text-slate-400">موجودی کیف پول:</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">۵,۰۰0,۰۰۰ تومان</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 space-y-4 shadow-sm">
                            <div className="border-b border-slate-100/50 dark:border-slate-800/50 pb-3">
                                <h4 className="font-black text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2 border-r-4 border-blue-500 pr-3">
                                    <span className="text-blue-500">🛡️</span> مدیریت دسترسی و اصلاح اطلاعات
                                </h4>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1.5">نام جدید مسافر:</label>
                                        <input type="text" defaultValue="علیرضا مرادی" className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 p-2.5 rounded-xl text-xs outline-none font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-slate-900 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1.5">شماره همراه جدید:</label>
                                        <input type="text" defaultValue="۰۹۱۲۳۴۵۶۷۸۹" className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 p-2.5 rounded-xl text-xs outline-none font-bold font-mono focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-slate-900 dark:text-white" dir="ltr" />
                                    </div>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] py-2.5 rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                                    ذخیره تغییرات مسافر
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'approvals' && (
             <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-bold">
                    <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block mb-1">کل پرونده‌های معلق:</span>
                            <span className="text-xl font-black font-mono text-slate-950 dark:text-white">{pendingCount} مورد</span>
                        </div>
                        <span className="text-2xl">⏳</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-slate-900 dark:text-white">
                            <thead className="bg-slate-950/95 dark:bg-slate-950 text-white font-black border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="p-3">مجموعه متقاضی</th>
                                    <th className="p-3">دسته‌بندی صنف</th>
                                    <th className="p-3">شناسه سیستمی</th>
                                    <th className="p-3 text-center">وضعیت مدارک و پنل</th>
                                    <th className="p-3 text-left">عملیات نظارت و تایید نهایی</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-bold">
                                {businesses.map(b => (
                                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                      <td className="p-3">
                                          <span className="block font-black text-slate-950 dark:text-white">{b.name}</span>
                                          {b.address && <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-normal">{b.address}</span>}
                                      </td>
                                      <td className="p-3 text-slate-600 dark:text-slate-400">
                                          {b.type === 'Hotel' ? 'هتل و اقامتگاه' :
                                           b.type === 'Flight' ? 'بلیت پرواز' :
                                           b.type === 'Train' ? 'بلیت قطار' :
                                           b.type === 'CarRental' ? 'اجاره خودرو' :
                                           b.type === 'Villa' ? 'ویلا و بومگردی' :
                                           b.type === 'Entertainment' ? 'تفریحی و سرگرمی' : 'سرویس خدمات'}
                                      </td>
                                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{b.id}</td>
                                      <td className="p-3 text-center">
                                          {b.status === 'Active' ? (
                                              <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30 px-2.5 py-1 rounded-md text-[9px] font-black">فعال و تأیید شده</span>
                                          ) : b.status === 'Pending' ? (
                                              <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30 px-2.5 py-1 rounded-md text-[9px] font-black animate-pulse">در انتظار تأیید</span>
                                          ) : (
                                              <span className="bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/30 px-2.5 py-1 rounded-md text-[9px] font-black">تعلیق شده</span>
                                          )}
                                      </td>
                                      <td className="p-3 text-left flex justify-end gap-1.5 pt-4">
                                          {b.status !== 'Active' && (
                                              <button 
                                                  onClick={() => updateBusinessStatus(b.id, 'Active')}
                                                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-black transition cursor-pointer"
                                              >
                                                  تایید و انتشار صنف
                                              </button>
                                          )}
                                          {b.status !== 'Suspended' && (
                                              <button 
                                                  onClick={() => updateBusinessStatus(b.id, 'Suspended')}
                                                  className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl font-black transition cursor-pointer"
                                              >
                                                  تعلیق و مسدودسازی
                                              </button>
                                          )}
                                          {b.status !== 'Pending' && (
                                              <button 
                                                  onClick={() => updateBusinessStatus(b.id, 'Pending')}
                                                  className="border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-xl transition cursor-pointer"
                                              >
                                                  بازگرداندن به صف انتظار
                                              </button>
                                          )}
                                      </td>
                                  </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'rbac' && (
             <div className="space-y-4 animate-in fade-in">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-200 dark:border-slate-800 pb-3 gap-2">
                    <p className="text-slate-950 dark:text-white font-black">مدیریت سطوح دسترسی کارکنان داخلی (Role-Based Access Control)</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                        <h3 className="font-bold text-xs text-slate-900 dark:text-white mb-3 border-r-4 border-blue-500 pr-3">پرسنل فعال اداری سامانه B2C/B2B</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-right font-bold text-[11px]">
                                <thead className="bg-slate-100 dark:bg-slate-800 border-b">
                                    <tr>
                                        <th className="p-2">نام پرسنل</th>
                                        <th className="p-2">نقش سیستمی</th>
                                        <th className="p-2">دسترسی‌های فعال</th>
                                        <th className="p-2 text-left">ممیزی</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <tr className="bg-slate-50 dark:bg-slate-900 cursor-pointer">
                                        <td className="p-2">سهراب علوی</td>
                                        <td className="p-2 text-slate-600 dark:text-slate-400">مدیر ارشد</td>
                                        <td className="p-2 text-slate-400 dark:text-slate-500 font-mono text-[9px]">approvals, rbac, finance, coupons</td>
                                        <td className="p-2 text-left"><span className="text-blue-600 dark:text-blue-400 hover:underline">ویرایش دسترسی ➔</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-4">
                        <h3 className="font-bold text-xs text-slate-900 dark:text-white border-b pb-2 border-r-4 border-blue-500 pr-3">تخصیص سطح دسترسی پرسنل: <span className="text-blue-600 dark:text-blue-400">سهراب علوی</span></h3>
                        <div className="space-y-3 text-xs">
                            <label className="flex items-center gap-2.5 cursor-pointer">
                                <input type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
                                <span>📂 دسترسی تایید اسناد و مجوزهای هتل‌ها</span>
                            </label>
                            <label className="flex items-center gap-2.5 cursor-pointer">
                                <input type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
                                <span>🛡️ دسترسی مدیریت نقش‌ها و پرسنل (RBAC)</span>
                            </label>
                        </div>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'finance' && (
             <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-bold">
                    <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                        <span className="text-slate-500 dark:text-slate-400 block mb-1">حجم کل فروش ناخالص پلتفرم (GMV):</span>
                        <div className="text-lg font-black font-mono text-slate-950 dark:text-white">۱,۴۵۰,۲۰۰,۰۰۰ تومان</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                        <span className="text-slate-500 dark:text-slate-400 block mb-1">سهم ناخالص پورسانت پلتفرم:</span>
                        <div className="text-lg font-black font-mono text-emerald-700 dark:text-emerald-400">۱۴۵,۰۲۰,۰۰۰ تومان</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                        <span className="text-slate-500 dark:text-slate-400 block mb-1">سهم خالص هتل‌داران همکار:</span>
                        <div className="text-lg font-black font-mono text-slate-950 dark:text-white">۱,۳۰۵,۱۸۰,۰۰۰ تومان</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 border-r-4 border-r-blue-600">
                        <span className="text-slate-500 dark:text-slate-400 block mb-1">تسویه‌حساب‌های معلق پایا:</span>
                        <div className="text-lg font-black font-mono text-blue-600 dark:text-blue-400">۱۳,۳۹۲,۰۰۰ تومان</div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-black text-xs text-slate-950 dark:text-white border-r-4 border-blue-500 pr-3">کارتابل پایا و تسویه شبا هتل‌داران (Payout Ledger)</h3>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black cursor-pointer">تسویه گروهی پایا (Batch Payout) ⚡</button>
                    </div>

                    <div className="overflow-x-auto text-[11px]">
                        <table className="w-full text-right">
                            <thead className="bg-slate-100 dark:bg-slate-800">
                                <tr>
                                    <th className="p-2">مجموعه طلبکار</th>
                                    <th className="p-2">بانک عامل</th>
                                    <th className="p-2">شماره شبا مقصد</th>
                                    <th className="p-2 text-left">مبلغ خالص تسویه</th>
                                    <th className="p-2 text-center">وضعیت انتقال</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono font-bold text-slate-700 dark:text-slate-300">
                                <tr>
                                    <td className="p-2 font-sans text-slate-950 dark:text-white">هتل بین‌المللی اسپیناس پالاس</td>
                                    <td className="p-2 font-sans">بانک ملی ایران</td>
                                    <td className="p-2">IR120170000000112233445566</td>
                                    <td className="p-2 text-left font-bold text-slate-950 dark:text-white">۱۳,۳۹۲,۰۰۰ تومان</td>
                                    <td className="p-2 text-center">
                                        <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-[9px] font-sans">در انتظار حواله</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'coupons' && (
             <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
                        <h3 className="font-black text-slate-950 dark:text-white text-xs border-r-4 border-blue-500 pr-3">تولید کد تخفیف جدید کمپین</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">کد اختصاصی (فقط حروف انگلیسی):</label>
                                <input type="text" placeholder="مثال: SPRING_50" className="w-full border p-2 rounded text-xs outline-none font-mono uppercase bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-750" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">درصد تخفیف (٪):</label>
                                    <input type="number" placeholder="مثال: ۱۵" className="w-full border p-2 rounded text-xs outline-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-750 font-mono" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">سقف تخفیف (تومان):</label>
                                    <input type="number" placeholder="مثال: ۴۰۰۰۰۰" className="w-full border p-2 rounded text-xs outline-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-750 font-mono" />
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded-xl cursor-pointer">ایجاد و انتشار کد تخفیف</button>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
                        <h3 className="font-bold text-xs text-slate-950 dark:text-white border-r-4 border-blue-500 pr-3">کدهای تخفیف فعال در سیستم سراسری</h3>
                        <div className="overflow-x-auto text-[11px]">
                            <table className="w-full text-right font-bold">
                                <thead className="bg-slate-100 dark:bg-slate-800 border-b">
                                    <tr>
                                        <th className="p-2">کد کمپین</th>
                                        <th className="p-2">تخفیف (٪)</th>
                                        <th className="p-2">سقف تخفیف</th>
                                        <th className="p-2">هدف</th>
                                        <th className="p-2">بودجه مصرف شده</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-900 dark:text-white">
                                    <tr>
                                        <td className="p-2 text-slate-950 dark:text-white font-sans">FIRST_WIRE_20</td>
                                        <td className="p-2">20٪</td>
                                        <td className="p-2 font-sans">۵۰۰,۰۰۰ تومان</td>
                                        <td className="p-2 font-sans">همه هتل‌ها</td>
                                        <td className="p-2 font-sans">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-12 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-600 h-full w-[45%]"></div></div>
                                                <span>45٪</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'tickets' && (
             <div className="space-y-4 animate-in fade-in">
                <div className="flex justify-between items-center border-b pb-2">
                    <div>
                        <h3 className="font-black text-sm text-slate-950 dark:text-white border-r-4 border-blue-500 pr-3">مرکز مانیتورینگ و پاسخگویی تیکت‌ها (Central Ticket Hub)</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">پاسخگویی متمرکز به شکایات مسافران B2C و چالش‌های مالی تامین‌کنندگان B2B</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[450px] h-[550px]">
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-between overflow-hidden">
                        <div className="space-y-2 overflow-y-auto">
                            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer font-bold relative">
                                <div className="flex justify-between items-center text-[10px] mb-1">
                                    <span className="text-slate-900 dark:text-white">مغایرت قیمت درگاه بانک ملی</span>
                                    <span className="bg-rose-100 text-rose-800 px-1.5 rounded text-[8px]">تیکت مسافر</span>
                                </div>
                                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-normal truncate">سلام وقت بخیر. تراکنش شما در وضعیت در حال بررسی است.</p>
                            </div>
                            <div className="p-2.5 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-bold relative">
                                <div className="flex justify-between items-center text-[10px] mb-1">
                                    <span className="text-slate-900 dark:text-white">مغایرت فرمول محاسبه مالیات</span>
                                    <span className="bg-emerald-100 text-emerald-800 px-1.5 rounded text-[8px]">تیکت هتل‌دار</span>
                                </div>
                                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-normal truncate">تیکت شما به دپارتمان حسابداری ارجاع شد و در دست بررسی است.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-750 rounded-xl p-4 flex flex-col justify-between">
                        <div className="border-b pb-2 flex justify-between items-center font-bold">
                            <span className="text-xs text-slate-950 dark:text-white">مغایرت قیمت درگاه بانک ملی</span>
                            <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-full">مسافر (Client)</span>
                        </div>

                        <div className="flex-grow overflow-y-auto py-3 space-y-3 text-[11px]">
                            <div className="p-2.5 rounded-lg max-w-[85%] mr-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
                                <span className="text-[8px] block text-slate-400 mb-1">علیرضا مرادی (مسافر) - ۱۰:۳۰</span>
                                سلام. من پرداخت را انجام دادم ولی مبلغ کسر شده اما کیف پول پلتفرم شارژ نشد.
                            </div>
                            <div className="p-2.5 rounded-lg max-w-[85%] ml-auto bg-blue-650 text-white">
                                <span className="text-[8px] block text-slate-400 mb-1">کارشناس سوپر ادمین - ۱۰:۴۵</span>
                                سلام وقت بخیر. تراکنش شما در وضعیت در حال بررسی است. تا چند دقیقه دیگر نتیجه نهایی اعمال می‌شود.
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                            <input type="text" placeholder="پاسخ ممیز و سرپرست سامانه را وارد کنید..." className="flex-grow border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs bg-white dark:bg-slate-900 outline-none font-bold text-slate-900 dark:text-white" />
                            <button className="bg-blue-600 text-white px-5 rounded-lg text-xs font-black hover:bg-blue-700 cursor-pointer">ارسال پاسخ نهایی</button>
                        </div>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'audit' && (
             <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-3 gap-4">
                    <div>
                        <h3 className="text-slate-950 dark:text-white font-black text-sm border-r-4 border-blue-500 pr-3">ردگیری و لاگ‌های امنیتی سامانه (Audit Trail)</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1">مانیتورینگ جامع تمامی فعالیت‌های پرسنل، تامین‌کنندگان و تغییرات سیستمی</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-950 dark:text-white px-3 py-1.5 rounded-xl text-[10px] font-black cursor-pointer">خروجی CSV</button>
                        <button className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black cursor-pointer">جستجوی پیشرفته 🔍</button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-[11px] font-bold">
                            <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="p-3">زمان رویداد</th>
                                    <th className="p-3">کاربر / نقش</th>
                                    <th className="p-3">آی‌پی (IP)</th>
                                    <th className="p-3">عملیات ثبت شده</th>
                                    <th className="p-3">وضعیت امنیتی</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                                    <td className="p-3 text-slate-500">۱۴:۳۲ - ۱۴۰۵/۰۴/۱۸</td>
                                    <td className="p-3 font-sans">سهراب علوی <span className="bg-slate-950 text-white px-1.5 py-0.5 rounded text-[9px] block w-max mt-1">SuperAdmin</span></td>
                                    <td className="p-3">192.168.1.45</td>
                                    <td className="p-3 font-sans text-slate-900 dark:text-white">تایید نهایی اسناد «هتل لوتوس» و فعال‌سازی روی پلتفرم</td>
                                    <td className="p-3">
                                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-[9px] font-sans">مجاز (تایید شده)</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                                    <td className="p-3 text-slate-500">۱۳:۱۵ - ۱۴۰۵/۰۴/۱۸</td>
                                    <td className="p-3 font-sans">سیستم خودکار <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[9px] block w-max mt-1 font-sans">SystemCRON</span></td>
                                    <td className="p-3">Internal</td>
                                    <td className="p-3 font-sans text-slate-900 dark:text-white">تولید خودکار ۱۲۰ کد تخفیف برای کمپین تابستانه</td>
                                    <td className="p-3">
                                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-[9px] font-sans">سیستمی</span>
                                    </td>
                                </tr>
                                <tr className="bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100/50 dark:hover:bg-rose-950/30 transition border-r-4 border-r-rose-600">
                                    <td className="p-3 text-slate-500">۱۱:۰۲ - ۱۴۰۵/۰۴/۱۸</td>
                                    <td className="p-3 font-sans">کاربر ناشناس <span className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-[9px] block w-max mt-1 font-sans">Guest</span></td>
                                    <td className="p-3">89.43.12.99</td>
                                    <td className="p-3 font-sans text-rose-800 dark:text-rose-400">تلاش ناموفق برای ورود به پنل هتل اسپیناس (۵ بار پیاپی)</td>
                                    <td className="p-3">
                                        <span className="bg-rose-600 text-white px-2 py-1 rounded text-[9px] font-sans">اخطار (مسدود شد)</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
