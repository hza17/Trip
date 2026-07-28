import { useState } from "react";
import { cn } from "@/lib/utils";
import { CreditCard, Heart, MessageSquare, Ticket, User, Bell, Star, LogOut, ChevronLeft, MapPin, Receipt, Edit3, Send } from "lucide-react";

export function DashboardView({ onClose, defaultTab = "trips" }: { onClose?: () => void, defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const tabs = [
    { id: "trips", label: "سفرهای من (رزرواسیون‌ها)", icon: Ticket },
    { id: "favorites", label: "هتل‌های موردعلاقه", icon: Heart, badge: 2 },
    { id: "notifications", label: "صندوق پیام‌ها و اعلان‌ها", icon: Bell, badge: 1 },
    { id: "wallet", label: "اعتبار و تراکنش‌های کیف پول", icon: CreditCard },
    { id: "profile", label: "پروفایل و اطلاعات مسافرین", icon: User },
    { id: "tickets", label: "پشتیبانی و چت آنلاین", icon: MessageSquare },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">داشبورد کاربری</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">مدیریت رزرواسیون‌ها و اطلاعات حساب</p>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm">شناسه کاربر: TRV-882201</span>
            {onClose && (
                <button onClick={onClose} className="flex items-center gap-2 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/50 px-4 py-2 rounded-xl text-xs font-bold transition">
                    <LogOut size={16} />
                    خروج
                </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="col-span-1 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full text-right p-3.5 rounded-xl transition-all duration-300 flex justify-between items-center text-sm font-bold group",
                  isActive 
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/20 dark:bg-amber-700 dark:shadow-none" 
                    : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white"
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className={cn(isActive ? "text-amber-100" : "text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400")} />
                  {tab.label}
                </span>
                {tab.badge && (
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-black",
                    isActive ? "bg-amber-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                    tab.id === 'notifications' && !isActive && "bg-rose-500 dark:bg-rose-600 text-white animate-pulse"
                  )}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        <div className="col-span-1 lg:col-span-3">
          {activeTab === 'trips' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white border-l-4 border-amber-500 pl-3">تاریخچه رزرواسیون هتل‌ها</h2>
              
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all">
                  <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-100/50 dark:border-slate-800 pb-4">
                      <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-2 border border-amber-100 dark:border-amber-900/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                        تایید شده (جاری)
                      </span>
                      <span className="font-mono text-slate-400 dark:text-slate-500 text-xs bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100/50 dark:border-slate-800">واچر: ESP-4401</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-2">
                          <h3 className="font-black text-slate-950 dark:text-white text-lg">هتل بین‌المللی اسپیناس پالاس تهران</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><Ticket size={14} className="text-slate-400" /> اتاق دبل استاندارد</span>
                            <span className="flex items-center gap-1.5"><User size={14} className="text-slate-400" /> ۳ شب (۱۲ تیر)</span>
                          </div>
                      </div>
                      <div className="flex flex-wrap gap-3 w-full md:w-auto">
                          <button className="flex-1 md:flex-none bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm transform hover:-translate-y-0.5">دریافت واچر</button>
                          <button className="flex-1 md:flex-none bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900/50 transition-all">لغو رزرو</button>
                      </div>
                  </div>
              </div>

              <div className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-5 space-y-4 opacity-80 hover:opacity-100 transition-all">
                  <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold px-3 py-1 rounded-full text-xs">پایان یافته (گذشته)</span>
                      <span className="font-mono text-slate-400 dark:text-slate-500 text-xs bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full border border-slate-200/50 dark:border-slate-800/50">واچر: SHN-9021</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-2">
                          <h3 className="font-black text-slate-600 dark:text-slate-300 text-lg">هتل بزرگ شاهان تهران</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400 dark:text-slate-500 font-medium">
                            <span className="flex items-center gap-1.5"><Ticket size={14} /> سوئیت جونیور</span>
                            <span className="flex items-center gap-1.5"><User size={14} /> ۲ شب (۳ خرداد)</span>
                          </div>
                      </div>
                      <div className="flex flex-wrap gap-3 w-full md:w-auto">
                          <button onClick={() => setShowReviewModal(true)} className="flex-1 md:flex-none bg-white dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-2.5 rounded-xl text-sm font-bold border border-amber-200 dark:border-amber-900/50 flex items-center justify-center gap-2 transition">
                              <Star size={16} className="fill-amber-500 text-amber-500" />
                              ثبت دیدگاه
                          </button>
                          <button className="flex-1 md:flex-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center justify-center gap-2">
                             <Receipt size={16} /> فاکتور
                          </button>
                      </div>
                  </div>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-lg font-bold text-slate-950 dark:text-white border-l-4 border-amber-500 pl-3">هتل‌های نشان‌شده من</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'هتل اسپیناس پالاس', loc: 'تهران، سعادت آباد', price: '۴,۹۶۰,۰۰۰' },
                      { name: 'هتل بزرگ شاهان', loc: 'تهران، میدان ونک', price: '۳,۴۰۰,۰۰۰' }
                    ].map((hotel, i) => (
                      <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-all group">
                          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative">
                              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                              <Heart size={24} className="text-slate-400 z-10" />
                          </div>
                          <div className="flex-grow flex flex-col justify-between py-1">
                              <div>
                                  <h4 className="font-black text-slate-950 dark:text-white text-sm">{hotel.name}</h4>
                                  <p className="text-slate-400 text-[11px] mt-1 flex items-center gap-1"><MapPin size={10} /> {hotel.loc}</p>
                              </div>
                              <div>
                                <div className="text-amber-700 dark:text-amber-400 font-black font-mono text-sm">{hotel.price} <span className="text-[10px] text-slate-400 font-sans font-medium">تومان / شب</span></div>
                                <div className="flex gap-2 pt-3">
                                    <button className="flex-grow bg-slate-950 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded-lg text-[11px] font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all">مشاهده و رزرو</button>
                                    <button className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all border border-slate-200/50 dark:border-slate-800/50">حذف</button>
                                </div>
                              </div>
                          </div>
                      </div>
                    ))}
                </div>
             </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white border-l-4 border-amber-500 pl-3">اعلان‌های سیستم</h2>
              <div className="p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-amber-200/50 dark:border-amber-900/50 rounded-3xl shadow-sm flex justify-between items-center relative overflow-hidden transition-all hover:shadow-md">
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50">
                          <Bell size={18} />
                      </div>
                      <div>
                          <p className="font-bold text-slate-950 dark:text-white text-sm">رزرو موقت شما ثبت شد</p>
                          <span className="text-[11px] text-slate-400 font-medium mt-1 block">۱۰ دقیقه پیش</span>
                      </div>
                  </div>
                  <button className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 px-3 py-1.5 rounded-lg transition-all border border-transparent hover:border-amber-200/50 dark:hover:border-amber-900/50">تایید خوانده شدن</button>
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white border-l-4 border-amber-500 pl-3">کیف پول و تراکنش‌ها</h2>
              
              <div className="bg-slate-950 dark:bg-slate-900 border border-slate-800/50 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden text-white backdrop-blur-xl">
                  <div className="absolute top-0 left-0 p-8 opacity-10 pointer-events-none transform -rotate-12 scale-150">
                      <CreditCard size={120} />
                  </div>
                  <div className="relative z-10">
                      <span className="text-slate-400 block mb-2 font-medium text-sm">موجودی فعلی حساب:</span>
                      <div className="text-4xl font-black font-mono tracking-tight">۵,۰۰۰,۰۰۰ <span className="text-lg font-sans text-amber-400 ml-1">تومان</span></div>
                  </div>
                  <div className="relative z-10 w-full md:w-auto">
                      <button 
                          onClick={() => {
                              const amount = window.prompt('مبلغ مورد نظر برای شارژ را وارد کنید (تومان):');
                              if (amount) alert('به درگاه پرداخت منتقل می‌شوید...');
                          }}
                          className="w-full md:w-auto bg-amber-600 hover:bg-amber-500 text-white text-sm px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-amber-900/50 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                      >
                          افزایش موجودی <ChevronLeft size={16} />
                      </button>
                  </div>
              </div>

              <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-950 dark:text-white">تراکنش‌های اخیر</h3>
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl overflow-hidden shadow-sm text-sm">
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-right">
                            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs border-b border-slate-200/50 dark:border-slate-800/50">
                                <tr>
                                    <th className="p-4 font-bold">تراکنش</th>
                                    <th className="p-4 font-bold">مبلغ</th>
                                    <th className="p-4 font-bold">تاریخ</th>
                                    <th className="p-4 font-bold">وضعیت</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50">
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all">
                                    <td className="p-4">
                                        <div className="font-bold text-slate-950 dark:text-white text-xs">خرید اقامتگاه اسپیناس</div>
                                        <div className="font-mono text-slate-400 dark:text-slate-500 text-[10px] mt-1">TX-1001</div>
                                    </td>
                                    <td className="p-4 font-black font-mono text-rose-600 dark:text-rose-400 text-xs">- ۱۴,۸۸۰,۰۰۰</td>
                                    <td className="p-4 text-slate-500 dark:text-slate-400 text-[11px] font-medium">۱۴۰۵/۰۳/۲۸</td>
                                    <td className="p-4"><span className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 font-bold px-2.5 py-1 rounded-full text-[10px]">موفق</span></td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all">
                                    <td className="p-4">
                                        <div className="font-bold text-slate-950 dark:text-white text-xs">شارژ هدیه ثبت‌نام</div>
                                        <div className="font-mono text-slate-400 dark:text-slate-500 text-[10px] mt-1">TX-1000</div>
                                    </td>
                                    <td className="p-4 font-black font-mono text-emerald-600 dark:text-emerald-400 text-xs">+ ۵۰۰,۰۰۰</td>
                                    <td className="p-4 text-slate-500 dark:text-slate-400 text-[11px] font-medium">۱۴۰۵/۰۳/۱۵</td>
                                    <td className="p-4"><span className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 font-bold px-2.5 py-1 rounded-full text-[10px]">موفق</span></td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white border-l-4 border-amber-500 pl-3">اطلاعات کاربری</h2>
              
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-2 block">نام و نام خانوادگی</label>
                        <input type="text" defaultValue="علیرضا مرادی" className="w-full bg-white dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-700 text-slate-950 dark:text-white text-sm font-bold p-3 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all shadow-sm" />
                    </div>
                    <div>
                        <label className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-2 block">کد ملی</label>
                        <input type="text" defaultValue="۰۰۱۲۳۴۵۶۷۸" className="w-full bg-white dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-700 text-slate-950 dark:text-white text-sm font-bold font-mono p-3 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all shadow-sm" />
                    </div>
                    <div>
                        <label className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-2 block">شماره تماس</label>
                        <input type="text" defaultValue="۰۹۱۲۳۴۵۶۷۸۹" className="w-full bg-white dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-700 text-slate-950 dark:text-white text-sm font-bold font-mono p-3 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all shadow-sm" />
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                        <label className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-2 block">ایمیل</label>
                        <input type="email" defaultValue="moradi@example.com" dir="ltr" className="w-full bg-white dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-700 text-slate-950 dark:text-white text-sm font-bold p-3 rounded-xl text-left focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all shadow-sm" />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2 transform hover:-translate-y-0.5">
                        <Edit3 size={16} /> ذخیره تغییرات
                    </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 h-[600px] flex flex-col">
              <div className="flex justify-between items-center pb-2">
                  <h2 className="text-lg font-bold text-slate-950 dark:text-white border-l-4 border-amber-500 pl-3">پشتیبانی آنلاین</h2>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm">تیکت جدید +</button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow min-h-0">
                  <div className="lg:col-span-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-3 flex flex-col gap-2 overflow-y-auto custom-scrollbar shadow-sm">
                      <div className="p-4 bg-white dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700 rounded-2xl cursor-pointer relative overflow-hidden group transition-all shadow-sm">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600 dark:bg-amber-400"></div>
                          <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-slate-950 dark:text-white text-xs">پیگیری مغایرت پرداخت</span>
                              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full text-[9px] font-black border border-amber-200 dark:border-amber-900/50">در حال بررسی</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">تراکنش شما در وضعیت در حال بررسی است...</p>
                      </div>
                      <div className="p-4 hover:bg-white dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700 rounded-2xl cursor-pointer transition-all">
                          <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-slate-600 dark:text-slate-300 text-xs group-hover:text-slate-950 dark:group-hover:text-white">درخواست تغییر تاریخ واچر</span>
                              <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full text-[9px] font-black border border-slate-200 dark:border-slate-700">بسته شده</span>
                          </div>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">بله، با کسر ۱۰٪ جریمه کنسلی داینامیک...</p>
                      </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                          <div className="font-bold text-sm text-slate-950 dark:text-white">پیگیری مغایرت پرداخت</div>
                          <span className="text-xs text-slate-400 font-mono">TKT-8841</span>
                      </div>
                      
                      <div className="flex-grow p-5 overflow-y-auto space-y-6 custom-scrollbar bg-transparent">
                          <div className="max-w-[80%] text-right mr-auto">
                              <div className="bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 p-4 rounded-2xl rounded-tr-sm shadow-sm inline-block">
                                  <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">سلام. من پرداخت را انجام دادم ولی مبلغ کسر شده اما کیف پول پلتفرم شارژ نشد.</p>
                              </div>
                              <div className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1 justify-end">
                                  ۱۰:۳۰ <User size={10} />
                              </div>
                          </div>
                          
                          <div className="max-w-[80%] text-right ml-auto">
                              <div className="bg-amber-600 dark:bg-amber-900/50 p-4 rounded-2xl rounded-tl-sm shadow-md inline-block">
                                  <p className="text-sm text-white font-medium leading-relaxed">سلام وقت بخیر. تراکنش شما به دلیل تاخیر در شبکه شاپرک در وضعیت معلق قرار دارد. تا ۱۵ دقیقه دیگر نتیجه نهایی اعمال می‌شود.</p>
                              </div>
                              <div className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1">
                                  <MessageSquare size={10} /> پشتیبانی - ۱۰:۴۵
                              </div>
                          </div>
                      </div>
                      
                      <div className="p-4 bg-white/50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-800/50 flex gap-3 items-center backdrop-blur-md">
                          <input type="text" placeholder="پاسخ خود را بنویسید..." className="flex-grow bg-white dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-3 text-sm font-medium outline-none focus:border-amber-500 dark:focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-all shadow-inner" />
                          <button className="bg-amber-600 hover:bg-amber-700 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-sm shrink-0">
                              <Send size={18} className="transform -rotate-180" />
                          </button>
                      </div>
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col border border-slate-100 dark:border-slate-800">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
              <h2 className="font-black text-lg text-slate-950 dark:text-white">ثبت تجربه اقامت</h2>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white transition font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-500 text-xl">🏨</div>
                  <div>
                      <h4 className="font-black text-slate-950 dark:text-white text-sm">هتل بزرگ شاهان تهران</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">۳ خرداد الی ۵ خرداد ۱۴۰۵</p>
                  </div>
              </div>

              <div className="space-y-6">
                  <div className="text-center space-y-3">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">امتیاز کلی شما</label>
                      <div className="flex justify-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                              <button key={star} className="text-slate-200 dark:text-slate-700 hover:text-amber-400 hover:scale-110 transition transform">
                                  <Star size={36} className={star <= 4 ? "fill-amber-400 text-amber-400" : "fill-transparent"} />
                              </button>
                          ))}
                      </div>
                  </div>

                  <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                      <label className="block text-sm font-bold text-slate-950 dark:text-white">توضیحات تکمیلی:</label>
                      <textarea rows={4} placeholder="تجربه خود را از این اقامت برای سایر مسافران بنویسید..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-sm font-medium outline-none focus:border-amber-500 dark:focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition resize-none"></textarea>
                  </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex gap-4 bg-white dark:bg-slate-900">
              <button 
                onClick={() => setShowReviewModal(false)}
                className="flex-grow bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md"
              >
                ثبت نهایی دیدگاه
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
