import re

with open('src/components/SerpView.tsx', 'r') as f:
    content = f.read()

# Replace grid cols
content = content.replace(
    'viewMode === \'map\' ? "grid grid-cols-1 xl:grid-cols-2 order-2 lg:order-1 h-[650px] overflow-y-auto pr-2 custom-scrollbar" :\n              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"',
    'viewMode === \'map\' ? "grid grid-cols-1 xl:grid-cols-2 order-2 lg:order-1 h-[650px] overflow-y-auto pr-2 custom-scrollbar" :\n              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"'
)

# Replace CustomService card main div
content = content.replace(
    '"bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/25 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex group h-full",\n                      viewMode === \'list\' ? "flex-col md:flex-row" : "flex-col"\n                    )} dir="rtl">\n                      <div className={cn(\n                        "relative overflow-hidden shrink-0",\n                        viewMode === \'list\' ? "w-full md:w-[280px] h-56 md:h-auto" : "w-full h-52"\n                      )}>\n                        <img \n                          src={service.image} \n                          alt={service.title} \n                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"\n                          referrerPolicy="no-referrer"\n                        />\n                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>',
    '"bg-white/70 hover:bg-white/90 dark:bg-[#070913]/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[1.5rem] p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-xl transition-all duration-500 flex group h-full",\n                      viewMode === \'list\' ? "flex-col md:flex-row" : "flex-col"\n                    )} dir="rtl">\n                      <div className={cn(\n                        "relative overflow-hidden shrink-0 rounded-[1.25rem] bg-slate-100 dark:bg-slate-800",\n                        viewMode === \'list\' ? "w-full md:w-[280px] h-56 md:h-auto" : "w-full h-52"\n                      )}>\n                        <ImageCarousel images={[service.image, "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800", "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"]} title={service.title} />\n                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>'
)

# Replace Hotel card main div
content = content.replace(
    '"bg-white/45 dark:bg-[#0e132e]/30 backdrop-blur-xl border border-white/25 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex group h-full",\n                    viewMode === \'list\' ? "flex-col md:flex-row" : "flex-col"\n                  )} dir="rtl">\n                    <div className={cn(\n                      "relative overflow-hidden shrink-0",\n                      viewMode === \'list\' ? "w-full md:w-[280px] xl:w-[320px] h-56 md:h-auto" : "w-full h-56"\n                    )}>\n                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110" style={{ backgroundImage: `url(\'${hotel.image}\')` }}></div>\n                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>',
    '"bg-white/70 hover:bg-white/90 dark:bg-[#070913]/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[1.5rem] p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-xl transition-all duration-500 flex group h-full",\n                    viewMode === \'list\' ? "flex-col md:flex-row" : "flex-col"\n                  )} dir="rtl">\n                    <div className={cn(\n                      "relative overflow-hidden shrink-0 rounded-[1.25rem] bg-slate-100 dark:bg-slate-800",\n                      viewMode === \'list\' ? "w-full md:w-[280px] xl:w-[320px] h-56 md:h-auto" : "w-full h-56"\n                    )}>\n                      <ImageCarousel images={[hotel.image, "https://images.unsplash.com/photo-1542314831-c53cd3816002?q=80&w=800", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800"]} title={hotel.name} />\n                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>'
)

with open('src/components/SerpView.tsx', 'w') as f:
    f.write(content)
