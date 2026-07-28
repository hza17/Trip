import sys
import re

with open('src/components/HomeView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the card render block
old_card = """                <div key={idx} 
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
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black backdrop-blur-md ${service.badgeClass}`}>
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
                        {service.pricePerPerson.toLocaleString("fa-IR")}
                        <span className="text-[8px] mr-1 text-slate-500">تومان</span>
                      </div>
                    </div>
                  </div>
                </div>"""

new_card = """                <div key={idx} 
                     onClick={(e) => { e.stopPropagation(); handleOpenServiceBooking(service); }}
                     className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-[1.5rem] p-3 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group/card cursor-pointer w-60 shrink-0 mx-2"
                     dir="rtl">
                  <div className="relative w-full h-36 rounded-[1rem] overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 mb-3 group-hover/card:shadow-inner">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black backdrop-blur-md shadow-sm ${service.badgeClass.replace('bg-', 'bg-white/90 dark:bg-slate-900/90 border-')}`}>
                        <IconComp size={10} />
                        <span>{service.badgeText}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-right flex-grow">
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white text-sm line-clamp-1">{service.title}</h4>
                      {service.location && (
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold flex items-center gap-1 mt-1">
                          <MapPin size={10} className="text-slate-400 shrink-0" />
                          <span className="truncate">{service.location}</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/50">
                      <div className="flex flex-col">
                        <span className="text-slate-400 font-bold text-[9px]">شروع قیمت از</span>
                        <div className="text-sm font-black text-slate-900 dark:text-white font-mono tracking-tighter">
                          {service.pricePerPerson.toLocaleString("fa-IR")}
                          <span className="text-[9px] mr-1 text-slate-500 font-sans font-bold">تومان</span>
                        </div>
                      </div>
                      <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 p-2 rounded-xl transition-colors">
                        <ChevronLeft size={16} />
                      </button>
                    </div>
                  </div>
                </div>"""

# I'll just use regex to replace everything inside the map function since the exact formatting might differ slightly
pattern = re.compile(r'                <div key=\{idx\}.*?</div>\n                </div>', re.DOTALL)
if pattern.search(content):
    content = pattern.sub(new_card, content)
else:
    print("Could not find card block!")

with open('src/components/HomeView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
