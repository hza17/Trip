import { useState } from "react";
import { Check, X, Download, RotateCcw, Home, FileText, Info } from "lucide-react";

interface StatusViewProps {
  status: 'success' | 'failed';
  onAction: () => void;
  onCancel: () => void;
}

export function StatusView({ status, onAction, onCancel }: StatusViewProps) {
  const [downloading, setDownloading] = useState(false);

  const startDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onAction();
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2rem] p-8 text-center shadow-2xl space-y-8 animate-in zoom-in-95 fade-in duration-500 relative overflow-hidden mt-10">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-black border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
          <Check size={40} strokeWidth={3} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">رزرو با موفقیت تایید شد</h2>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">واچر شما صادر و پیامک شد.</p>
        </div>
        {downloading && (
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-100/50 dark:border-blue-900/30 animate-pulse">
            <Info size={14} />
            <span>واچر به صورت PDF در حال دانلود است...</span>
          </div>
        )}
        <div className="bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-5 rounded-2xl text-right space-y-3 font-mono text-sm shadow-inner">
          <div className="flex justify-between items-center"><span className="text-slate-400 dark:text-slate-500 font-sans font-bold text-xs">کد مرجع تراکنش:</span> <span className="font-black text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-lg">TRV-998822</span></div>
          <div className="flex justify-between items-center"><span className="text-slate-400 dark:text-slate-500 font-sans font-bold text-xs">کد رفرنس هتل (PNR):</span> <span className="font-black text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-lg">ESP-4401</span></div>
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <button onClick={startDownload} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
            <Download size={20} /> دانلود واچر (PDF)
          </button>
          <button onClick={onCancel} className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 py-4 rounded-2xl transition-all font-bold text-sm flex items-center justify-center gap-2">
            <Home size={18} /> بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2rem] p-8 text-center shadow-2xl space-y-8 animate-in zoom-in-95 fade-in duration-500 relative overflow-hidden mt-10">
      <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>
      <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto text-3xl font-black border border-rose-100 dark:border-rose-800/50 shadow-sm">
        <X size={40} strokeWidth={3} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">پرداخت ناموفق بود</h2>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">تراکنش شما توسط بانک تایید نگردید.<br/>در صورت کسر وجه، مبلغ تا ۷۲ ساعت بازگردانده می‌شود.</p>
      </div>
      <div className="flex flex-col gap-3 pt-2">
        <button onClick={onAction} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
          <RotateCcw size={20} /> تلاش مجدد پرداخت
        </button>
        <button onClick={onCancel} className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 py-4 rounded-2xl transition-all font-bold text-sm flex items-center justify-center gap-2">
           انصراف و بازگشت
        </button>
      </div>
    </div>
  );
}
