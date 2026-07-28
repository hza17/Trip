import { MapPin, Star, User, Image as ImageIcon, Navigation, Map, ShieldCheck, ChevronDown, Check, Clock, Info, Coffee, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailViewProps {
  onCheckout: () => void;
}

export function DetailView({ onCheckout }: DetailViewProps) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-6xl mx-auto px-4 pt-32 pb-8">
      {/* Hero Section */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/20 dark:shadow-black/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 px-2">
          <div>
            <div className="flex items-center gap-3 mb-4 text-xs font-semibold">
              <span className="bg-amber-50/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full border border-amber-100 dark:border-amber-900/50 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck size={14} /> هتل ۵ ستاره لوکس
              </span>
              <span className="flex items-center gap-1.5 bg-amber-50/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full border border-amber-100 dark:border-amber-900/50 shadow-sm">
                <Star size={14} className="fill-amber-500 text-amber-500" /> ۴.۸ امتیاز کاربران
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">هتل بین‌المللی اسپیناس پالاس تهران</h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2.5 flex items-center gap-1.5">
              <MapPin size={16} className="text-slate-400" />
              تهران، سعادت آباد، میدان بهرود، خیابان ۳۳
            </p>
          </div>
          <button onClick={() => {
            const el = document.getElementById('section-detail-proximity');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} className="flex items-center gap-2 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold text-slate-700 dark:text-slate-300 px-6 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm bg-white dark:bg-slate-900 shrink-0 hover:shadow-md hover:-translate-y-0.5">
            <Map size={16} className="text-slate-400" />
            مشاهده روی نقشه
          </button>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[450px] rounded-[2rem] overflow-hidden font-semibold text-sm text-slate-400 dark:text-slate-500">
          <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800">
            <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800">
             <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop')` }}></div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800">
             <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop')` }}></div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800">
             <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop')` }}></div>
          </div>
          <div className="bg-slate-900 text-white flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors gap-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber-900/20 group-hover:bg-amber-800/40 transition-colors"></div>
            <ImageIcon size={24} className="z-10" />
            <span className="z-10 font-bold">+۴۵ تصویر آلبوم</span>
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <div className="sticky top-28 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-black/20 p-2 flex gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 overflow-x-auto custom-scrollbar rounded-2xl mx-2">
        <a href="#section-detail-rooms" className="text-white bg-slate-900 dark:bg-white dark:text-slate-900 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap shadow-sm">اتاق‌های موجود</a>
        <a href="#section-facilities-grid" className="hover:text-slate-900 dark:hover:text-white px-5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all whitespace-nowrap">تسهیلات و امکانات</a>
        <a href="#section-detail-proximity" className="hover:text-slate-900 dark:hover:text-white px-5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all whitespace-nowrap">دسترسی محلی</a>
        <a href="#section-detail-policies" className="hover:text-slate-900 dark:hover:text-white px-5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all whitespace-nowrap">قوانین هتل</a>
        <a href="#section-detail-reviews-list" className="hover:text-slate-900 dark:hover:text-white px-5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all whitespace-nowrap">نظرات (۱۲۰)</a>
        <a href="#section-detail-faq" className="hover:text-slate-900 dark:hover:text-white px-5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all whitespace-nowrap">سوالات متداول</a>
      </div>

      {/* Date & Guests Selection */}
      <div className="bg-slate-900 rounded-3xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-end relative overflow-hidden text-white mx-2">
          <div className="absolute -right-10 top-0 bottom-0 w-32 bg-amber-900/20 transform skew-x-12 pointer-events-none"></div>
          <div className="space-y-2 relative z-10">
              <label className="text-xs text-slate-400 font-semibold block">تاریخ ورود (Check-in)</label>
              <div className="border border-slate-700/50 p-4 rounded-xl text-sm font-semibold text-white bg-slate-800/50 cursor-pointer flex justify-between hover:border-amber-500 transition-colors shadow-inner">
                  <span>جمعه، ۲۸ خرداد ۱۴۰۵</span>
                  <span className="text-amber-400">📅</span>
              </div>
          </div>
          <div className="space-y-2 relative z-10">
              <label className="text-xs text-slate-400 font-semibold block">تاریخ خروج (Check-out)</label>
              <div className="border border-slate-700/50 p-4 rounded-xl text-sm font-semibold text-white bg-slate-800/50 cursor-pointer flex justify-between hover:border-amber-500 transition-colors shadow-inner">
                  <span>یکشنبه، ۳۰ خرداد ۱۴۰۵</span>
                  <span className="text-amber-400">📅</span>
              </div>
          </div>
          <div className="space-y-2 relative z-10">
              <label className="text-xs text-slate-400 font-semibold block">مسافران و اتاق‌ها</label>
              <div className="border border-slate-700/50 p-4 rounded-xl text-sm font-semibold text-white bg-slate-800/50 cursor-pointer flex justify-between hover:border-amber-500 transition-colors shadow-inner">
                  <span>۲ بزرگسال، ۰ کودک (۱ اتاق)</span>
                  <span className="text-amber-400">👥</span>
              </div>
          </div>
      </div>

      {/* Rooms Section */}
      <div id="section-detail-rooms" className="space-y-6 pt-4 mx-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-amber-500 pr-3">انتخاب اتاق</h3>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-black/20">
          <div className="hidden md:grid grid-cols-12 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-slate-800/50 text-xs font-semibold text-slate-500 dark:text-slate-400 p-5">
            <div className="col-span-5">مشخصات اتاق</div>
            <div className="col-span-3">خدمات و لغو رزرو</div>
            <div className="col-span-4 text-left pl-4">قیمت کل و رزرو</div>
          </div>
          
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            <div className="grid grid-cols-1 md:grid-cols-12 p-6 gap-6 items-center text-sm font-semibold bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors duration-300">
                <div className="col-span-5 space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">اتاق دبل استاندارد (رو به شهر)</h4>
                    <div className="text-slate-500 text-xs flex items-center gap-3 font-medium">
                        <span className="flex items-center gap-1"><Map size={12}/> ۲۴ متر مربع</span>
                        <span className="text-slate-300 dark:text-slate-700">|</span>
                        <span className="flex items-center gap-1">🛏 ۱ تخت کینگ</span>
                    </div>
                </div>
                <div className="col-span-3 space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><Coffee size={14} className="text-amber-600 dark:text-amber-400"/> صبحانه بوفه رایگان</div>
                    <span className="bg-amber-50/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-900/50 flex items-center gap-1.5 w-fit shadow-sm text-[10px]">
                        <Check size={12}/> کنسلی رایگان تا ۴۸ ساعت
                    </span>
                </div>
                <div className="col-span-4 flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
                    <div className="text-left w-full md:w-auto">
                        <div className="text-slate-400 text-xs font-medium mb-1">قیمت برای ۳ شب</div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">۱۴,۸۸۰,۰۰۰ <span className="text-[10px] font-sans font-medium text-slate-500">تومان</span></div>
                    </div>
                    <button onClick={onCheckout} className="w-full md:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3.5 rounded-2xl text-sm font-semibold shadow-lg shadow-amber-600/20 hover:shadow-amber-600/40 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                      رزرو اتاق
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div id="section-facilities-grid" className="space-y-6 pt-4 mx-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-amber-500 pr-3">ویژگی‌ها و امکانات رفاهی</h3>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm font-semibold">
                <div className="space-y-4 md:border-l border-slate-200/50 dark:border-slate-700/50 md:pl-6">
                    <span className="text-slate-900 dark:text-white text-sm block font-bold flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl flex items-center justify-center"><Star size={16} className="text-slate-400"/></div> اتاق‌ها
                    </span>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-xs font-medium">
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> مینی‌بار غیررایگان</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> چای‌ساز اختصاصی</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> سشوار و حمام مجهز</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> تهویه مطبوع هوشمند</li>
                    </ul>
                </div>
                <div className="space-y-4 md:border-l border-slate-200/50 dark:border-slate-700/50 md:pl-6">
                    <span className="text-slate-900 dark:text-white text-sm block font-bold flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl flex items-center justify-center"><Waves size={16} className="text-slate-400"/></div> ورزشی و تندرستی
                    </span>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-xs font-medium">
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> استخر سرپوشیده</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> سالن ماساژ و اسپا</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> جکوزی و سونا</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> باشگاه بدن‌سازی</li>
                    </ul>
                </div>
                <div className="space-y-4 md:border-l border-slate-200/50 dark:border-slate-700/50 md:pl-6">
                    <span className="text-slate-900 dark:text-white text-sm block font-bold flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl flex items-center justify-center"><Info size={16} className="text-slate-400"/></div> خدمات عمومی
                    </span>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-xs font-medium">
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> پذیرش ۲۴ ساعته</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> ترانسفر فرودگاهی</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> لاندری اختصاصی</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> صندوق امانات</li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <span className="text-slate-900 dark:text-white text-sm block font-bold flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl flex items-center justify-center"><Coffee size={16} className="text-slate-400"/></div> غذا و نوشیدنی
                    </span>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-xs font-medium">
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> رستوران ایرانی دیبا</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> رستوران لاتون</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> کافی‌شاپ سان‌ست</li>
                        <li className="flex items-center gap-2.5"><Check size={14} className="text-amber-500"/> روم‌سرویس ۲۴ ساعته</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>

      {/* Proximity Section */}
      <div id="section-detail-proximity" className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 mx-2">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-3">دسترسی محلی</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                    <thead className="text-slate-400 font-semibold border-b border-slate-200/50 dark:border-slate-700/50">
                        <tr>
                            <th className="pb-4 px-2">نام مرکز</th>
                            <th className="pb-4 px-2">مسافت</th>
                            <th className="pb-4 px-2">زمان با ماشین</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 font-medium text-slate-600 dark:text-slate-400 text-xs">
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"><td className="py-4 px-2 font-bold text-slate-900 dark:text-white">فرودگاه مهرآباد</td><td className="py-4 px-2 font-mono">۱۵ km</td><td className="py-4 px-2 font-mono">۲۵ min</td></tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"><td className="py-4 px-2 font-bold text-slate-900 dark:text-white">مترو میدان صنعت</td><td className="py-4 px-2 font-mono">۳.5 km</td><td className="py-4 px-2 font-mono">۸ min</td></tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"><td className="py-4 px-2 font-bold text-slate-900 dark:text-white">مجموعه توچال</td><td className="py-4 px-2 font-mono">۷ km</td><td className="py-4 px-2 font-mono">۱۵ min</td></tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"><td className="py-4 px-2 font-bold text-slate-900 dark:text-white">مرکز خرید میلاد نور</td><td className="py-4 px-2 font-mono">۴ km</td><td className="py-4 px-2 font-mono">۱۰ min</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* Schematic Map Representation */}
        <div className="bg-slate-50/80 dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-inner space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-3 mb-3">موقعیت روی نقشه</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed">
                    منطقه سعادت‌آباد تهران و در مجاورت میدان بهرود. دسترسی سریع به بزرگراه یادگار امام.
                </p>
            </div>
            <div className="border border-slate-300 dark:border-slate-700 rounded-[2rem] h-48 bg-white dark:bg-slate-900 flex flex-col justify-between p-4 relative overflow-hidden font-mono shadow-sm z-10">
                <div className="absolute inset-0 border-2 border-dashed border-slate-200 dark:border-slate-800 m-4 opacity-50 pointer-events-none rounded-[1.5rem]"></div>
                <div className="flex justify-between items-start text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">یادگار امام ──</span>
                    <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">── پارک پرواز</span>
                </div>
                <div className="text-center z-10 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-500/20 rounded-full animate-ping"></div>
                    <span className="bg-slate-950 dark:bg-white text-white dark:text-slate-900 font-sans text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 justify-center mx-auto w-fit relative z-10 hover:scale-105 transition-transform cursor-pointer">
                        <MapPin size={14} className="text-amber-500 dark:text-amber-600"/> اسپیناس پالاس
                    </span>
                </div>
                <div className="flex justify-between items-end text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">میدان بهرود ○</span>
                    <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">چمران ──</span>
                </div>
            </div>
        </div>
      </div>

      {/* CUSTOMER REVIEWS */}
      <div id="section-detail-reviews-list" className="space-y-6 pt-4 mx-2">
        <div className="flex justify-between items-center pb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-3">نظرات مسافران</h3>
            <div className="text-xs font-semibold text-slate-500 bg-slate-50/80 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-200/50 dark:border-slate-700/50">۱۲۰ نظر تایید شده</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-slate-900 text-white border border-slate-800 p-8 rounded-[2rem] text-sm font-semibold space-y-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none transform translate-x-4 -translate-y-4">
                    <Star size={140} />
                </div>
                <div className="relative z-10 text-center space-y-2">
                    <div className="text-6xl font-bold font-mono tracking-tighter">۴.۸ <span className="text-lg text-slate-500 font-sans">/ ۵</span></div>
                    <div className="flex justify-center gap-1.5 mt-2">
                        {[1,2,3,4,5].map(s => <Star key={s} size={18} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-amber-400 text-xs font-medium pt-3">بر اساس ۱۲۰ تجربه واقعی</p>
                </div>
                <div className="space-y-5 border-t border-slate-800/50 pt-8 relative z-10">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">پاکیزگی و نظافت:</span>
                        <div className="flex items-center gap-3"><div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="w-[98%] h-full bg-amber-500"></div></div><span className="font-mono">۴.۹</span></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">کیفیت غذا:</span>
                        <div className="flex items-center gap-3"><div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="w-[95%] h-full bg-amber-500"></div></div><span className="font-mono">۴.۸</span></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">برخورد پرسنل:</span>
                        <div className="flex items-center gap-3"><div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="w-[90%] h-full bg-amber-500"></div></div><span className="font-mono">۴.۷</span></div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 space-y-4 text-sm shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400"><User size={20}/></div>
                            <div className="pt-1">
                                <span className="text-slate-900 dark:text-white font-bold block">رضا بهرامی</span>
                                <span className="text-slate-400 text-[10px] font-medium mt-1 block">اتاق دبل استاندارد</span>
                            </div>
                        </div>
                        <span className="bg-amber-50/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1">۵.۰ <Star size={12} className="fill-amber-500" /></span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium leading-loose text-xs bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-700/50">
                        نظافت اتاق فوق‌العاده بود. برخورد پرسنل لابی و خدمات بسیار محترمانه بود. صبحانه تنوع عالی داشت اما کیفیت قهوه دستگاه کمی معمولی بود. در کل مجدداً انتخاب خواهم کرد.
                    </p>
                    <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1"><Clock size={12}/> ۱۴۰۵/۰۴/۰۲</div>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 space-y-4 text-sm shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400"><User size={20}/></div>
                            <div className="pt-1">
                                <span className="text-slate-900 dark:text-white font-bold block">سحر جمشیدی</span>
                                <span className="text-slate-400 text-[10px] font-medium mt-1 block">سوئیت فمیلی</span>
                            </div>
                        </div>
                        <span className="bg-amber-50/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1">۴.۲ <Star size={12} className="fill-amber-500" /></span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium leading-loose text-xs bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-700/50">
                        منظره هتل رو به شهر بی نظیر بود. اتاق جادار و شیک طراحی شده است. تنها مشکل کندی لاندری در شستشوی البسه بود که امیدوارم هتلدار محترم پیگیری کند.
                    </p>
                    <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1"><Clock size={12}/> ۱۴۰۵/۰۳/۲۸</div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 mx-2">
          {/* Policies */}
          <div id="section-detail-policies" className="bg-slate-50/80 dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-inner space-y-6 text-sm font-semibold">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-amber-500 pr-3">قوانین هتل</h3>
            <div className="space-y-4 bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow-sm border border-slate-100/50 dark:border-slate-700/50">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 pb-4">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">ساعت ورود (Check-in)</span>
                    <span className="text-slate-900 dark:text-white font-bold font-mono bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl">۱۴:۰۰</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">ساعت خروج (Check-out)</span>
                    <span className="text-slate-900 dark:text-white font-bold font-mono bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl">۱۲:۰۰</span>
                </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-700/50 flex items-start gap-3">
                <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <span>ارائه شناسنامه معتبر زوجین و کارت ملی در زمان ورود الزامی است. پذیرش صیغه‌نامه ممهور بلامانع است.</span>
            </p>
          </div>

          {/* FAQs Accordion */}
          <div id="section-detail-faq" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-sm space-y-6 text-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-r-4 border-amber-500 pr-3">سوالات متداول (FAQ)</h3>
            <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
                <div className="p-5 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 flex justify-between items-center transition-colors group bg-white/50 dark:bg-slate-900/50">
                    <span className="text-slate-800 dark:text-slate-200 text-xs font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">آیا هتل پارکینگ اختصاصی دارد؟</span>
                    <ChevronDown size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <div className="p-5 bg-slate-50/50 dark:bg-slate-800/30 text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    بله، پارکینگ سرپوشیده اختصاصی هتل با ظرفیت کامل برای مسافران مقیم به صورت کاملاً رایگان ارائه می‌شود.
                </div>
                <div className="p-5 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 flex justify-between items-center transition-colors group bg-white/50 dark:bg-slate-900/50">
                    <span className="text-slate-800 dark:text-slate-200 text-xs font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">ساعات کار رستوران و صبحانه چگونه است؟</span>
                    <ChevronDown size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}
