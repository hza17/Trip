const fs = require('fs');

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf-8');

const startIdx = content.indexOf('{/* Hotel Services Carousel Section');
const endIdx = content.indexOf('{/* Suggested Hotels Section', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const newSection = `      {/* Hotel Services Grid Section - Replaced Marquee with Cards Grid */}
      <div className="w-full py-16 bg-slate-50/40 dark:bg-slate-950/20 relative z-10 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-400/10 px-4 py-1.5 rounded-full uppercase mb-3 inline-block shadow-sm">
              تفریح، تندرستی و تشریفات لوکس برای عموم شهروندان و مسافران
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1 mb-3">
              امکان استفاده مستقل و آزاد؛ بدون نیاز به اقامت در هتل!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-3xl mx-auto leading-relaxed">
              برای تجربه یک روز آرامش‌بخش، طعم‌های ماندگار یا برگزاری باشکوه همایش‌های خود، نیازی به رزرو اتاق یا اقامت در هتل ندارید. شما می‌توانید به طور کاملاً مستقل از محبوب‌ترین و پرطرفدارترین خدمات هتل‌های تراز اول کشور لذت ببرید.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
            {servicesList.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                  <div className="space-y-4">
                    {/* Image */}
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 shadow-inner group/image cursor-pointer" onClick={() => handleOpenServiceBooking(service)}>
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                      <div className="absolute bottom-3 right-3">
                        <div className={\`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black backdrop-blur-md \${service.badgeClass}\`}>
                          <IconComp size={12} />
                          <span>{service.badgeText}</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-right">
                      <div className="flex justify-between items-center">
                        <h4 className="font-black text-slate-950 dark:text-white text-base font-sans line-clamp-1">{service.title}</h4>
                        {service.location && (
                          <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold flex items-center gap-0.5 whitespace-nowrap mr-2">
                            <MapPin size={10} className="text-amber-500" />
                            {service.location}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">{service.description}</p>
                      
                      <div className="flex flex-wrap gap-2 items-center text-[10px] text-slate-400 font-semibold pt-1">
                        <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800">
                          {service.offerText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking and Price */}
                  <div className="border-t border-slate-100 dark:border-slate-800/50 pt-4 mt-5 space-y-4 text-right">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-400 font-medium">هزینه (هر نفر):</span>
                      <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-sans tracking-tighter leading-none">
                        {toPersianDigits(service.pricePerPerson.toLocaleString())}{" "}
                        <span className="text-[10px] font-sans font-medium text-slate-500 tracking-normal">تومان</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleOpenServiceBooking(service)}
                      className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-all text-xs font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shadow-sm cursor-pointer"
                    >
                      {service.ctaText || "رزرو آنی"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-12">
             <button 
                onClick={() => {
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                   // Optionally trigger search or open a specific modal if needed
                   handleSearchTrigger();
                }} 
                className="bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 px-8 py-3.5 rounded-2xl font-bold transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
             >
                <Search size={16} className="text-emerald-500 group-hover:-translate-x-1 transition-transform" />
                مشاهده و جستجوی تمامی خدمات و تفریحات
             </button>
          </div>
        </div>
      </div>

`;
    const finalContent = content.slice(0, startIdx) + newSection + content.slice(endIdx);
    fs.writeFileSync('src/components/HomeView.tsx', finalContent);
    console.log("Successfully replaced marquee with grid!");
} else {
    console.log("Could not find sections");
}
