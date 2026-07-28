import { cn } from "@/lib/utils";

interface PresentationControllerProps {
  currentView: string;
  onSwitchView: (view: string) => void;
  onToggleModal: (modal: string) => void;
}

export function PresentationController({ currentView, onSwitchView, onToggleModal }: PresentationControllerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex bg-slate-950/95 text-slate-200 p-3 flex-wrap gap-4 items-center justify-between text-xs border-t border-slate-800 z-[9999] backdrop-blur-md shadow-2xl">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-bold text-amber-400 border-l border-gray-700 pl-2">ناوبری تعاملی (B2C):</span>
        {['home', 'serp', 'detail', 'checkout', 'dashboard'].map((view, i) => {
          const labels = ['۱. جستجو', '۲. نتایج (SERP)', '۳. جزئیات هتل', '۴. چک‌اوت', '۵. پنل مسافر'];
          return (
            <button
              key={view}
              onClick={() => onSwitchView(view)}
              className={cn(
                "px-3 py-1.5 rounded transition",
                currentView === view ? "bg-gray-700 text-white" : "bg-gray-800 hover:bg-gray-700",
                view === 'dashboard' && "text-sky-300 font-bold"
              )}
            >
              {labels[i]}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-bold text-emerald-400 border-l border-gray-700 pl-2">پنل‌های اداری (B2B / Admin):</span>
        <button onClick={() => onSwitchView('supplier')} className="bg-emerald-950 text-emerald-100 px-3 py-1.5 rounded hover:bg-emerald-900 transition font-bold">پنل هتل‌دار (PMS/قیمت‌گذاری)</button>
        <button onClick={() => onSwitchView('wizard')} className="bg-blue-950 text-blue-100 px-3 py-1.5 rounded hover:bg-blue-900 transition font-bold">ثبت هتل (Wizard)</button>
        <button onClick={() => onSwitchView('admin')} className="bg-purple-950 text-purple-100 px-3 py-1.5 rounded hover:bg-purple-900 transition font-bold">سوپر ادمین (اسناد/کنترلر)</button>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-bold text-rose-400 border-l border-gray-700 pl-2">تست سیستم:</span>
        <button onClick={() => onToggleModal('soldout')} className="border border-rose-500 text-rose-300 px-2 py-1 rounded hover:bg-rose-950 transition">تکمیل ظرفیت</button>
        <button onClick={() => onToggleModal('timeout')} className="border border-rose-500 text-rose-300 px-2 py-1 rounded hover:bg-rose-950 transition">تایم‌اوت</button>
      </div>
    </div>
  );
}
