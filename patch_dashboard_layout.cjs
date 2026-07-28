const fs = require('fs');

let content = fs.readFileSync('src/components/workspace/HotelPremiumDashboard.tsx', 'utf-8');

// The render function starts with:
//   return (
//     <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-[#070913] text-right" dir="rtl">

const renderStart = content.indexOf('  return (\n    <div className="flex-1 flex flex-col h-full bg-slate-50');
if (renderStart === -1) {
    console.log("Could not find render start");
    process.exit(1);
}

// We need to replace up to `{/* ============================== SUB TAB 1: OVERVIEW & ANALYTICS ============================== */}`
const mainAreaStart = content.indexOf('{/* ============================== SUB TAB 1: OVERVIEW & ANALYTICS ============================== */}', renderStart);

if (mainAreaStart === -1) {
    console.log("Could not find main area start");
    process.exit(1);
}

const newLayout = `  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl w-full h-[calc(100vh-140px)] min-h-[600px] flex overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50 flex-col md:flex-row text-right rounded-[2rem]" dir="rtl">
      <aside className="w-full md:w-64 bg-slate-950/95 dark:bg-slate-950 text-slate-300 p-5 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-3 md:pb-5 scrollbar-none gap-2 md:space-y-2 shrink-0 text-xs font-bold border-b md:border-b-0 md:border-l border-slate-850 backdrop-blur-md">
        <div className="text-white text-sm mb-0 md:mb-6 border-b-0 md:border-b border-slate-800 pb-0 md:pb-3 font-black flex items-center gap-2.5 font-sans shrink-0 self-center md:self-auto pl-4 md:pl-0">
          <div className="bg-blue-600/20 p-1.5 rounded-lg text-blue-500">
            <Building2 size={16}/>
          </div>
          <span>پنل هتل‌داران</span>
        </div>
        
        <button onClick={() => setActiveTab('overview')} className={cn("flex items-center gap-2 min-w-[160px] md:min-w-0 text-center md:text-right p-3 rounded-xl transition-all font-bold cursor-pointer shrink-0", activeTab === 'overview' ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" : "hover:bg-slate-800 hover:text-white")}>
           <LayoutDashboard size={16} className={activeTab === 'overview' ? "text-white" : "text-slate-400"}/>
           <span>داشبورد آمار عملکرد</span>
        </button>
        <button onClick={() => setActiveTab('inventory')} className={cn("flex items-center gap-2 min-w-[180px] md:min-w-0 text-center md:text-right p-3 rounded-xl transition-all font-bold cursor-pointer shrink-0", activeTab === 'inventory' ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" : "hover:bg-slate-800 hover:text-white")}>
           <BedDouble size={16} className={activeTab === 'inventory' ? "text-white" : "text-slate-400"}/>
           <span>مدیریت اتاق‌ها</span>
        </button>
        <button onClick={() => setActiveTab('pricing')} className={cn("flex items-center gap-2 min-w-[180px] md:min-w-0 text-center md:text-right p-3 rounded-xl transition-all font-bold cursor-pointer shrink-0", activeTab === 'pricing' ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" : "hover:bg-slate-800 hover:text-white")}>
           <Tags size={16} className={activeTab === 'pricing' ? "text-white" : "text-slate-400"}/>
           <span>موتور قیمت‌گذاری داینامیک</span>
        </button>
        <button onClick={() => setActiveTab('services-management')} className={cn("flex items-center justify-between min-w-[200px] md:min-w-0 text-center md:text-right p-3 rounded-xl transition-all font-black text-xs text-orange-400 border border-orange-500/20 cursor-pointer shrink-0 gap-2", activeTab === 'services-management' ? "bg-orange-600 text-white border-transparent shadow-md shadow-orange-900/20" : "hover:bg-slate-800 hover:text-orange-300")}>
           <div className="flex items-center gap-2">
             <Coffee size={16} className={activeTab === 'services-management' ? "text-white" : "text-orange-400/80"}/>
             <span>تعریف و مدیریت خدمات</span>
           </div>
           <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0">جامع</span>
        </button>
        <button onClick={() => setActiveTab('orders')} className={cn("flex items-center gap-2 min-w-[180px] md:min-w-0 text-center md:text-right p-3 rounded-xl transition-all font-bold cursor-pointer shrink-0", activeTab === 'orders' ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" : "hover:bg-slate-800 hover:text-white")}>
           <Receipt size={16} className={activeTab === 'orders' ? "text-white" : "text-slate-400"}/>
           <span>سفارشات و رزروهای جاری</span>
        </button>
        <button onClick={() => setActiveTab('housekeeping')} className={cn("flex items-center justify-between min-w-[200px] md:min-w-0 text-center md:text-right p-3 rounded-xl transition-all font-bold cursor-pointer shrink-0", activeTab === 'housekeeping' ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" : "hover:bg-slate-800 hover:text-white")}>
           <div className="flex items-center gap-2">
             <PaintBucket size={16} className={activeTab === 'housekeeping' ? "text-white" : "text-slate-400"}/>
             <span>مدیریت خانه‌داری</span>
           </div>
        </button>
        <button onClick={() => setActiveTab('ledger')} className={cn("flex items-center gap-2 min-w-[180px] md:min-w-0 text-center md:text-right p-3 rounded-xl transition-all font-bold cursor-pointer shrink-0", activeTab === 'ledger' ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" : "hover:bg-slate-800 hover:text-white")}>
           <FileText size={16} className={activeTab === 'ledger' ? "text-white" : "text-slate-400"}/>
           <span>تسویه حساب</span>
        </button>
      </aside>

      {/* Main Dynamic Panel Body Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
        `;

content = content.substring(0, renderStart) + newLayout + content.substring(mainAreaStart);
fs.writeFileSync('src/components/workspace/HotelPremiumDashboard.tsx', content);
console.log("Updated layout to match wireframe sidebar.");
