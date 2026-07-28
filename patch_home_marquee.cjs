const fs = require('fs');

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf-8');

const startIdx = content.indexOf('{/* Hotel Services Grid Section');
const endIdx = content.indexOf('{/* Suggested Hotels Section', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const newSection = `      {/* Hotel Services Carousel Section - Continuous Marquee */}
      <div className="w-full py-10 bg-slate-50/40 dark:bg-slate-950/20 relative z-10 border-y border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="text-center">
            <span className="text-[10px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full uppercase mb-2 inline-block shadow-sm">
              تفریح، تندرستی و تشریفات لوکس
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1 mb-2">
              امکان استفاده آزاد؛ بدون نیاز به اقامت در هتل!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-xs max-w-2xl mx-auto leading-relaxed">
              تجربه یک روز آرامش‌بخش، طعم‌های ماندگار یا برگزاری همایش‌ها، مستقل از رزرو هتل.
            </p>
          </div>
        </div>

        {/* Continuous Marquee Wrapper */}
        <div className="relative w-full overflow-hidden flex items-center group">
          {/* Gradient Masks for fade effect at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50/90 dark:from-slate-950/90 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/90 dark:from-slate-950/90 to-transparent z-10"></div>
          
          <div className="flex animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4 w-max">
            {[...servicesList, ...servicesList, ...servicesList, ...servicesList].map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div key={idx} 
                     onClick={(e) => { e.stopPropagation(); handleOpenServiceBooking(service); }}
                     className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-3 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group/card cursor-pointer w-64 shrink-0 mx-2"
                     dir="rtl">
                  <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 mb-3 group-hover/card:shadow-inner">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1">
                      <div className={\`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black backdrop-blur-md \${service.badgeClass}\`}>
                        <IconComp size={10} />
                        <span>{service.badgeText}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-right flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-slate-900 dark:text-white text-sm font-sans line-clamp-1 flex-grow">{service.title}</h4>
                    </div>
                    {service.location && (
                      <span className="text-slate-400 dark:text-slate-500 text-[9px] font-bold flex items-center gap-0.5 whitespace-nowrap">
                        <MapPin size={10} className="text-amber-500 shrink-0" />
                        <span className="truncate">{service.location}</span>
                      </span>
                    )}
                    <div className="flex justify-between items-end mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                      <span className="text-slate-400 font-medium text-[9px]">هزینه هر نفر:</span>
                      <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-sans tracking-tighter">
                        {toPersianDigits(service.pricePerPerson.toLocaleString())}
                        <span className="text-[8px] mr-1 text-slate-500">تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-8">
           <button 
              onClick={() => {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
                 handleSearchTrigger();
              }} 
              className="bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
           >
              <Search size={14} className="text-emerald-500 group-hover:-translate-x-1 transition-transform" />
              مشاهده تمامی خدمات تفریحی
           </button>
        </div>
      </div>

`;
    const finalContent = content.slice(0, startIdx) + newSection + content.slice(endIdx);
    fs.writeFileSync('src/components/HomeView.tsx', finalContent);
    console.log("Successfully replaced grid with continuous marquee!");
} else {
    console.log("Could not find sections");
}
